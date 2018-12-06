const express = require('express')
const app = express()
const port = 3001

const graph = require('node-dijkstra')
const warehouse = new graph()

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

warehouse.addNode('PC', {
    '11': 1,
    '21': 1,
    '31': 1,
    '41': 1,
    '51': 1,
})

warehouse.addNode('11', {
    'PC': 1,
    '12': 1,
    '21': 1,
    '22': 1
})

console.log(warehouse.path('PC', '12'));
