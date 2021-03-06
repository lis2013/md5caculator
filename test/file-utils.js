
var file_utils = require('../src/utils/file-utils');
var path = require('path');

function getVisitor(){
    var count = 0;
    return {
        visit:function(path){
            console.log(count + " " + path);
            count++;
        },
        stop:function(){
            return count > 10;
        }
    }
}

//file_utils.walkDir(path.join(__dirname, "walkdir"), getVisitor());
//console.log("finished");

file_utils.rmTree(path.join(__dirname, "walkdir_"), function(e){
   if(e) console.log(e.toString());
   else{
       console.log('remove success');
   }
});