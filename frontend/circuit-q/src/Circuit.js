import React from "react";
import {HEIGHT, WIDTH} from "./constants";
import ElecComponent from "./ElecComponent";
import "./style.css";
// import "./draw.js";
import Canvas from "./Canvas";

import {Button, Grid, TextField} from '@material-ui/core';

// set up 2d circuit
const arr = new Array(HEIGHT ** WIDTH).fill(2);

// fill arr from circuit information

export default class Circuit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eleComponents: [],
        };
    }

    drawCircuit(array) {

    }

    componentDidMount() {
        const eleComponents = [];
        var count = 0;
        for (let i = 0; i < HEIGHT; i++) {
            const row = [];
            for (let j = 0; j < WIDTH; j++) {
                row.push(count);
                count += 1;
            }
            eleComponents.push(row);
        }

        this.setState({eleComponents});
    }
    
    // class method to render an component
    renderComponent(i) {
        return <ElecComponent />;
    }

    render() {
        const {eleComponents} = this.state;

        return (
            <div>
            {/* {this.state.eleComponents.map(row => (
                <div>
                    {row.map(comp => (
                        <div>
                            {comp}
                        </div>
                    ))}
                    row done
                </div>
            ))} */}

            <div>
                <Canvas />
                {window.innerWidth}<br></br>
                {window.innerHeight}
            </div>

            <Button variant="contained" color="primary">
                New Circuit
            </Button>

            <Button variant="contained" color="primary">
                Submit
            </Button>


            <form>
                <TextField id="outlined-basic" label="Answer" variant="outlined" /> 
            </form>

            </div>
            
        );
    }
}

