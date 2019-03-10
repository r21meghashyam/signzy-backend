const express = require("express");
const http = require("http");
const csvtojson = require("csvtojson");
var _ = require('lodash');
var path = require("path");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/api", async(req,res,next)=>{
        let data=await csvtojson({
            delimiter:"|",
            ignoreColumns:/(district|identification1|identification2|latlong)/,
            ignoreEmpty:true
        }).fromFile("Bangalore_schools.csv");
        data.shift();
        if(req.body.search&&Object.keys(req.body.search).length){
            
            data = data.filter((row,index)=>{
                let match = true;
                let keys = Object.keys(req.body.search);
                for(let i=0;i<keys.length;i++){
                    var safeKey = _.escapeRegExp(req.body.search[keys[i]]);
                    if(!row[keys[i]]||!row[keys[i]].match(RegExp(safeKey,'i')))
                        match=false;
                }
                match&&console.log(row);
                return match?row:false;
            })
        }
        if(req.body.sortby){
            data = data.sort((row1,row2)=>{
                let column = req.body.sortby[0];
                let diff = row1[column]-row2[column];
                let inverse = req.body.sortby[1]=="desc"?-1:1;
                return diff*inverse;
                
            })
        }

        if(req.body.filter){
            
            data = data.map((row)=>{
                let fields = {};
                req.body.filter.map(column=>{
                    fields[column]=row[column]
                })
                return fields;
                
                
            })
        }

        let headersObj = {};
        data.forEach(row=>{
            
            Object.keys(row).forEach(column=>headersObj[column]=true)
        })
        let headers =  Object.keys(headersObj);
        res.json({
            status:200,
            headers,
            data
           
        })

});

app.get("/", async(req,res,next)=>{
    res.setHeader("Content-Type","text/html")
    res.sendFile(path.resolve("index.html"));
});

app.use(function(req, res, next){
    res.status(404);
    res.json({
        status:404,
        message:"Content not found"
    })
  });
  
const server = http.createServer(app);

server.on("listening",()=>{
    let addr = server.address();
    let bind = typeof addr === "string"
      ? "pipe " + addr
      : "port " + addr.port;
    console.log("Listening on http://localhost:"+addr.port);
})

server.listen("3000");