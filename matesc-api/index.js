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
	results.finished = false
	results.waves = warehouse.createWaves(req.body)
	db.get('pickingWaves').push(results).write()
	db.update('pickingCount', n => n + 1).write()
	res.send(results)
})

app.post('/resupply-wave', (req, res) => {
	let results = {}
	results.id = db.get('resupplyCount').value() + 1
	results.timestamp = new Date().toLocaleString()
	results.finished = false
	results.waves = warehouse.createWaves(req.body, true)
	db.get('resupplyWaves').push(results).write()
	db.update('resupplyCount', n => n + 1).write()
	res.send(results)
})

app.get('/picking-wave', (req, res) => {
	let pickingWaves = db.get('pickingWaves').value()
	res.send(pickingWaves)
})

app.get('/picking-wave/unfinished', (req, res) => {
	let pickingWaves = db.get('pickingWaves').filter({ finished: false }).value()
	res.send(pickingWaves)
})

app.get('/resupply-wave', (req, res) => {
	let resupplyWaves = db.get('resupplyWaves').value()
	res.send(resupplyWaves)
})

app.get('/picking-wave/:id', (req, res) => {
	let resupplyWaves = db.get('resupplyWaves').filter({ finished: false }).value()
	res.send(resupplyWaves)
})

app.get('/resupply-wave/:id', (req, res) => {
	let results = {}
	results = db.get('resupplyWaves').find({ id: parseInt(req.params.id) }).value()
	res.send(results)
})

app.put('/picking-wave/:id', (req, res) => {
	db.get('pickingWaves').find({ id: parseInt(req.params.id) }).assign({ finished: true }).write()
	res.send(true)
})

app.put('/resupply-wave/:id', (req, res) => {
	db.get('resupplyWaves').find({ id: parseInt(req.params.id) }).assign({ finished: true }).write()
	res.send(true)
})

app.listen(port, () => console.log(`MATESC API listening on port ${port}!`))