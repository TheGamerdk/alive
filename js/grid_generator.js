function generateGrid() {
    game.grid = null;
    game.grid = new GridHolder();

    $("#cpuTable").empty();

    let cellClass;

    switch(game.cpuGlobals.cellSize.size) {
        case 16:
            cellClass = "cpu-cell-16";
            break;
        case 8:
            cellClass = "cpu-cell-8";
            break;
        case 4:
            cellClass = "cpu-cell-4";
            break;
        case 2:
            cellClass = "cpu-cell-2";
            break;
        case 1:
            cellClass = "cpu-cell-1";
            break;
    }

    for(let i = 0; i < game.cpuGlobals.cellSize.amount; i++) {
        let element;
        element = $("<tr>");
        for(let i2 = 0; i2 < game.cpuGlobals.cellSize.amount; i2++) {
            let grid = new Grid((i+1) + "_" + (i2+1), null);
            if (findGridCenter() === (i2 + 1) && (i+1) === game.cpuGlobals.cellSize.amount) {
                grid.flags = "source";
                grid.function = new Source();
            }
            let td = $("<td class='no-pad'></td>");
            td.append($("<div id='" + (i+1) + "_" + (i2+1) +"' class='cpu-cell " + cellClass +"'></div>"));
            td.appendTo(element);

            td.on("click", function(event) {
                grid.clicked(event);
            });
            grid.element = td.children()[0];
            grid.updateVisual();
            game.grid.grids.push(grid);
        }
        element.appendTo($("#cpuTable"));
    }
}

function changeGridSize(newSize) {
    for(let i = 0; i < game.grid.grids.length; i++) {
        game.grid.grids[i].remove();
    }
    game.cpuGlobals.cellSize = newSize;
    generateGrid();
}