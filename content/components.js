class Component {
    constructor() {
        this.name = "dev";
        this.title = "dev";
        this.desc = "dev";
        this.canDisplay = false;
        this.displayInfo = "";
        this.letter = "";
    }

    onPulse(element, x, y, grid) {
        return false;
    }

}


class Passthrough extends Component {

    constructor() {
        super();
        this.name = "passthrough";
        this.canDisplay = false;
    }

    onPulse(element, x, y, grid) {
        if(parseFloat(x - 1) < 1) {
            game.data += game.dataPerSignal;
            let jqueryElement = $(element);
            jqueryElement.addClass("pulsed");
            jqueryElement.removeClass("pulsed", game.backlogInterval);
            return;
        }
        let upGrid = game.grid.findGrid((parseFloat(x) - 1) + "_" + y);
        let jqueryElement = $(element);
        jqueryElement.addClass("pulsed");
        jqueryElement.removeClass("pulsed", game.backlogInterval);

        game.grid.pulseBacklog.push(upGrid);
    }

}

class Splitter extends Component {
    constructor() {
        super();
        this.name = "splitter";
        this.title = "Splitter";
        this.desc = "Splits the signal into two and outputs them on the left and right. If there is no grid on that side, the signal will be discarded";
        this.canDisplay = true;
        this.letter = "S";
    }

    onPulse(element, x, y, grid) {
        let leftGrid;
        let rightGrid;

        if((parseFloat(y) - 1) > 0) {
            leftGrid = game.grid.findGrid(x + "_" + (parseFloat(y) - 1));
            game.grid.pulseBacklog.push(leftGrid);
        }
        if((parseFloat(y) + 1) <= game.cpuGlobals.cellSize.amount) {
            rightGrid = game.grid.findGrid(x + "_" + (parseFloat(y) + 1));
            game.grid.pulseBacklog.push(rightGrid);
        }

        let jqueryElement = $(element);
        jqueryElement.addClass("pulsed");
        jqueryElement.removeClass("pulsed", game.backlogInterval);
    }
}

class Source extends Component {
    constructor() {
        super();
        this.name = "source";
        this.title = "dev";
        this.desc = "dev";
        this.canDisplay = false;
        this.letter = "I";
    }

    onPulse(element, x, y, grid) {
        let upGrid = game.grid.findGrid((x - 1) + "_" + y);
        game.grid.pulseBacklog.push(upGrid);

        let jqueryElement = $(element);
        jqueryElement.addClass("pulsed");
        jqueryElement.removeClass("pulsed", game.backlogInterval);
    }
}

class Rotate extends Component {
    constructor() {
        super();
        this.name = "rotate";
        this.title = "Data Rotation Device";
        this.desc = "Rotates the data to the left, top or right depending on it's internal counter";
        this.canDisplay = true;
        this.counter = 1;
        this.letter = "R"
    }

    onPulse(element, x, y, grid) {

        let leftGrid;
        let rightGrid;
        let topGrid;

        if((parseFloat(y) - 1) > 0) {
            leftGrid = game.grid.findGrid(x + "_" + (parseFloat(y) - 1));
        }
        if((parseFloat(y) + 1) <= game.cpuGlobals.cellSize.amount) {
            rightGrid = game.grid.findGrid(x + "_" + (parseFloat(y) + 1));
        }
        if((parseFloat(x) - 1) > 0) {
            topGrid = game.grid.findGrid((parseFloat(x) - 1) + "_" + y);
        }



        switch(this.counter) {
            case 1:
                if(!leftGrid) break;
                game.grid.pulseBacklog.push(leftGrid);
                this.counter++;
                break;
            case 2:
                if(!topGrid) break;
                game.grid.pulseBacklog.push(topGrid);
                this.counter++;
                break;
            case 3:
                if(!topGrid) break;
                game.grid.pulseBacklog.push(rightGrid);
                this.counter = 1;
                break;
            default:
                this.counter = 1;
                break;
        }



        let jqueryElement = $(element);
        jqueryElement.addClass("pulsed");
        jqueryElement.removeClass("pulsed", game.backlogInterval);
        this.displayInfo = this.counter;
        grid.updateVisual();
    }
}