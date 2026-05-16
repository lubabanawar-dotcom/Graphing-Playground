const board = JXG.JSXGraph.initBoard('box', {

    axis: true,

    boundingbox: [-10, 10, 10, -10],

    showNavigation: true,

    showCopyright: false

});

const graphColors = [

    "#00ffff",
    "#ff00ff",
    "#00ff00",
    "#ffff00",
    "#ff8800",
    "#ff4444",
    "#44aaff"

];

let colorIndex = 0;

const equationList =
    document.getElementById("equationList");

const addEquationButton =
    document.getElementById("addEquationButton");

const clearButton =
    document.getElementById("clearButton");

function createEquationRow() {

    const row =
        document.createElement("div");

    row.className = "equationRow";

    // TYPE SELECT

    const typeSelect =
        document.createElement("select");

    typeSelect.className = "typeSelect";

    typeSelect.innerHTML = `
        <option value="cartesian">Cartesian</option>
        <option value="parametric">Parametric</option>
        <option value="polar">Polar</option>
    `;

    // INPUTS

    const input1 =
        document.createElement("input");

    input1.className = "equationInput";

    input1.placeholder = "f(x)";

    const input2 =
        document.createElement("input");

    input2.className = "equationInput";

    input2.placeholder = "g(t)";

    input2.style.display = "none";

    // REMOVE BUTTON

    const removeButton =
        document.createElement("button");

    removeButton.className = "removeButton";

    removeButton.innerText = "X";

    // APPEND

    row.appendChild(typeSelect);

    row.appendChild(input1);

    row.appendChild(input2);

    row.appendChild(removeButton);

    equationList.appendChild(row);

    // GRAPH VARIABLE

    let graph = null;

    // UPDATE INPUT UI

    typeSelect.addEventListener("change", function () {

        const type = typeSelect.value;

        if (type === "cartesian") {

            input1.placeholder = "f(x)";

            input2.style.display = "none";

        }

        else if (type === "parametric") {

            input1.placeholder = "x(t)";

            input2.placeholder = "y(t)";

            input2.style.display = "block";

        }

        else if (type === "polar") {

            input1.placeholder = "r(t)";

            input2.style.display = "none";

        }

    });

    // DRAW FUNCTION

    function drawGraph() {

        const type = typeSelect.value;

        if (graph !== null) {

            board.removeObject(graph);

        }

        const color =
            graphColors[colorIndex % graphColors.length];

        colorIndex++;

        // CARTESIAN

        if (type === "cartesian") {

            graph = board.create('functiongraph', [

                function(x) {

                    try {

                        return math.evaluate(
                            input1.value,
                            { x: x }
                        );

                    }
                    catch {

                        return NaN;

                    }

                }

            ], {

                strokeColor: color,

                strokeWidth: 3

            });

        }

        // PARAMETRIC

        else if (type === "parametric") {

            graph = board.create('curve', [

                function(t) {

                    try {

                        return math.evaluate(
                            input1.value,
                            { t: t }
                        );

                    }
                    catch {

                        return NaN;

                    }

                },

                function(t) {

                    try {

                        return math.evaluate(
                            input2.value,
                            { t: t }
                        );

                    }
                    catch {

                        return NaN;

                    }

                },

                -20,
                20

            ], {

                strokeColor: color,

                strokeWidth: 3

            });

        }

        // POLAR

        else if (type === "polar") {

            graph = board.create('curve', [

                function(t) {

                    try {

                        const r =
                            math.evaluate(
                                input1.value,
                                { t: t }
                            );

                        return r * Math.cos(t);

                    }
                    catch {

                        return NaN;

                    }

                },

                function(t) {

                    try {

                        const r =
                            math.evaluate(
                                input1.value,
                                { t: t }
                            );

                        return r * Math.sin(t);

                    }
                    catch {

                        return NaN;

                    }

                },

                -20,
                20

            ], {

                strokeColor: color,

                strokeWidth: 3

            });

        }

    }

    // LIVE UPDATE

    input1.addEventListener("input", drawGraph);

    input2.addEventListener("input", drawGraph);

    // REMOVE GRAPH

    removeButton.addEventListener("click", function () {

        if (graph !== null) {

            board.removeObject(graph);

        }

        row.remove();

    });

}

addEquationButton.addEventListener("click", function () {

    createEquationRow();

});

clearButton.addEventListener("click", function () {

    location.reload();

});

createEquationRow();