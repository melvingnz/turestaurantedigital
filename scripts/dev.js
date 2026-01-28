#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const isWindows = process.platform === 'win32';

const env = { ...process.env };
env.WATCHPACK_POLLING = 'true';
delete env.HTTPS_PROXY;
delete env.HTTP_PROXY;
delete env.PROXY;
env.NO_PROXY = 'localhost,127.0.0.1,::1';

const projectRoot = path.join(__dirname, '..');
const command = isWindows ? 'next.cmd' : 'next';
const args = ['dev', '-H', 'localhost', '-p', '3000'];

const child = spawn(command, args, {
  env,
  stdio: 'inherit',
  shell: isWindows,
  cwd: projectRoot,
});

child.on('error', (err) => {
  console.error(`Error al ejecutar el servidor: ${err.message}`);
  process.exit(1);
});

child.on('exit', (code) => {
  process.exit(code || 0);
});
