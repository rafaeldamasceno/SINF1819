const express = require('express')
const app = express()
const port = 3001

const graph = require('node-dijkstra')
const warehouse = new graph()

app.get('/picking-wave', (req, res) => res.send('Hello World!'))

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
