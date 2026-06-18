const { Client } = require("pg");

const client = new Client({
  connectionString:
    "postgresql://admin:admin@localhost:5432/centro_cultural",
});

client.connect()
  .then(() => {
    console.log("CONECTOU");
    return client.end();
  })
  .catch(err => {
    console.error(err);
  });
