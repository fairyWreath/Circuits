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


let CG = new CircuitGraph(4);
CG.addEdge(0, 1);
CG.addEdge(0, 2);
CG.addEdge(1, 3);
CG.addEdge(2, 3);
CG.printCircuit();

