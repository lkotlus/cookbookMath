import React from "react";
import Point from "./Components/Point";
import MathBox from "./Components/MathBox";
import PlotBox from "./Components/PlotBox.jsx";

import genData from "./Tools/graphing.jsx";

import "./style.css";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            p1: {},
            p2: {},
            p3: {},
            cp: {
                x: 0,
                y: 0,
                z: 0
            },
            calc: false
        };

        this.p1Ref = React.createRef();
        this.p2Ref = React.createRef();
        this.p3Ref = React.createRef();

        this.calculate = this.calculate.bind(this);
    }

    getVector(p1, p2) {
        return {
            x: p1.x-p2.x, 
            y: p1.y-p2.y, 
            z: p1.z-p2.z
        };
    }

    getCrossProduct(v1, v2) {
        // Calculating the components (j is negative because of Laplace's expansion for the determinant)
        const iComp = v1.y*v2.z - v1.z*v2.y;
        const jComp = (-1) * (v1.x*v2.z - v1.z*v2.x);
        const kComp = v1.x*v2.y - v1.y*v2.x;

        // Returning the vector in the form seen in getVector()
        return {
            x: iComp, 
            y: jComp, 
            z: kComp
        };
    }

    calculate() {
        let obj = this.state;
        obj.p1.x = this.p1Ref.current.state.p.x;
        obj.p1.y = this.p1Ref.current.state.p.y;
        obj.p1.z = this.p1Ref.current.state.p.z;

        obj.p2.x = this.p2Ref.current.state.p.x;
        obj.p2.y = this.p2Ref.current.state.p.y;
        obj.p2.z = this.p2Ref.current.state.p.z;

        obj.p3.x = this.p3Ref.current.state.p.x;
        obj.p3.y = this.p3Ref.current.state.p.y;
        obj.p3.z = this.p3Ref.current.state.p.z;

        this.setState(obj);

        let v1 = this.getVector(this.state.p2, this.state.p1);
        let v2 = this.getVector(this.state.p3, this.state.p1);

        let cp = this.getCrossProduct(v1, v2);

        // If we got parallel vectors...
        if (cp.x === 0 && cp.y === 0 && cp.z === 0) {
            // Try again with a different combination
            v1 = getVector(this.state.p2, this.state.p1);
            v2 = getVector(this.state.p1, this.state.p3);

            // Get the cross product again
            cp = getCrossProduct(v1, v2);

            // If we get them again, the points given are all along a straight line, thus infinite planes are possible
            // In this case, we just get sneaky and use another point
            if (cp.x === 0 && cp.y === 0 && cp.z === 0) {
                v1 = getVector(this.state.p2, this.state.p1);
                let p4 = {
                    x: this.state.p3.x, 
                    y: this.state.p3.y+1, 
                    z: this.state.p3.z
                };
                v2 = getVector(p4, this.state.p1);
                cp = getCrossProduct(v1, v2);
            }
        }

        const data = genData(cp, this.state.p1, this.state.p2, this.state.p3);

        this.setState({
            cp: cp,
            data: data,
            calc: true
        });
    }

    render() {
        return (
            <div id="fullWrapper">
                <div id="inputDiv">
                    <Point n="1" ref={this.p1Ref}/>
                    <Point n="2" ref={this.p2Ref}/>
                    <Point n="3" ref={this.p3Ref}/>
                    <div id="buttonDiv" onClick={this.calculate}>Calculate</div>
                </div>
                <MathBox calc={this.state.calc} cp={this.state.cp} p={this.state.p1}/>
                <PlotBox calc={this.state.calc} data={this.state.data} p1={this.state.p1} p2={this.state.p2} p3={this.state.p3}/>
            </div>
        );
    }
}

export default App
