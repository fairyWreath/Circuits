// import { usolve } from 'mathjs'

class CircuitGraph {

    constructor(nodes) {
        this.adjacencyMatrix = {};
        this.nodes = nodes;
        this.resistors = {};
        this.vSources = {};
        this.nodeValues = {};

        for(let i = 0; i < nodes; i++) {
            this.adjacencyMatrix[i] = [];
            for(let j = 0; j < nodes; j++) {
                this.adjacencyMatrix[i].push(0);
            }
        }
    
        for(let i = 0; i < nodes; i++) {
            this.resistors[i] = [];
            for(let j = 0; j < nodes; j++) {
                this.resistors[i].push(0);
            }
        }

        for(var i = 0; i < nodes; i++) {
            this.vSources[i] = [];
            for(var j = 0; j < nodes; j++) {
                this.vSources[i].push(0);
            }
        }

    }

    addEdge(source, destination) {
        this.adjacencyMatrix[source][destination] = 1;
        this.adjacencyMatrix[destination][source] = 1;
    }

    // 2 for resistor
    addResistor(source, destination){
        this.resistors[source][destination] = 1;
        this.resistors[destination][source] = 1;
    }

    // 3 for voltage source
    addVSource(source, destination) {
        this.vSources[source][destination] = 1;
        this.vSources[destination][source] = 1;
    }

    resetCircuit(nodes = this.nodes) {
        for(let i = 0; i < nodes; i++) {
            this.adjacencyMatrix[i] = [];
            for(let j = 0; j < nodes; i++) {
                this.adjacencyMatrix[i].push(0);
            }
        }

        for(let i = 0; i < nodes; i++) {
            this.resistors[i] = [];
            for(let j = 0; j < nodes; i++) {
                this.resistors[i].push(0);
            }
        }

        for(var i = 0; i < nodes; i++) {
            this.vSources[i] = [];
            for(var j = 0; j < nodes; i++) {
                this.vSources[i].push(0);
            }
        }

        this.nodes = nodes;
    }

    printCircuit() {
        for(let i = 0; i < this.nodes; i++) {
           console.log(this.adjacencyMatrix[i]);
        }
    }




    generate(nodes, components) {

    }

    solve() {

    }

    getRandomeNodeValue() {


        var name = "";

        // return pair of name and value
        return [name, 0];
    }

    getQuestion(nodes, components) {
        this.generate(nodes, components);
        this.solve();
        return this.getRandomeNodeValue;
    }
}




function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}


export function generateRandom() {
    var res = [];

    var intRow = randomIntFromInterval(5, 5);
    var intCol = randomIntFromInterval(5, 5);

    console.log(intRow);
    console.log(intCol);

    // -1 for no wire
    // number 0 for a node or a wire
    // 1 for resistor
    // 10 for power source
    // 2 for inductor
    // 3 for capacitor

    for (let i = 0; i < intRow * 2 - 1; i++) {
        var startIsNode = false;
        if (i % 2 == 0) startIsNode = true;
        res[i] = [];
        for (let j = 0; j < intCol * 2 - 1; j++) {
            if (i == 0 && j == 1) {
                res[i][j] = 10;
                continue;
            }

            if (startIsNode) {
                if (j % 2 == 0) {
                    res[i][j] = 0;
                }
                else {
                    var intRand = randomIntFromInterval(0, 3);
                    res[i][j] = intRand;
                }
            }

            else {
                if (i == 1 && j == 0) {
                    res[i][j] = 0;
                    continue;
                }

                if (j % 2 != 0) {
                    res[i][j] = -1;
                }
                else {
                    var intRand = randomIntFromInterval(0, 3);
                    res[i][j] = intRand;
                }
            }
            
        }
    }


    return res;
}




var test = generateRandom();
console.log(test);