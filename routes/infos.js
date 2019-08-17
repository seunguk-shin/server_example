var express = require('express');
var router = express.Router();

const mysql = require('mysql');

const connection = mysql.createConnection(
  {
    host: "18.220.114.235",//"localhost",
    user: "satoshin",
    password: "satoshin",
    database: "test_db"
  }
);

connection.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});

/* GET users listing. */
router.get('/selectall', function(req, res) {
  //res.send('respond with a resource');
  //res.json([{id:1, body:"query to"}, {id:2, body:" database"}]);
  //lower_case_table_names problem...
  connection.query(
    'SELECT * FROM user_info',
    (err, rows, field) => {
      console.log(rows);
      if (err) throw err;
      res.send(rows);
    }
  );
});

router.get('/selectmaxid', function(req, res) { 
  connection.query(
    'SELECT MAX(ID) + 1 as max FROM user_info',
    (err, rows, field) => {
      console.log(rows);
      if (err) throw err;
      res.send(rows);
    }
  );
});

router.post('/createuser', function(req, res) {
  let sql = 'INSERT INTO USER_INFO(ID, EMAIL, NAME, PHONE, ADDRESS) VALUES (?,?,?,?,?)';
  let param = [
    req.body.id, 
    req.body.email,
    req.body.name,
    req.body.phone,
    req.body.addr
  ];

  console.log(param);
  connection.query(sql, param,
    (err, rows, field) => {
      console.log(rows);
      if (err) throw err;
      res.send(rows);
    }
  );
});

router.post('/deleteuser', function(req, res) {
  let sql = 'DELETE FROM USER_INFO WHERE ID = ?';
  let param = [req.body.id_];

  console.log(param);

  connection.query(sql, param,
    (err, rows, field) => {
      console.log(rows);
      if (err) throw err;
      res.send(rows);
    }
  );
});

module.exports = router;
