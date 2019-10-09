let cellSizes = {
    sixteen: {
        size: 16,
        amount: 3
    },
    eight: {
        size: 8,
        amount: 7
    },
    four: {
        size: 4,
        amount: 15
    },
    two: {
        size: 2,
        amount: 23
    },
    one: {
        size: 1,
        amount: 43
    }
};

let game = {
    cpuGlobals: {
        cellSize: cellSizes.sixteen,
    },
    interval: null,
    data: 0,
    dataPerSignal: 1,
    pulseInterval: 2000,
    backlogInterval: 1000,
    pausePulse: false,
    pauseBacklog: false,
    grid: [],
    activeUpgrades: [],
    components: [
    ],
    selectedComponent: null,
};

let globals = {
    intervalTimer: 100,
};

function beginGame() {
    generateGrid();
    game.interval = setInterval(loop, globals.intervalTimer);
    $("#dataCounter").html(formatData(game.data));
    startPulses();
    backlogStart();
    initUpgrades();
}

function initUpgrades() {

}

function loadGame() {

}

$(document).ready(function() {
    beginGame();
});