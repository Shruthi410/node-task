const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

let rawdata = fs.readFileSync(path.resolve(__dirname, 'tour.json'));
let tour = JSON.parse(rawdata);


app.get("/", function(req, res){
  res.send(tour)
})


app.get("/tour", function(req, res){
  let items = []
  for(let i = 0; i < tour.length; i++){
    let dates = []
    for(let j = 0; i< tour[i]["startDates"].length; i++){
      date = tour[i]["startDates"];
      var arr = date.toString().split("T")
      dates.push(arr[0])
    }

    var jsonObj = {
        name: tour[i]["name"],
        address: tour[i]["locations"],
        date: dates,
        price: tour[i]["price"]
      }
    items.push(jsonObj)

  }
  res.send(items)
})


app.get("/tour-data", function(req, res){
  let items = []
  for(let i = 0; i < tour.length; i++){
    if (tour[i]["name"] == "The Sea Explorer"){
      items.push(tour[i])
    }
  }
  res.send(items)
})


app.listen(3000, function(){
  console.log('server started at port 3000');
});
