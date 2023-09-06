ALTER TABLE orders DROP COLUMN postcard_text;
ALTER TABLE orders ADD postcard_text VARCHAR(30) NULL;