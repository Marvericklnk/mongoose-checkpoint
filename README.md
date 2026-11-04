# Mongoose Checkpoint

Commented solutions for the GoMyCode Person schema and CRUD exercises.

## Setup

```bash
npm install
```

Copy `.env.example` to `.env` and put the connection string for a separate practice database inside quotes, without spaces around `=`:

```env
MONGO_URI="your-private-Atlas-connection-string"
```

The real `.env` is ignored by Git. No credentials are included in this repository.

## Files

- `db.js`: loads the private URI and connects with the required options.
- `models/Person.js`: required string name, numeric age, and an array of string favoriteFoods.
- `exercises.js`: all callback-based CRUD functions and the chained query.
- `demo.js`: runs the exercises in order and closes the connection.

## Run the exercises

Use a disposable practice database. The demo inserts sample records and deletes all people named Mary as required by the exercise. Repeated runs add more sample data.

```bash
npm start -- --run-exercises
```

Running `npm start` alone shows the instructions without changing a database.

## Version compatibility

Mongoose 6 is pinned because the checkpoint explicitly requires callbacks, `findByIdAndRemove()` and `Model.remove()`. Newer major versions removed these APIs. The matching MongoDB driver is included directly in package.json, alongside Mongoose and dotenv.

## Verification status

Run `npm test` for schema validation checks that do not require MongoDB. Database CRUD execution is pending a working MongoDB connection; no successful database execution is claimed. A previous attempt to start MongoDB in this workspace failed with “Operation not permitted.”
