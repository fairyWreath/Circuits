// import { usolve } from 'mathjs'

export default class CircuitGraph {

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

    generateGraph(array, nodes) {
        // we create an adjacency list based on our nodes
        var twoDNodes = [];
        var count = 0;
        for(let i = 0; i < array.size(); i++) {
            for(let j = 0; j < array[0].size(); j++) {
                twoDNodes[i][j] = count;
                count++;
            }
        }

        // traverse our 2d array only visiting even th column in even th row(starting from 0)
        count = 0;
        var cols = array[0].length;
        var rows = array[0].length;

        var adjList = [];

        for(let i = 0; i < array.size(); i += 2) {
            for(let j = 0; j < array.size(); j += 2) {
                var current = twoDNodes[i][j];  // get current node default value
                // awlays check to the right and bottom
                
                // check to the right
                if (j < cols - 1) {
                    // if there is a wire between two nodes
                    if (array[i][j + 1] == 0) {
                        twoDNodes[i][j + 1] = current;
                    }
                    else if (array[i][j + 1] != -1) {
                        var conn = twoDNodes[i][j + 1];
                        
                        if (!adjList[current]) adjList[current] = [];
                        adjList[current].push(conn);
                        
                        if (!adjList[conn]) adjList[conn] = [];
                        adjList[conn].push(current);
                    }
                }

                // check bottom
                if (i < rows - 1) {
                    if (array[i + 1][j] == 0) {
                        twoDNodes[i + 1][j] = current;
                    }
                    else if (array[i + 1][j] != -1) {
                        var conn = twoDNodes[i + 1][j];
                        
                        if (!adjList[current]) adjList[current] = [];
                        adjList[current].push(conn);
                        
                        if (!adjList[conn]) adjList[conn] = [];
                        adjList[conn].push(current);
                    }
                }

            }
        }

        console.log(adjList);
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


export function generateRandom(row = 0, col = 0) {
    var res = [];

    var intRow = row;
    var intCol = col;
    if (row == 0)
        intRow = randomIntFromInterval(3, 5);
    
    if (col == 0)
        intCol = randomIntFromInterval(3, 5);

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
                    var intRand = randomIntFromInterval(-1, 3);
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
                    var intRand = randomIntFromInterval(-1, 3);
                    res[i][j] = intRand;
                }
            }
            
        }
    }


    return res;
}


export function generateGraph(array, nodesRow, nodesCol) {
    // we create an adjacency list based on our nodes
    var twoDNodes = [];
    var count = 0;
    for(let i = 0; i < nodesRow; i++) {
        twoDNodes[i] = [];
        for(let j = 0; j < nodesCol; j++) {
            twoDNodes[i][j] = count;
            count++;
        }
    }

    // traverse our 2d array only visiting even th column in even th row(starting from 0)
   console.log(twoDNodes);
    var cols = array[0].length;
    var rows = array.length;

    var adjList = [];
    var j = 0;
    var i = 0;
    count = 0 ;
    for(let ii = 0; ii < rows; ii += 2) {
        j = 0;
        for(let jj = 0; jj < cols; jj += 2) {
            var current = twoDNodes[i][j];  // get current node default value
            // awlays check to the right and bottom
            
            // check to the right
            if (jj < cols - 1) {
                // if there is a wire between two nodes
                if (array[ii][jj + 1] == 0) {

                    twoDNodes[i][j + 1] = current;
                    // next node becomes current node
                }
                else if (array[ii][jj + 1] != -1) {
                    var conn = twoDNodes[i][j + 1];
                    
                    if (!adjList[current]) adjList[current] = [];
                    adjList[current].push(conn);
                    
                    if (!adjList[conn]) adjList[conn] = [];
                    adjList[conn].push(current);
                }
            }

            // check bottom
            if (ii < rows - 1) {
                if (array[ii + 1][jj] == 0) {
                    twoDNodes[i + 1][j] = current;
                }
                else if (array[ii + 1][jj] != -1) {
                    var conn = twoDNodes[i + 1][j];
                    
                    if (!adjList[current]) adjList[current] = [];
                    adjList[current].push(conn);
                    
                    if (!adjList[conn]) adjList[conn] = [];
                    adjList[conn].push(current);
                }
            }
            j++;
        }
        i++;
    }

    console.log(adjList);
}

// var test = generateRandom(3, 4);
// console.log(test);

var testlist = [[ 0, 2, 0, 0, 0 ],
[ 0, -1, -1, -1, 1 ],
[ 0, 1, 0, 0, 0 ],
[ 0, -1, 1, -1, 1 ],
[ 0, 1, 0, 0, 0 ]];

generateGraph(testlist, 3, 3);