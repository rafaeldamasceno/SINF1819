const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3001

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

const warehouse = require('./warehouse')

db.defaults({
	pickingWaves: [],
	resupplyWaves: []
}).write()

app.use(cors())
app.use(bodyParser.text())

app.post('/picking-wave', (req, res) => {
	console.log(JSON.parse(req.body))

	let results = {}
	results.waveId = db.get('pickingWaves').size().value() + 1
	db.get('pickingWaves').push({ id: results.waveId }).write()
	res.send(results)
})

app.post('/resupply-wave', (req, res) => {
	let results = {}
	results.waveId = db.get('resupplyWaves').size().value() + 1
	db.get('resupplyWaves').push({ id: results.waveId }).write()
	res.send(results)
})

app.get('/picking-wave/:id', (req, res) => {
	let results = {}
	results = db.get('pickingWaves').find({ id: parseInt(req.params.id) }).value()
	res.send(results)
})

app.get('/resupply-wave/:id', (req, res) => {
	let results = {}
	results = db.get('resupplyWaves').find({ id: parseInt(req.params.id) }).value()
	res.send(results)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// console.log(warehouse.getPath(['12', '53', '32', '11']))