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
	pickingCount: 0,
	resupplyWaves: [],
	resupplyCount: 0
}).write()

app.use(cors())
app.use(bodyParser.json())

app.post('/picking-wave', (req, res) => {
	let results = {}
	results.id = db.get('pickingCount').value() + 1
	results.timestamp = new Date().toLocaleString()
	results.waves = warehouse.createWaves(req.body)
	db.get('pickingWaves').push({ id: results.id, timestamp: results.timestamp, waves: results.waves }).write()
	db.update('pickingCount', n => n + 1).write()
	res.send(results)
})

app.post('/resupply-wave', (req, res) => {
	let results = {}
	results.waveId = db.get('resupplyCount').value() + 1
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

app.listen(port, () => console.log(`MATESC API listening on port ${port}!`))