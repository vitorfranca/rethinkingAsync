function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 4000) + 500;

	console.log("Requesting: " + url);

	setTimeout(function() {
		cb(fake_responses[url]);
	}, randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

function getFile(file) {
  var result;
  var fn;

  fakeAjax(file, function(text) {
    if(fn) fn(text);
    else result = text;
  });

  return function(cb) {
    if(result) cb(result); // if this runs before fakeAjax
    else fn = cb;          // if this runs after fakeAjax
  }
}

// request all files concurrently
var th1 = getFile("file1");
var th2 = getFile("file2");
var th3 = getFile("file3");

th1(function(text1) {
  output(text1);
  th2(function(text2) {
    output(text2);
    th3(function(text3) {
      output(text3);
      output("Complete!");
    });
  });
});