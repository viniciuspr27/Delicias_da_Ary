import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Fail before packaging if an image is empty, truncated or mislabeled.
const directory = resolve('src/assets');
const images = (await readdir(directory)).filter((name) => name.endsWith('.webp'));
if (!images.length) throw new Error('Nenhuma imagem encontrada em src/assets.');
for (const name of images) {
  const bytes = await readFile(resolve(directory, name));
  if (
    bytes.length < 1024 ||
    bytes.toString('ascii', 0, 4) !== 'RIFF' ||
    bytes.toString('ascii', 8, 12) !== 'WEBP' ||
    bytes.readUInt32LE(4) + 8 !== bytes.length
  ) {
    throw new Error(`Imagem inválida, vazia ou incompleta: ${name}`);
  }
}
console.log(`${images.length} imagens verificadas antes do build.`);
