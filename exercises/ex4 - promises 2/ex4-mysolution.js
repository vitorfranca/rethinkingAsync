const fake_responses = {
  "file1": "The first text",
  "file2": "The middle text",
  "file3": "The last text"
};
function fakeAjax(url,cb) {
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

function getFile(file) {
	return new Promise(function(resolve){
		fakeAjax(file,resolve);
	});
}

const files = Object.keys(fake_responses);
files
.map(getFile)
.concat("Complete!")
.reduce(function(promiseChain, promise) {
  return promiseChain
    .then(() => promise)
    .then(output)
}, Promise.resolve());
