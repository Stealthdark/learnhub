#!/usr/bin/env python3
"""Generate OG images for LearnHub with the real brand logo."""

import math
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

BASE = os.path.dirname(os.path.abspath(__file__))
LOGO_PATH = os.path.join(BASE, "logo", "learnhub-logo.png")
W, H = 1200, 630

# ── Font helpers ───────────────────────────────────────────────
def load_font(size, bold=False):
    """Try to load a clean system font, fallback to default."""
    candidates_bold = [
        "/System/Library/Fonts/HelveticaNeue-Bold.otf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/Library/Fonts/Arial Bold.ttf",
        "/System/Library/Fonts/SFProText-Bold.otf",
        "/System/Library/Fonts/SFNS.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    ]
    candidates_reg = [
        "/System/Library/Fonts/HelveticaNeue.otf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/Library/Fonts/Arial.ttf",
        "/System/Library/Fonts/SFProText-Regular.otf",
        "/System/Library/Fonts/SFNS.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
    ]
    candidates = candidates_bold if bold else candidates_reg
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    return ImageFont.load_default()

# ── Drawing helpers ────────────────────────────────────────────
def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def linear_gradient(img, color1, color2, horizontal=True):
    """Fill img with a left-to-right (or top-to-bottom) gradient."""
    draw = ImageDraw.Draw(img)
    r1, g1, b1 = hex_to_rgb(color1)
    r2, g2, b2 = hex_to_rgb(color2)
    steps = W if horizontal else H
    for i in range(steps):
        t = i / (steps - 1)
        r = int(r1 + (r2 - r1) * t)
        g = int(g1 + (g2 - g1) * t)
        b = int(b1 + (b2 - b1) * t)
        if horizontal:
            draw.line([(i, 0), (i, H)], fill=(r, g, b))
        else:
            draw.line([(0, i), (W, i)], fill=(r, g, b))

def radial_glow(img, cx, cy, radius, color_hex, alpha_center=80):
    """Overlay a radial glow on img (in-place)."""
    r, g, b = hex_to_rgb(color_hex)
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    for px in range(max(0, cx - radius), min(W, cx + radius)):
        for py in range(max(0, cy - radius), min(H, cy + radius)):
            dist = math.sqrt((px - cx) ** 2 + (py - cy) ** 2)
            if dist < radius:
                a = int(alpha_center * (1 - dist / radius) ** 1.5)
                glow.putpixel((px, py), (r, g, b, a))
    img.paste(glow, mask=glow)

def grid_overlay(draw, alpha=10):
    color = (255, 255, 255, alpha)
    for x in range(0, W + 1, 60):
        draw.line([(x, 0), (x, H)], fill=color, width=1)
    for y in range(0, H + 1, 60):
        draw.line([(0, y), (W, y)], fill=color, width=1)

def draw_base(img, bg_start, bg_end, accent):
    linear_gradient(img, bg_start, bg_end)
    # Glows — use downsampled approach for speed
    cx1, cy1 = int(W * 0.88), int(H * 0.12)
    cx2, cy2 = int(W * 0.08), int(H * 0.88)
    radial_glow(img, cx1, cy1, 320, accent, alpha_center=55)
    radial_glow(img, cx2, cy2, 200, accent, alpha_center=30)
    draw = ImageDraw.Draw(img, "RGBA")
    grid_overlay(draw)

def paste_logo(img, x, y, size=80):
    logo = Image.open(LOGO_PATH).convert("RGBA")
    logo = logo.resize((size, size), Image.LANCZOS)
    img.paste(logo, (x, y), mask=logo)

def draw_logo_with_text(img, draw, x, y, size=80):
    paste_logo(img, x, y, size=size)
    font = load_font(28, bold=True)
    ty = y + (size - 28) // 2
    draw.text((x + size + 14, ty), "LearnHubDev.com", font=font, fill=(255, 255, 255, 255))

def draw_text(draw, text, x, y, font, color):
    draw.text((x, y), text, font=font, fill=color)

def text_width(draw, text, font):
    bbox = draw.textbbox((0, 0), text, font=font)
    return bbox[2] - bbox[0]

def rounded_rect(draw, x, y, w, h, r, fill=None, outline=None, outline_width=1):
    draw.rounded_rectangle([x, y, x + w, y + h], radius=r, fill=fill, outline=outline, width=outline_width)

def draw_pill(draw, x, y, label, font, color_hex, bg_opacity=0x28):
    r, g, b = hex_to_rgb(color_hex)
    tw = text_width(draw, label, font)
    pw = 16
    w_box = tw + pw * 2
    h_box = 36
    fill = (r, g, b, bg_opacity)
    outline = (r, g, b, 0x55)
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    rounded_rect(od, x, y, w_box, h_box, 18, fill=fill)
    rounded_rect(od, x, y, w_box, h_box, 18, outline=outline, outline_width=1)
    od.text((x + pw, y + 7), label, font=font, fill=(r, g, b, 255))
    return overlay, w_box

def draw_badge(draw, img, x, y, text, bg_hex, color_hex, font):
    # Parse simple rgba string like "rgba(34,197,94,0.2)"
    if bg_hex.startswith("rgba"):
        parts = bg_hex[5:-1].split(",")
        r, g, b = int(parts[0]), int(parts[1]), int(parts[2])
        alpha = int(float(parts[3]) * 255)
    else:
        r, g, b = hex_to_rgb(bg_hex)
        alpha = 50
    cr, cg, cb = hex_to_rgb(color_hex)
    tw = text_width(draw, text, font)
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    rounded_rect(od, x, y - 10, tw + 40, 32, 16, fill=(r, g, b, alpha))
    od.text((x + 20, y - 6), text, font=font, fill=(cr, cg, cb, 255))
    img.paste(overlay, mask=overlay)

def composite_pills(img, pills_data, base_x, base_y, font):
    x = base_x
    for label, color_hex in pills_data:
        overlay, w_box = draw_pill(ImageDraw.Draw(Image.new("RGBA", (1, 1))), x, base_y, label, font, color_hex)
        img.paste(overlay, mask=overlay)
        x += w_box + 12

# ── Card 0: Main Site ──────────────────────────────────────────
def make_card0():
    img = Image.new("RGB", (W, H), "#0d1b2e")
    draw_base(img, "#0d1b2e", "#0f2742", "#1a73e8")
    draw = ImageDraw.Draw(img, "RGBA")

    # Decorative circles
    for radius in [160, 260]:
        draw.ellipse(
            [W - 80 - radius, 80 - radius, W - 80 + radius, 80 + radius],
            outline=(26, 115, 232, 38), width=2
        )

    # Logo
    draw_logo_with_text(img, draw, 64, 44, size=80)

    # Headline
    f72b = load_font(72, bold=True)
    f24 = load_font(24)
    f18 = load_font(18)
    f16b = load_font(16, bold=True)

    draw.text((64, 200), "Professional", font=f72b, fill="#ffffff")
    draw.text((64, 285), "E-Learning", font=f72b, fill="#1a73e8")
    draw.text((64, 370), "Platform.", font=f72b, fill="#ffffff")
    draw.text((64, 458), "Master programming with structured roadmaps.", font=f24, fill=(255, 255, 255, 153))

    # Pills
    stats = [("Various Courses", "#1a73e8"), ("Self Paced Learning", "#0d9488"), ("Limited Slots", "#7c3aed")]
    composite_pills(img, stats, 64, 508, f16b)

    # Footer
    draw.text((64, 592), "Crafted by Harshit | © learnhub.dev", font=f18, fill=(255, 255, 255, 64))

    return img

# ── Card 1: Node.js Course ─────────────────────────────────────
def make_card1():
    img = Image.new("RGB", (W, H), "#0d1f12")
    draw_base(img, "#0d1f12", "#0a2517", "#22c55e")
    draw = ImageDraw.Draw(img, "RGBA")

    for radius in [200, 310]:
        draw.ellipse(
            [W - 60 - radius, H - 60 - radius, W - 60 + radius, H - 60 + radius],
            outline=(34, 197, 94, 30), width=2
        )

    draw_logo_with_text(img, draw, 64, 40, size=80)

    f68b = load_font(68, bold=True)
    f26 = load_font(26)
    f20b = load_font(20, bold=True)
    f17 = load_font(17)
    f16b = load_font(16, bold=True)
    f18b = load_font(18, bold=True)

    draw_badge(draw, img, 64, 162, "30-Day Roadmap", "rgba(34,197,94,0.2)", "#22c55e", f18b)

    draw.text((64, 230), "Node.js", font=f68b, fill="#ffffff")
    draw.text((64, 310), "Mastery", font=f68b, fill="#22c55e")
    draw.text((64, 382), "Build real-world APIs, CLIs & full-stack apps.", font=f26, fill=(255, 255, 255, 140))

    stats = [("30 Days", "#22c55e"), ("2–3 hrs/day", "#0ea5e9"), ("Beginner Friendly", "#f59e0b")]
    composite_pills(img, stats, 64, 468, f16b)

    # Enroll button
    draw2 = ImageDraw.Draw(img)
    draw2.rounded_rectangle([64, 530, 64 + 220, 530 + 52], radius=12, fill="#22c55e")
    draw2.text((64 + 40, 544), "Enroll Free →", font=f20b, fill="#ffffff")

    draw.text((64, 600), "learnhub.dev", font=f17, fill=(255, 255, 255, 51))

    return img

# ── Card 2: Frontend Roadmap ───────────────────────────────────
def make_card2():
    img = Image.new("RGB", (W, H), "#1a0f00")
    draw_base(img, "#1a0f00", "#2a1500", "#f97316")
    draw = ImageDraw.Draw(img, "RGBA")

    cx, cy = int(W * 0.9), int(H * 0.15)
    for radius in [200, 320]:
        draw.ellipse([cx - radius, cy - radius, cx + radius, cy + radius],
                     outline=(249, 115, 22, 25), width=2)

    # Phase indicators top-right
    phases = [("H", "#e44d26"), ("C", "#4b7bff"), ("J", "#f7df1e")]
    f26b = load_font(26, bold=True)
    for i, (letter, color) in enumerate(phases):
        px = W - 200 + i * 70
        r, g, b = hex_to_rgb(color)
        overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        od = ImageDraw.Draw(overlay)
        rounded_rect(od, px, 40, 52, 52, 10, fill=(r, g, b, 0x30))
        od.text((px + 26 - text_width(od, letter, f26b) // 2, 50), letter, font=f26b, fill=(r, g, b, 255))
        img.paste(overlay, mask=overlay)

    draw_logo_with_text(img, draw, 64, 40, size=80)

    f60b = load_font(60, bold=True)
    f24 = load_font(24)
    f20b = load_font(20, bold=True)
    f17 = load_font(17)
    f15b = load_font(15, bold=True)
    f18b = load_font(18, bold=True)

    draw_badge(draw, img, 64, 162, "60-Day Roadmap", "rgba(249,115,22,0.2)", "#f97316", f18b)

    draw.text((64, 228), "Frontend", font=f60b, fill="#ffffff")
    draw.text((64, 304), "Mastery", font=f60b, fill="#f97316")
    draw.text((64, 374), "HTML · CSS · JavaScript — Zero to Production", font=f24, fill=(255, 255, 255, 128))

    # Phase pills
    phase_labels = [("HTML", "#e44d26"), ("CSS", "#4b7bff"), ("JavaScript", "#f7df1e")]
    composite_pills(img, phase_labels, 64, 438, f15b)

    # Enroll button
    draw2 = ImageDraw.Draw(img)
    draw2.rounded_rectangle([64, 500, 64 + 220, 500 + 52], radius=12, fill="#f97316")
    draw2.text((64 + 40, 514), "Enroll Free →", font=f20b, fill="#ffffff")

    draw.text((64, 568), "learnhub.dev", font=f17, fill=(255, 255, 255, 51))

    return img

# ── Main ───────────────────────────────────────────────────────
if __name__ == "__main__":
    print("Generating OG images...")

    card0 = make_card0()
    card0.save(os.path.join(BASE, "learnhub-og.png"), "PNG")
    print("  ✓ learnhub-og.png")

    card1 = make_card1()
    card1.save(os.path.join(BASE, "nodejs-og.png"), "PNG")
    print("  ✓ nodejs-og.png")

    card2 = make_card2()
    card2.save(os.path.join(BASE, "frontend-og.png"), "PNG")
    print("  ✓ frontend-og.png")

    print("Done.")
