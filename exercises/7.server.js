function handleHTTP(req,res) {
	if (req.method == "GET") {
		if (/^\/\d+(?=$|[\/?#])/.test(req.url)) {
			req.addListener("end",function(){
				req.url = req.url.replace(/^\/(\d+).*$/,"/$1.html");
				static_files.serve(req,res);
			});
			req.resume();
		}
		else {
			res.writeHead(403);
			res.end();
		}
	}
	else {
		res.writeHead(403);
		res.end();
	}
}

function handleIO(socket){
	function disconnect(){
		console.log("client disconnected");
	}
	console.log("client connected");
	socket.on("disconnect", disconnect);
}

var
	http = require("http"),
	httpserv = http.createServer(handleHTTP),

	port = 8006,
	host = "127.0.0.1",

	ASQ = require("asynquence"),
	node_static = require("node-static"),
	static_files = new node_static.Server(__dirname)
;

require("asynquence-contrib");

var io = require("socket.io").listen(http_serv);
io.on("connection", handleIO);
// httpserv.listen(port, host);
