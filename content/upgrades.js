let upgrades = [];

let doubler1 = {
    id: "doubler1",
    title: "Signal Doubler",
    cost: 3,
    desc: "Adds a Signal Doubler to your toolbox",
    displayed: false,
    bought: false,
    onPurchase: function() {

        addNewComponent(Splitter, 1);
    },
    available: function() {
        return true;
    }
};

upgrades.push(doubler1);

let speed1 = {
    id: "speed1",
    title: "Distance Minimizer",
    cost: 15,
    desc: "Doubles the internal processor speed to 2Hz",
    displayed: false,
    bought: false,
    onPurchase: function() {
        game.backlogInterval = game.backlogInterval / 2;
    },
    available: function() {
        return hasUpgrade("doubler1");
    }
};

upgrades.push(speed1);

let data1 = {
    id: "data1",
    title: "Signal Compression",
    cost: 20,
    desc: "Increases the signal data capacity to 2 bytes",
    displayed: false,
    bought: false,
    onPurchase: function() {
        game.dataPerSignal = 2;
    },
    available: function() {
        return hasUpgrade("speed1");
    }
};

upgrades.push(data1);

let eightBit = {
    id: "eightBit",
    title: "Eight Bit Architecture",
    cost: 30,
    desc: "Increases the size of the grid.",
    displayed: false,
    bought: false,
    onPurchase: function() {

        changeGridSize(cellSizes.eight);
    },
    available: function() {
        return hasUpgrade("data1");
    }
};

upgrades.push(eightBit);

let rotate1 = {
    id: "rotate1",
    title: "Data Rotation Device",
    cost: 25,
    desc: "Provides a data rotation device, that outputs the data to either the left, top or right depending on it's internal counter",
    displayed: false,
    bought: false,
    onPurchase: function() {

        addNewComponent(Rotate);
    },
    available: function() {
        return hasUpgrade("eightBit");
    }
};

upgrades.push(rotate1);

let doubler2 = {
    id: "doubler2",
    title: "Additional Splitter",
    cost: 60,
    desc: "Provides another, identical, splitter",
    displayed: false,
    bought: false,
    onPurchase: function() {

        addExistingComponent("splitter", 1);
    },
    available: function() {
        return hasUpgrade("rotate1");
    }
};

upgrades.push(doubler2);

let signalSpeed1 = {
    id: "signalSpeed1",
    title: "Signal Injection",
    cost: 125,
    desc: "Doubles the signal input rate to 1Hz",
    displayed: false,
    bought: false,
    onPurchase: function() {

        game.pulseInterval /= 2;
    },
    available: function() {
        return hasUpgrade("doubler2");
    }
};

upgrades.push(signalSpeed1);

let END = {
    id: "end",
    title: "END OF EARLY PROTOTYPE",
    cost: 430080,
    desc: "I'll be back soon, I promise!",
    displayed: false,
    bought: false,
    onPurchase: function() {
    },
    available: function() {
        return hasUpgrade("signalSpeed1");
    }
};

upgrades.push(END);