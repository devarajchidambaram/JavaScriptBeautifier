var beautify = require('js-beautify').js_beautify,
  fs = require('fs');

//Set the folder path to beautify
var dirName = "/home/guidanz-devaraj/git_newskedler/skedler/skedler/src/test";


function beautifier(fileName) {

  fs.readFile(fileName, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    fs.writeFile(fileName, beautify(data, {
      indent_size: 2
    }), function(err) {
      if (err) {
        console.log('err', err);
      }
    });
  });
}


function iterateFiles(dirName, cb) {
  fs.readdir(dirName, function(err, files) {
    var fileLength = files.length;
    files.forEach(function(file) {
      fs.stat(dirName + '/' + file, function(err, stats) {
        if (stats.isDirectory()) {
          iterateFiles(dirName + '/' + file, function(err, res) {
            if (!--fileLength) callback(null, 'success');
          });
        } else {
          if (file.endsWith(".js")) {
            beautifier(dirName + '/' + file);
          }
        }
      });
    });
  });
}


iterateFiles(dirName, function(err, res) {});