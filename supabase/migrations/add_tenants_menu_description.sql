-- Descripción del menú para mostrar en el storefront (opcional).
ALTER TABLE tenants ADD COLUMN IF NOT EXISTS menu_description TEXT;
