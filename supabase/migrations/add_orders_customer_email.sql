-- Optional email for order confirmation (customer)
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS customer_email TEXT;

COMMENT ON COLUMN orders.customer_email IS 'Optional; used to send order confirmation email.';
