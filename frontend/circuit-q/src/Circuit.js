import React from "react";
import {HEIGHT, WIDTH} from "./constants";
import "./style.css";
import Canvas from "./Canvas";
import CircuitGraph from "./Engine";

import {Button, Grid, TextField, Box, Typography, Container, withStyles, spacing} from '@material-ui/core';

const styles = theme => ({
    buttonMargin: {    
      margin: '30px',   
    },
});


var CORRECTANSWER = 50.34;

export default class Circuit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eleComponents: [],
            infoDisplayed: false,
            isCorrect: false,
            answer: '',
            lastAnswer: '',
            qVariable: ''
        };
    }

    componentDidMount() {
      
    }
    
    handleTextfield = e => {
        // console.log(e.target.value)
        this.setState({
            answer: e.target.value
        })
    }

    displayInfo = () => {
        this.setState({
           infoDisplayed: true
        })
    }

    resetInfo = () => {
        this.setState({
           infoDisplayed: false,
           isCorrect: false,
           answer: ''
        })
       
    }


    drawCircuit(array) {

    }

    checkAnswer = () =>  {
        // console.log(typeof(CORRECTANSWER));
        // console.log(this.state.answer)
       
        this.setState({
            lastAnswer: this.state.answer
        })

        if(parseFloat(this.state.answer) === CORRECTANSWER) {
            this.setState({
                isCorrect: true
             })
        }
        else {
            this.setState({
                isCorrect: false
             })  
        }
    }
    
    render() {
        let info = null;
        let correctInfo = null;

        if (this.state.infoDisplayed) {
            info = (
                <div>
                    Your Answer: {this.state.lastAnswer}
                </div>
            )

            if (this.state.isCorrect) {
                correctInfo = (
                    <div>
                        You are correct!
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={this.resetInfo}>
                                New Question
                            </Button>
                        </Grid>
                    </div>
                )
            }
            else {
                correctInfo = (
                    <div>
                        <Grid item>Incorrect! Try again </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary"  onClick={this.resetInfo}>
                                Show answer
                            </Button>
                        </Grid>
                    </div>
                )
            }

        }


        return (
            <div>
      
            <Typography color="textPrimary" gutterBottom variant="h2" align="center">
                Linear Circuits
            </Typography>

            <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing = {3}
            >

            <Grid item xs = {12}>
                <Canvas />
            </Grid>

            <Grid item>
                <h2>Find {this.state.qVariable} above</h2>
            </Grid>

            <Grid item container justify="center" spacing ={3}>
                <Grid item>
                    <form>
                        <TextField id="outlined-basic" value = {this.state.answer} onChange={this.handleTextfield}
                        label="Answer" variant="outlined" type="number"/>
                    </form>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={() => { this.checkAnswer(); this.displayInfo();}}>
                        Submit
                    </Button>
                </Grid>
            </Grid>

            

            <Grid item xs={12} align="center">
                {info}
            </Grid>

            <Grid item xs={12} align="center">
                {correctInfo}
            </Grid>
            
            </Grid>

            </div>
            
        );
    }
}

