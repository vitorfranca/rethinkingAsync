$(document).ready(function(){
	var $btn = $("#btn"),
		$list = $("#list"),
		clicks = ASQ.csp.chan(),
		msgs = ASQ.csp.chan();

	// push click event messages into channel
	$btn.click(function(evt){
		ASQ.csp.putAsync(clicks,evt);
	});

	// run go-routines
	ASQ().runner(
		ASQ.csp.go(dumpClicks),
		ASQ.csp.go(listenToClicks),
		ASQ.csp.go(logMessages)
	);

	function *dumpClicks() {
		while (true) {
			// just throw away the next click
			yield ASQ.csp.take(clicks);

			// don't be too greedy
			yield ASQ.csp.take( ASQ.csp.timeout(0) );
		}
	}

	// sample clicks channel
	function *listenToClicks() {
		while (true) {
			// throttle to taking clicks once per second
			yield ASQ.csp.take( ASQ.csp.timeout(1000) );

			// clear off the waiting dump-click
			yield ASQ.csp.put(clicks,null);

			// take the next click
			yield ASQ.csp.take(clicks);
			yield ASQ.csp.put(msgs,"clicked!");
		}
	}

	// subscribe to message channel
	function *logMessages() {
		while (true) {
			var msg = yield ASQ.csp.take(msgs);
			$list.append(msg + "<br>");
		}
	}
});
