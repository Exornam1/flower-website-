-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

INSERT INTO users (username, email, password_hash) VALUES
('alice', 'alice@example.com', 'hashedpassword1'),
('bob', 'bob@example.coma', 'hashedpassword2');

-- Flowers table
CREATE TABLE flowers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    image_url VARCHAR(255),
    stock INT DEFAULT 0
);

INSERT INTO flowers (name, description, price, image_url, stock) VALUES
('Rose Bouquet', 'A beautiful bouquet of red roses.', 29.99, 'img/f1.png', 15),
('Tulip Arrangement', 'Colorful tulips for any occasion.', 19.99, 'img/f2.png', 10);

-- Orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending'
);

INSERT INTO orders (user_id, status) VALUES
(1, 'pending'),
(2, 'completed');

-- Order_Items table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    flower_id INT REFERENCES flowers(id),
    quantity INT NOT NULL,
    price NUMERIC(10,2) NOT NULL
);

INSERT INTO order_items (order_id, flower_id, quantity, price) VALUES
(1, 1, 2, 29.99),
(2, 2, 1, 19.99);

-- Contact Messages table
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO contact_messages (name, email, message) VALUES
('Charlie', 'charlie@example.com', 'I love your flowers!'),
('Dana', 'dana@example.com', 'Do you deliver on weekends?');
