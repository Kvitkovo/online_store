delete from product_composition;
delete from order_details;
delete from orders;

ALTER TABLE order_details DROP FOREIGN KEY order_details_fk_products;

ALTER TABLE order_details DROP COLUMN product_id;
ALTER TABLE order_details ADD product_id bigint NULL;
ALTER TABLE order_details ADD product_title varchar(250) NOT NULL;

ALTER TABLE order_details
ADD FOREIGN KEY (product_id) REFERENCES products(id);
