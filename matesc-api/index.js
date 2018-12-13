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

warehouse.addNode('12', {
	'11': 1,
	'13': 1,
	'21': 1,
	'22': 1,
	'23': 1
})

warehouse.addNode('13', {
	'12': 1,
	'22': 1,
	'23': 1
})

warehouse.addNode('21', {
	'PC': 1,
	'11': 1,
	'12': 1,
	'22': 1,
	'31': 1,
	'32': 1
})

warehouse.addNode('22', {
	'11': 1,
	'12': 1,
	'13': 1,
	'21': 1,
	'23': 1,
	'31': 1,
	'32': 1,
	'33': 1
})

warehouse.addNode('23', {
	'12': 1,
	'13': 1,
	'22': 1,
	'32': 1,
	'33': 1
})

warehouse.addNode('31', {
	'PC': 1,
	'21': 1,
	'22': 1,
	'32': 1,
	'41': 1,
	'42': 1
})

warehouse.addNode('32', {
	'21': 1,
	'22': 1,
	'23': 1,
	'31': 1,
	'33': 1,
	'41': 1,
	'42': 1,
	'43': 1
})

warehouse.addNode('33', {
	'22': 1,
	'23': 1,
	'32': 1,
	'42': 1,
	'43': 1
})

warehouse.addNode('41', {
	'PC': 1,
	'31': 1,
	'32': 1,
	'42': 1,
	'51': 1,
	'52': 1
})

warehouse.addNode('42', {
	'31': 1,
	'32': 1,
	'33': 1,
	'41': 1,
	'43': 1,
	'51': 1,
	'52': 1,
	'53': 1
})

warehouse.addNode('43', {
	'32': 1,
	'33': 1,
	'42': 1,
	'52': 1,
	'53': 1
})

warehouse.addNode('51', {
	'PC': 1,
	'41': 1,
	'42': 1,
	'52': 1
})

warehouse.addNode('52', {
	'41': 1,
	'42': 1,
	'43': 1,
	'51': 1,
	'53': 1
})

warehouse.addNode('53', {
	'42': 1,
	'43': 1,
	'52': 1
})

console.log(warehouse.path('PC', '12'));
