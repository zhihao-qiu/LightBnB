DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
id SERIAL PRIMARY KEY NOT NULL,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS properties CASCADE;
CREATE TABLE properties(
id SERIAL PRIMARY KEY NOT NULL,
title VARCHAR(255) NOT NULL,
description TEXT ,
cost_per_night MONEY DEFAULT 0,
parking_spaces INTEGER DEFAULT 0,
number_of_bathrooms INTEGER DEFAULT 0,
number_of_bedrooms INTEGER DEFAULT 0,
thumbnail_photo_url TEXT ,
cover_photo_url TEXT ,
country VARCHAR(255) ,
street VARCHAR(255) ,
city VARCHAR(255) ,
province VARCHAR(255) ,
post_code VARCHAR(6) ,
active BOOLEAN DEFAULT TRUE,
owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS reservations CASCADE;
CREATE TABLE reservations(
id SERIAL PRIMARY KEY NOT NULL,
start_date DATE NOT NULL,
end_date DATE NOT NULL,
guest_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
property_id INTEGER NOT NULL REFERENCES properties(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS property_reviews CASCADE;
CREATE TABLE property_reviews(
id SERIAL PRIMARY KEY NOT NULL,
message TEXT ,
rating SMALLINT DEFAULT 0,
guest_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
property_id INTEGER NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
reservation_id INTEGER NOT NULL REFERENCES reservations(id) ON DELETE CASCADE
);
