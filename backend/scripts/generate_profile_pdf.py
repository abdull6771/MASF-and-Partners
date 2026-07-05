"""Generate the downloadable company profile PDF.

Output: frontend/public/downloads/MASF-Partners-Company-Profile.pdf
Run from backend/:  .venv\\Scripts\\python.exe scripts\\generate_profile_pdf.py
Re-run whenever company facts change (content mirrors frontend/src/data/content.js).
"""
from __future__ import annotations

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

TEAL = colors.HexColor("#0e3f3b")
TEAL_DARK = colors.HexColor("#062a27")
SEA = colors.HexColor("#16405c")
AMBER = colors.HexColor("#f59e0b")
SLATE = colors.HexColor("#334155")
SLATE_LIGHT = colors.HexColor("#64748b")
LINE = colors.HexColor("#d7e3e0")

OUT_PATH = (
    Path(__file__).resolve().parent.parent.parent
    / "frontend"
    / "public"
    / "downloads"
    / "MASF-Partners-Company-Profile.pdf"
)

body = ParagraphStyle("body", fontName="Helvetica", fontSize=9.5, leading=14, textColor=SLATE)
bullet = ParagraphStyle("bullet", parent=body, leftIndent=10, bulletIndent=0)
h2 = ParagraphStyle(
    "h2", fontName="Helvetica-Bold", fontSize=13, leading=17, textColor=TEAL, spaceBefore=14, spaceAfter=6
)
h3 = ParagraphStyle(
    "h3", fontName="Helvetica-Bold", fontSize=10.5, leading=14, textColor=SEA, spaceBefore=8, spaceAfter=3
)
small = ParagraphStyle("small", parent=body, fontSize=8, leading=11, textColor=SLATE_LIGHT)
center_small = ParagraphStyle("center_small", parent=small, alignment=TA_CENTER)

SERVICES = {
    "Environmental Consultancy": [
        "Environmental Impact Assessment (EIA)",
        "Environmental auditing",
        "Energy & power audits",
        "Ecological investigations of energy facility operations",
        "New & renewable energy resource analyses",
        "Cleaning, waste management & fumigation services",
        "Water treatment plants — feasibility, design, procurement, construction, maintenance & training",
    ],
    "Electrical & Mechanical Engineering": [
        "Installation of power/distribution transformers & switchgear",
        "Electro-mechanical wiring of buildings",
        "Sales, maintenance & repair of transformers, panels & switchgear",
        "Power system reliability analyses",
        "33KV overhead line construction",
    ],
    "ICT & Telecommunications": [
        "Computer networking & IT systems",
        "VSAT satellite equipment installation",
        "Wireless broadband, WiFi & point-to-point antenna links",
        "Walkie-talkie radio installation & maintenance",
        "PABX/IPBX intercom & telephone systems for hotels and offices",
    ],
    "Safety & Security": [
        "CCTV & security equipment installation and maintenance (incl. operator training)",
        "Fire & safety equipment installation",
        "Project management",
    ],
}

PROJECTS = [
    ("2006", "7.4km 33KV overhead line — Capital Science Academy", "Kuje, FCT"),
    ("2006", "Transformer relocation & 33KV conversion (500kVA & 300kVA)", "Kuje, FCT"),
    ("2006", "33KV line & 500kVA substation — Oando Aviation Depot", "Abuja Int'l Airport"),
    ("2008", "Electrical upgrade — Oando Station & Chicken Republic", "Wuse, Abuja"),
    ("2009", "LNG plant & accessories — six Oando stations", "Wuse I-V & Kubwa"),
    ("2014", "Wireless broadband — Nigerian Army Training Centre (NATRAC)", "Kontagora Barracks"),
    ("2014", "Broadband internet — US Army internship training", "Jaji & Kontagora"),
    ("2014-15", "Hotel intercom (40 ext.), wireless CCTV + training, VSAT with WiFi", "Niger State"),
]

