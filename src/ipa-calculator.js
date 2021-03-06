
var fs = require('fs');
var path = require('path');
var et = require('elementtree');
var console = require('./utils/console');
var file_utils = require('./utils/file-utils');
var md5 = require('./utils/md5');
var zip = require('./utils/zip');
var utils = require('./utils/utils');
var event = require('./event');

var fileExtSupported = ['.js','.html','.htm'];

module.exports = function(ipaPath, callback){
    unZipIpa(ipaPath, function(path){
        if( !utils.isString(path)){
            file_utils.rmTreeSync( path );
            if (callback) callback(path);
            return;
        }
        getStartAppPath(path, function(e, startAppPath){
                if(e){
                    file_utils.rmTreeSync( path );
                    return callback(e);
                }
                calcMd5( startAppPath , function(e, md5Value){
                if (callback) callback(e, md5Value);
                file_utils.rmTreeSync( path );
            });

        });
    });
};


function calcMd5(dirPath, callback) {
    callback = callback || function(){};
    var _md5List = [];
    file_utils.walkDir(dirPath, (function(){
        var stop = false;
        return {
            stop:function () {
                return stop;
            },
            visit:function (entry) {
                if(fileExtSupported.indexOf(path.extname(entry)) == -1){
                    return;
                }
                md5.md5fileSync(entry, function(e, r){
                    if( e ){
                        stop = true;
                        return callback(e)
                    }
                    _md5List.push([entry, r]);
                });
            }
        }
        })());

    //升序排列
    _md5List.sort(function (a, b) {
        if( a[1] === b[1] ) return 0;
        return a[1] > b[1] ?  1 :  -1;
    });

    var _md5ValueList =[];
    _md5List.forEach(function(elem){
        event.emit('info', elem[0] + ":" + elem[1]);
        _md5ValueList.push(elem[1]);
    });
    var sortAfter = '[' + _md5ValueList.join(', ') +']';
    event.emit('info',sortAfter);
    callback(null, md5.md5str( sortAfter ));
}

function unZipIpa(ipaPath, callback){
    var _tmp = file_utils.createTmpDir();
    zip.unzip(ipaPath, _tmp, function(path){
        callback(path);
    });
}

function getStartAppPath(dir, cb){
    cb = cb || function(){};
    var _configPath = path.join(dir, 'Payload/%s/config.xml');
    var _startAppDirPath = path.join(dir, 'Payload/%s/www/preinstalledApps/%2/');
    var _dirs = fs.readdirSync( dir );
    if( _dirs.length != 1 || _dirs[0] !== 'Payload'){
        event.emit('error', 'error ipa format');
        return cb(new Error('error ipa format'));

    }
    _dirs = fs.readdirSync(path.join(dir, 'Payload'));
    if( _dirs.length != 1){
        event.emit('error', 'error ipa format');
        return cb(new Error('error ipa format'));
    }
    _findingDir = _dirs[0];
    _configPath = _configPath.replace('%s',_findingDir);
    if(!fs.existsSync(_configPath)){
        event.emit('error', 'error ipa format');
        return cb(new Error('error ipa format'));
    }
    _startAppDirPath = _startAppDirPath.replace('%s', _findingDir);
    var _tree = new et.ElementTree(et.XML(fs.readFileSync(_configPath, 'utf-8')));
    var _startAppDir = _tree.getroot().findtext('pre_install_packages/app_package/');
    _startAppDirPath = _startAppDirPath.replace('%2', _startAppDir);
    if(!fs.existsSync(_startAppDirPath)){
        event.emit('error', 'error ipa format');
        return cb(new Error('error ipa format'));
    }
    if(cb) cb(null, _startAppDirPath);
}