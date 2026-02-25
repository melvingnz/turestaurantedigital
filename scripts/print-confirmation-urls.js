#!/usr/bin/env node
/**
 * Print Site URL, Redirect URLs, and NEXT_PUBLIC_SITE_URL for Supabase Auth config.
 * Use these values in Supabase Dashboard → Authentication → URL Configuration.
 *
 * Run: node scripts/print-confirmation-urls.js
 */

const PRODUCTION_SITE = 'https://www.turestaurantedigital.com'
const CONFIRM_PATH = '/marketing/accountconfirmed'
const CONFIRM_EMAIL_PATH = '/marketing/confirmemail'
const REDIRECT_PRODUCTION = `${PRODUCTION_SITE}${CONFIRM_PATH}`
const REDIRECT_LOCALHOST = `http://localhost:3000${CONFIRM_PATH}`
const REDIRECT_LOCALHOST_CONFIRM = `http://localhost:3000${CONFIRM_EMAIL_PATH}`

console.log('')
console.log('=== Supabase Auth — URLs for confirmation emails ===')
console.log('')
console.log('Site URL (Supabase Dashboard → Auth → URL Configuration):')
console.log('  ' + PRODUCTION_SITE)
console.log('')
console.log('Redirect URLs (producción + localhost para pruebas):')
console.log('  ' + REDIRECT_PRODUCTION)
console.log('  ' + REDIRECT_LOCALHOST)
console.log('  ' + REDIRECT_LOCALHOST_CONFIRM)
console.log('')
console.log('Vercel / .env.production:')
console.log('  NEXT_PUBLIC_SITE_URL=' + PRODUCTION_SITE)
console.log('')
console.log('Local (.env.local) para probar en localhost:')
console.log('  NEXT_PUBLIC_SITE_URL=http://localhost:3000')
console.log('')
console.log('=== Copy the values above into Supabase and Vercel ===')
console.log('')
