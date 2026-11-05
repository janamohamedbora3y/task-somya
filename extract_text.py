import re
import zlib

with open('public/assets/aistudio/2_764fb843.pdf', 'rb') as f:
    pdf_bytes = f.read()

# Build CMap mapping from hex glyph to unicode
# Find objects with /ToUnicode
cmap_dict = {}

objects = re.findall(rb'(\d+ \d+ obj.*?endobj)', pdf_bytes, re.DOTALL)
print(f"Total objects: {len(objects)}")

for obj in objects:
    if b'/ToUnicode' in obj or b'beginbfrange' in obj or b'beginbfchar' in obj:
        stream_m = re.search(rb'stream[\r\n]+(.*?)[\r\n]+endstream', obj, re.DOTALL)
        if stream_m:
            try:
                dec = zlib.decompress(stream_m.group(1)).decode('latin1', 'ignore')
                for line in dec.splitlines():
                    # <0001> <0627>
                    bfchar_m = re.findall(r'<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>', line)
                    for src, dst in bfchar_m:
                        try:
                            cmap_dict[int(src, 16)] = chr(int(dst, 16))
                        except:
                            pass
                    # <0001> <0005> <0627>
                    bfrange_m = re.findall(r'<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>', line)
                    for start, end, dst_start in bfrange_m:
                        try:
                            s = int(start, 16)
                            e = int(end, 16)
                            d = int(dst_start, 16)
                            for offset in range(e - s + 1):
                                cmap_dict[s + offset] = chr(d + offset)
                        except:
                            pass
            except:
                pass

print(f"Extracted {len(cmap_dict)} glyph-to-unicode mappings.")

# Now extract text using Tj and TJ operators
all_text = []
for obj in objects:
    if b'/Contents' in obj or b'BT' in obj:
        stream_m = re.search(rb'stream[\r\n]+(.*?)[\r\n]+endstream', obj, re.DOTALL)
        if stream_m:
            try:
                dec = zlib.decompress(stream_m.group(1))
                # match <hex> Tj or [(<hex>)...] TJ
                # Let's find hex strings: <([0-9a-fA-F]+)>
                hex_strings = re.findall(rb'<([0-9a-fA-F]+)>', dec)
                line_chars = []
                for hx in hex_strings:
                    hxs = hx.decode('ascii')
                    # chunk by 4 chars (16-bit)
                    for k in range(0, len(hxs), 4):
                        code_str = hxs[k:k+4]
                        if len(code_str) == 4:
                            code = int(code_str, 16)
                            if code in cmap_dict:
                                line_chars.append(cmap_dict[code])
                if line_chars:
                    all_text.append(''.join(line_chars))
            except:
                pass

extracted = '\n'.join(all_text)
with open('extracted_unit2_raw.txt', 'w', encoding='utf-8') as out_f:
    out_f.write(extracted)

print(f"Total extracted text length: {len(extracted)} chars")
print("First 500 chars:")
print(extracted[:500])
