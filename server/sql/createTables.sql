CREATE TABLE IF NOT EXISTS exercise (
	id INT AUTO_INCREMENT,
	exercise_name VARCHAR(50),
	accessory VARCHAR(50),
	accessory_weight INT,
	weighted BOOLEAN,
	timed BOOLEAN,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS routine (
	id INT AUTO_INCREMENT,
	routine_name VARCHAR(50),
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS workout (
	id INT AUTO_INCREMENT,
	workout_date DATE,
	total_time TIME,
	routine_id INT,
	FOREIGN KEY (routine_id) REFERENCES routine(id),
	PRIMARY KEY (id)
)

CREATE TABLE IF NOT EXISTS routine_exercise (
	routine_id INT,
	exercise_id INT,
	PRIMARY KEY (routine_id, exercise_id),
	FOREIGN KEY (routine_id) REFERENCES routine(id),
	FOREIGN KEY (exercise_id) REFERENCES exercise(id)
);

CREATE TABLE IF NOT EXISTS person (
	id INT AUTO_INCREMENT,
	fname VARCHAR(50),
	lname VARCHAR(50),
	ht DECIMAL(2,1),
	wt DECIMAL(3,1)
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS exercise_performance (
	id INT AUTO_INCREMENT,
	person_id INT,
	workout_id INT,
	exercise_id INT,
	reps INT,
	rep_weight DECIMAL(10,2),
	PRIMARY KEY (id),
	FOREIGN KEY (person_id) REFERENCES person(id),
	FOREIGN KEY (workout_id) REFERENCES workout(id),
	FOREIGN KEY (exercise_id) REFERENCES exercise(id)
);