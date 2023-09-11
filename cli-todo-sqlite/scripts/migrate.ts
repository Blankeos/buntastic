import Database from "bun:sqlite";
import * as path from "path";

const dbPath = path.join(import.meta.dir, "..", Bun.env.SQLITE_DB || "");
const db = new Database(dbPath);

// Create
db.exec("DROP TABLE IF EXISTS todos");
db.exec("DROP TABLE IF EXISTS users");
db.exec(
  "CREATE TABLE todos (id integer primary key autoincrement not null, text varchar(30) not null, user_id integer not null, foreign key(user_id) references user(id) ON DELETE CASCADE);"
);
db.exec(`
CREATE TABLE users\
(\
    id integer primary key autoincrement not null,\
    full_name varchar(50),\
    username varchar(50),\
    password varchar(30)\
);
`);

// CREATE TABLE users
// (
//     id int primary key autoincrement,
//     full_name varchar(50),
//     username varchar(50),
//     password varchar(30)
// );
// );

// // Seed
db.exec(
  `
INSERT INTO users (full_name, username, password)
VALUES ('Carlo', 'carlo', 'wordy'),
('Andrea', 'andrea', 'andy');
`
);

db.exec(`
INSERT INTO todos (text, user_id)
VALUES ('Do laundry', 1)
`);
db.exec(`
INSERT INTO todos (text, user_id)
VALUES ('Do More Laundry', 1)
`);
db.exec(`
INSERT INTO todos (text, user_id)
VALUES ('Date', 1)
`);

const stuff = db
  .query("SELECT * FROM todos INNER JOIN users ON users.id = todos.user_id")
  .all();

console.log(stuff);
