#!/usr/bin/env python3
"""
Remove white backgrounds from machine images.
Uses edge-aware flood fill from corners to avoid removing white parts
inside the actual equipment.
"""

import os
import sys
from PIL import Image
import numpy as np

MACHINES_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "machines")

# Images identified as having white backgrounds
WHITE_BG_FILES = [
    "101-super-high-row.webp",
    "102-super-rowing-circular.webp",
    "132-hip-abduction.webp",
    "133-leg-extension.webp",
    "134-leg-curl.webp",
    "138-mts-high-row.webp",
    "139-mts-incline-press.webp",
    "140-mts-decline-press.webp",
    "142-fixed-pulldown.webp",
    "144-low-row.webp",
    "152-gymleco-lateral.webp",
    "154-power-rack.webp",
]


def remove_white_bg(img_path, tolerance=30):
    """
    Remove white background using flood fill from edges.
    
    This approach:
    1. Converts image to RGBA
    2. Creates a mask by flood-filling from all edges
    3. Only removes white pixels connected to the edge (background),
       preserving white parts inside the equipment
    """
    img = Image.open(img_path).convert("RGBA")
    data = np.array(img)
    
    h, w = data.shape[:2]
    
    # Create a mask: True = pixel is "white-ish"
    r, g, b = data[:, :, 0], data[:, :, 1], data[:, :, 2]
    white_mask = (r > (255 - tolerance)) & (g > (255 - tolerance)) & (b > (255 - tolerance))
    
    # Flood fill from edges to find background white pixels
    # Using BFS from all edge pixels that are white
    from collections import deque
    
    visited = np.zeros((h, w), dtype=bool)
    queue = deque()
    
    # Add all white edge pixels to queue
    for x in range(w):
        if white_mask[0, x] and not visited[0, x]:
            queue.append((0, x))
            visited[0, x] = True
        if white_mask[h-1, x] and not visited[h-1, x]:
            queue.append((h-1, x))
            visited[h-1, x] = True
    
    for y in range(h):
        if white_mask[y, 0] and not visited[y, 0]:
            queue.append((y, 0))
            visited[y, 0] = True
        if white_mask[y, w-1] and not visited[y, w-1]:
            queue.append((y, w-1))
            visited[y, w-1] = True
    
    # BFS flood fill
    while queue:
        cy, cx = queue.popleft()
        for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            ny, nx = cy + dy, cx + dx
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx] and white_mask[ny, nx]:
                visited[ny, nx] = True
                queue.append((ny, nx))
    
    # Apply: make background white pixels transparent
    # Also apply partial transparency for edge anti-aliasing
    bg_mask = visited
    
    # For edge pixels (neighbors of both bg and non-bg), apply smooth transition
    alpha = data[:, :, 3].copy()
    alpha[bg_mask] = 0
    
    # Anti-alias: for pixels near the edge, use distance-based alpha
    from scipy.ndimage import binary_dilation
    
    # Create a narrow border for anti-aliasing
    dilated = binary_dilation(bg_mask, iterations=1)
    edge_pixels = dilated & ~bg_mask
    
    # For edge pixels that are light, make them semi-transparent
    for y, x in zip(*np.where(edge_pixels)):
        r_val, g_val, b_val = data[y, x, 0], data[y, x, 1], data[y, x, 2]
        brightness = (int(r_val) + int(g_val) + int(b_val)) / 3
        if brightness > 220:
            # Very light edge pixel -> more transparent
            alpha[y, x] = int(max(0, (255 - brightness) * 5))
        elif brightness > 180:
            alpha[y, x] = int((255 - brightness) * 2)
    
    data[:, :, 3] = alpha
    
    result = Image.fromarray(data)
    return result


def remove_white_bg_simple(img_path, tolerance=30):
    """
    Simpler fallback: flood fill from edges without scipy.
    """
    img = Image.open(img_path).convert("RGBA")
    data = np.array(img)
    
    h, w = data.shape[:2]
    
    r, g, b = data[:, :, 0], data[:, :, 1], data[:, :, 2]
    white_mask = (r > (255 - tolerance)) & (g > (255 - tolerance)) & (b > (255 - tolerance))
    
    from collections import deque
    
    visited = np.zeros((h, w), dtype=bool)
    queue = deque()
    
    for x in range(w):
        if white_mask[0, x] and not visited[0, x]:
            queue.append((0, x))
            visited[0, x] = True
        if white_mask[h-1, x] and not visited[h-1, x]:
            queue.append((h-1, x))
            visited[h-1, x] = True
    
    for y in range(h):
        if white_mask[y, 0] and not visited[y, 0]:
            queue.append((y, 0))
            visited[y, 0] = True
        if white_mask[y, w-1] and not visited[y, w-1]:
            queue.append((y, w-1))
            visited[y, w-1] = True
    
    while queue:
        cy, cx = queue.popleft()
        for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            ny, nx = cy + dy, cx + dx
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx] and white_mask[ny, nx]:
                visited[ny, nx] = True
                queue.append((ny, nx))
    
    alpha = data[:, :, 3].copy()
    alpha[visited] = 0
    data[:, :, 3] = alpha
    
    result = Image.fromarray(data)
    return result


def main():
    # Check if scipy is available for anti-aliasing
    try:
        import scipy
        use_scipy = True
        print("✅ scipy available — using anti-aliased edge processing")
    except ImportError:
        use_scipy = False
        print("⚠️  scipy not available — using simple background removal")
    
    backup_dir = os.path.join(MACHINES_DIR, "_backup_white_bg")
    os.makedirs(backup_dir, exist_ok=True)
    
    processed = 0
    errors = 0
    
    for fname in WHITE_BG_FILES:
        src_path = os.path.join(MACHINES_DIR, fname)
        
        if not os.path.exists(src_path):
            print(f"  ⚠️  Skip (not found): {fname}")
            continue
        
        # Backup original
        backup_path = os.path.join(backup_dir, fname)
        if not os.path.exists(backup_path):
            img_orig = Image.open(src_path)
            img_orig.save(backup_path, "WEBP", quality=95)
        
        try:
            if use_scipy:
                result = remove_white_bg(src_path, tolerance=30)
            else:
                result = remove_white_bg_simple(src_path, tolerance=30)
            
            result.save(src_path, "WEBP", quality=85, method=6)
            
            orig_size = os.path.getsize(backup_path)
            new_size = os.path.getsize(src_path)
            print(f"  ✅ {fname:45s} {orig_size//1024:>5d}KB → {new_size//1024:>5d}KB")
            processed += 1
        except Exception as e:
            print(f"  ❌ {fname}: {e}")
            errors += 1
    
    print(f"\n{'='*60}")
    print(f"Done! Processed: {processed}, Errors: {errors}")
    print(f"Backups saved in: {backup_dir}")


if __name__ == "__main__":
    main()
