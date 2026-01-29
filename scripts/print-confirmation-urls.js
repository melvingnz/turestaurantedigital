#!/usr/bin/env node
/**
 * Print Site URL, Redirect URLs, and NEXT_PUBLIC_SITE_URL for Supabase Auth config.
 * Use these values in Supabase Dashboard → Authentication → URL Configuration.
 *
 * Run: node scripts/print-confirmation-urls.js
 */

const PRODUCTION_SITE = 'https://www.turestaurantedigital.com'
const CONFIRM_PATH = '/marketing/accountconfirmed'
const REDIRECT_PRODUCTION = `${PRODUCTION_SITE}${CONFIRM_PATH}`
const REDIRECT_LOCALHOST = `http://localhost:3000${CONFIRM_PATH}`

console.log('')
console.log('=== Supabase Auth — URLs for confirmation emails ===')
console.log('')
console.log('Site URL (Supabase Dashboard → Auth → URL Configuration):')
console.log('  ' + PRODUCTION_SITE)
console.log('')
console.log('Redirect URLs (add both; localhost only for local testing):')
console.log('  ' + REDIRECT_PRODUCTION)
console.log('  ' + REDIRECT_LOCALHOST)
console.log('')
console.log('Vercel / .env.production:')
console.log('  NEXT_PUBLIC_SITE_URL=' + PRODUCTION_SITE)
console.log('')
console.log('=== Copy the values above into Supabase and Vercel ===')
console.log('')
