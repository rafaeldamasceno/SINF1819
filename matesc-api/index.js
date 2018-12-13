const express = require('express')
const app = express()
const port = 3001

const warehouse = require('./warehouse')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({
	pickingWaves:[],
	resupplyWaves:[]
}).write()

app.get('/picking-wave', (req, res) => 
	{
		let results = {}
		results.waveId = db.get('pickingWaves').size().value() + 1
		db.get('pickingWaves').push({id:results.waveId}).write()
		res.send(results)
	})
	
app.get('/resupply-wave', (req, res) => 
	{
		let results = {}
		results.waveId = db.get('resupplyWaves').size().value() + 1
		db.get('resupplyWaves').push({id:results.waveId}).write()
		res.send(results)
	})
	
app.get('/picking-wave/:id', (req, res) => 
	{
		let results = {}
		results = db.get('pickingWaves').find({id:parseInt(req.params.id)}).value()
		res.send(results)
	})
	
app.get('/resupply-wave/:id', (req, res) => 
	{
		let results = {}
		results = db.get('resupplyWaves').find({id:parseInt(req.params.id)}).value()
		res.send(results)
	})
	
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

console.log(warehouse.path('PC', '53', { cost: true }));