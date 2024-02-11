// Gets a vector from two given points, in the form of an array.
// ai + bj + ck --> [a, b, c]
let getVector = function(p1, p2) {
    return [p1[0]-p2[0], p1[1]-p2[1], p1[2]-p2[2]];
}

// Returns the cross product of two vectors
let getCrossProduct = function(v1, v2) {
    // Calculating the components (j is negative because of Laplace's expansion for the determinant)
    let iComp = v1[1]*v2[2] - v1[2]*v2[1];
    let jComp = (-1) * (v1[0]*v2[2] - v1[2]*v2[0]);
    let kComp = v1[0]*v2[1] - v1[1]*v2[0];

    // Returning the vector in the form seen in getVector()
    return [iComp, jComp, kComp]
}

// Outputs our equation as mathML
let outputMathML = function(cp, o) {
    // Setting p some variables
    let xTerm;
    let yTerm;
    let zTerm;

    // If the x-coefficient is 0, don't display it
    if (cp[0] === 0) {
        xTerm = ``;
    }
    // If it's not equal to 1, show it in the form of "ax", where a is the coefficient
    else if (Math.abs(cp[0]) !== 1) {
        xTerm = `<mi>${Number(cp[0].toFixed(4))}</mi><mi>x</mi>`;
    }
    // If it is equal to 1, just show it as either "x" or "-x"
    else {
        xTerm = `<mi>${cp[0] > 0 ? '' : '-'}x</mi>`;
    }

    // See comments above, but for y
    if (cp[1] === 0) {
        yTerm = ``;
    }
    else if (Math.abs(cp[1]) !== 1) {
        yTerm = `<mo>${cp[1] > 0 ? '+' : '-'}</mo><mi>${Math.abs(Number(cp[1].toFixed(4)))}</mi><mi>y</mi>`;
    }
    else {
        yTerm = `<mo>${cp[1] > 0 ? '+' : '-'}</mo><mi>y</mi>`;
    }

    // See comments above, but for x
    if (cp[2] === 0) {
        zTerm = ``;
    }
    else if (Math.abs(cp[2]) !== 1) {
        zTerm = `<mo>${cp[2] > 0 ? '+' : '-'}</mo><mi>${Math.abs(Number(cp[2].toFixed(4)))}</mi><mi>z</mi>`;
    }
    else {
        zTerm = `<mo>${cp[2] > 0 ? '+' : '-'}</mo><mi>z</mi>`;
    }

    // If everything went terribly wrong (I don't think this is even a real case anymore)...
    if (xTerm === yTerm && xTerm === zTerm) {
        // Display 0
        document.getElementById('mathDiv').innerHTML = `<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>0</mi></math>`;
    }
    // If everything went well...
    else {
        // Display the equation
        document.getElementById('mathDiv').innerHTML = `<math xmlns="http://www.w3.org/1998/Math/MathML">${xTerm}${yTerm}${zTerm}<mo>=</mo><mi>${Number((cp[0]*o[0] + cp[1]*o[1] + cp[2]*o[2]).toFixed(4))}</mi></math>`;
    }
}

