const board = JXG.JSXGraph.initBoard('box', {

    axis: true,

    boundingbox: [-10, 10, 10, -10],

    showNavigation: true,

    showCopyright: false

});

let currentGraph = null;

const button =
    document.getElementById("graphButton");

const equationInput =
    document.getElementById("equationInput");

equationInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        button.click();

    }

});

button.addEventListener("click", function () {

    const equation =
        document.getElementById("equationInput").value;

    document.getElementById("outputText").innerText =
        "Graphing: " + equation;

    if (currentGraph !== null) {

        board.removeObject(currentGraph);

    }

    currentGraph = board.create('functiongraph', [

        function(x) {

            return eval(equation);

        }

    ]);

});