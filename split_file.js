function split_file(filepath, dirpath = '') {

    // Creating a readable stream from file
    // readline module reads line by line
    // but from a readable stream only.
    const file = readline.createInterface({
        input: fs.createReadStream(filepath),
        output: process.stdout,
        terminal: false
    });

    // Printing the content of file line by
    //  line to console by listening on the
    // line event which will triggered
    // whenever a new line is read from
    // the stream
    var i = 0;
    var data = "";

    file.on('line', (line) => {
        i += 1;
        var filename = dirpath + path.sep + "" + i.toString();

        if (line.lastIndexOf('##', 0) == 0) {
            console.log(data);
            createFile(data, filename);
            data = "";
        } else {
            // console.log(line);
            data += line + "\n";
        }
    });
}
