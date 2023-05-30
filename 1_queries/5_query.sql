SELECT reservations.id, title, cost_per_night, start_date, foo.average_rating
FROM reservations
JOIN properties ON reservations.property_id = properties.id
JOIN (
  SELECT property_id, avg(rating) as average_rating 
  FROM property_reviews
  GROUP BY property_id
  ) as foo ON reservations.property_id = foo.property_id
WHERE guest_id = 1
ORDER BY start_date
LIMIT 10;