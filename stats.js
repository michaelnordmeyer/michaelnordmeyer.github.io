var stats_obj = stats_obj || (function() {
  var instance = null;

  function _ins() {
    var _self = this;
    this.domain = 'https://stats.michaelnordmeyer.com';
    this.set_referrer = function() {
      console.log("Setting referrer...");
      var referrer = stats_custom.iframe ? top.document.referrer : document.referrer;
      referrer = referrer && referrer.match(/^https?:/) ? (RegExp("^https?://[^/]*" + location.host.replace(/^www\./i, "") + "/", "i").test(referrer) ? '' : referrer) : '';
      if (referrer) {
        _self.set_cookie('_referrer', referrer, 86400 * 90);
      } else {
        referrer = _self.get_cookie('_referrer');
      }
      _self.referrer = referrer;
    };
    this.store = function(url) {
      console.log("Storing...");
      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", url, true);
      xhttp.send();
    };
    this.beacon = function(type, query) {
      console.log("Firing beacon...");
      query = query || '';
      type = type || 'pageview';
      if (typeof query == 'object') {
        if (query.type) type = query.type;
        var temp = '';
        for (var i in query) {
          if (i != 'type' && query.hasOwnProperty && query.hasOwnProperty(i)) temp += '&' + i + '=' + _self.encode(query[i]);
        }
        query = temp;
        delete temp;
      }
      var uid = '',
      split = '';
      uid = _self.get_cookie('_uid');
      if (!uid) {
        _self.set_cookie('_uid', _self.uid());
        uid = _self.get_cookie('_uid');
      }
      if (type != 'ping') {
        if (stats_custom.split) {
          for (var i in stats_custom['split']) {
            if (stats_custom['split'].hasOwnProperty && stats_custom['split'].hasOwnProperty(i)) {
              split += '&split[' + _self.encode(i) + ']=' + _self.encode(stats_custom.split[i]);
            }
          }
          stats_custom.split = '';
        }
      }
      _self.store(_self.domain + '?' + type + (uid ? '=' + uid : '') + query + split + '');
      _self.referrer = '';
    };
    this.pageview = function() {
      console.log("Register pageview...");
      _self.beacon('', '&url=' + _self.encode(_self.get_url()) + '&title=' + _self.encode(stats_custom.title || window.stats_page_title || document.title) + (_self.referrer ? '&ref=' + _self.encode(_self.referrer) : ''));
      _self.ping_start();
    };
    this.ping_start = function() {
      console.log("Starting ping...");
      _self.ps_stop = 600;
      var pingInterval = setInterval(_self.ping, 5 * 1000);
      setTimeout(function() {
        clearInterval(pingInterval);
      }, _self.ps_stop * 1000);
      _self.ping();
    };
    this.ping = function() {
      console.log("Pinging...");
      _self.beacon('ping');
    };
    this.get_url = function() {
      console.log("Resolving url...");
      var url = '';
      if (stats_custom.iframe) {
        url = top.location.pathname + top.location.search;
        stats_custom.title = top.document.title;
      }
      if (!url) url = location.pathname + location.search;
      return url;
    };
    this.start_monitoring = function() {
      console.log("Monitoring...");
      if (window.history && window.history.pushState) {
        _self.pushState = history.pushState;
        history.pushState = function() {
          _self.pushState.apply(history, arguments);
          setTimeout(_self.pageview, 250);
        };
        _self.add_event(window, 'popstate', function(e) {
          if (e.state) setTimeout(_self.pageview, 250);
        });
      }
    };
    this.add_event = function(o, type, func) {
      if (o.addEventListener) {
        o.addEventListener(type, func, false);
      } else if (o.attachEvent) {
        o.attachEvent("on" + type, func);
      }
    };
    this.get_cookie = function(name) {
      console.log("Getting cookie " + name);
      var ca = document.cookie.split(';');
      for (var i = 0, l = ca.length; i < l; i++) {
        if (ca[i].match(new RegExp("\\b" + name + "="))) return decodeURIComponent(ca[i].split(name + '=')[1]);
      }
      return '';
    };
    this.set_cookie = function(name, value, expires) {
      console.log("Setting cookie " + name);
      var ex = new Date();
      ex.setTime(ex.getTime() + (expires || 20 * 365 * 86400) * 1000);
      var cookie = name + "=" + _self.encode(value) + ";expires=" + ex.toGMTString() + ";path=/;";
      if (location.hostname.match(/\./)) cookie += 'domain=.' + location.hostname.replace(/^www\./i, '') + ';';
      document.cookie = cookie;
    };
    this.uid = function() {
      var i = 0;
      do {
        var random = Math.round(Math.random() * 4294967295);
      } while (random == 1421816160 && i++ < 100);
      return random;
    };
    this.encode = function(uriComponent) {
      return window.encodeodeURIComponent ? encodeURIComponent(uriComponent) : escape(uriComponent);
    };
    this.ping_on_close = function() {
      navigator.sendBeacon(_self.domain + '/?end=' + _self.get_cookie('_uid'));
    };
    this.setup = function() {
      console.log("Setting up...");
      window.addEventListener("unload", stats.ping_on_close, false);
      if (!_self.get_cookie('_referrer')) {
        _self.set_referrer();
      }
      // _self.start_monitoring();
      _self.pageview();
    };
   _self.setup();
  }
  return new function() {
    this.getInstance = function() {
      if (instance == null) {
        instance = new _ins();
        instance.constructor = null;
      }
      return instance;
    }
  }
})();
if (!window.stats_custom) var stats_custom = {};
var stats = stats_obj.getInstance();
