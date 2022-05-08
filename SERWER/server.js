var http = require("http");
var fs = require("fs");

var server = http.createServer(function(req,res){

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

        if(req.url == "/first"){
                if(req.method == "POST" || req.method == "OPTIONS"){
                        
                        fs.readdir(__dirname+"/static/mp3/", function (err, files) {

                                var obj = {
                                        dirs:[],
                                        thisdir : 'xd',
                                        files:[]
                                }

                                if (err) {
                                return console.log(err);
                                }
                                files.forEach(function (fileName) {
                                obj.dirs.push(fileName)    
                                });
                                obj.thisdir = obj.dirs[0]  
                                fs.readdir(__dirname+"/static/mp3/"+obj.dirs[0], function (err, files) {
                                        if (err) {
                                                return console.log(err);
                                        }
                                        files.forEach(function (fileName) {
                                                if(fileName!="cover.jpg"){
                                                        var stats = fs.statSync(__dirname+"/static/mp3/"+obj.dirs[0]+ "/" + fileName)
                                                        var skrrr = {name:fileName, size:(stats.size/1048576).toFixed(2) + "MB"}
                                                        obj.files.push(skrrr)
                                                }
                                        })
                                        res.setHeader("Access-Control-Allow-Origin", "*");
                                        res.setHeader("Access-Control-Allow-Origin", "*");
                                        res.end(JSON.stringify(obj, null, 4));
                                });
                                
                        });
                }
        };
        if (req.method == "GET") {
                if (req.url.includes('cover')) {
                    let coverFilePath = __dirname + decodeURI(req.url)
                    fs.readFile(coverFilePath, function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                        res.write(data);
                        res.end();
                    })
                }
                if (req.url.indexOf(".mp3") != -1) {
                        fs.readFile(__dirname + decodeURI(req.url), function (error, data) {
                                var stats = fs.statSync(__dirname + decodeURI(req.url))
                           res.writeHead(200, { 
                                "Content-Type": "audio/mpeg",
                                "Content-Length": stats.size,
                                "Accept-Ranges": "bytes" });
                           res.write(data);
                           res.end();
                        })
                     }
        }
        if(req.url == "/next"){
                if(req.method == "POST" || req.method == "OPTIONS"){
                        var dirname = ''
                        var allData = "";
                                req.on("data", function (data) {
                                allData += data;
                                dirname = allData;
                                })

                        fs.readdir(__dirname+"/static/mp3/", function (err, files) {

                                var obj = {
                                        dirs:[],
                                        thisdir : 'xd',
                                        files:[]
                                }

                                if(req.method == "POST"){
                                        dirname = JSON.parse(dirname)
                                        dirname = dirname.dir
                                }

                                if (err) {
                                return console.log(err);
                                }
                                files.forEach(function (fileName) {
                                obj.dirs.push(fileName)    
                                });  
                                obj.thisdir = dirname
                                fs.readdir(__dirname+"/static/mp3/"+ dirname, function (err, files) {
                                        if (err) {
                                                return console.log(err);
                                        }
                                        files.forEach(function (fileName) {
                                                if(fileName!="cover.jpg"){
                                                        var stats = fs.statSync(__dirname+"/static/mp3/"+dirname+ "/" + fileName)
                                                        var skrrr = {name:fileName, size:(stats.size/1048576).toFixed(2) + "MB"}
                                                        obj.files.push(skrrr)
                                                }
                                        })
                                        res.setHeader("Access-Control-Allow-Origin", "*");
                                        res.setHeader("Access-Control-Allow-Origin", "*");
                                        res.end(JSON.stringify(obj, null, 4));
                                });
                                
                        });       
                }
        }
})


server.listen(3000, function(){
   console.log("serwer startuje na porcie 3000")
});