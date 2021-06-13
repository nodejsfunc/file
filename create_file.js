const fs = require('fs');

const create_file = function(data, filename) {
    let config = {
        encoding: "utf8",
        flag: "w",
        mode: 0o666
    };
    try {
        fs.writeFileSync(filename, data, config);
    } catch (err) {
        console.error(err);
    }
}

module.exports = create_file;
