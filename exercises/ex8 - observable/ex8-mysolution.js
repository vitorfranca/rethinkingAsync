$(document).ready(function(){
	var $btn = $("#btn"),
		$list = $("#list"),
		clicks = ASQ.react.of(),
		msgs;

	$btn.click(function(evt){
		// push click events into stream
		clicks.push(evt);
	});

	msgs = throttle(clicks);

	// subscribe to throttled message stream
	msgs.val(function(msg){
		$list.append(msg + "<br>");
	});
});


function throttle(inStream) {
	var outStream = ASQ.react.of();

	setInterval(function(){
		ready = true;
	},1000);

	inStream.val(function(evt){
		if (ready) {
			outStream.push("clicked!");
			ready = false;
		}
	});

	return outStream;
}
