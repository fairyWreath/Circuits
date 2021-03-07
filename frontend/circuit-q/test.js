// import { usolve } from 'mathjs'
 class CircuitGraph {

    constructor(rows, cols) {
        this.adjacencyMatrix = {};
        this.adjacencyList = [];
        this.rows = rows;
        this.cols = cols;
        this.resistors = {};
        this.vSources = {};
        this.nodeValues = {};

        for(let i = 0; i < rows; i++) {
            this.adjacencyMatrix[i] = [];
            for(let j = 0; j < cols; j++) {
                this.adjacencyMatrix[i].push(0);
            }
        }
    
        for(let i = 0; i < rows; i++) {
            this.resistors[i] = [];
            for(let j = 0; j < cols; j++) {
                this.resistors[i].push(0);
            }
        }

        for(var i = 0; i < rows; i++) {
            this.vSources[i] = [];
            for(var j = 0; j < cols; j++) {
                this.vSources[i].push(0);
            }
        }

    }

    addEdge(source, destination) {
        this.adjacencyMatrix[source][destination] = 1;
        this.adjacencyMatrix[destination][source] = 1;
    }

    // 1 for resistor
    // 2 resistors between nodes are ALWAYS IN PARALLEL
    addResistor(source, destination){
        this.resistors[source][destination] = 1;
        this.resistors[destination][source] = 1;
    }

    // 10 for voltage source
    addVSource(source, destination) {
        this.vSources[source][destination] = 1;
        this.vSources[destination][source] = 1;
    }

    resetCircuit(nodes = this.nodes) {
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

        this.nodes = nodes;
    }

    printCircuit() {
        console.log(this.adjacencyMatrix);
        console.log(this.resistors);
        console.log(this.vSources);
    }

    generateGraph(array, nodesRow, nodesCol) {
        var twoDNodes = [];
        var count = 0;
        for(let i = 0; i < nodesRow; i++) {
            twoDNodes[i] = [];
            for(let j = 0; j < nodesCol; j++) {
                twoDNodes[i][j] = count;
                count++;
            }
        }
        var cols = array[0].length;
        var rows = array.length;
        var j = 0;
        var i = 0;
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
                    }
                }
    
                // check bottom
                if (ii < rows - 1) {
                    if (array[ii + 1][jj] == 0) {
                        twoDNodes[i + 1][j] = current;
                    }
                }
    
                // check up, change up
                if (ii > 0) {
                    if (array[ii - 1][jj] == 0) {
                        twoDNodes[i - 1][j] = current;
                    }
                }
    
                j++;
            }
            i++;
        }
    
        console.log(twoDNodes);
    
        // reduce all nodes numbers
        var n = 0;
        var hashmap = [];
        for(let i = 0; i < nodesRow; i++) {
            for(let j = 0; j < nodesCol; j++) {
               if (twoDNodes[i][j] > n) {
                   if (hashmap[twoDNodes[i][j]]) {
                        twoDNodes[i][j] = hashmap[twoDNodes[i][j]];
                   }
                   else {
                       n++;
                       hashmap[twoDNodes[i][j]] = n;
                       twoDNodes[i][j] = hashmap[twoDNodes[i][j]];
                   }
               }
            }
        }
    
        console.log(twoDNodes);
        // now create our adjacency list
        this.resetCircuit(n + 1);       // set our new adjacency matrix
        
        j = 0;
        i = 0;
        
        for(let ii = 0; ii < rows; ii += 2) {
            j = 0;
            for(let jj = 0; jj < cols; jj += 2) {
                if (jj < cols - 1) {
                    // more than 0 means not a short circuit and connect
                    if (array[ii][jj + 1] > 0) {
                        var connector = array[ii][jj + 1];
                        var source = twoDNodes[i][j];
                        var dest = twoDNodes[i][j + 1];
                        if (source !== dest) {
                            this.addEdge(source, dest);
                            if (connector === 1) {
                                this.addResistor(source, dest);
                            }
                            else if (connector === 10) {     // v source
                                this.addVSource(source, dest);
                            }
                        }
                    }
                }
    
                // check bottom
                if (ii < rows - 1) {
                    if (array[ii + 1][jj] > 0) {
                        var connector = array[ii + 1][jj];
                        var source = twoDNodes[i][j];
                        var dest = twoDNodes[i+ 1][j];
                        if (source !== dest) {
                            if (connector === 1) {
                                this.addResistor(source, dest);
                            }
                            else if (connector === 10) {     // v source
                                this.addVSource(source, dest);
                            }
                        }
                    }
                }
                j++;
            }
            i++;
        }
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


function generateRandom(row = 0, col = 0) {
    var res = [];

    var intRow = row;
    var intCol = col;
    if (row === 0)
        intRow = randomIntFromInterval(3, 5);
    
    if (col === 0)
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
        if (i % 2 === 0) startIsNode = true;
        res[i] = [];
        for (let j = 0; j < intCol * 2 - 1; j++) {
            if (i === 0 && j === 1) {
                res[i][j] = 10;
                continue;
            }

            if (startIsNode) {
                if (j % 2 === 0) {
                    res[i][j] = 0;
                }
                else {
                    var intRand = randomIntFromInterval(-1, 1);
                    res[i][j] = intRand;
                }
            }

            else {
                if (i === 1 && j === 0) {
                    res[i][j] = 0;
                    continue;
                }

                if (j % 2 !== 0) {
                    res[i][j] = -1;
                }
                else {
                    var intRand = randomIntFromInterval(-1, 1);
                    res[i][j] = intRand;
                }
            }
            
        }
    }
    return res;
}

// var testlist = generateRandom(3, 3);
// console.log(testlist);

var testlist = [[ 0, 10, 0, 0, 0 ],
[ 0, -1, -1, -1, 1 ],
[ 0, 1, 0, 0, 0 ],
[ 0, -1, 1, -1, 1 ],
[ 0, 1, 0, 0, 0 ]];

// var testlist2 = [[ 0, 10, 0, -1, 0 ],
// [ 0, -1, 0, -1, 1 ],
// [ 0, 0, 0, 3, 0 ],
// [ 3, -1, 0, -1, 3 ],
// [ 0, -1, 0, 2, 0 ]];

var cg = new CircuitGraph(3);
cg.generateGraph(testlist, 3, 3);
cg.printCircuit();

// generateGraph(testlist2, 3, 3);

