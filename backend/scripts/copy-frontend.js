import { cpSync, existsSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Na Vercel, arquivos estaticos precisam estar em backend/public para serem servidos pela CDN
// (express.static nao funciona la). Este script copia a pasta frontend durante o build.
const backendDir = resolve(fileURLToPath(new URL('..', import.meta.url)));
const source = resolve(backendDir, '../frontend');
const target = resolve(backendDir, 'public');
const skipped = new Set(['server.js', 'formatacao-excel.txt', 'formatacao-pdf.txt']);

if (!existsSync(source)) {
  throw new Error(`Pasta do frontend nao encontrada em ${source}`);
}

rmSync(target, { recursive: true, force: true });
cpSync(source, target, {
  recursive: true,
  filter: (path) => !skipped.has(path.slice(source.length + 1)),
});

console.log(`Frontend copiado para ${target}`);
