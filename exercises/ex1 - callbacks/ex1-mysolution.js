var fake_responses = {
	"file1": "The first text",
	"file2": "The middle text",
	"file3": "The last text"
};

function fakeAjax(url,cb) {
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 100;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************
// The old-n-busted callback way

var responses = [];

function getFile(file, index) {
	fakeAjax(file, function(text) {
		console.log(`got response for ${file}`);
		responses[index] = text;
	});
	return index;
}

// request all files concurrently
var files = Object.keys(fake_responses);
files.forEach(getFile);

var nextPrint = 0;
while(files.length > nextPrint) {
	if(!!responses[nextPrint]) {
		console.log(responses[nextPrint]);
		nextPrint++;
	}
}

output("Complete!");