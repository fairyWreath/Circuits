import React from "react";

import {Button, Grid, TextField, Box, Typography, Container, withStyles, spacing} from '@material-ui/core';

export default class InfoBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

    return () {
        <div>
             <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing = {3}
            >

            <Grid item container justify="center" spacing ={3}>
                <Grid item>
                    Previous Answer
                </Grid>
            </Grid>

            <Grid item>
                <Button variant="contained" color="primary">
                    Show Answer
                </Button>
            </Grid>

            </Grid>
        </div>


    }

}