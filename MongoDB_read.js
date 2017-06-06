var d3 = require("d3");
var $ = require("jquery");

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
  var innerData;
  var jsonString
  var d3Data = [];
  var drawn = false;
// Connection URL
var url = 'mongodb://localhost:27017/boats';

var drawData = function() {
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
if(drawn == false) {
    initalizeGraph(db, function() {
      initPiechart(d3Data);

        db.close();
    });
    drawn = true;
} else {
  updateGraph(db, function() {
    updatePiechart(d3Data);
    db.close();
  });
}

});
}

var initalizeGraph = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('data');
  // Find some documents
innerData = collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
//    console.log("Found the following records");
//    console.log(docs)
jsonConverter(docs, function() {
   initGrapher(d3Data);
  // db.close();
});
    callback(docs);
    // db.close();
  });

}

var updateGraph = function(db, callback) {
  var collection = db.collection('data');
  // Find some documents
innerData = collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
//    console.log("Found the following records");
//    console.log(docs)
jsonConverter(docs, function() {
   updateGrapher(d3Data);
  // db.close();
});
    callback(docs);
    // db.close();
  });
}

var sendtoD3 = function(db,callback) {
var query = { topic: "/data" };
  db.collection("data").find(query).toArray(function(err, result) {
    if (err) throw err;
    jsonString = JSON.stringify(result);
  });
}

var jsonConverter = function(innerData, callback) {
  for(var i= 0; i<innerData.length; i++) {
   var stringer = innerData[i]['value']['buffer'];
   if(stringer != undefined) {
     var  stringe = bin2string(stringer);
    var  str = bin2string(innerData[i].value.buffer);
      str = str.split("/>");
      // str[1].replace(/\d/g);
      // d3Data.push({'message' : str[1], 'id' : i});
       d3Data.push(parseInt(str[1]));
   }
   if (d3Data.length > 50) {
       d3Data.shift(); // removes the first element from an array
   }
 }
  // console.log(d3Data);

// Slice in reverse, because slice rearranges the index!
for(var i = d3Data.length - 1; i >= 0; i--) {
  if (isNaN(d3Data[i])) {
    //  d3Data[i] = 0;
    d3Data.splice(i,1);
    // console.log(d3Data);
}
}

 callback();
}


function bin2string(array){
	var result = "";
	for(var i = 0; i < array.length; ++i){
		result+= (String.fromCharCode(array[i]));
	}
	return result;
}
