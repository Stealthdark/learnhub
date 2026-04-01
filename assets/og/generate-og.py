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
    """Try to load a clean system font with full Unicode support (arrows etc)."""
    # Prioritise fonts known to have full Unicode/arrow coverage
    candidates_bold = [
        "/Library/Fonts/Arial Unicode.ttf",
        "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
        "/System/Library/Fonts/HelveticaNeue-Bold.otf",
        "/Library/Fonts/Arial Bold.ttf",
        "/System/Library/Fonts/SFProText-Bold.otf",
        "/System/Library/Fonts/SFNS.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]
    candidates_reg = [
        "/Library/Fonts/Arial Unicode.ttf",
        "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
        "/System/Library/Fonts/HelveticaNeue.otf",
        "/Library/Fonts/Arial.ttf",
        "/System/Library/Fonts/SFProText-Regular.otf",
        "/System/Library/Fonts/SFNS.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
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

# ── Text metric helpers ────────────────────────────────────────
def text_width(draw, text, font):
    bbox = draw.textbbox((0, 0), text, font=font)
    return bbox[2] - bbox[0]

def text_height(draw, text, font):
    bbox = draw.textbbox((0, 0), text, font=font)
    return bbox[3] - bbox[1]

def text_offset_y(draw, text, font):
    """Top of the bounding box relative to origin (for trimming descent offset)."""
    bbox = draw.textbbox((0, 0), text, font=font)
    return bbox[1]

def center_text_y(draw, text, font, box_top, box_height):
    """Return Y so text is visually centered inside a box."""
    th = text_height(draw, text, font)
    off = text_offset_y(draw, text, font)
    return box_top + (box_height - th) // 2 - off

# ── UI element helpers ─────────────────────────────────────────
def rounded_rect(draw, x, y, w, h, r, fill=None, outline=None, outline_width=1):
    draw.rounded_rectangle([x, y, x + w, y + h], radius=r, fill=fill, outline=outline, width=outline_width)

def draw_logo_with_text(img, draw, x, y, size=80):
    paste_logo(img, x, y, size=size)
    font = load_font(28, bold=True)
    ty = center_text_y(draw, "LearnHubDev.com", font, y, size)
    draw.text((x + size + 14, ty), "LearnHubDev.com", font=font, fill=(255, 255, 255, 255))

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
    text_y = center_text_y(od, label, font, y, h_box)
    od.text((x + pw, text_y), label, font=font, fill=(r, g, b, 255))
    return overlay, w_box

def draw_badge(draw, img, x, y, text, bg_hex, color_hex, font):
    if bg_hex.startswith("rgba"):
        parts = bg_hex[5:-1].split(",")
        r, g, b = int(parts[0]), int(parts[1]), int(parts[2])
        alpha = int(float(parts[3]) * 255)
    else:
        r, g, b = hex_to_rgb(bg_hex)
        alpha = 50
    cr, cg, cb = hex_to_rgb(color_hex)
    tw = text_width(draw, text, font)
    badge_h = 32
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    rounded_rect(od, x, y, tw + 40, badge_h, 16, fill=(r, g, b, alpha))
    text_y = center_text_y(od, text, font, y, badge_h)
    od.text((x + 20, text_y), text, font=font, fill=(cr, cg, cb, 255))
    img.paste(overlay, mask=overlay)

def composite_pills(img, pills_data, base_x, base_y, font):
    x = base_x
    for label, color_hex in pills_data:
        overlay, w_box = draw_pill(ImageDraw.Draw(Image.new("RGBA", (1, 1))), x, base_y, label, font, color_hex)
        img.paste(overlay, mask=overlay)
        x += w_box + 12

def draw_enroll_button(img, draw, by, font, color_hex):
    """Draw enroll button with perfectly centered text."""
    btn_text = "Enroll Free \u2192"
    bx, bw, bh = 64, 220, 52
    r, g, b = hex_to_rgb(color_hex)
    draw.rounded_rectangle([bx, by, bx + bw, by + bh], radius=12, fill=(r, g, b))
    text_y = center_text_y(draw, btn_text, font, by, bh)
    draw.text((bx + 40, text_y), btn_text, font=font, fill="#ffffff")

# ── Card 0: Main Site ──────────────────────────────────────────
def make_card0():
    img = Image.new("RGB", (W, H), "#0d1b2e")
    draw_base(img, "#0d1b2e", "#0f2742", "#1a73e8")
    draw = ImageDraw.Draw(img, "RGBA")

    # Decorative concentric circles — top-right
    for radius in [160, 260]:
        draw.ellipse(
            [W - 80 - radius, 80 - radius, W - 80 + radius, 80 + radius],
            outline=(26, 115, 232, 38), width=2
        )

    # Logo + brand name
    draw_logo_with_text(img, draw, 64, 40, size=80)

    f84b = load_font(84, bold=True)
    f24  = load_font(24)
    f18b = load_font(18, bold=True)
    f16  = load_font(16)
    f15b = load_font(15, bold=True)

    # Badge
    draw_badge(draw, img, 64, 150, "Free Developer Courses", "rgba(26,115,232,0.2)", "#4d9fff", f18b)

    # Headline — 84px bold (significantly bolder than original 72px), 90px line steps
    draw.text((64, 204), "Structured", font=f84b, fill="#ffffff")
    draw.text((64, 296), "Learning", font=f84b, fill="#1a73e8")
    draw.text((64, 388), "Roadmaps.", font=f84b, fill="#ffffff")

    # Get true bottom of last headline line to anchor rule
    bb = draw.textbbox((0, 0), "Roadmaps.", font=f84b)
    headline_bottom = 388 + bb[3] - bb[1] + bb[1]  # y + (bbox_h) + top_offset
    rule_y = headline_bottom + 18

    # Accent rule
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.rectangle([64, rule_y, 64 + 64, rule_y + 3], fill=(26, 115, 232, 180))
    img.paste(overlay, mask=overlay)

    # Tagline (leave 20px gap after rule)
    tagline_y = rule_y + 22
    draw.text((64, tagline_y), "Free, self-paced developer courses built for real-world skills.", font=f24, fill=(255, 255, 255, 165))

    # Stats pills
    pills_y = tagline_y + 38
    stats = [("5 Courses", "#1a73e8"), ("200+ Lessons", "#0d9488"), ("100% Free Forever", "#7c3aed")]
    composite_pills(img, stats, 64, pills_y, f15b)

    # Footer — two-tone: label dimmer, URL brighter
    footer_y = H - 28
    left_text = "Crafted by Acute Circle \u00a9 2028  "
    right_text = "www.learnhubdev.com"
    seg_w = text_width(draw, left_text, f16)
    draw.text((64, footer_y), left_text, font=f16, fill=(255, 255, 255, 115))
    draw.text((64 + seg_w, footer_y), right_text, font=f16, fill=(255, 255, 255, 170))

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

    draw_badge(draw, img, 64, 152, "30-Day Roadmap", "rgba(34,197,94,0.2)", "#22c55e", f18b)

    draw.text((64, 204), "Node.js", font=f68b, fill="#ffffff")
    draw.text((64, 284), "Mastery", font=f68b, fill="#22c55e")
    draw.text((64, 364), "Build real-world APIs, CLIs & full-stack apps.", font=f26, fill=(255, 255, 255, 140))

    stats = [("30 Days", "#22c55e"), ("2-3 hrs/day", "#0ea5e9"), ("Intermediate", "#f59e0b")]
    composite_pills(img, stats, 64, 420, f16b)

    draw_enroll_button(img, draw, 478, f20b, "#22c55e")

    draw.text((64, 552), "learnhubdev.com", font=f17, fill=(255, 255, 255, 51))

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
    box_size = 52
    for i, (letter, color) in enumerate(phases):
        px = W - 60 - (len(phases) - i) * (box_size + 12)
        r, g, b = hex_to_rgb(color)
        overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        od = ImageDraw.Draw(overlay)
        rounded_rect(od, px, 40, box_size, box_size, 10, fill=(r, g, b, 0x30))
        lx = px + (box_size - text_width(od, letter, f26b)) // 2
        ly = center_text_y(od, letter, f26b, 40, box_size)
        od.text((lx, ly), letter, font=f26b, fill=(r, g, b, 255))
        img.paste(overlay, mask=overlay)

    draw_logo_with_text(img, draw, 64, 40, size=80)

    f60b = load_font(60, bold=True)
    f24 = load_font(24)
    f20b = load_font(20, bold=True)
    f17 = load_font(17)
    f15b = load_font(15, bold=True)
    f18b = load_font(18, bold=True)

    draw_badge(draw, img, 64, 152, "60-Day Roadmap", "rgba(249,115,22,0.2)", "#f97316", f18b)

    draw.text((64, 204), "Frontend", font=f60b, fill="#ffffff")
    draw.text((64, 278), "Mastery", font=f60b, fill="#f97316")
    draw.text((64, 352), "HTML · CSS · JavaScript — Zero to Production", font=f24, fill=(255, 255, 255, 128))

    phase_labels = [("HTML", "#e44d26"), ("CSS", "#4b7bff"), ("JavaScript", "#f7df1e")]
    composite_pills(img, phase_labels, 64, 408, f15b)

    draw_enroll_button(img, draw, 466, f20b, "#f97316")

    draw.text((64, 540), "learnhubdev.com", font=f17, fill=(255, 255, 255, 51))

    return img

# ── Card 3: SQL & MongoDB ──────────────────────────────────────
def make_card3():
    img = Image.new("RGB", (W, H), "#0a1a1b")
    draw_base(img, "#0a1a1b", "#0d2224", "#007b83")
    draw = ImageDraw.Draw(img, "RGBA")

    for radius in [180, 290]:
        draw.ellipse(
            [W - 70 - radius, H - 70 - radius, W - 70 + radius, H - 70 + radius],
            outline=(0, 180, 196, 28), width=2
        )

    draw_logo_with_text(img, draw, 64, 40, size=80)

    f68b = load_font(68, bold=True)
    f60b = load_font(60, bold=True)
    f26  = load_font(26)
    f20b = load_font(20, bold=True)
    f17  = load_font(17)
    f16b = load_font(16, bold=True)
    f18b = load_font(18, bold=True)

    draw_badge(draw, img, 64, 152, "20-Day Roadmap", "rgba(0,180,196,0.2)", "#00b4c4", f18b)

    draw.text((64, 204), "SQL &", font=f68b, fill="#ffffff")
    draw.text((64, 284), "MongoDB", font=f60b, fill="#00b4c4")
    draw.text((64, 358), "Relational + NoSQL — databases for developers.", font=f26, fill=(255, 255, 255, 140))

    stats = [("20 Days", "#00b4c4"), ("2 hrs/day", "#0ea5e9"), ("Beginner Friendly", "#f59e0b")]
    composite_pills(img, stats, 64, 414, f16b)

    draw_enroll_button(img, draw, 472, f20b, "#007b83")

    draw.text((64, 546), "learnhubdev.com", font=f17, fill=(255, 255, 255, 51))

    return img


# ── Card 4: AI-First Web Dev ───────────────────────────────────
def make_card4():
    img = Image.new("RGB", (W, H), "#1a0e00")
    draw_base(img, "#1a0e00", "#2b1600", "#e37400")
    draw = ImageDraw.Draw(img, "RGBA")

    cx, cy = int(W * 0.88), int(H * 0.15)
    for radius in [200, 320]:
        draw.ellipse(
            [cx - radius, cy - radius, cx + radius, cy + radius],
            outline=(243, 121, 0, 28), width=2
        )

    # Tech-stack indicators top-right: R (React), N (Next.js), AI
    f26b = load_font(26, bold=True)
    tech_boxes = [("R", "#61dbfb"), ("N", "#e2e8f0"), ("AI", "#e37400")]
    box_size = 52
    for i, (letter, color) in enumerate(tech_boxes):
        px = W - 60 - (len(tech_boxes) - i) * (box_size + 12)
        r, g, b = hex_to_rgb(color)
        overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        od = ImageDraw.Draw(overlay)
        rounded_rect(od, px, 40, box_size, box_size, 10, fill=(r, g, b, 0x28))
        lx = px + (box_size - text_width(od, letter, f26b)) // 2
        ly = center_text_y(od, letter, f26b, 40, box_size)
        od.text((lx, ly), letter, font=f26b, fill=(r, g, b, 255))
        img.paste(overlay, mask=overlay)

    draw_logo_with_text(img, draw, 64, 40, size=80)

    f60b = load_font(60, bold=True)
    f24  = load_font(24)
    f20b = load_font(20, bold=True)
    f17  = load_font(17)
    f15b = load_font(15, bold=True)
    f18b = load_font(18, bold=True)

    draw_badge(draw, img, 64, 152, "49-Day Roadmap", "rgba(227,116,0,0.2)", "#f97316", f18b)

    draw.text((64, 204), "AI-First", font=f60b, fill="#ffffff")
    draw.text((64, 278), "Web Dev", font=f60b, fill="#f97316")
    draw.text((64, 352), "React · Next.js · AI APIs — Zero to Production", font=f24, fill=(255, 255, 255, 128))

    phase_labels = [("React", "#61dbfb"), ("Next.js", "#e2e8f0"), ("AI APIs", "#f97316")]
    composite_pills(img, phase_labels, 64, 408, f15b)

    draw_enroll_button(img, draw, 466, f20b, "#e37400")

    draw.text((64, 540), "learnhubdev.com", font=f17, fill=(255, 255, 255, 51))

    return img


# ── Card 5: Smart Business Analyst Roadmap ─────────────────────
def make_card5():
    img = Image.new("RGB", (W, H), "#0a1a0d")
    draw_base(img, "#0a1a0d", "#0e2312", "#137333")
    draw = ImageDraw.Draw(img, "RGBA")

    for radius in [160, 260]:
        draw.ellipse(
            [80 - radius, H - 80 - radius, 80 + radius, H - 80 + radius],
            outline=(34, 197, 94, 28), width=2
        )

    draw_logo_with_text(img, draw, 64, 40, size=80)

    f60b = load_font(60, bold=True)
    f56b = load_font(56, bold=True)
    f24  = load_font(24)
    f20b = load_font(20, bold=True)
    f17  = load_font(17)
    f15b = load_font(15, bold=True)
    f18b = load_font(18, bold=True)

    draw_badge(draw, img, 64, 152, "Self-Paced Roadmap", "rgba(19,115,51,0.3)", "#22c55e", f18b)

    draw.text((64, 204), "Business", font=f60b, fill="#ffffff")
    draw.text((64, 278), "Analysis", font=f56b, fill="#22c55e")
    draw.text((64, 350), "Requirements · Agile · Stakeholders · Career", font=f24, fill=(255, 255, 255, 128))

    phase_labels = [("Requirements", "#22c55e"), ("Agile/Scrum", "#86efac"), ("Career", "#34d399")]
    composite_pills(img, phase_labels, 64, 406, f15b)

    draw_enroll_button(img, draw, 464, f20b, "#137333")

    draw.text((64, 538), "learnhubdev.com", font=f17, fill=(255, 255, 255, 51))

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

    card3 = make_card3()
    card3.save(os.path.join(BASE, "sql-mongodb-og.png"), "PNG")
    print("  ✓ sql-mongodb-og.png")

    card4 = make_card4()
    card4.save(os.path.join(BASE, "ai-first-webdev-og.png"), "PNG")
    print("  ✓ ai-first-webdev-og.png")

    card5 = make_card5()
    card5.save(os.path.join(BASE, "smart-ba-og.png"), "PNG")
    print("  ✓ smart-ba-og.png")

    print("Done.")
