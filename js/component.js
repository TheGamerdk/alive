function renderComponent(component) {
    let holder = $("#componentHolder");
    $("<div id='" + component.name +"' class='upgrade'/>").load("component_template.html", function() {
        $(this).find(".componentTitle").html(component.title);
        $(this).find(".componentAmount").attr("id", component.name + "_amount");
        $(this).find(".componentEffect").html(component.desc);

        let className = component.name;

        $(this).on("click", function() {
            game.selectedComponent = className;

            for(let i = 0; i < holder.children().length; i++) {
                $(holder.children()[i]).removeClass("selectedComp");
            }

            $(this).addClass("selectedComp")
        });
        $(this).appendTo(holder);
    })

}

function addNewComponent(comp, amount = 1) {
    let initComp = new comp();

    if(!initComp.canDisplay) return;

    let obj = {
        name: initComp.name,
        amount: amount,
        refersTo: comp
    };
    game.components.push(obj);

    renderComponent(initComp);
}

function addExistingComponent(name, amount) {
    for(let i = 0; i < game.components.length; i++) {
        if(game.components[i].name === name) {
            game.components[i].amount += amount;
        }
    }
}