// The below three functions are complete garbage. They all do the same thing but in different cases.
// A better programmer would have condenced it to 1 function. But alas, I didn't want to make a confusing mess.
// These each just generate values to graph. There needs to be 3, because you can't just do it in respect to
// any variable you'd like. If you want to create a function of z and get your data that way, you'll learn that
// you end up dividing by 0 when there's a 0 coefficient for z. Pretty rough. So there's basically just a 
// function that does this in respect to each variable to make sure nothing ever breaks.
let genDataZ = function(cp, o, lb, ub) {
    // Setting up some data arrays
    let xData = [];
    let yData = [];
    let zData = [];

    // Creating an incrementer variable
    let inc = 1;

    // Calculating the maximum value to loop to from the given upper and lower bounds
    let max = Math.abs(lb - ub);
    // Setting a y variable to the lower bound
    let y = lb;

    // If the max value is greater than 10...
    if (max > 10) {
        // Set the incrementer to 10 to the power of the number of digits in max minus 2
        // max <= 99 --> inc = 1
        // max <= 999 --> inc = 10
        // max <= 9999 --> inc = 100
        // ...
        inc = 10**(max.toString().length-2);
    }

    // Getting a constant
    let d = cp[0]*o[0] + cp[1]*o[1] + cp[2]*o[2];

    // Looping through values of j and i and incrementing by the inc variable
    for (let j = 0; j < max; j+=inc) {
        // Pushinng a new array
        zData.push([]);

        // Initializing x to the lower bound
        let x = lb;

        // Looping through i
        for (let i = 0; i < max; i+=inc) {
            // Pushing a z coordinate
            zData[zData.length-1].push((d - (x*cp[0]) - (y*cp[1])) / cp[2]);
            // Incrementign x
            x+=inc;
        }
        // Incrementing y
        y+=inc;
    }

    // Looping again to get proper x and y coordinates
    for (let j = 0; j < zData.length; j++) {
        // Pushing new arrays
        xData.push([]);
        yData.push([]);

        // Looping through i
        for (let i = 0; i < zData[j].length; i++) {
            // Pushing values
            xData[j].push(i*inc + lb);
            yData[j].push(j*inc + lb);
        }
    }

    // Returning all the data
    return [xData, yData, zData];
}
// Read the genDataZ function
let genDataX = function(cp, o, lb, ub) {
    let xData = [];
    let yData = [];
    let zData = [];

    let inc = 1;

    let max = Math.abs(lb - ub);
    let y = lb;

    if (max > 10) {
        inc = 10**(max.toString().length-2);
    }

    let d = cp[0]*o[0] + cp[1]*o[1] + cp[2]*o[2];

    for (let j = 0; j < max; j+=inc) {
        xData.push([]);
        let z = lb;
        for (let i = 0; i < max; i+=inc) {
            xData[xData.length-1].push((d - (z*cp[2]) - (y*cp[1])) / cp[0]);
            z+=inc;
        }
        y+=inc;
    }

    for (let j = 0; j < xData.length; j++) {
        zData.push([]);
        yData.push([]);

        for (let i = 0; i < xData[j].length; i++) {
            zData[j].push(i*inc + lb);
            yData[j].push(j*inc + lb);
        }
    }

    return [xData, yData, zData];
}
// Read the genDataZ function
let genDataY = function(cp, o, lb, ub) {
    let xData = [];
    let yData = [];
    let zData = [];

    let inc = 1;

    let max = Math.abs(lb - ub);
    let x = lb;

    if (max > 10) {
        inc = 10**(max.toString().length-2);
    }

    let d = cp[0]*o[0] + cp[1]*o[1] + cp[2]*o[2];

    for (let j = 0; j < max; j+=inc) {
        yData.push([]);
        let z = lb;
        for (let i = 0; i < max; i+=inc) {
            yData[yData.length-1].push((d - (z*cp[2]) - (x*cp[0])) / cp[1]);
            z+=inc;
        }
        x+=inc;
    }

    for (let j = 0; j < yData.length; j++) {
        zData.push([]);
        xData.push([]);

        for (let i = 0; i < yData[j].length; i++) {
            zData[j].push(i*inc + lb);
            xData[j].push(j*inc + lb);
        }
    }

    return [xData, yData, zData];
}

// Graphs the plane
let graph = function(cp, p1, p2, p3) {
    // Sets up a single array with each coordinate
    let points = p1.concat(p2).concat(p3);
    // Gets the minimum value minus 5 (lower bound)
    let lb = Math.floor(Math.min.apply(null, points) - 5);
    // Gets the maximum value plus 5 (upper bound)
    let ub = Math.floor(Math.max.apply(null, points) + 5);

    // Creating a data variable
    let data;

    // Sets data equal to the output of some genData function based on coefficients
    if (cp[2] !== 0) {
        data = genDataZ(cp, p1, lb, ub);
    }
    else if (cp[0] !== 0) {
        data = genDataX(cp, p1, lb, ub);
    }
    else {
        data = genDataY(cp, p1, lb, ub);
    }

    // Creating a scatterplot with the three given points from the user
    let scatterGraph = {
        x: [p1[0], p2[0], p3[0]],
        y: [p1[1], p2[1], p3[1]],
        z: [p1[2], p2[2], p3[2]],
        mode: 'markers',
        marker: {
            size: 5
        },
        showlegend: false,
        showscale: false,
        modebardisplay: false,
        type: 'scatter3d'
    }

    // Creating a surface graph with the data generated by the program
    // This surface should intersect the points on the scatterplot
    let surfaceGraph = {
        x: data[0],
        y: data[1],
        z: data[2], 
        type: 'surface',
        showlegend: false,
        showscale: false,
        modebardisplay: false,
        opacity: 0.9
    }

    // Doing some formatting for the graph
    let layout = {
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
    }

    // Plotting it with plotly (see https://plotly.com/graphing-libraries/)
    Plotly.newPlot('plot', [surfaceGraph, scatterGraph], layout);
}