EQUIPMENT = [
    "GrayWolf AdvancedSense environmental meter — VOCs, CO2, CO, O3, NH3, H2S, NO/NO2, SO2 and more",
    "GrayWolf 6-channel handheld particle counters — PM0.5-PM10 & TSP",
    "Mobile water quality laboratory (WHO/UNICEF field standard)",
    "UAV/drone for aerial survey",
    "Multifunction environment meter — sound, light, humidity, temperature",
    "BOD testing equipment",
    "RF spectrum & EMF analyser with ICNIRP exposure calculations",
]

COMPLIANCE = [
    ("CAC Certificate of Incorporation", "RC 1161410 - issued 23 Dec 2013"),
    ("FIRS Tax Clearance Certificate", "Current - valid to 31 Dec 2026"),
    ("NSITF ECS Clearance", "Valid to 31 Dec 2026"),
    ("PENCOM Pension Clearance Certificate", "Valid to 31 Dec 2026"),
    ("ITF Certificate of Compliance", "Valid to 31 Dec 2026"),
    ("BPP Interim Registration Report", "Registered contractor"),
    ("NEMSA Corporate Certificate", "Certified for electrical works"),
    ("COREN-registered leadership", "MD registered R.15,129 - since 2008"),
]

LEADERSHIP = [
    "Engr. Mukhtar Ado, MNSE, MIEEE, MCIA — Chairman/Managing Director (COREN R.15,129)",
    "Engr. A. M. Lawal — Director",
    "Alh. Umar Usman — Director",
    "Engr. A. M. Ganda — Director",
    "Mal. Abdu A. Sule — Director",
    "Arc. Sanusi Idriss — Director",
    "Bar. U. Dikko — Company Secretary",
]


def on_page(canvas, doc):
    canvas.saveState()
    width, height = A4
    # Header band
    canvas.setFillColor(TEAL_DARK)
    canvas.rect(0, height - 26 * mm, width, 26 * mm, stroke=0, fill=1)
    canvas.setFillColor(colors.white)
    canvas.setFont("Helvetica-Bold", 16)
    canvas.drawString(18 * mm, height - 14 * mm, "MASF & PARTNERS LIMITED")
    canvas.setFillColor(AMBER)
    canvas.setFont("Helvetica-Oblique", 9.5)
    canvas.drawString(18 * mm, height - 20 * mm, '"Let our services be your advantage."')
    canvas.setFillColor(colors.HexColor("#ade4da"))
    canvas.setFont("Helvetica", 7.5)
    canvas.drawRightString(width - 18 * mm, h_pos := height - 12 * mm, "Environmental & Engineering Consultancy")
    canvas.drawRightString(width - 18 * mm, h_pos - 5 * mm, "Wuse II, Abuja - RC 1161410")
    # Footer
    canvas.setFillColor(SLATE_LIGHT)
    canvas.setFont("Helvetica", 7.5)
    canvas.drawString(18 * mm, 10 * mm, "MASF & Partners Limited - RC 1161410 - masfpartnerslimited@gmail.com")
    canvas.drawRightString(width - 18 * mm, 10 * mm, f"Page {doc.page}")
    canvas.restoreState()


