drop table feedback_files;
drop table feedback_messages;

CREATE TABLE feedback_messages (
	id bigint NOT NULL AUTO_INCREMENT,
	created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id bigint NULL DEFAULT NULL,
  manager_id bigint NULL DEFAULT NULL,
	message_status varchar(50) NOT NULL DEFAULT 'NEW',
	message_type varchar(50) NOT NULL DEFAULT 'EMAIL',
	user_name VARCHAR(255) NOT NULL,
	user_email VARCHAR(255) NULL,
	user_phone VARCHAR(255) NULL,
	message_text TEXT,
	CONSTRAINT feedback_messages_pkey PRIMARY KEY (id),
	CONSTRAINT feedback_messages_fk_users FOREIGN KEY (user_id) REFERENCES users(id),
	CONSTRAINT feedback_messages_fk_users_2 FOREIGN KEY (manager_id) REFERENCES users(id)
);

CREATE TABLE feedback_answers (
	id bigint NOT NULL AUTO_INCREMENT,
	created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	from_user BIT(1) NULL DEFAULT 0,
  message_text TEXT,
	feedback_message_id bigint NOT NULL,
	CONSTRAINT feedback_answers_pkey PRIMARY KEY (id),
	CONSTRAINT answers_messages_fk_feedback_messages FOREIGN KEY (feedback_message_id) REFERENCES feedback_messages(id)
);

CREATE TABLE feedback_files (
	id bigint NOT NULL AUTO_INCREMENT,
	answer_message_id bigint NOT NULL,
	file_name VARCHAR(255) NOT NULL,
	file_url TEXT NOT NULL,
	CONSTRAINT feedback_files_pkey PRIMARY KEY (id),
	CONSTRAINT feedback_files_fk_feedback_answers FOREIGN KEY (answer_message_id) REFERENCES feedback_answers(id)
);