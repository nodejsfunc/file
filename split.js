// Importing the Required Modules
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const split_file_by_separator = require('./jsfunc/split_file_by_separator');


var header = '';
fs.readFile('./header.html', "utf8", function (err, data) {
    header = data;
});
var footer = '';
fs.readFile('./footer.html', "utf8", function (err, data) {
    footer = data;
});

var before = '';
fs.readFile('./before.html', "utf8", function (err, data) {
    before = data;
});

var after = '';
fs.readFile('./after.html', "utf8", function (err, data) {
    after = data;
});

var file_obj =  require('./event/2021/4developers/slides.json');
var file_list = file_obj.slides;
console.log(file_list);

function prepareTemplate() {
    createFile('', 'index.html');
    appendToFile(header, 'index.html');
}


// cc += before;


function createFile(data, filename) {
    let config = {
        encoding: "utf8",
        flag: "w",
        mode: 0o666
    };
    try {
        fs.writeFileSync(filename, data, config);
        // console.log(fs.readFileSync(filename + ext, config.encoding));
    } catch (err) {
        console.error(err);
    }
}

function appendToFile(data, filename) {
    let config = {
        encoding: "utf8",
        flag: "a+",
        mode: 0o666
    };
    try {
        fs.writeFileSync(filename, data, config);
        // console.log(fs.readFileSync(filename + ext, config.encoding));
    } catch (err) {
        console.error(err);
    }
}


function readDir(folder, filter = ".md") {

    // Function to get current filenames
    // in directory with specific extension
    fs.readdir(folder, (err, files) => {
        if (err)
            console.log(err);
        else {
            console.log("\Filenames with the .txt extension:");
            files.forEach(file => {
                if (path.extname(file) == filter) {
                    // readFile(file);
                    console.log(file);
                }
            })
        }
    });
}

folder_list = [
    // 'api-foundation',
    'entuzjasta',
    // 'jloads',
    // 'softreck',
    // 'tom-sapletta',
];
folder = './';
// readDir(folder);


// sync version https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j
function walkSync(currentDirPath, callback) {
    // var fs = require('fs'),
    //     path = require('path');
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

var filter = '.md';
var newDestList = [];


function readAllFiles() {

    folder_list.forEach(function (item, index, array) {
        // console.log('item:', item, index);

        walkSync('./' + item, function (filePath, stat) {
            // console.log(path.extname(filePath));
            if (path.extname(filePath) == filter) {
                // readFile(file);
                // var newDest = path.basename(filePath) + path.sep + path.basename(filePath, path.extname(filePath));
                // var newDest = path.basename(path.dirname(filePath));
                var dir = path.basename(filePath, path.extname(filePath));
                var dirpath = path.dirname(filePath);
                var newDest = dirpath + path.sep + dir;
                // console.log(newDest);

                if (!fs.existsSync(newDest)) {
                    fs.mkdirSync(newDest, '0777', true);
                    newDestList.push(newDest);
                    // mkdir save to filePath
                    // remove next time before create
                }
                split_file_by_separator(filePath, '#', function (content) {
                    // console.log(content);
                    // var filename = newDest + path.sep + index.toString();
                    // createFile(content, filename);
                    // console.log(filename);
                    // cc += before + content + after;
                    appendToFile(before + content + after, 'index.html');
                });
                // console.log(filePath);
            }
            // console.log(stat);
        });

    });
}

// file_list = [
//     'tom-sapletta/4developers/index.md',
//     'tom-sapletta/contribution/index.md',
//     'jloads/about/index.md',
//     'jloads/contribution/index.md',
//     'jloads/examples/index.md',
// ];

// TODO read only selected files
//  + split content
//  + combine to index.html
function readSelectedFiles() {

    file_list.forEach(function (item, index, array) {
        console.log('item:', item, index);

        var filePath = './' + item;
        console.log(filePath);

        splitFile2(filePath, '#', function (content) {
            console.log(content);
            // var filename = newDest + path.sep + index.toString();
            // createFile(content, filename);
            // console.log(filename);
            appendToFile(before + content + after, './event/2021/4developers/index.html');
        });
    });

}


function end() {
    appendToFile(footer, 'index.html');
}


setTimeout(prepareTemplate, 200);
// setTimeout(readAllFiles, 600);
setTimeout(readSelectedFiles, 600);
setTimeout(end, 3500);


// console.log(cc);

// console.log(newDestList);

/*
function splitFile3(filePath, dirpath = '', prefix = '#', callback) {

    fs.readFile(filePath, "utf8", function (err, data) {

        // console.log(data);
        var data_splitted = data.split(prefix);
        data_splitted.forEach(function (item, index, array) {

            console.log('item:', item, index);
            console.log("--------filePath:");
            console.log(filePath);
            console.log("--------data_splitted:");
            if (data_splitted[index].length > 2) {
                var content = prefix + data_splitted[index];
                // console.log(content);
                var filename = dirpath + path.sep + index.toString();
                // console.log(filename);
                createFile(content, filename);
            }

        });
    });
}
*/


function removeDirs() {
    newDestList.forEach(function (item, index, array) {
        console.log('item:', item, index, newDestList[index]);
        // mergeFiles(newDestList[index]);
        fs.rmdirSync(newDestList[index], {recursive: true});
    });
}

