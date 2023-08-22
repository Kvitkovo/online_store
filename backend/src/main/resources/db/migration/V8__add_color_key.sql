ALTER TABLE products
ADD FOREIGN KEY (product_color) REFERENCES colors(id);