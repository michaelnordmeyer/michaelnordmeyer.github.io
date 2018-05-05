var stats_obj = stats_obj || (function() {
  var instance = null;

  function _ins() {
    var _self = this,
      monitoring = 0,
      setup = 0;
    this.domain = 'https://stats.michaelnordmeyer.com';
    console.log("Ready");
    this.setup = function() {
      console.log("Setting up...");
      if (!_self.get_cookie('_first_pageview')) {
        _self.set_referrer();
        _self.set_cookie('_first_pageview', 1, 600);
      }
      _self.start_monitoring();
      _self.pageview(1);
    };
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
    this.beacon = function(type, query, called_by_pageview) {
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
      _self.store(_self.domain + '?' + type + (uid ? '&uid=' + uid : '') + '&date=' + _self.encode(new Date().toISOString()) + query + split + '');
      _self.referrer = '';
      _self.ping_start();
    };
    this.pageview = function(only_once) {
      console.log("Register pageview...");
      _self.beacon('', '&url=' + _self.encode(_self.get_url()) + '&title=' + _self.encode(stats_custom.title || window.stats_page_title || document.title) + (_self.referrer ? '&ref=' + _self.encode(_self.referrer) : ''), (only_once ? 1 : 0));
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
    this.log = function(url, title, type) {
      console.log("Logging...");
      if (type == 'pageview') url = url.replace(/^https?:\/\/([^\/]+)/i, '');
      var o = {
        'type': (type || 'click'),
        'url': url,
        'title': (title || '')
      };
      if (!_self.queue_add(o)) _self.beacon(type, o);
    };
    this.queue_ok = function() {
      return window.JSON && typeof JSON == 'object' && JSON.stringify && JSON.parse;
    };
    this.queue_add = function(o) {
      if (!_self.queue_ok()) return false;
      if (o.type.match(/pageview|download|outbound/i)) return false;
      var q = _self.queue_get();
      try {
        q.events.push(o);
      } catch (e) {
        return false;
      }
      _self.queue_set(q);
      return true;
    };
    this.queue_reset = function() {
      _self.queue_set(_self.queue_default());
    };
    this.queue_get = function() {
      var q = _self.get_cookie('_events');
      return q ? JSON.parse(q) : _self.queue_default();
    };
    this.queue_set = function(q, ex) {
      _self.set_cookie('_events', JSON.stringify(q), (ex || 600));
    };
    this.queue_default = function() {
      return {
        'events': []
      };
    };
    this.queue_process = function() {
      var q = _self.queue_get();
      try {
        if (q.events.length) _self.queue_reset();
        while (q.events.length) _self.beacon('', q.events.shift());
      } catch (e) {
        if (_self.debug) console.log(e);
      }
    };
    this.start_monitoring = function() {
      if (!monitoring) {
        console.log("Monitoring...");
        monitoring = 1;
        if (_self.queue_ok()) {
          _self.queue_process();
          setInterval(_self.queue_process, 5000);
        }
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
      }
    };
    this.ping = function() {
      console.log("Pinging...");
      _self.beacon('ping');
    };
    this.ping_set = function() {
      console.log("Setting ping...");
      var pingy = setInterval(_self.ping, 2 * 60 * 1000);
      setTimeout(function() {
        clearInterval(pingy);
      }, _self.ps_stop * 1000);
      _self.ping();
    };
    this.ping_start = function() {
      console.log("Starting ping...");
      if (_self.pinging) return;
      _self.pinging = 1;
      _self.ps_stop = 485;
      setTimeout(_self.ping, 30 * 1000);
      setTimeout(_self.ping, 60 * 1000);
      setTimeout(_self.ping_set, 2 * 60 * 1000);
    };
    this.get_cookie = function(name) {
      console.log("Getting cookie " + name);
      if (name.match(/^_(custom|referrer)/)) return '';
      var ca = document.cookie.split(';');
      for (var i = 0, l = ca.length; i < l; i++) {
        if (ca[i].match(new RegExp("\\b" + name + "="))) return decodeURIComponent(ca[i].split(name + '=')[1]);
      }
      return '';
    };
    this.set_cookie = function(name, value, expires) {
      console.log("Setting cookie " + name);
      if (name.match(/^_(custom|referrer)/)) return false;
      var ex = new Date;
      ex.setTime(ex.getTime() + (expires || 20 * 365 * 86400) * 1000);
      var temp = name + "=" + _self.encode(value) + ";expires=" + ex.toGMTString() + ";path=/;";
      if (location.hostname.match(/\./)) temp += 'domain=.' + location.hostname.replace(/^www\./i, '') + ';';
      document.cookie = temp;
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
    this.add_event = function(o, type, func) {
      if (o.addEventListener) {
        o.addEventListener(type, func, false);
      } else if (o.attachEvent) {
        o.attachEvent("on" + type, func);
      }
    };
    this.ping_on_close = function() {
      navigator.sendBeacon(_self.domain + '/?end&uid=' + _self.get_cookie('_uid') + '&date=' + _self.encode(new Date().toISOString()));
    };
    if (!setup) {
      setup = 1;
      _self.setup();
    }
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
window.addEventListener("unload", stats.ping_on_close(), false);