def build() -> None:
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUT_PATH),
        pagesize=A4,
        topMargin=34 * mm,
        bottomMargin=18 * mm,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        title="MASF & Partners Limited — Company Profile",
        author="MASF & Partners Limited",
        subject="Company profile: environmental & engineering consultancy, Abuja, Nigeria",
    )

    story = []

    story.append(Paragraph("Company Profile", ParagraphStyle(
        "title", fontName="Helvetica-Bold", fontSize=19, leading=23, textColor=TEAL)))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "MASF & Partners Limited is an environmental and engineering consultancy established in 2013 "
        "and incorporated with the Corporate Affairs Commission (RC 1161410). From our head office in "
        "Wuse II, Abuja, we deliver environmental assessment, power infrastructure, ICT networks and "
        "safety systems for government ministries and agencies, industry, hotels, hospitals and "
        "corporate offices — one accountable firm across four disciplines.", body))

    story.append(Paragraph("Vision & Mission", h2))
    story.append(Paragraph(
        "<b>Vision.</b> To be among the top environmental and engineering consulting companies in Nigeria.", body))
    story.append(Spacer(1, 3))
    story.append(Paragraph(
        "<b>Mission.</b> Satisfy clients by providing the best value; commit to quality, safety and "
        "environmental excellence — promoting leadership and teamwork; deliver consistently high "
        "standards of service.", body))
    story.append(Spacer(1, 3))
    story.append(Paragraph(
        "<b>Core values.</b> Integrity, honesty & ethical business - Professionalism - High performance - "
        "Respect for the individual and personal growth.", body))

    story.append(Paragraph("Services", h2))
    for pillar, items in SERVICES.items():
        story.append(Paragraph(pillar, h3))
        for item in items:
            story.append(Paragraph(item, bullet, bulletText="•"))

    story.append(Paragraph("Selected Track Record", h2))
    table_data = [["Year", "Project", "Location"]] + [list(row) for row in PROJECTS]
    table = Table(table_data, colWidths=[18 * mm, 100 * mm, 52 * mm], repeatRows=1)
    table.setStyle(TableStyle([
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 8),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("BACKGROUND", (0, 0), (-1, 0), TEAL),
        ("TEXTCOLOR", (0, 1), (-1, -1), SLATE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f0f7f5")]),
        ("GRID", (0, 0), (-1, -1), 0.4, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    story.append(table)
    story.append(Spacer(1, 3))
    story.append(Paragraph(
        "Engagements from 2006-2009 were delivered by the firm's principals prior to incorporation "
        "and are presented as part of the team's track record.", small))

    story.append(Paragraph("In-House Field Instrumentation", h2))
    for item in EQUIPMENT:
        story.append(Paragraph(item, bullet, bulletText="•"))

    story.append(Paragraph("Compliance & Registrations", h2))
    comp_table = Table(
        [[Paragraph(f"<b>{name}</b>", body), Paragraph(status, body)] for name, status in COMPLIANCE],
        colWidths=[88 * mm, 82 * mm],
    )
    comp_table.setStyle(TableStyle([
        ("GRID", (0, 0), (-1, -1), 0.4, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
    ]))
    story.append(comp_table)

    story.append(Paragraph("Board of Directors", h2))
    for person in LEADERSHIP:
        story.append(Paragraph(person, bullet, bulletText="•"))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "<b>Team strength (Abuja).</b> 4 electrical engineers - 3 mechanical engineers - 1 civil engineer - "
        "1 architect - 5 computer/communication technologists - 12 electricians - 1 accountant - "
        "4 administrative staff - 2 drivers. A 14-specialist environmental expert panel covers QA, "
        "GIS/meteorology, health, microbiology, chemistry, ecology, geology, soil science, waste "
        "management, air quality & noise, socio-economics, power systems and estate valuation.", body))

    story.append(Paragraph("Contact", h2))
    story.append(HRFlowable(width="100%", thickness=0.8, color=AMBER))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Suite B21, Business Plaza (formerly Fanaha Plaza), Behind AP Plaza, Wuse II, Abuja, Nigeria<br/>"
        "P.O. Box 739, Kubwa, Abuja, FCT<br/>"
        "Phone: 0903 818 7814 - 0805 940 5483 - 0818 718 9622<br/>"
        "Email: masfpartnerslimited@gmail.com<br/>"
        "Banker: Jaiz Bank Plc, Opposite Wuse Market, Abuja", body))

    doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
    print(f"Wrote {OUT_PATH} ({OUT_PATH.stat().st_size / 1024:.0f} kB)")


if __name__ == "__main__":
    build()
