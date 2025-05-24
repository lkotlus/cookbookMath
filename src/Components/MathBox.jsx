import React from "react";

const getTerm = function(val, varName) {
    if (val === 0) {
        return (<mi></mi>);
    }
    else if (Math.abs(val) !== 1) {
        return (
            // Super uggo
            <mi><mo>{varName !== 'x' ? (val > 0 ? '+' : '-') : (val > 0 ? '' : '-')}</mo><mi>{Number(Math.abs(val.toFixed(2)))}</mi><mi>{varName}</mi></mi>
        );
    }
    return (
        <mi><mo>{varName !== 'x' ? (val > 0 ? '+' : '-') : (val > 0 ? '' : '-')}</mo><mi>{varName}</mi></mi>
    );
}

const MathBox = function(props) {
    if (!props.calc) {
        return (
            <div id="mathDiv"></div>
        );
    }

    const xTerm = getTerm(props.cp.x, "x");
    const yTerm = getTerm(props.cp.y, "y");
    const zTerm = getTerm(props.cp.z, "z");

    const result = Number((props.cp.x*props.p.x + props.cp.y*props.p.y + props.cp.z*props.p.z).toFixed(2));

    return (
        <div id="mathDiv">
            <math xmlns="http://www.w3.org/1998/Math/MathML">
                {xTerm}
                {yTerm}
                {zTerm}
                <mo>=</mo>
                <mi>
                    <mo>
                        {result >= 0 ? '' : '-'}
                    </mo>
                    <mi>
                        {Math.abs(result)}
                    </mi>
                </mi>
            </math>
        </div>
    );
}

export default MathBox;