// Detecting when the user hits the calculate button
document.getElementById('buttonDiv').addEventListener('click', (e) => {
    // Getting the point data
    let p1 = [document.getElementById('p1x').value, document.getElementById('p1y').value, document.getElementById('p1z').value];
    let p2 = [document.getElementById('p2x').value, document.getElementById('p2y').value, document.getElementById('p2z').value];
    let p3 = [document.getElementById('p3x').value, document.getElementById('p3y').value, document.getElementById('p3z').value];

    // If any of the coordinates are blank...
    if (p1.includes("") || p2.includes("") || p3.includes("")) {
        // Tell the user to quit goofing off
        document.getElementById('buttonDiv').textContent = "Please provide numerical points";
    }
    // If any of the points aren't unique...
    else if (p1.toString() === p2.toString() || p1.toString() === p3.toString() || p2.toString() === p3.toString()) {
        // Tell the user to quit goofing off
        document.getElementById('buttonDiv').textContent = "Please provide unique points";
    }
    // If the user quits goofing off...
    else {
        // Switch the points to all numerical values
        p1 = [Number(p1[0]), Number(p1[1]), Number(p1[2])];
        p2 = [Number(p2[0]), Number(p2[1]), Number(p2[2])];
        p3 = [Number(p3[0]), Number(p3[1]), Number(p3[2])];

        // Make sure the button says the riht thing again
        document.getElementById('buttonDiv').textContent = "Calculate";

        // Getting vectors from the points
        let v1 = getVector(p2, p1);
        let v2 = getVector(p3, p1);

        // Getting the cross product of the vectors
        let cp = getCrossProduct(v1, v2);

        // If we got parallel vectors...
        if (cp[0] === 0 && cp[1] === 0 && cp[2] === 0) {
            // Try again with a different combination
            v1 = getVector(p2, p1);
            v2 = getVector(p1, p3);

            // Get the cross product again
            cp = getCrossProduct(v1, v2);

            // If we get them again, the points given are all along a straight line, thus infinite planes are possible
            // In this case, we just get sneaky and use another point
            // Is this cheating? I mean... kind of?
            // The purpose is to find ANY plane containing the 3 points, so it doesn't need to be a unique plane in this scenario
            // If the points given only allow for one plain containing all 3, sure, but in this case we just get a little bit sneaky.
            if (cp[0] === 0 && cp[1] === 0 && cp[2] === 0) {
                // Get one vector
                v1 = getVector(p2, p1);

                // Create a new point
                p4 = [p3[0], p3[1], p3[2]];
                p4[1] = p4[1]+1;

                // Create a second vector
                v2 = getVector(p4, p1);

                // Get the cross product
                cp = getCrossProduct(v1, v2);

                // Extreme edge case. This probably should have been a loop.
                if (cp[0] === 0 && cp[1] === 0 && cp[2] === 0) {
                    v1 = getVector(p2, p1);
                    p4 = [p3[0], p3[1], p3[2]];
                    p4[0] = p4[0]+1;
                    v2 = getVector(p4, p1);
    
                    cp = getCrossProduct(v1, v2);
                }
            }
        }

        // Outputting the equation
        outputMathML(cp, p1);

        // Graphing
        graph(cp, p1, p2, p3);
    }
})

// Select the input field
let inputFields = document.querySelectorAll(".pointCord");

// Add an event listener to the input field
for (let i = 0; i < inputFields.length; i++) {
    // Upon an input event...
    inputFields[i].addEventListener("input", (e) => {
        // Get the value of the input
        let value = e.target.value;
        // Multiply the length of that string by 11
        let width = value.length * 11;
        // Base case for an empty input...
        if (width === 0) {
            // Set the width to 2 so it's always selectable
            width = 2;
        }
        // Set the width to 11*length px
        e.target.style.width = width + "px";
    });
}