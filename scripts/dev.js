#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const readline = require('readline');
const isWindows = process.platform === 'win32';

const env = { ...process.env };
env.WATCHPACK_POLLING = 'true';
delete env.HTTPS_PROXY;
delete env.HTTP_PROXY;
delete env.PROXY;
env.NO_PROXY = 'localhost,127.0.0.1,::1';

// Colores ANSI (compatibles con la mayoría de terminales)
const c = {
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  reset: '\x1b[0m',
};

/** Reformatea líneas de request de Next.js para mejor lectura */
function formatRequestLine(line) {
  const trimmed = line.trim();
  // GET /path 200 in 1448ms (compile: 280ms, proxy.ts: 199ms, render: 969ms)
  const match = trimmed.match(
    /^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\s+(\S+)\s+(\d{3})\s+in\s+(\d+)ms\s*\((.*)\)/
  );
  if (!match) return null;
  const [, method, fullPath, status, totalMs, rest] = match;
  const statusNum = parseInt(status, 10);
  const statusColor = statusNum >= 500 ? c.red : statusNum >= 400 ? c.yellow : c.green;
  const methodColor = method === 'POST' ? c.magenta : c.cyan;
  const levelTag =
    statusNum >= 500 ? `${c.red}[ERROR]${c.reset}` :
    statusNum >= 400 ? `${c.yellow}[WARN ]${c.reset}` :
    `${c.green}[INFO ]${c.reset}`;
  const pathMax = 50;
  const pathShort =
    fullPath.length > pathMax ? fullPath.slice(0, pathMax - 3) + '…' : fullPath;
  const compileMatch = rest.match(/compile:\s*(\d+)ms/);
  const renderMatch = rest.match(/render:\s*(\d+)ms/);
  const proxyMatch = rest.match(/proxy\.ts:\s*(\d+)ms/);
  const parts = [
    compileMatch && `comp ${compileMatch[1]}ms`,
    proxyMatch && `proxy ${proxyMatch[1]}ms`,
    renderMatch && `render ${renderMatch[1]}ms`,
  ].filter(Boolean);
  const timing = parts.length ? `  ${c.dim}${parts.join(' · ')}${c.reset}` : '';
  const methodPadded = method.padEnd(6);
  const totalPadded = (totalMs + 'ms').padStart(7);
  return `${levelTag} ${methodColor}${methodPadded}${c.reset} ${c.dim}${pathShort}${c.reset}  ${statusColor}${status}${c.reset}  ${c.dim}${totalPadded}${c.reset}${timing}`;
}

function processLine(line, out) {
  const formatted = formatRequestLine(line.trim());
  out.write((formatted || line) + '\n');
}

const projectRoot = path.join(__dirname, '..');
const nextBin = path.join(projectRoot, 'node_modules', '.bin', isWindows ? 'next.cmd' : 'next');
const args = ['dev', '-H', 'localhost', '-p', '3000'];

console.log(c.dim + '▶ Logs de requests formateados (npm run dev). Iniciando Next.js…' + c.reset + '\n');

const child = spawn(nextBin, args, {
  env,
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: isWindows,
  cwd: projectRoot,
});

child.stdout.setEncoding('utf8');
child.stderr.setEncoding('utf8');

const rlOut = readline.createInterface({ input: child.stdout, crlfDelay: Infinity });
const rlErr = readline.createInterface({ input: child.stderr, crlfDelay: Infinity });

rlOut.on('line', (line) => processLine(line, process.stdout));
rlErr.on('line', (line) => processLine(line, process.stderr));

child.on('error', (err) => {
  console.error(`Error al ejecutar el servidor: ${err.message}`);
  process.exit(1);
});

child.on('exit', (code) => {
  process.exit(code || 0);
});
