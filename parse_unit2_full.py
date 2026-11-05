import re
import zlib

with open('public/assets/aistudio/2_764fb843.pdf', 'rb') as f:
    pdf_bytes = f.read()

# Collect all CMaps
all_cmaps = {}

streams = re.findall(b'stream[\r\n]+(.*?)[\r\n]+endstream', pdf_bytes, re.DOTALL)
for s in streams:
    try:
        dec = zlib.decompress(s)
        if b'beginbfrange' in dec or b'beginbfchar' in dec:
            text = dec.decode('latin1', 'ignore')
            for m in re.finditer(r'<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>', text):
                all_cmaps[int(m.group(1), 16)] = chr(int(m.group(2), 16))
            for m in re.finditer(r'<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>\s*<([0-9a-fA-F]+)>', text):
                s_code = int(m.group(1), 16)
                e_code = int(m.group(2), 16)
                d_code = int(m.group(3), 16)
                for off in range(e_code - s_code + 1):
                    all_cmaps[s_code + off] = chr(d_code + off)
    except:
        pass

print(f"Total CMaps: {len(all_cmaps)}")

def decode_bytes(raw_bytes):
    # In this PDF, characters in text strings like (\x1f) or <001f>
    # If string is given in parentheses (), characters may be 1 or 2 bytes
    chars = []
    # If 1-byte
    for b in raw_bytes:
        if b in all_cmaps:
            chars.append(all_cmaps[b])
        elif chr(b).isprintable():
            chars.append(chr(b))
    return ''.join(chars)

# Let's decode all strings inside () Tj or [ () () ] TJ
page_texts = []
for s in streams:
    try:
        dec = zlib.decompress(s)
        # Check if content stream
        if b'BT' in dec:
            # find all (string)Tj or (string) ' or (string) "
            text_tokens = []
            # matches: \((.*?)\)\s*Tj
            tj_matches = re.findall(rb'\(((?:[^\\)]|\\.)*)\)\s*(?:Tj|\'|")', dec)
            for m in tj_matches:
                t = decode_bytes(m)
                if t.strip():
                    text_tokens.append(t)
            # matches TJ array: \[(.*?)\]\s*TJ
            tj_arrays = re.findall(rb'\[(.*?)\]\s*TJ', dec)
            for arr in tj_arrays:
                str_parts = re.findall(rb'\(((?:[^\\)]|\\.)*)\)', arr)
                for sp in str_parts:
                    t = decode_bytes(sp)
                    if t.strip():
                        text_tokens.append(t)
            if text_tokens:
                page_texts.append(' '.join(text_tokens))
    except:
        pass

print(f"Decoded {len(page_texts)} content pages/streams")
full_txt = '\n--- PAGE ---\n'.join(page_texts)
with open('unit2_decoded_arabic.txt', 'w', encoding='utf-8') as out:
    out.write(full_txt)

print("First 1000 chars:")
print(full_txt[:1000])
