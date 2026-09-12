"""Generate the Open Graph share image (1200x630).

Output: frontend/public/og-image.png
Run from backend/:  .venv\\Scripts\\python.exe scripts\\generate_og_image.py
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

WIDTH, HEIGHT = 1200, 630
NAVY_DARK = (7, 31, 61)
INDIGO_DARK = (30, 44, 102)
LEMON = (195, 230, 79)
SKY = (179, 217, 255)

OUT_PATH = Path(__file__).resolve().parent.parent.parent / "frontend" / "public" / "og-image.png"
FONT_DIR = Path("C:/Windows/Fonts")


def load_font(names: list[str], size: int) -> ImageFont.FreeTypeFont:
    for name in names:
        path = FONT_DIR / name
        if path.is_file():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default(size)


def build() -> None:
    image = Image.new("RGB", (WIDTH, HEIGHT))
    # Diagonal gradient teal -> deep blue
    for y in range(HEIGHT):
        for_row = y / HEIGHT
        row = Image.new("RGB", (WIDTH, 1))
        row_draw = ImageDraw.Draw(row)
        for x in range(0, WIDTH, 4):
            t = min(1.0, (x / WIDTH) * 0.5 + for_row * 0.5)
            color = tuple(round(a + (b - a) * t) for a, b in zip(NAVY_DARK, INDIGO_DARK))
            row_draw.rectangle([x, 0, x + 4, 1], fill=color)
        image.paste(row, (0, y))

    overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Faint dot grid
    for x in range(24, WIDTH, 30):
        for y in range(24, HEIGHT, 30):
            draw.ellipse([x - 1.5, y - 1.5, x + 1.5, y + 1.5], fill=(255, 255, 255, 14))

    # Catenary-style curves along the bottom
    for offset, alpha in ((70, 26), (40, 20), (10, 14)):
        points = []
        for x in range(0, WIDTH + 1, 24):
            t = (x % 600) / 600
            sag = 60 * (4 * t * (1 - t))
            points.append((x, HEIGHT - offset - 40 + sag))
        draw.line(points, fill=(255, 255, 255, alpha), width=2)

    image = Image.alpha_composite(image.convert("RGBA"), overlay)
    draw = ImageDraw.Draw(image)

    logo_path = Path(__file__).resolve().parent.parent.parent / "frontend" / "public" / "logo.png"
    if logo_path.is_file():
        logo = Image.open(logo_path).convert("RGBA")
        logo.thumbnail((240, 150), Image.Resampling.LANCZOS)
        pad_x, pad_y = 20, 14
        card = Image.new("RGBA", (logo.width + pad_x * 2, logo.height + pad_y * 2), (255, 255, 255, 255))
        card.paste(logo, (pad_x, pad_y), logo)
        image.paste(card, (64, 220), card)

    font_bold = load_font(["segoeuib.ttf", "arialbd.ttf"], 64)
    font_medium = load_font(["segoeui.ttf", "arial.ttf"], 30)
    font_italic = load_font(["segoeuii.ttf", "ariali.ttf"], 28)
    font_small = load_font(["segoeui.ttf", "arial.ttf"], 22)

    left = 430
    draw.rectangle([left, 158, left + 64, 165], fill=LEMON)
    draw.text((left, 190), "MASF & Partners", font=font_bold, fill=(255, 255, 255))
    draw.text((left, 268), "Limited", font=font_bold, fill=SKY)
    draw.text(
        (left, 366),
        "Environmental & Engineering Consultancy — Abuja",
        font=font_medium,
        fill=(255, 255, 255),
    )
    draw.text(
        (left, 416),
        '"Let our services be your advantage."',
        font=font_italic,
        fill=LEMON,
    )
    draw.text(
        (left, 520),
        "EIA studies  ·  33KV power  ·  ICT networks  ·  Safety systems",
        font=font_small,
        fill=SKY,
    )
    draw.text((left, 556), "RC 1161410  ·  Since 2013", font=font_small, fill=(150, 175, 205))

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    image.convert("RGB").save(OUT_PATH, "PNG", optimize=True)
    print(f"Wrote {OUT_PATH} ({OUT_PATH.stat().st_size / 1024:.0f} kB)")


if __name__ == "__main__":
    build()
