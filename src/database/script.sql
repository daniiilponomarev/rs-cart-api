--create database yourhomeoffice2

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE cart_status AS ENUM ('OPEN', 'ORDERED');

create table if not exists carts (
  id uuid not null default uuid_generate_v4() primary key,
  user_id uuid not null,
  created_at date not null default CURRENT_DATE,
  updated_at date not null default CURRENT_DATE,
  status cart_status
)

CREATE TABLE IF NOT EXISTS products (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  price integer not null
);

create table if not exists cart_items (
	cart_id uuid not null,
	product_id uuid not null,
	count integer not null,
	foreign key (cart_id) references carts(id) on delete cascade,
	foreign key (product_id) references products(id)
)

CREATE TYPE order_status AS ENUM ('NEW', 'CONFIRMED', 'SHIPPED', 'COMPLETED', 'CANCELLED');

create table if not exists orders (
   id uuid not null default uuid_generate_v4() primary key,
   user_id uuid not null,
   cart_id uuid not null,
   payment json,
   delivery json,
   comments text,
   status order_status,
   total integer,
   foreign key (cart_id) references carts(id)
);

INSERT INTO carts (id, user_id, created_at, updated_at, status)
VALUES
  ('2d5e3b25-481b-4cb6-a1d3-688d38816a61', '07941b55-1356-4d09-b067-518fc425f35b', '2023-11-01', '2022-07-01', 'OPEN'),
  ('4226f1e2-5e0f-4b15-bcd7-b4f788c5ca80', 'ec012777-5bd7-4dbf-bca0-cf25e8cbff3b', '2023-11-02', '2022-07-02', 'OPEN'),
  ('5648892b-e42f-4227-a8bb-d4f408da814e', 'd03bab80-ff2a-4e3c-ac7b-37cb29c03533', '2023-11-03', '2022-07-03', 'ORDERED'),
  ('ac9216bf-fd5a-49eb-a521-e62cec40bb30', 'f94d16e0-fc3f-47f6-8fba-966cadcd89dc', '2023-11-04', '2022-07-04', 'OPEN'),
  ('0e2e2646-4772-4e80-91f2-7dde97c4ad79', '5e353e41-79c4-4ad3-987e-784274c35f2a', '2023-11-05', '2022-07-05', 'ORDERED');

INSERT INTO products (id, title, description, price)
VALUES
  ('3a9c85e3-2159-4925-bd2d-3ca2273ced18', 'test product 1', 'test product 1 description', 1231.0),
  ('4562938e-6aa3-4dcf-a451-d96cc97fc624', 'test product 2', 'test product 2 description', 1232.1),
  ('39670cd6-2831-4038-92e3-70c42ad5f1bb', 'test product 3', 'test product 3 description', 1233.2),
  ('bf744603-a710-4f8d-b3c5-5b9afe112d26', 'test product 4', 'test product 4 description', 1234.3),
  ('619ba2cb-37d1-48fc-9ec4-4524d016c1f2', 'test product 5', 'test product 5 description', 1235.4);

INSERT INTO cart_items (cart_id, product_id, count)
VALUES
  ('2d5e3b25-481b-4cb6-a1d3-688d38816a61', '3a9c85e3-2159-4925-bd2d-3ca2273ced18', 2),
  ('4226f1e2-5e0f-4b15-bcd7-b4f788c5ca80', '4562938e-6aa3-4dcf-a451-d96cc97fc624', 1),
  ('5648892b-e42f-4227-a8bb-d4f408da814e', '39670cd6-2831-4038-92e3-70c42ad5f1bb', 3),
  ('ac9216bf-fd5a-49eb-a521-e62cec40bb30', 'bf744603-a710-4f8d-b3c5-5b9afe112d26', 5),
  ('0e2e2646-4772-4e80-91f2-7dde97c4ad79', '619ba2cb-37d1-48fc-9ec4-4524d016c1f2', 9);

INSERT INTO orders (user_id, cart_id, payment, delivery, comments, status, total)
VALUES
  ('07941b55-1356-4d09-b067-518fc425f35b', '2d5e3b25-481b-4cb6-a1d3-688d38816a61', '{"type":"credit_card", "card_number":"1111111111111111", "expiration":"11/30", "cvv":"111"}', '{"address":"address 1"}', 'Comment 1', 'NEW', 25),
  ('ec012777-5bd7-4dbf-bca0-cf25e8cbff3b', '4226f1e2-5e0f-4b15-bcd7-b4f788c5ca80', '{"type":"debit_card", "card_number":"1111111111111111", "expiration":"11/30", "cvv":"111"}', '{"address":"address 2"}', 'Comment 2', 'CONFIRMED', 30),
  ('d03bab80-ff2a-4e3c-ac7b-37cb29c03533', '5648892b-e42f-4227-a8bb-d4f408da814e', '{"type":"credit_card", "card_number":"1111111111111111", "expiration":"11/30", "cvv":"111"}', '{"address":"address 3"}', 'Comment 3', 'SHIPPED', 10),
  ('f94d16e0-fc3f-47f6-8fba-966cadcd89dc', 'ac9216bf-fd5a-49eb-a521-e62cec40bb30', '{"type":"debit_card", "card_number":"1111111111111111", "expiration":"11/30", "cvv":"111"}', '{"address":"address 4"}', 'Comment 4', 'COMPLETED', 15),
  ('5e353e41-79c4-4ad3-987e-784274c35f2a', '0e2e2646-4772-4e80-91f2-7dde97c4ad79', '{"type":"credit_card", "card_number":"1111111111111111", "expiration":"11/30", "cvv":"111"}', '{"address":"address 5"}', 'Comment 5', 'CANCELLED', 20);

-- delete from carts
-- where user_id = 'XXX';

select * from carts;
select * from cart_items;
select * from orders;
