import React from "react";
import PointCord from "./PointCord";

class Point extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            p: {
                x: Math.floor(Math.random() * 9) + 1,
                y: Math.floor(Math.random() * 9) + 1,
                z: Math.floor(Math.random() * 9) + 1,
            }
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(type, val) {
        let obj = this.state;
        obj.p[type] = Number(val.toString().replace(/[a-zA-Z]/g, '').slice(0,2));

        this.setState(obj);
    }

    render() {
        const id = `p${this.props.n}`;

        return (
            <div id={id} className="pointDiv">
                <p>
                    Point {this.props.n}: (
                        <PointCord id={id} type="x" value={this.state.p.x} handleChange={this.handleChange}/>,
                        <PointCord id={id} type="y" value={this.state.p.y} handleChange={this.handleChange}/>,
                        <PointCord id={id} type="z" value={this.state.p.z} handleChange={this.handleChange}/>
                    )
                </p>
            </div>
        );
    }
}

export default Point;
