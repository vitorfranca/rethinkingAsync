function fakeAjax(url,cb) {
	const fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	const randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}
function error(err) {
  console.error(err);
}

// **************************************

function getFile(file) {
  return new Promise((resolve) => {
    fakeAjax(file, resolve);
  });
}

// request all files concurrently
const p1 = getFile("file1");
const p2 = getFile("file2");
const p3 = getFile("file3");

p1
  .then(output, error)
  .then(() => p2)
  .then(output, error)
  .then(() => p3)
  .then(output, error)
  .then(() => output("Complete!"));
