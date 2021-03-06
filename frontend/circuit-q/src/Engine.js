class CircuitGraph {

    constructor(nodes) {
        this.adjacencyMatrix = {};
        this.nodes = nodes;
        this.resistors = {};
        this.vSources = {};

        for(let i = 0; i < nodes; i++) {
            this.adjacencyMatrix[i] = [];
            for(let j = 0; j < nodes - 1; j++) {
                this.adjacencyMatrix[i].push(0);
            }
        }
    
        for(let i = 0; i < nodes; i++) {
            this.resistors[i] = [];
            for(let j = 0; j < nodes - 1; j++) {
                this.resistors[i].push(0);
            }
        }

        for(var i = 0; i < nodes; i++) {
            this.vSources[i] = [];
            for(var j = 0; j < nodes - 1; j++) {
                this.vSources[i].push(0);
            }
        }

    }

    addEdge(source, destination) {
        this.adjacencyList[source][destination] = 1;
        this.adjacencyList[destination][source] = 1;
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
            for(let j = 0; j < nodes - 1; i++) {
                this.adjacencyMatrix[i].push(0);
            }
        }

        for(let i = 0; i < nodes; i++) {
            this.resistors[i] = [];
            for(let j = 0; j < nodes - 1; i++) {
                this.resistors[i].push(0);
            }
        }

        for(var i = 0; i < nodes; i++) {
            this.vSources[i] = [];
            for(var j = 0; j < nodes - 1; i++) {
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
}


let CG = new CircuitGraph(5);

CG.printCircuit();

