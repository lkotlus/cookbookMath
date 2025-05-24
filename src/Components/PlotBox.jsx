import React from "react";
import Plot from "react-plotly.js";

const PlotBox = function(props) {
    if (!props.calc) {
        return (
            <div id="plot"></div>
        );
    }

    console.log(props.data);

    return (
        <div id="plot">
            <Plot 
                data = {[
                    {
                        x: [props.p1.x, props.p2.x, props.p3.x],
                        y: [props.p1.y, props.p2.y, props.p3.y],
                        z: [props.p1.z, props.p2.z, props.p3.z],
                        mode: 'markers',
                        marker: {
                            size: 5
                        },
                        showlegend: false,
                        showscale: false,
                        modebardisplay: false,
                        type: 'scatter3d'
                    },
                    {
                        x: props.data.x,
                        y: props.data.y,
                        z: props.data.z, 
                        type: 'surface',
                        showlegend: false,
                        showscale: false,
                        modebardisplay: false,
                        opacity: 0.9
                    }
                ]}
                layout = {{
                    autosize: false,
                    height: window.screen.height*0.7,
                    width: window.screen.width*0.7,
                    showlegend: false,
                    modebardisplay: false,
                    margin: {
                        autoexpand: false,
                        b: 10,
                        r: 10,
                        l: 10,
                        t: 10
                    },
                    scene: {
                        camera: {
                            up: {
                                x: 0, y: 0, z: 1
                            },
                            center: {
                                x: 0, y: 0, z: 0
                            },
                            eye: {
                                x:1.25, y:1.25, z:0.1
                            }
                        },
                        aspectratio: {
                            x: .4,
                            y: .4,
                            z: .4
                        }
                    },
                    font: {
                        color: "#bdbdbd"
                    },
                    xaxis: {
                        tickcolor: "#bdbdbd",
                        gridcolor: "#bdbdbd",
                        zerolinecolor: "#bdbdbd"
                    },
                    yaxis: {
                        tickcolor: "#bdbdbd",
                        gridcolor: "#bdbdbd",
                        zerolinecolor: "#bdbdbd"
                    },
                    zaxis: {
                        tickcolor: "#bdbdbd",
                        gridcolor: "#bdbdbd",
                        zerolinecolor: "#bdbdbd"
                    },
                    paper_bgcolor: "#2c2c2c"
                }}
            />
        </div>
    );
}

export default PlotBox;
