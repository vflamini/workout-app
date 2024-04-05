const express = require("express");
const app = express();
const port = process.env.port || 5000;
const util = require("util");
const path = require("path");
const bodyParser = require('body-parser');
const exec = util.promisify(require("child_process").exec);
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')))

const db = require('./config/db');

app.use(bodyParser.json());

// Middleware to enable CORS
app.use((req, res, next) => {
   // Set headers to allow all origins
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/get/:table/:col/:value', (req,res) => {
	const table = req.params.table;
	const col = req.params.col;
	const value = req.params.value;
	db.query('SELECT * FROM ?? WHERE ?? = ?', [table, col, value], (err,result) => {
		if (err) {
			console.log(err);
		}
		res.send(result);
  })
})

app.get('/api/getcol/:getcol/:table/:col/:value', (req,res) => {
	const table = req.params.table;
	const col = req.params.col;
	const value = req.params.value;
  const getCol = req.params.getcol;
	db.query('SELECT ? FROM ?? WHERE ?? = ?', [getCol, table, col, value], (err,result) => {
		if (err) {
			console.log(err);
		}
		res.send(result);
  })
})

// app.get('/api/getguesses/:wordleid/:playername', (req,res) => {
//   const wordle_id = req.params.wordleid;
//   const player_name = req.params.playername
//   db.query('SELECT * FROM guesses WHERE wordle_id = ? AND player_name = ?', [wordle_id, player_name], (err,result) => {
//     if (err) {
//       console.log(err);
//     }
//     res.send(result);
//   })
// })

app.post('/api/update/:table/:col/:value/:id/:target', (req,res) => {
  const table = req.params.table;
  const col = req.params.col;
  const value = req.params.value;
  const id = req.params.id;
  const target = req.params.target;

  db.query(`UPDATE ?? SET ?? = ? WHERE ?? = ?`, [table, col, value, id, target], (err,result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  })
})

app.post('/api/increment/:table/:col/:id/:target', (req,res) => {
  const table = req.params.table;
  const col = req.params.col;
  const id = req.params.id;
  const target = req.params.target;

  db.query(`UPDATE ?? SET ?? = ?? + 1 WHERE ?? = ?`, [table, col, col, id, target], (err,result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  })
})


app.post('/api/insert/:table/:col/:value', (req,res) => {
  const table = req.params.table;
  const col = req.params.col;
  const value = req.params.value;

  db.query('INSERT INTO ?? (??) VALUES (?)', [table, col, value], (err,result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  })
})

app.post('/api/insertfull/:table', (req,res) => {
  const table = req.params.table;
  const data = req.body;
  console.log(data);
  const columns = Object.keys(data).join(', ');
  const values = Object.values(data);
  const placeholders = new Array(values.length).fill('?').join(', ');

  db.query(`INSERT INTO ?? (${columns}) VALUES (${placeholders})`, [table, ...values], (err,result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  })
})

app.listen(port, () => {console.log(`Server is running on ${port}`)});