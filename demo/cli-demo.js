/*
 * Module Dependencies
 */
var fs = require('fs'),
    stdout = process.stdout,
    stdin = process.stdin;

//process.on('SIGKILL', function () {
//    console.log('Singal received SIGKILL');
//});

// Synchronous Call
//console.log(fs.readdirSync(__dirname));

/**
 * Helper functions
 */

// Prints new line
function newline() {
    console.log('');
}

// Handle error and exit
function handleError(err, message) {
    if (err) {
        console.error(err);
    }
    if (message) {
        console.error('  \033[31m ' + message + '\033[39m');
    }
    if (err || message) {
        console.error('\033[31m  Unexpecetd Error Occurred, killing process...\033[39m');
        process.exit(-1);
    }
}

console.log('\033[32m  USAGE: node cli-demo.js [<directory name>]\033[39m');

var __dirname = process.argv[2] || __dirname;

/**
 * Read the current directory asynchronously
 */
fs.readdir(__dirname, function (err, files) {

    handleError(err);
    newline();

    console.log('  Displaying files/directories from: ' + __dirname + "\n");

    if (!files.length) {
        handleError(null, 'No files to show!');
    }

    console.log('  Select which file or directory you want to see: \n');
    var stats = [];

    // Show files and wait for user input to take further action
    function file(i) {
        var filename = files[i];

        // Process the selected option
        function selectedOption(option) {
            var index = Number(option);
            if (!files[index]) {
                stdout.write('  \033[31m Enter your choice: \033[39m')
            } else {
                stdin.pause();
                var name = files[index];
                if (stats[index].isDirectory()) {
                    fs.readdir(__dirname + '/' + name, function (err, filesInDir) {

                        handleError(err);
                        newline();

                        console.log('  (' + filesInDir.length + ' files)');
                        // iterate through all files in the directory
                        filesInDir.forEach(function (file) {
                            fs.stat(__dirname + '/' + name + '/' + file, function (err, stat) {
                                if (stat.isDirectory()) {
                                    console.log('  -  \033[36m ' + file + '/\033[39m');
                                } else {
                                    console.log('  -  \033[90m ' + file + '\033[39m');
                                }
                            });
                        });

                        newline();
                    });
                } else {
                    // Read the file asynchronously as a stream
                    var stream = fs.createReadStream(__dirname + '/' + name, 'utf8');
                    stream.on('data', function (chunk) {
                        console.log('\033[90m' + chunk + '\033[39m');
                    });
                    stream.on('end', function (chunk) {

                    });
                    /*
                    fs.readFile(__dirname + '/' + name, 'utf8', function (err, data) {
                        handleError(err);
                        newline();
                        console.log('\033[90m' + data.replace(/(.*)/g, '    $1') + '\033[39m');
                    });
                    */
                }
            }
        }

        // Read the user input
        function readUserInput() {
            newline();
            stdout.write('  \033[33m Enter your choice: \033[39m');
            stdin.resume();
            stdin.setEncoding('utf8');
            stdin.on('data', selectedOption);
        }

        // Display all files and folder and store their metadata in stats array.
        // Also, once all the files/folders are displayed, wait for the user input.
        fs.stat(__dirname + '/' + filename, function (err, stat) {

            handleError(err);
            stats[i] = stat;

            if (stat.isDirectory()) {
                console.log('  ' + i + ' \033[36m ' + filename + '/\033[39m');
            } else {
                console.log('  ' + i + ' \033[90m ' + filename + '\033[39m');
            }

            i++;
            if (i === files.length) {
                readUserInput(); // Wait for user's input
            } else {
                file(i); // Display the next file/folder name
            }
        });
    }

    // fire up the reading action
    file(0);

});
