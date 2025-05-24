const genDataZ = function(cp, o, lb, ub) {
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
    let d = cp.x*o.x + cp.y*o.y + cp.z*o.z;

    // Looping through values of j and i and incrementing by the inc variable
    for (let j = 0; j < max; j+=inc) {
        // Pushinng a new array
        zData.push([]);

        // Initializing x to the lower bound
        let x = lb;

        // Looping through i
        for (let i = 0; i < max; i+=inc) {
            // Pushing a z coordinate
            zData[zData.length-1].push((d - (x*cp.x) - (y*cp.y)) / cp.z);
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
    return {
        x: xData, 
        y: yData, 
        z: zData
    };
}
const genDataX = function(cp, o, lb, ub) {
    let xData = [];
    let yData = [];
    let zData = [];

    let inc = 1;

    let max = Math.abs(lb - ub);
    let y = lb;

    if (max > 10) {
        inc = 10**(max.toString().length-2);
    }

    let d = cp.x*o.x + cp.y*o.y + cp.z*o.z;

    for (let j = 0; j < max; j+=inc) {
        xData.push([]);
        let z = lb;
        for (let i = 0; i < max; i+=inc) {
            xData[xData.length-1].push((d - (z*cp.z) - (y*cp.y)) / cp.x);
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

    return {
        x: xData, 
        y: yData, 
        z: zData
    };
}
const genDataY = function(cp, o, lb, ub) {
    let xData = [];
    let yData = [];
    let zData = [];

    let inc = 1;

    let max = Math.abs(lb - ub);
    let x = lb;

    if (max > 10) {
        inc = 10**(max.toString().length-2);
    }

    let d = cp.x*o.x + cp.y*o.y + cp.z*o.z;

    for (let j = 0; j < max; j+=inc) {
        yData.push([]);
        let z = lb;
        for (let i = 0; i < max; i+=inc) {
            yData[yData.length-1].push((d - (z*cp.z) - (x*cp.x)) / cp.y);
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

    return {
        x: xData, 
        y: yData, 
        z: zData
    };
}

// Graphs the plane
const genData = function(cp, p1, p2, p3) {
    // Sets up a single array with each coordinate
    let points = Object.values(p1).concat(Object.values(p2)).concat(Object.values(p3));

    // Gets the minimum value minus 5 (lower bound)
    let lb = Math.floor(Math.min.apply(null, points) - 30);
    // Gets the maximum value plus 5 (upper bound)
    let ub = Math.floor(Math.max.apply(null, points) + 30);

    // Creating a data variable
    let data;

    // Sets data equal to the output of some genData function based on coefficients
    if (cp.z !== 0) {
        data = genDataZ(cp, p1, lb, ub);
    }
    else if (cp.x !== 0) {
        data = genDataX(cp, p1, lb, ub);
    }
    else {
        data = genDataY(cp, p1, lb, ub);
    }

    return data;
}

export default genData;
