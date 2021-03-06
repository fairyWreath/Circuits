import React, { Component } from "react";
import {HEIGHT, WIDTH } from "./constants";

// set up 2d circuit

const base = [];
for (var i = 0; i < HEIGHT; i++) {
    var curr = [];
    for (var j = 0; j < WIDTH; j++) {
        curr.push(2);
    }
    base.push(curr);
}

class ElecComponent extends React.Component {
    render() {
        return (
          <button className="square">
            {/* TODO */}
          </button>
        );
    }
}


class Circuit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    // class method to render an component
    renderComponent(i) {
        return <ElecComponent />;
    }

    render() {
        return (
            <div>
            HELLO
            </div>
        );
    }
}

class Generate extends React.Component {
    render() {
      return (
        <button className="square">
          
        </button>
      );
    }
}

class Submit extends React.Component {

}
