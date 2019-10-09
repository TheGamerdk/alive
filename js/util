let dataShorthands = [
    {
        "1": "B"
    },
    {
        "1024": "KB"
    },
    {
        "1048576": "MB"
    },
    {
        "1073741824": "GB"
    },
    {
        "1099511627776": "TB"
    },
    {
        "112589990684262": "PB"
    }
];

function formatData(number, suffix = true) {
    if (!number) number = 0;
    let formatting = "";

    if(number <= 0) {
        return "0 B";
    }

    for (let i = 0; i < dataShorthands.length; i++) {
        if (number >= parseFloat(Object.keys(dataShorthands[i])[0])) {
            formatting = number / parseFloat(Object.keys(dataShorthands[i])[0]);
            formatting = +formatting.toFixed(3);
            if (suffix) {
                formatting += " " + dataShorthands[i][Object.keys(dataShorthands[i])[0]];
            }
        }
    }
    return formatting;
}

function toHertz(number, suffix = true) {
    let hertz = 1000 / number;
    if(suffix) {
        hertz += " Hz";
    }
    return hertz;
}
