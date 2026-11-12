import { readFileSync } from "node:fs";
import path from "node:path";

// Width / height of a JPEG or PNG under public/, read from its header at build time so pages
// can size photos correctly without hand-entered dimensions. Falls back to 4:3.
export function imageAspect(publicPath: string) {
  try {
    const data = readFileSync(path.join(process.cwd(), "public", publicPath));

    // PNG: width and height sit in the IHDR chunk.
    if (data.readUInt32BE(0) === 0x89504e47) {
      return data.readUInt32BE(16) / data.readUInt32BE(20);
    }

    // JPEG: walk the markers to the first start-of-frame (SOF0–SOF15, except DHT/JPG/DAC).
    let offset = 2;
    while (offset < data.length) {
      if (data[offset] !== 0xff) return 4 / 3;
      const marker = data[offset + 1];
      const length = data.readUInt16BE(offset + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return data.readUInt16BE(offset + 7) / data.readUInt16BE(offset + 5);
      }
      offset += 2 + length;
    }
  } catch {
    // Missing or unreadable file: use the default below.
  }
  return 4 / 3;
}
