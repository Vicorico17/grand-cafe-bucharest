from html import escape
from pathlib import Path
import json


ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "public/menu/menu-data.json"
OUT_PATH = ROOT / "public/menu/grand-cafe-bucharest-menu-print.html"


def render_item(item):
    name = escape(item.get("name", ""))
    weight = escape(item.get("weight", ""))
    price = escape(item.get("price", ""))
    description = escape(item.get("description", ""))
    ingredients = escape(item.get("ingredients", ""))

    return f"""
      <article class="item">
        <div class="item-row">
          <h3>{name}{f' <span>{weight}</span>' if weight else ''}</h3>
          <strong>{price} lei</strong>
        </div>
        {f'<p class="description">{description}</p>' if description else ''}
        {f'<p class="ingredients">{ingredients}</p>' if ingredients else ''}
      </article>
    """


def render_section(section):
    items = "\n".join(render_item(item) for item in section["items"])
    return f"""
      <section class="menu-section">
        <h2>{escape(section["title"])}</h2>
        {items}
      </section>
    """


def render_group(title, sections, include_divider=True):
    rendered_sections = "\n".join(render_section(section) for section in sections)
    divider = ""
    if include_divider:
        divider = f"""
      <section class="divider">
        <div class="photo-frame small"></div>
        <p>{escape(title)}</p>
        <h1>{escape("Grand Cafe Bucharest")}</h1>
      </section>
        """
    return f"""
      {divider}
      <section class="group">
        <h1>{escape(title)}</h1>
        <div class="columns">
          {rendered_sections}
        </div>
      </section>
    """


def main():
    data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    html = f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Grand Cafe Bucharest Menu</title>
  <style>
    @page {{
      size: 186mm 251mm;
      margin: 0;
      background: #fbf8f0;
    }}

    * {{
      box-sizing: border-box;
    }}

    body {{
      margin: 0;
      color: #1f1a16;
      background: #fbf8f0;
      font-family: Georgia, "Times New Roman", serif;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}

    .cover {{
      position: relative;
      display: grid;
      min-height: 251mm;
      place-items: center;
      text-align: center;
      break-after: page;
      padding: 24mm 22mm;
      overflow: hidden;
      background: #fbf8f0;
    }}

    .cover::before,
    .cover::after,
    .divider::before,
    .divider::after {{
      position: absolute;
      color: rgba(155, 116, 76, .24);
      font: italic 74px Georgia, "Times New Roman", serif;
      line-height: 1;
      content: "S";
    }}

    .cover::before,
    .divider::before {{
      top: 7mm;
      left: 7mm;
      transform: rotate(-18deg);
    }}

    .cover::after,
    .divider::after {{
      right: 7mm;
      bottom: 5mm;
      transform: rotate(162deg);
    }}

    .cover-inner,
    .divider > * {{
      position: relative;
      z-index: 1;
    }}

    .photo-frame {{
      display: grid;
      place-items: center;
      margin: 0 auto 18mm;
      background:
        linear-gradient(rgba(31, 26, 22, .08), rgba(31, 26, 22, .08)),
        linear-gradient(90deg, rgba(155, 116, 76, .08) 1px, transparent 1px),
        linear-gradient(0deg, rgba(155, 116, 76, .08) 1px, transparent 1px),
        #d8cfc0;
      background-size: 9mm 9mm;
    }}

    .photo-frame.large {{
      width: 122mm;
      height: 64mm;
    }}

    .photo-frame.small {{
      width: 112mm;
      height: 56mm;
      margin-bottom: 14mm;
    }}

    .cover p {{
      margin: 0 0 18px;
      color: #8f6d45;
      font: 700 12px Arial, sans-serif;
      letter-spacing: .22em;
      text-transform: uppercase;
    }}

    .cover h1 {{
      margin: 0;
      color: #9b744c;
      font-size: 46px;
      font-weight: 400;
      line-height: 1.05;
      text-transform: uppercase;
    }}

    .cover h1 span {{
      display: block;
    }}

    .divider {{
      position: relative;
      display: grid;
      min-height: 251mm;
      place-items: center;
      align-content: center;
      text-align: center;
      break-before: page;
      break-after: page;
      padding: 24mm 22mm;
      overflow: hidden;
      background: #fbf8f0;
    }}

    .divider p {{
      margin: 0 0 6mm;
      color: #8f6d45;
      font: 700 12px Arial, sans-serif;
      letter-spacing: .24em;
      text-transform: uppercase;
    }}

    .divider h1 {{
      margin: 0;
      color: #9b744c;
      font-size: 36px;
      font-weight: 400;
      letter-spacing: .08em;
      line-height: 1.05;
      text-transform: uppercase;
    }}

    .group {{
      min-height: 251mm;
      padding: 12mm 11mm;
      background: #fbf8f0;
      break-after: page;
    }}

    .group h1 {{
      margin: 0 0 8mm;
      color: #7d1232;
      font-size: 28px;
      font-weight: 400;
      letter-spacing: .04em;
      text-transform: uppercase;
    }}

    .columns {{
      column-count: 2;
      column-gap: 10mm;
    }}

    .menu-section {{
      margin: 0 0 7mm;
      break-inside: avoid;
      page-break-inside: avoid;
    }}

    .menu-section h2 {{
      margin: 0 0 2.5mm;
      padding-bottom: 1.5mm;
      border-bottom: 1px solid #d9c7ac;
      color: #9b744c;
      font: 700 12px Arial, sans-serif;
      letter-spacing: .13em;
      text-transform: uppercase;
    }}

    .item {{
      margin: 0 0 3mm;
      break-inside: avoid;
      page-break-inside: avoid;
    }}

    .item-row {{
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 4mm;
      align-items: baseline;
    }}

    .item h3 {{
      margin: 0;
      font-size: 11.2px;
      font-weight: 700;
      line-height: 1.25;
    }}

    .item h3 span {{
      color: #776b61;
      font: 400 9px Arial, sans-serif;
      white-space: nowrap;
    }}

    .item strong {{
      color: #7d1232;
      font: 700 10px Arial, sans-serif;
      white-space: nowrap;
    }}

    .description,
    .ingredients {{
      margin: 1mm 0 0;
      color: #62564d;
      font: 8.6px/1.35 Arial, sans-serif;
    }}

    .ingredients {{
      color: #4c443e;
      font-style: italic;
    }}
  </style>
</head>
<body>
  <section class="cover">
    <div class="cover-inner">
      <div class="photo-frame large"></div>
      <p>Full Menu</p>
      <h1><span>Grand Cafe</span><span>Bucharest</span></h1>
    </div>
  </section>
  {render_group("Food", data["food"], include_divider=False)}
  {render_group("Drinks", data["drinks"])}
</body>
</html>
"""
    OUT_PATH.write_text(html, encoding="utf-8")
    print(f"Wrote {OUT_PATH}")


if __name__ == "__main__":
    main()
