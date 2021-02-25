const express = require('express');
const app = express();
const port = 3000;
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

const createTable =
  'CREATE TABLE IF NOT EXISTS `people`(id int(11) not null auto_increment, nome varchar(250), primary key (id));';
const insert = 'insert into people(nome) values("Guilherme");';

connection.query(createTable);
connection.query(insert);

app.get('/', (req, res) => {
  const select = 'select * from people';

  connection.query(select, function (error, results, fields) {
    if (error) throw error;

    let people = '';

    results.forEach((element) => {
      people = people + `<li>${element.nome}</li>`;
    });

    console.log(people);

    res.send(`<h1>Full Cycle Rocks!</h1>
    <ul>${people}</ul>
  `);
  });
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
