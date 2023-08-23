ALTER TABLE users
ADD email_confirmed BIT(1) NULL DEFAULT 0;

ALTER TABLE users
ADD email_confirme_code VARCHAR(36) NOT NULL;

ALTER TABLE users
ADD newsletter BIT(1) NULL DEFAULT 0;