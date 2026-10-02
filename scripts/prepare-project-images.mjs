import { readdir, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const directory = `${root}public/images/projects`;
const widths = [480, 640, 960, 1280, 1920];
const manifest = {};

await mkdir(`${directory}/responsive`, { recursive: true });
for (const file of (await readdir(directory)).sort()) {
  if (!file.endsWith(".webp")) continue;
  const source = `${directory}/${file}`;
  const { width, height } = await sharp(source).metadata();
  if (!width || !height) throw new Error(`Missing dimensions: ${file}`);
  const variants = [];
  for (const size of widths.filter((size) => size < width)) {
    const name = `${file.replace(/\.webp$/, "")}-${size}.webp`;
    await sharp(source)
      .resize({ width: size })
      .webp({ quality: 85, effort: 6 })
      .toFile(`${directory}/responsive/${name}`);
    variants.push({ width: size, src: `/images/projects/responsive/${name}` });
  }
  const src = `/images/projects/${file}`;
  variants.push({ width, src });
  manifest[src] = { width, height, variants };
}
await writeFile(
  `${root}src/lib/project-image-manifest.json`,
  `${JSON.stringify(manifest, null, 2)}\n`,
);
console.log(
  `Prepared responsive images for ${Object.keys(manifest).length} screenshots.`,
);
