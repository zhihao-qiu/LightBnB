const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'lightbnb'
});
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return pool
  .query(
    `SELECT * 
    FROM users
    WHERE email = $1;`,
    [ email ])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool
  .query(
    `SELECT * 
    FROM users
    WHERE id = $1;`,
    [ id ])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  return pool
  .query(
    `INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;`,
    [ user.name, user.email, user.password ])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });

};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return pool
  .query(
    `SELECT properties.*, reservations.*
    FROM reservations 
    JOIN properties ON properties.id = property_id
    WHERE owner_id = $1
    limit $2;`,
    [ guest_id, limit ])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  return pool
  .query(
    `SELECT properties.*, foo.rating FROM properties 
    JOIN (SELECT property_id, avg(rating) as rating FROM property_reviews group by property_id) as foo ON properties.id = foo.property_id
    limit $1;`,
    [ limit ])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
