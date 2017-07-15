!function AjaxRequest() {
	function _serializeData(data){
		var dataStr = '';
		for(item in data) {
			dataStr += '&' + encodeURIComponent(item) + "=" + encodeURIComponent(data[item])
		}
		return dataStr.slice(1);
	}

	function _addURLParam(url, data) {
	  url += (url.indexOf("?") == -1 ? "?" : "&");
	  url += _serializeData(data);
	  return url;
	};

	function _onreadystatechange(xhr, callback) {
		if(xhr.readyState == 4) {
			if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
				var resp = JSON.parse(xhr.response);
				callback && callback(resp, xhr);
			} else {
				console.log(xhr);
			}
		}
	}

	function _createXHR() {
		if(typeof XMLHttpRequest != 'undefined') {
			return new XMLHttpRequest();
		} else if(typeof ActiveXObject != 'undefined') {
			if(typeof arguments.callee.activeXString != 'string') {
        var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'];
        var i, len;

        for(i = 0, len = versions.length; i < len; i++) {
            try {
                new ActiveXObject(versions[i]);
                arguments.callee.activeXString = versions[i];
                break;
            } catch(err) {}
        }

        return new ActiveXObject(arguments.callee.activeXString);
	    }
	  } else {
	  	console.error("No XHR Object");
	  	return false;
	  }
	}

	window.get = function(url, data, callback, async) {
	
		if(typeof data == 'object') {
			url = _addURLParam(url, data);
		}
		var xhr = _createXHR();
		xhr.onreadystatechange = function() {
			_onreadystatechange(xhr, callback);
		}
		xhr.open('get', url, typeof async == 'undefined' ? true : async);
		xhr.send(null);
	};

	window.post = function(url, data, callback, async) {
		var xhr = _createXHR();
		xhr.onreadystatechange = function() {
			_onreadystatechange(xhr, callback);
		};
		xhr.open('post', url, typeof async == 'undefined' ? true : async);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(typeof data == 'undefined' ? null : _serializeData(data));
	};
}();