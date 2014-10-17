(function() {
	var config = {
		"users": {
			url: "users",
			type: "get",
			data: null
		},
		"users-single": {
			url: "users/2",
			type: "get",
			data: null
		},
		"users-single-not-found": {
			url: "users/23",
			type: "get",
			data: null
		},
		"unknown": {
			url: "unknown",
			type: "get",
			data: null
		},
		"unknown-single": {
			url: "unknown/2",
			type: "get",
			data: null
		},
		"unknown-single-not-found": {
			url: "unknown/23",
			type: "get",
			data: null
		},
		"post": {
			url: "users",
			type: "post",
			data: {
				"name": "morpheus",
				"job": "leader"
			}
		},
		"put": {
			url: "users/2",
			type: "put",
			data: {
				"name": "morpheus",
				"job": "zion resident"
			}
		},
		"delete": {
			url: "users/2",
			type: "delete",
			data: null
		},
		"register-successful": {
			url: "register",
			type: "post",
			data: {
				"email": "sydney@fife",
				"password": "pistol"
			}
		},
		"register-unsuccessful": {
			url: "register",
			type: "post",
			data: {
				"email": "sydney@fife",
				"password": "pistol"
			}
		},
		"login-successful": {
			url: "login",
			type: "post",
			data: {
				"email": "peter@klaven",
				"password": "cityslicka"
			}
		},
		"login-unsuccessful": {
			url: "login",
			type: "post",
			data: {
				"email": "peter@klaven"
			}
		},
		"delay": {
			url: "users?delay=3",
			type: "get",
			data: null
		},
	};

	var consoleEl = document.querySelector("#console"),
		endpointsEl = consoleEl.querySelector("[data-key='endpoints']"),
		endpointEls = endpointsEl.querySelectorAll("[data-key='endpoint']"),
		urlEl = consoleEl.querySelector("[data-key='url']"),
		responseCodeEl = consoleEl.querySelector("[data-key='response-code']"),
		sendRequestButton = consoleEl.querySelector("[data-key='send-request']"),
		outputRequestEl = consoleEl.querySelector("[data-key='output-request']"),
		outputResponseEl = consoleEl.querySelector("[data-key='output-response']"),
		spinnerEl = consoleEl.querySelector("[data-key='spinner']");

	[].forEach.call(endpointEls, function(el) {
		el.addEventListener("click", function(e) {
			var element = e.currentTarget,
				key = element.getAttribute("data-id"),
				settings = config[key],
				xhr = new XMLHttpRequest();

			if (settings.data) {
				outputRequestEl.innerHTML = syntaxHighlight(JSON.stringify(settings.data, undefined, 4));
			}

			var finalURL = "http://reqr.es/api/" + settings.url;
			urlEl.value = finalURL;

			outputResponseEl.innerHTML = "";
			spinnerEl.removeAttribute("hidden");

			xhr.open(settings.type.toUpperCase(), finalURL, true);
			xhr.onload = function() {

				responseCodeEl.value = xhr.status;
				if (xhr.responseText) {
					outputResponseEl.innerHTML = syntaxHighlight(JSON.stringify(JSON.parse(xhr.responseText), undefined, 4));
				}
				spinnerEl.setAttribute("hidden", true);
			};
			xhr.send((settings.data) ? JSON.stringify(settings.data) : null);
		});
	});

	function syntaxHighlight(json) {
		json = json.replace(/&/g, '&').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
			var cls = 'number';
			if (/^"/.test(match)) {
				if (/:$/.test(match)) {
					cls = 'key';
				} else {
					cls = 'string';
				}
			} else if (/true|false/.test(match)) {
				cls = 'boolean';
			} else if (/null/.test(match)) {
				cls = 'null';
			}
			return '<span class="' + cls + '">' + match + '</span>';
		});
	}

})();