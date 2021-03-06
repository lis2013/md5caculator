var fs = require('fs');
var path = require('path');

var export_ = module.exports;

export_.walkDir = function wd(dir, visitor){
  if( !fs.existsSync(dir) || !fs.statSync(dir).isDirectory() || visitor.stop()){
      return;
  }
  fs.readdirSync(dir).forEach(function(entry){
      var childEntry = path.join(dir, entry);
      if( fs.statSync(childEntry).isDirectory()){
          wd(childEntry, visitor);
      }else{
          if(!visitor.stop()){
              visitor.visit(childEntry)
          }
      }

  });
};

export_.rmTreeSync = function rmTreeSync(p){
    if( !fs.existsSync(p) || !fs.statSync(p).isDirectory()) return;

    var files = fs.readdirSync( p );
    if( !files.length){
        fs.rmdirSync( p );
        return;
    }else{
        files.forEach(function(f){
            var fullName = path.join(p, f);
            if( fs.statSync(fullName).isDirectory()){
                rmTreeSync(fullName);
            }else{
                fs.unlinkSync(fullName);
            }
        });
    }
   fs.rmdirSync(p);
};

var root = process.env['USERPROFILE'] || process['HOME'];

export_.createTmpDir = function(){
    var tempDir = path.join(root,  new Date().getTime().toString() );
    fs.mkdirSync(tempDir);
    return tempDir;
};

export_.rmTree = function rmTree(p, callback){
    fs.exists(p, function(exsits){
        if(!exsits || !fs.statSync(p).isDirectory()) return callback();
        fs.readdir(p, function(e, files){
            if(e) callback(e);
            var fullNames = files.map(function(file){
                return path.join(p, file);
            });
            getFileStats(fullNames, fs.stat, function(e, stats){
               var files = [];
               var dirs = [];
               for( var i = 0; i < fullNames.length; i++){
                   if(stats[i].isDirectory()){
                       dirs.push(fullNames[i]);
                   }else{
                       files.push(fullNames[i]);
                   }
               }
               serial(files, fs.unlink, function(e){
                  if(e) return callback(e);
                  serial(dirs, rmTree, function(e){
                      if(e) return callback(e);
                      fs.rmdir(p, callback);
                  });
               });

            });
        });

    });
};

var getFileStats = function(list, stat, callback){
  if( !list.length){
      return callback(null, []);
  }
  var copy = list.concat();
  var statsArray = [];
  stat(copy.shift(), function handler(e, stats){
      if(e){
          return callback(e);
      }else{
          statsArray.push(stats);
          if(copy.length){
              stat(copy.shift(), handler);
          }else{
              callback(null, statsArray);
          }
      }
  });
};

var serial = function(list, handler, callback){
  if(!list.length) return callback(null, []);
  var copy = list.concat();
    handler(copy.shift(), function h(e){
     if(e) return callback(e);
     if(copy.length){
         handler(copy.shift(), h);
     }else{
         callback(null);
     }
  });
};
