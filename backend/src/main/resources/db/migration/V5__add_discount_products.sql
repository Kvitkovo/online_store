ALTER TABLE products
ADD discount DOUBLE NULL DEFAULT 0;

ALTER TABLE products
ADD price_with_discount DOUBLE NULL DEFAULT 0;