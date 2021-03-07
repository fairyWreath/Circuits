// import { usolve } from 'mathjs'

export class CircuitGraph {
    constructor(rows, cols) {
        this.adjacencyMatrix = [];
        this.adjacencyList = [];
        this.rows = rows;
        this.cols = cols;
        this.resistors = [];
        this.vSources = [];
        this.nodeValues = [];
       
        this.mst = [];
       
        this.cycles = [];

        // aux for pruning graph
        this.pruneVisited = [];
        this.cyStart = 0;
        this.cyEnd = 0;

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

        if(!this.adjacencyList[source].includes(destination)) this.adjacencyList[source].push(destination);
        if(!this.adjacencyList[destination].includes(source)) this.adjacencyList[destination].push(source);
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

        for(let i = 0; i < nodes; i++) {
            this.vSources[i] = [];
            for(var j = 0; j < nodes; j++) {
                this.vSources[i].push(0);
            }
        }

        this.adjacencyList = [];
        for(let i = 0; i < nodes; i++) {
            this.adjacencyList[i] = [];
        }


        this.nodes = nodes;
    }

    printCircuit() {
        console.log(this.adjacencyMatrix);
        console.log(this.adjacencyList);
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
    
        // console.log(twoDNodes);
    
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
    
        // console.log(twoDNodes);
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
                        // console.log("Edge between " + source + " and " + dest + 
                        // " with connector" + connector);
                        if (source !== dest) {
                            this.addEdge(source, dest);
                            if (connector === 1) {
                                this.addResistor(source, dest);
                                // console.log("added Edge between " + source + " and " + dest + 
                                // " with connector" + connector);
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

    // Prim's algorithm
    generateMST() {
        var C = [];         // already included in spanning tree
        var B = [];         // adj matrix of the spanning tree
        var A = this.adjacencyMatrix;
        
        C[0] = 1;       // first node, node 0, is already visited
        for(let i = 1; i < this.nodes; i++)
            C[i] = 0;

        // generate all zerores for resulting mst
        for(let i = 0; i < this.nodes; i++) {
            B[i] = [];
            for(let j = 0; j < this.nodes; j++) 
                B[i].push(0);
        }

        for(let i = 0; i < this.nodes; i++) {
            // if there is an edge and 2nd edge is not included in mst
            for(let j = 0; j < this.nodes; j++) {
                if (A[i][j] == 1 && C[i] == 1 && C[j] == 0) {
                    B[i][j] = 1;
                    B[j][i] = 1;
                    C[j] = 1;
                }

                if (A[i][j] == 1 && C[i] == 0 && C[j] == 1) {
                    B[i][j] = 1;
                    B[j][i] = 1;
                    C[i] = 1;
                }
            }
        }

        this.mst = B;
    }

    findCycles() {
        this.generateMST();
        var A = this.adjacencyMatrix;
        var B = this.mst;

        var C = [];     // adjacecny matrix of DISCARDED LINKS, with 1s if they are NOT INCLUDED

        for(let i = 0; i < this.nodes; i++) {
            C[i] = [];
            for(let j = 0; j < this.nodes; j++)  {
                C[i][j] = A[i][j] - B[i][j];
            }
        }

        var cycles = [];
        var k = 0;
        for(let i = 0; i < this.nodes - 1; i++) {
            for(let j = i + 1; j < this.nodes; j++)  {
                if (C[i][j] == 1) {         // if there is a discarded link
                    var Dk = this.mst;     // augmented spanning tree    
                    k++;
                    Dk[j][i] = 1;
                    Dk[i][j] = 1;

                    // console.log("Edge between" + i + " and " + j);
                
                    // prune adj matrix
                    this.cyStart = i;
                    this.cyEnd = j;
                    var res = this.pruneGraph(Dk);
               
                    cycles.push(res);

                    // revert back?
                    Dk[j][i] = 0;
                    Dk[i][j] = 0;
                }
            }
        }

        this.cycles = cycles;
        // console.log(this.mst);
        return cycles;
    }

    pruneGraph(adjMat) {
        // this.cyStart = 0;
        // this.cyEnd = 0;
        for (let i = 0; i < this.nodes; i++) {
            this.pruneVisited[i] = 0;       // set all to not visited
        }

        // if(this.detectCycle(adjMat, 0, -1)) console.log("cycle");

        return this.pruneSingle();
    }

    // do this directly after connecting, bfs quick search
    pruneSingle() {
        var q = [];

        var a = this.cyStart;
        var b = this.cyEnd;
        var A = this.adjacencyMatrix;

        var visited = [];
        for(let i = 0; i < this.nodes; i++) {
            visited[i] = 0;
        }
        var parent = [];
        for(let i = 0; i < this.nodes; i++) {
            parent[i] = -1;
        }

        q.push(a);
        var found = false;
        while(q.length != 0) {
            var node = q.shift();
            visited[node] = 1;
            for(let j = 0; j < this.nodes; j++) {
                // if there is an edge
                if (A[node][j] == 1) {
                    if(node == a && j == b) continue;   // ignore direct edge

                    if(visited[j] == 0) {
                        parent[j] = node;

                        if (j == b) {
                            found = true;
                            break;
                        }
                    }

                    q.push(j);
                    visited[j] = true;
                }
            }

            if (found) break;
        }

        var res = [];
        res.push(a);
        var x = b;

        while(x != a) {
            res.push(x);
            x = parent[x];
        }

        // console.log(res);
        return res;
    }

    // simple dfs
    detectCycle(graph, node, parent) {
        this.pruneVisited[node] = 1;
        var A = graph;

        for(let j = 0; j < this.nodes; j++) {
            if (A[node][j] == 1 && this.pruneVisited[j] == 0) {
                if (this.detectCycle(graph, j, node)) return true;
            }

            else if (A[node][j] == 1 && j != parent) {
                this.cyStart = j;
                this.cyEnd = node;
                return true;
            }
        }

        return false;
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
        intRow = randomIntFromInterval(2, 4);
    
    if (col == 0)
        intCol = randomIntFromInterval(2, 4);

    // console.log(intRow);
    // console.log(intCol);

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
                    var intRand = randomIntFromInterval(0, 1);
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
                    var intRand = randomIntFromInterval(1, 1);
                    res[i][j] = intRand;
                }
            }
            
        }
    }
    return res;
}


