function printHelp(){
	console.log("1.js (c) Vincent Song");
	console.log("");
	console.log("usage:");
	console.log("--help			print this help");
	console.log("--file			print {file}");
	console.log("");
}

var args = require("minimist")(process.argv.slice(2),{ string: "file" });

if (args.help || !args.file){
	printHelp();
	process.exit(1);
}


var hello = require("./helloworld.js");

hello.say(args.file, function(err, contents){
	if(err){
		console.error("Error: " + err);
	}
	else{
		console.log(contents.toString());
	}
});

