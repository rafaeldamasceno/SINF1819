const graph = require('node-dijkstra')
const warehouse = new graph()

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

function perm(xs) {
	let ret = [];

	for (let i = 0; i < xs.length; i = i + 1) {
		let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

		if (!rest.length) {
			ret.push([xs[i]])
		} else {
			for (let j = 0; j < rest.length; j = j + 1) {
				ret.push([xs[i]].concat(rest[j]))
			}
		}
	}
	return ret;
}

function getPath(nodes) {
	nodes.push('PC')

	let paths = {}

	for (let i = 0; i < nodes.length; i++) {
		for (let j = i + 1; j < nodes.length; j++) {
			paths[`${nodes[i]}-${nodes[j]}`] = warehouse.path(nodes[i], nodes[j], { cost: true })
			paths[`${nodes[j]}-${nodes[i]}`] = warehouse.path(nodes[j], nodes[i], { cost: true })
		}
	}

	nodes.pop()

	let perms = perm(nodes)
	let minimumCost = Number.MAX_SAFE_INTEGER
	let bestPath = []

	perms.forEach(perm => {
		let cost = 0
		cost += paths[`PC-${perm[0]}`]['cost']
		for (let i = 0; i < perm.length - 1; i++) {
			cost += paths[`${perm[i]}-${perm[i + 1]}`]['cost']
		}
		cost += paths[`${perm[perm.length - 1]}-PC`]['cost']
		if (cost < minimumCost) {
			minimumCost = cost
			bestPath = perm
		}
	})

	return bestPath
}

function splitWaves(items, maxWeight, maxVolume) {
	let splitWaves = [];

	
	
	return splitWaves;
}

module.exports = {
	graph: warehouse,
	getPath: getPath,
	splitWaves: splitWaves
}