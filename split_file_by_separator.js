
const {EOL} = require('os');
const fs = require('fs');

const split_file_by_separator = function (filePath, prefix = '# ', callback) {

    fs.readFile(filePath, "utf8", function (err, data) {

        if (typeof (data) === "undefined") {
            return null;
        }
        if (data.length < 5) {
            return null;
        }

        var data_splitted = data.split(EOL + prefix);
        data_splitted.forEach(function (item, index, array) {
            // console.log('item:', item, index);
            console.log("--------filePath:");
            console.log(filePath);
            // console.log("--------data_splitted:");

            if (data_splitted[index].length > 2) {
                var content = prefix + data_splitted[index] + "\n" + "<!-- " + filePath + ":" + index + "-->" + "\n";
                callback(content);
            }
        });
    });
}

module.exports = split_file;
