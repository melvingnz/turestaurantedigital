#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const isWindows = process.platform === 'win32';

// Workaround EPERM en Windows con Node 21+: Next.js usa fork() que falla con spawn EPERM.
// Ejecutar Next con Node 20 evita el bug (nodejs/node#51766, libuv/libuv#4341).
const nodeMajor = parseInt(process.version.slice(1).split('.')[0], 10);
const useNode20 = isWindows && nodeMajor >= 21;

// Configurar la variable de entorno según la plataforma
const env = { ...process.env };
env.WATCHPACK_POLLING = 'true';

// Deshabilitar proxy durante desarrollo para permitir Google Fonts y otras conexiones externas
delete env.HTTPS_PROXY;
delete env.HTTP_PROXY;
delete env.PROXY;
env.NO_PROXY = 'localhost,127.0.0.1,::1';

const projectRoot = path.join(__dirname, '..');
const nextBin = path.join(projectRoot, 'node_modules', 'next', 'dist', 'bin', 'next');

let command;
let args;

if (useNode20) {
  command = isWindows ? 'npx.cmd' : 'npx';
  args = ['--yes', 'node@20', nextBin, 'dev', '-H', 'localhost', '-p', '3000'];
} else {
  command = isWindows ? 'next.cmd' : 'next';
  args = ['dev', '-H', 'localhost', '-p', '3000'];
}

// Ejecutar el comando
const child = spawn(command, args, {
  env,
  stdio: 'inherit',
  shell: isWindows,
  cwd: projectRoot,
});

child.on('error', (error) => {
  console.error(`Error al ejecutar el servidor: ${error.message}`);
  process.exit(1);
});

child.on('exit', (code) => {
  process.exit(code || 0);
});
