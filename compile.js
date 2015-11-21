GLOBAL.fs = require('fs');
GLOBAL.Handlebars = require('handlebars');
GLOBAL.im = require('imagemagick');
GLOBAL.mkdirp = require('mkdirp');
GLOBAL.path = require('path');
GLOBAL.replaceExt = require('replace-ext');
GLOBAL.Q = require('q');

require('./loadHandlebars.js');

//********************* HELPERS *********************//
function getPhotos(src) {
    var all = fs.readdirSync(src);
    var files = [];
    for (var i = 0; i < all.length; i++) {
      if(!fs.statSync(path.join(src, all[i])).isDirectory()
          && (all[i].indexOf(".JPG") >= 0 || all[i].indexOf(".jpg") >= 0)) {
        var title = '';
        try {
          title = fs.readFileSync(path.join(src, replaceExt(all[i], '.txt')), 'UTF8');
        } catch(exception) {
          // Do nothing
        }
        files.push({
          file: all[i],
          title: title
        });
        createThumbnail(src, all[i]);
      } 
    }
    return files;
}

function createThumbnail(src, image) {
  mkdirp.sync(src.replace('photos/', 'thumbnails/'));
  try {
    stat = fs.statSync(path.join(src.replace('photos/', 'thumbnails/'), image));
  } catch (exception) {
    // Thumbnail doesn't exist, create it
    original = path.join(src, image);
    Q.ninvoke(im, 'crop', {
      srcPath: path.join(src, image),
      dstPath: path.join(src.replace('photos/', 'thumbnails/'), image),
      width: 250,
      height: 250,
      quality: 1,
      gravity: 'Center'
    }).then(function () {
      console.log('Cropped image');
    }).fail(console.error);
  }
}

function getDirectories(src) {
  dirs = fs.readdirSync(src).filter(function(file) {
    return fs.statSync(path.join(src, file)).isDirectory();
  });
  cleanedDirs = [];
  for (var i = 0; i < dirs.length; i++) {
     cleanedDirs[i] = dirs[i].replace('_', ' ');   
  }
  return cleanedDirs;
}

function getFolderStructure(src, level) {
  var topDirs = getDirectories(src.replace(' ', '_'));
  var struct = [];
  for (var index = 0; index < topDirs.length; index++) {
    var dir = {
      name: topDirs[index]
    };
    var subDirs = getDirectories(src.replace(' ', '_') + topDirs[index].replace(' ', '_'));
    if (subDirs.length) {
      var dirnames = src.split(path.delimiter);
      dir.submenu = dirnames[dirnames.length - 1] + '-' + level + '-' + index;
      dir.subdirs = getFolderStructure(src + topDirs[index] + '/', level+1);
    } else {
      if (!dir.photos) dir.photos = [];
      dir.photos = getPhotos(src.replace(' ', '_') + topDirs[index].replace(' ', '_'));
    }
    dir.pathTo = src.replace(' ', '_');
    dir.thumbnailPathTo = dir.pathTo.replace('photos/', 'thumbnails/');
    struct.push(dir);
  };
  return struct;
}

//********************* MAIN *********************//
dirs = getFolderStructure('./photos/', 0);
console.log(JSON.stringify(dirs, null, 2));

context = JSON.parse(fs.readFileSync('config.json', 'UTF8'));
context.menuitems = dirs;

fs.writeFile("index.html", index(context), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("index.html was saved!");
}); 

fs.writeFile("js/imageData.js", data(context), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("js/imageData.js was saved!");
}); 