
DELETE FROM products;

INSERT INTO products (
    id, name, sku, total_price, status, create_date, update_date, create_by, update_by
) VALUES 
    ('8b7e5c69-f832-4c4d-9dc3-1d1c850e8f29', 'Laptop Pro', 'SKU123456', 1499.99, 'AVAILABLE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
    ('1a1d42a8-13d6-40cf-9186-9d1a6e705917', 'Wireless Mouse', 'SKU987654', 29.99, 'OUT_OF_STOCK', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
    ('9cd1c469-a12e-4828-9a03-b0d2c96ff89a', 'Mechanical Keyboard', 'SKU112233', 79.99, 'AVAILABLE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
    ('d4e86b6b-86a7-4d24-9c11-ef4c5296d4e3', 'Monitor 4K', 'SKU445566', 399.99, 'OUT_OF_STOCK', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin'),
    ('a3b3f1e6-18a2-4cfb-a6bc-3b62e1b118b4', 'Gaming Headset', 'SKU778899', 99.99, 'AVAILABLE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'admin', 'admin');
