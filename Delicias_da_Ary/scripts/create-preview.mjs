import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Package the compiled app inside a single offline presentation file.
// Escaping '<' prevents embedded application text from closing the outer script.
const document = await readFile(resolve('dist/index.html'), 'utf8');
const embedded = JSON.stringify(document).replace(/</g, '\\u003c');
const preview = `<!doctype html>
<html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Delícias da Ary — POC interativa</title>
<style>
*{box-sizing:border-box}body{margin:0;height:100vh;height:100dvh;font-family:Arial,sans-serif;color:#492d39;background:#eee5eb;display:grid;grid-template-rows:58px minmax(0,1fr);overflow:hidden}.toolbar{background:#fffafb;display:flex;align-items:center;justify-content:space-between;padding:0 25px;gap:15px;border-bottom:1px solid #dbc8cd;z-index:2}.identity{display:flex;gap:15px;align-items:center}.identity strong{font-family:Georgia,serif;font-weight:400;font-size:20px}.identity span{font-size:8px;letter-spacing:1.3px;color:#996174;border-left:1px solid #d8bfc8;padding-left:15px}.controls{display:flex;gap:4px;background:#f7e3eb;border-radius:30px;padding:4px}.controls button{font:inherit;font-size:11px;display:flex;align-items:center;gap:8px;background:transparent;border:0;border-radius:20px;padding:9px 16px;color:#785460;cursor:pointer;min-height:34px}.controls button[aria-pressed=true]{background:#fffafb;color:#a54365;box-shadow:0 1px 5px #55323d13}.controls svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:1.5}.controls button:focus-visible{outline:2px solid #a6425e;outline-offset:2px}.status{font-size:10px;color:#886a75}.viewport{display:flex;align-items:stretch;justify-content:center;min-height:0;overflow:hidden;transition:padding .25s}.viewport iframe{border:0;width:100%;height:100%;background:#fff7fa;display:block}.viewport.mobile{padding:16px 12px}.viewport.mobile iframe{width:390px;max-width:100%;border:1px solid #d5b6c2;border-radius:25px;box-shadow:0 12px 40px #55323d20}.noscript{padding:30px;font-size:16px}
@media(max-width:680px){body{grid-template-rows:63px minmax(0,1fr)}.toolbar{padding:0 12px;gap:10px}.identity{display:block}.identity strong{font-size:17px}.identity span{display:block;border:0;padding:0;margin-top:5px;font-size:6px;letter-spacing:1px}.status{display:none}.controls button{padding:9px 11px;font-size:10px;gap:5px}.viewport.mobile{padding:10px 8px}.viewport.mobile iframe{border-radius:16px}}
@media(prefers-reduced-motion:reduce){*{transition:none!important}}
</style></head><body><header class="toolbar"><div class="identity"><strong>Delícias da Ary</strong><span>POC V8 · NÃO PUBLICADO</span></div><div class="controls" role="group" aria-label="Formato da prévia"><button id="desktop" aria-pressed="true"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>Desktop</button><button id="mobile" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 18h4"/></svg>Celular</button></div><span class="status" id="status" aria-live="polite">Role dentro da página para explorar</span></header><main class="viewport" id="viewport"><iframe id="app" title="POC navegável da Delícias da Ary"></iframe></main><noscript><p class="noscript">Ative o JavaScript para abrir a prévia.</p></noscript><script>
const embeddedApp = ${embedded};
const viewport = document.getElementById('viewport');
const frame = document.getElementById('app');
const desktop = document.getElementById('desktop');
const mobile = document.getElementById('mobile');
frame.srcdoc = embeddedApp;
function chooseMode(isMobile) {
  viewport.classList.toggle('mobile', isMobile);
  desktop.setAttribute('aria-pressed', String(!isMobile));
  mobile.setAttribute('aria-pressed', String(isMobile));
  document.getElementById('status').textContent = isMobile ? 'Prévia de celular · largura de até 390 px' : 'Role dentro da página para explorar';
}
desktop.addEventListener('click', () => chooseMode(false));
mobile.addEventListener('click', () => chooseMode(true));
</script></body></html>`;
await writeFile(resolve('dist/POC_Delicias_da_Ary.html'), preview);
console.log('Prévia offline com seletor Desktop/Celular criada.');
