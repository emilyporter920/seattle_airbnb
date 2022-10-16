-- Creating tables for final_project_draft
CREATE TABLE listings_clean (
	listing_id int PRIMARY KEY,
	city varchar,
	state varchar(2),
	zipcode char(5),
	latitude decimal,
	longitude decimal,
	accommodates int,
	bathrooms decimal,
	bedrooms int,
	beds int,
	price decimal,
	review_scores_rating int
);

CREATE TABLE calendar_clean (
	listing_id int REFERENCES listings(id),
	date date,
	available varchar(1),
	price decimal
);

