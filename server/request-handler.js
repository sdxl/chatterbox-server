/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
// var exports = {};
var _chatStorage = {
  results: []
};

exports.requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log("Serving request type " + request.method + " for url " + request.url);

  var endPointArr = request.url.split('/');
  var classFound = endPointArr[endPointArr.length - 2] === 'classes' ? true : false ;
  // var endPoint = endPointArr[endPointArr.length - 1];


  if(classFound){

    if(request.method === "POST"){
      console.log("[200] " + request.method + " to " + request.url);

      request.on('data', function(chunk) {
        var receivedPost = JSON.parse(chunk.toString());
        _chatStorage.results.push(receivedPost);

      });

      request.on('end', function() {
        response.writeHead(201, "OK", {'Content-Type': 'application/json',
                                       "access-control-allow-origin": "*",
                                       "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
                                       "access-control-allow-headers": "content-type, accept",
                                       "access-control-max-age": 10});
        //filter response object
        response.end(JSON.stringify(_chatStorage));
      });
    }

    if ( request.method === "GET" ) {
      response.writeHead(200, "OK", {'Content-Type': 'application/json',
                                     "access-control-allow-origin": "*",
                                     "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
                                     "access-control-allow-headers": "content-type, accept",
                                     "access-control-max-age": 10});
      //filter response object
      response.end(JSON.stringify(_chatStorage));
    }

    // else{
    //   //send back error message message
    // }
  }
  else{
    //wrong url, send back 404;
      response.writeHead(404, "Bad Url", {'Content-Type': 'text/plain',
                                          "access-control-allow-origin": "*",
                                          "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
                                          "access-control-allow-headers": "content-type, accept",
                                          "access-control-max-age": 10});
      response.end();
  }

};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};



