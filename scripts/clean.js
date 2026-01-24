'use strict'
const path = require('path')
const fs = require('fs')

function rmIfExists(dir, label) {
  if (!fs.existsSync(dir)) return { removed: false, failed: false }
  try {
    fs.rmSync(dir, { recursive: true })
    console.log('Removed ' + label)
    return { removed: true, failed: false }
  } catch (e) {
    if (e.code === 'EPERM' || e.code === 'EBUSY') {
      console.error('Error: ' + label + ' is in use. Stop the dev server (Ctrl+C), then run "npm run clean" again.')
    } else {
      console.error('Error removing ' + label + ': ' + e.message)
    }
    return { removed: false, failed: true }
  }
}

const nextDir = path.join(process.cwd(), '.next')
const cacheDir = path.join(process.cwd(), 'node_modules', '.cache')

const r1 = rmIfExists(nextDir, '.next')
const r2 = rmIfExists(cacheDir, 'node_modules/.cache')

if (r1.failed || r2.failed) process.exit(1)
if (!r1.removed && !r2.removed) {
  console.log('Nothing to clean.')
  process.exit(0)
}
console.log('Done. Run "npm run dev" to start fresh.')
