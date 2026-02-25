#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const isWindows = process.platform === 'win32';
const projectRoot = path.join(__dirname, '..');
const nextBin = path.join(projectRoot, 'node_modules', '.bin', isWindows ? 'next.cmd' : 'next');

// Configurar la variable de entorno según la plataforma
const env = { ...process.env };

// Deshabilitar proxy durante build para permitir Google Fonts y otras conexiones externas
delete env.HTTPS_PROXY;
delete env.HTTP_PROXY;
delete env.PROXY;
env.NO_PROXY = 'localhost,127.0.0.1,::1';

// Comando a ejecutar
const args = ['build'];

// Ejecutar el comando
const child = spawn(nextBin, args, {
  env,
  stdio: 'inherit',
  shell: isWindows
});

child.on('error', (error) => {
  console.error(`Error al ejecutar el build: ${error.message}`);
  process.exit(1);
});

child.on('exit', (code) => {
  process.exit(code || 0);
});
