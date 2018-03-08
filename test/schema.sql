# Create TestUser
CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP ON *.* to 'user'@'localhost';

# Create DB
CREATE DATABASE IF NOT EXISTS `willandjagscooldb` DEFAULT CHARACTER SET utf8;
USE `willandjagscooldb`;

# Create Users table
CREATE TABLE Users (
  user_id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(80) NOT NULL,
  display_name VARCHAR(50) NOT NULL,
  password CHAR(41) NOT NULL,
  PRIMARY KEY (user_id),
  UNIQUE INDEX (email)
) ENGINE=INNODB;

# Add test user
INSERT INTO Users (email, display_name, password) VALUES ('test@gmail.com', 'test', 'password');

# Create Tasks table
CREATE TABLE Tasks (
  task_id INT NOT NULL AUTO_INCREMENT,
  user_id INT,
  name VARCHAR(80),
  FOREIGN KEY (user_id) REFERENCES Users (user_id),
  PRIMARY KEY (task_id)
) ENGINE=INNODB;