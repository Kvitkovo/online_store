CREATE TABLE orders (
	id bigint NOT NULL AUTO_INCREMENT,
	created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id bigint NULL DEFAULT NULL,
	address_text VARCHAR(255) NOT NULL,
	add_postcard BIT(1) NULL DEFAULT 0,
	postcard_text TEXT,
	total_sum DOUBLE NULL DEFAULT 0,
	order_status varchar(50) NOT NULL DEFAULT 'NEW',
	order_comment TEXT,
	CONSTRAINT orders_pkey PRIMARY KEY (id),
	CONSTRAINT orders_fk_users FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_details (
	id bigint NOT NULL AUTO_INCREMENT,
	order_id bigint NOT NULL,
	product_id bigint NOT NULL,
	product_price DOUBLE NULL DEFAULT 0,
    product_qty int NULL DEFAULT 0,
	CONSTRAINT order_details_pkey PRIMARY KEY (id),
	CONSTRAINT order_details_fk_orders FOREIGN KEY (order_id) REFERENCES orders(id),
	CONSTRAINT order_details_fk_products FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE product_composition(
    id bigint NOT NULL AUTO_INCREMENT,
    order_details_id bigint NOT NULL,
    product_id bigint NOT NULL,
    product_qty int NULL DEFAULT 0,
    CONSTRAINT product_composition_pkey PRIMARY KEY (id),
    CONSTRAINT product_composition_fk_order_details FOREIGN KEY (order_details_id) REFERENCES order_details(id),
    CONSTRAINT product_composition_fk_products FOREIGN KEY (product_id) REFERENCES products(id)
);