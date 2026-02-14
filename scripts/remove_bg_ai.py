#!/usr/bin/env python3
"""
Use AI-based background removal (rembg) - FAST MODE (u2netp)
"""

import os
import sys
from PIL import Image

# Try to import rembg
try:
    from rembg import remove, new_session
except ImportError:
    print("❌ 'rembg' library not found.")
    sys.exit(1)

MACHINES_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "machines")

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

def main():
    print("🚀 Starting AI background removal (FAST MODE: u2netp)...")
    
    # Use lightweight model for speed
    session = new_session("u2netp")
    
    processed = 0
    for fname in WHITE_BG_FILES:
        src_path = os.path.join(MACHINES_DIR, fname)
        if not os.path.exists(src_path):
            continue
            
        print(f"Processing: {fname}...", end="", flush=True)
        try:
            img = Image.open(src_path).convert("RGBA")
            # alpha_matting=False for speed
            output = remove(img, session=session, alpha_matting=False)
            output.save(src_path, "WEBP", quality=90)
            print(" ✅ Done")
            processed += 1
        except Exception as e:
            print(f" ❌ Error: {e}")

    print(f"\n✨ DONE! Processed {processed}/{len(WHITE_BG_FILES)} images.")

if __name__ == "__main__":
    main()
