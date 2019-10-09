
function startPulses() {
    if(game.pulseInterval < game.backlogInterval) {
        console.error("Pulse interval is below Backlog Interval! PulseInterval: " + game.pulseInterval + " Backlog Interval: " + game.backlogInterval);
        $(document.body).append("<h3 class='gameError'>Critical Error Encountered, please contact the developer! Error: PulseAboveBacklog</h3>");
        return;
    }

    let sourceGrids = game.grid.findGridsByFunction("source");
    for(let i = 0; i < sourceGrids.length; i++) {
        game.grid.pulseBeginBacklog.push(sourceGrids[i]);
    }


    if(!game.pausePulse) {
        setTimeout(startPulses, game.pulseInterval);
    }
}


function backlogStart() {
    game.grid.handleBacklog();

    if(!game.pauseBacklog) {
        setTimeout(backlogStart, game.backlogInterval);
    }
}

function getBottomGridCenter() {
    return game.grid.findGrid(game.cpuGlobals.cellSize.amount + "_" + findGridCenter());
}

function findGridCenter() {
    return Math.round(game.cpuGlobals.cellSize.amount / 2);
}

class GridHolder {

    constructor() {
        this.grids = [];
        this.pulseBacklog = [];
        this.pulseBeginBacklog = [];
    }

    findGrid(id) {
        for (let i = 0; i < this.grids.length; i++) {
            if(this.grids[i].id === id) {
                return this.grids[i];
            }
        }
        return false;
    }

    findGridsByFunction(func) {
        let grids = [];
        for (let i = 0; i < this.grids.length; i++) {
            if(this.grids[i].flags === func) {
                grids.push(this.grids[i]);
            }
        }
        return grids;
    }

    handleBacklog() {
        //Handle pending pulses
        let backLogs = Array.from(this.pulseBacklog);
        this.pulseBacklog = [];
        for(let i = 0; i < backLogs.length; i++) {
            backLogs[i].onPulse();
        }

        for(let i = 0; i < this.pulseBeginBacklog.length; i++) {
            this.pulseBeginBacklog[i].onPulse();
        }
        this.pulseBeginBacklog = [];
    }
}

class Grid {
    constructor(id, element) {
        this.id = id;
        this.x = id.split("_")[0];
        this.y = id.split("_")[1];
        this.function = new Passthrough();
        this.element = element;
        this.flags = null;
    }

    onPulse() {
        this.function.onPulse(this.element, this.x, this.y, this);
    }

    updateVisual() {
        let jqueryElement = $(this.element);

        let funcLetter = this.function.letter;


        jqueryElement.html(funcLetter + "<br>" + this.function.displayInfo);
    }

    clicked(event) {
        if(event.ctrlKey) {
            this.remove();
            return;
        }
        for(let i = 0; i < game.components.length; i++) {
            if(game.components[i].name === game.selectedComponent) {
                if(game.components[i].amount > 0) {
                    this.function = new game.components[i].refersTo();
                    game.components[i].amount--;
                    this.updateVisual();
                }
            }
        }
    }

    remove() {
        if(this.function.name === "source") return;

        for(let i = 0; i < game.components.length; i++) {
            if(game.components[i].name === this.function.name) {
                game.components[i].amount++;
            }
        }

        this.function = new Passthrough();
        this.updateVisual();
    }

}

function changeGridFunction(relativeX, Y, newClass) {
    let grid = game.grid.findGrid((game.cpuGlobals.cellSize.amount - relativeX)+ "_" + Y);
    grid.function = new newClass();
    grid.updateVisual();
    return grid;
}