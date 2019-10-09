class Upgrade {
    constructor(id) {
        this.id = id;
    }
}

function checkUpgrades() {
    for(let i = 0; i < upgrades.length; i++) {
        if(upgrades[i].available() && !upgrades[i].displayed && !upgrades[i].bought) {
            game.activeUpgrades.push(upgrades[i]);
            upgrades[i].displayed = true;
            renderUpgrade(upgrades[i]);
        }
    }
}

function renderUpgrade(upgrade) {
    let holder = $("#upgradeHolder");
    $("<div id='" + upgrade.id +"' class='upgrade'/>").load("upgrade_template.html", function() {
        $(this).find(".upgradeTitle").html(upgrade.title);
        $(this).find(".upgradeText").html(upgrade.desc);
        $(this).find(".upgradeCost").html(formatData(upgrade.cost));
        let cost = upgrade.cost;
        let func = upgrade.onPurchase;
        let id = upgrade.id;

        $(this).find(".upgradeBtn").on("click", function() {
            if(game.data >= cost) {
                func();
                game.data -= cost;
                $("#" + id).remove();
                if(getUpgrade(id)) {
                    getUpgrade(id).bought = true;
                    getUpgrade(id).displayed = false;
                    removeUpgrade(id);
                }
            }
        });
        $(this).appendTo(holder);
    })

}

function hasUpgrade(id) {
    for(let i = 0; i < upgrades.length; i++) {
        if(upgrades[i].id === id) {
            if(upgrades[i].bought) {
                return upgrades[i];
            }
        }
    }
    return false;
}

function getUpgrade(id) {
    for(let i = 0; i < upgrades.length; i++) {
        if(upgrades[i].id === id) {
            return upgrades[i];
        }
    }
    return false;
}

function removeUpgrade(id) {
    let array = [];
    for(let i = 0; i < game.activeUpgrades.length; i++) {
        if(game.activeUpgrades[i].id !== id) {
            array.push(game.activeUpgrades[i]);
        }
    }
    game.activeUpgrades = array;
}