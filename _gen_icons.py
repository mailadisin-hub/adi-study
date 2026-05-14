"""Generate PWA icons. Run once: python _gen_icons.py"""
from PIL import Image, ImageDraw, ImageFont
import os

OUT = os.path.dirname(os.path.abspath(__file__))

def make_icon(size, maskable=False):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # Background: solid dark with rounded corners (or full bleed for maskable)
    if maskable:
        # Maskable: full bleed background, content in inner 80%
        d.rectangle([0, 0, size, size], fill=(10, 0, 0, 255))
        pad = int(size * 0.10)
    else:
        # Normal: rounded square
        r = int(size * 0.22)
        d.rounded_rectangle([0, 0, size - 1, size - 1], radius=r, fill=(10, 0, 0, 255))
        pad = int(size * 0.06)

    # Accent ring
    ring_pad = pad + int(size * 0.05)
    d.ellipse(
        [ring_pad, ring_pad, size - ring_pad, size - ring_pad],
        outline=(255, 68, 34, 60),
        width=max(2, size // 200)
    )

    # Big "A" — try a few font candidates
    font = None
    candidates = [
        "C:/Windows/Fonts/ariblk.ttf",
        "C:/Windows/Fonts/arialbd.ttf",
        "C:/Windows/Fonts/Arial.ttf",
    ]
    target_size = int((size - 2 * pad) * 0.78)
    for path in candidates:
        if os.path.exists(path):
            try:
                font = ImageFont.truetype(path, target_size)
                break
            except Exception:
                continue
    if font is None:
        font = ImageFont.load_default()

    text = "A"
    bbox = d.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    x = (size - tw) // 2 - bbox[0]
    y = (size - th) // 2 - bbox[1] - int(size * 0.04)

    # Subtle drop shadow
    shadow_off = max(1, size // 80)
    d.text((x + shadow_off, y + shadow_off), text, font=font, fill=(0, 0, 0, 180))
    # Main fill
    d.text((x, y), text, font=font, fill=(255, 68, 34, 255))

    # "STUDY" caption
    cap_size = int(size * 0.07)
    cap_font = None
    for path in ["C:/Windows/Fonts/arialbd.ttf", "C:/Windows/Fonts/Arial.ttf"]:
        if os.path.exists(path):
            try:
                cap_font = ImageFont.truetype(path, cap_size)
                break
            except Exception:
                continue
    if cap_font is None:
        cap_font = ImageFont.load_default()
    caption = "STUDY"
    cbbox = d.textbbox((0, 0), caption, font=cap_font)
    cw = cbbox[2] - cbbox[0]
    cx = (size - cw) // 2 - cbbox[0]
    cy = size - pad - cap_size - int(size * 0.03)
    d.text((cx, cy), caption, font=cap_font, fill=(170, 136, 136, 255))

    return img

# Standard PWA icon sizes
for size in (192, 512):
    img = make_icon(size, maskable=False)
    img.save(os.path.join(OUT, f"icon-{size}.png"), "PNG")
    print(f"Wrote icon-{size}.png")

# Maskable version (Android adaptive icons)
mask = make_icon(512, maskable=True)
mask.save(os.path.join(OUT, "icon-maskable-512.png"), "PNG")
print("Wrote icon-maskable-512.png")
