#!/usr/bin/env python3
"""Analyze machine images to detect white/light backgrounds."""

import os
from PIL import Image

MACHINES_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "machines")

def get_corner_colors(img, margin=5):
    """Sample colors from the four corners of the image."""
    w, h = img.size
    corners = [
        (margin, margin),           # top-left
        (w - margin, margin),       # top-right
        (margin, h - margin),       # bottom-left
        (w - margin, h - margin),   # bottom-right
    ]
    colors = []
    for x, y in corners:
        x = min(max(x, 0), w - 1)
        y = min(max(y, 0), h - 1)
        colors.append(img.getpixel((x, y)))
    return colors

def is_light_color(color, threshold=220):
    """Check if a color is white/near-white."""
    if len(color) == 4:  # RGBA
        r, g, b, a = color
        if a < 10:  # already transparent
            return False
    else:
        r, g, b = color[:3]
    return r > threshold and g > threshold and b > threshold

def main():
    files = sorted(f for f in os.listdir(MACHINES_DIR) if f.endswith(".webp"))
    
    white_bg = []
    dark_bg = []
    transparent_bg = []
    
    for fname in files:
        path = os.path.join(MACHINES_DIR, fname)
        img = Image.open(path).convert("RGBA")
        corners = get_corner_colors(img)
        
        # Check if already transparent
        alpha_values = [c[3] for c in corners]
        if all(a < 10 for a in alpha_values):
            transparent_bg.append(fname)
            continue
        
        light_corners = sum(1 for c in corners if is_light_color(c))
        
        if light_corners >= 3:
            white_bg.append(fname)
        else:
            dark_bg.append(fname)
    
    print(f"\n{'='*60}")
    print(f"⬜ WHITE/LIGHT BACKGROUND ({len(white_bg)} images):")
    print(f"{'='*60}")
    for f in white_bg:
        img = Image.open(os.path.join(MACHINES_DIR, f)).convert("RGBA")
        corners = get_corner_colors(img)
        avg = tuple(sum(c[i] for c in corners) // 4 for i in range(3))
        print(f"  {f:45s}  avg corner RGB: {avg}")
    
    print(f"\n{'='*60}")
    print(f"🔲 ALREADY TRANSPARENT ({len(transparent_bg)} images):")
    print(f"{'='*60}")
    for f in transparent_bg:
        print(f"  {f}")
    
    print(f"\n{'='*60}")
    print(f"⬛ DARK/OTHER BACKGROUND ({len(dark_bg)} images):")
    print(f"{'='*60}")
    for f in dark_bg:
        img = Image.open(os.path.join(MACHINES_DIR, f)).convert("RGBA")
        corners = get_corner_colors(img)
        avg = tuple(sum(c[i] for c in corners) // 4 for i in range(3))
        print(f"  {f:45s}  avg corner RGB: {avg}")

if __name__ == "__main__":
    main()
