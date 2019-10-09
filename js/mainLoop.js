
function loop() {
    $("#dataCounter").html(formatData(game.data));

    $("#dataPerSignal").html("Signal Data Capacity: " + formatData(game.dataPerSignal));
    $("#signalSpeed").html("Signal Input Rate: " + toHertz(game.pulseInterval));
    $("#backlogSpeed").html("Internal Processor Speed: " + toHertz(game.backlogInterval));

    for(let i = 0; i < game.components.length; i++) {
        $("#" + game.components[i].name + "_amount").html("Amount Left: " + game.components[i].amount);
    }


    checkUpgrades();
}