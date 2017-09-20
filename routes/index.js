var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    util = require('util');

var router = express.Router();

var dirTree = function(filename) {
  //console.log(filename);
  var stats = fs.lstatSync(filename),
      info = {
          path: filename,
          name: path.basename(filename)
      };

  if (stats.isDirectory()) {
      info.type = "folder";
      info.children = fs.readdirSync(filename)
        .map(function(child) {
            return dirTree(filename + '/' + child);
        })
        .filter(function(i) {
            return i.type === 'folder';
        });
  } else {
      // Assuming it's a file. In real life it could be a symlink or
      // something else!
      info.type = "file";
      return info;
  }

  return info;
}

/* GET home page. */
router.get('/', function(req, res, next) {

  folders = dirTree('C:\\Users\\mccow\\Documents');
  console.log(util.inspect(folders, false, null));

  res.render('index', { title: 'Folders', folders: folders });
});

module.exports = router;
