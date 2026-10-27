#!/usr/bin/env node
/* ==========================================================================
   SPEAKLY — scripts/serve.js : serveur statique minimal (zéro dépendance).
   Pourquoi un serveur ? La reconnaissance vocale et le micro du navigateur
   exigent un contexte sécurisé (http://localhost en fait partie, file:// non).
   Usage : node scripts/serve.js [--port 5180] [--no-open]
   ========================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const argv = process.argv.slice(2);
const argPort = (() => {
  const i = argv.indexOf('--port');
  return i >= 0 ? parseInt(argv[i + 1], 10) : (parseInt(process.env.PORT, 10) || 5180);
})();
const shouldOpen = argv.indexOf('--no-open') < 0;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8'
};

function send(res, code, body, headers) {
  res.writeHead(code, Object.assign({
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  }, headers || {}));
  res.end(body);
}

const server = http.createServer((req, res) => {
  let urlPath;
  try { urlPath = decodeURIComponent((req.url || '/').split('?')[0]); }
  catch (e) { return send(res, 400, 'Requête invalide'); }
  if (urlPath === '/') urlPath = '/index.html';

  const target = path.normalize(path.join(ROOT, urlPath));
  if (!target.startsWith(ROOT)) return send(res, 403, 'Accès refusé');   // anti-traversée

  fs.stat(target, (err, st) => {
    if (err || !st.isFile()) {
      return send(res, 404, '404 — introuvable : ' + urlPath, { 'Content-Type': 'text/plain; charset=utf-8' });
    }
    const ext = path.extname(target).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Content-Length': st.size,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    });
    fs.createReadStream(target).pipe(res);
  });
});

function lanAddresses() {
  const out = [];
  const nets = os.networkInterfaces();
  Object.keys(nets).forEach((name) => {
    (nets[name] || []).forEach((n) => {
      if (n.family === 'IPv4' && !n.internal) out.push(n.address);
    });
  });
  return out;
}

function openBrowser(url) {
  try {
    if (process.platform === 'win32') spawn('cmd', ['/c', 'start', '""', url], { detached: true, stdio: 'ignore' }).unref();
    else if (process.platform === 'darwin') spawn('open', [url], { detached: true, stdio: 'ignore' }).unref();
    else spawn('xdg-open', [url], { detached: true, stdio: 'ignore' }).unref();
  } catch (e) { /* l'utilisateur ouvrira l'URL à la main */ }
}

function listen(port, attempt) {
  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE' && attempt < 12) {
      console.log('  port ' + port + ' occupé, essai sur ' + (port + 1) + '…');
      listen(port + 1, attempt + 1);
    } else {
      console.error('Impossible de démarrer le serveur :', err.message);
      process.exit(1);
    }
  });
  server.listen(port, '127.0.0.1', () => {
    const local = 'http://localhost:' + port + '/';
    console.log('');
    console.log('  ┌───────────────────────────────────────────────┐');
    console.log('  │  S P E A K L Y   —   Learn less. Speak more.  │');
    console.log('  └───────────────────────────────────────────────┘');
    console.log('');
    console.log('  Application   : ' + local);
    lanAddresses().forEach((ip) => console.log('  Sur ton tél.  : http://' + ip + ':' + port + '/'));
    console.log('  Dossier       : ' + ROOT);
    console.log('');
    console.log('  Autorise le micro quand le navigateur le demande.');
    console.log('  Ctrl+C pour arrêter.');
    console.log('');
    if (shouldOpen) openBrowser(local);
  });
}

listen(argPort, 0);
