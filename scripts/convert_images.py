"""One-shot PNG -> WebP converter for landing assets.

Resizes reactions.png down from 1227x2529 (the carousel renders it at max
448px wide on 2x retina) and re-encodes every other PNG at quality 85 with
near-lossless alpha. Source PNGs are deleted after conversion succeeds.
"""
import os
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / "src" / "assets" / "images"

# (relative_path, quality, optional max_width_for_resize)
JOBS = [
    ("backgrounds/hero-bg.png",        78, None),
    ("backgrounds/money_bg.png",       82, None),
    ("features/memory.png",            85, None),
    ("features/event.png",             85, None),
    ("features/expense-card.png",      85, None),
    ("features/expenses.png",          85, None),
    ("features/reactions.png",         85, 600),  # 224px render * 2.7 DPR
]

def discover_remaining():
    """Avatars + floating + anything else: just convert at quality 85."""
    for sub in ("avatars", "floating"):
        for p in (IMG / sub).glob("*.png"):
            yield (p.relative_to(IMG).as_posix(), 85, None)

def convert(rel, quality, max_w):
    src = IMG / rel
    if not src.exists():
        print(f"skip (missing): {rel}")
        return
    dst = src.with_suffix(".webp")
    im = Image.open(src)
    if im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGBA")
    if max_w and im.size[0] > max_w:
        ratio = max_w / im.size[0]
        new_size = (max_w, round(im.size[1] * ratio))
        im = im.resize(new_size, Image.LANCZOS)
        print(f"resized {rel} -> {new_size}")
    im.save(dst, "WEBP", quality=quality, method=6)
    src_size = src.stat().st_size
    dst_size = dst.stat().st_size
    src.unlink()
    pct = 100 * (1 - dst_size / src_size)
    print(f"{rel}: {src_size//1024}K -> {dst_size//1024}K  (-{pct:.0f}%)")

def main():
    seen = set()
    for rel, q, mw in JOBS:
        convert(rel, q, mw)
        seen.add(rel)
    for rel, q, mw in discover_remaining():
        if rel in seen:
            continue
        convert(rel, q, mw)

if __name__ == "__main__":
    main()
