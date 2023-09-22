CREATE TABLE positions (
	id bigint NOT NULL AUTO_INCREMENT,
	alias VARCHAR(500) NOT NULL,
	title VARCHAR(255) NOT NULL,
	CONSTRAINT positions_pkey PRIMARY KEY (id)
);

ALTER TABLE `users`	ADD COLUMN `birthday` DATE NULL DEFAULT NULL AFTER `newsletter`;

ALTER TABLE `users`	ADD COLUMN `comment` VARCHAR(255) NULL DEFAULT NULL AFTER `birthday`;

ALTER TABLE users ADD position_id bigint NULL;

ALTER TABLE users ADD FOREIGN KEY (position_id) REFERENCES positions(id);