import React from "react";

class PointCord extends React.Component {
    constructor(props) {
        super(props);

        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        this.props.handleChange(this.props.type, e.target.value);
    }

    render() {
        const id = `${this.props.id}${this.props.type}`;

        return (
            <input className="pointCord" id={id} step="1" value={this.props.value} onChange={this.handleInput} maxLength="2"/>
        );
    }
}

export default PointCord;
