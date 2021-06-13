const fs = require('fs');
var delays = 0;

const append_to_file = function(data, filename) {
    let config = {
        encoding: "utf8",
        flag: "a+",
        mode: 0o666
    };
    try {
        delays += 50;

        // setTimeout(function () {
        console.log(delays);
        console.log(filename);
        fs.writeFileSync(filename, data, config);
        // }, delays);

    } catch (err) {
        console.error(err);
    }
}

module.exports = append_to_file;
