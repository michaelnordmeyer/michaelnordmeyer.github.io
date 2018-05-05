var mnstats_obj = mnstats_obj || (function() {
  var instance = null;

  function _ins() {
    var _self = this,
      monitors = 0,
      setup = 0;
    this.domain = 'https://goodyworks.com';
    console.log("Ready");
    this.setup = function() {
      console.log("Setting up...");
      if (!_self.get_cookie('_first_pageview')) {
        _self.set_referrer();
        _self.set_cookie('_first_pageview', 1, 600);
      }
      _self.start_monitors();
      _self.pageview(1);
    };
    this.store = function(url) {
      console.log("Storing...");
      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", url, true);
      xhttp.send();
    };
    this.base = function(type) {
      console.log("Resolving base URL...");
      var url = _self.domain + '/?mnc';
      if (type == 'ping') return url;
      return url + "&lang=" + (navigator.language || navigator.browserLanguage || 'xx').substr(0, 2);
    };
    this.set_referrer = function() {
      console.log("Setting referrer...");
      var r = mnstats_custom.iframe ? top.document.referrer : document.referrer;
      r = r && r.match(/^https?:/) ? (RegExp("^https?://[^/]*" + location.host.replace(/^www\./i, "") + "/", "i").test(r) ? '' : r) : '';
      if (r) {
        _self.set_cookie('_referrer', r, 86400 * 90);
      } else {
        r = _self.get_cookie('_referrer');
      }
      _self.ref = r;
    };
    this.pageview = function(only_once) {
      console.log("Function pageview");
      var href = _self.get_href();
      _self.beacon('', '&href=' + _self.enc(href) + '&title=' + _self.enc(mnstats_custom.title || window.mnstats_page_title || document.title) + (_self.ref ? '&ref=' + _self.enc(_self.ref) : ''), (only_once ? 1 : 0));
    };
    this.get_href = function(enc) {
      console.log("Resolving href...");
      var href = '';
      if (!href) {
        if (mnstats_custom.iframe) {
          href = top.location.pathname + top.location.search;
          mnstats_custom.title = top.document.title;
        }
        if (!href) href = location.pathname + location.search;
      }
      return enc ? _self.enc(href) : href;
    };
    this.log = function(href, title, type) {
      console.log("Logging...");
      if (type == 'pageview') href = href.replace(/^https?:\/\/([^\/]+)/i, '');
      var o = {
        'type': (type || 'click'),
        'href': href,
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
    this.start_monitors = function() {
      if (!monitors) {
        console.log("Starting monitors...");
        monitors = 1;
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
    this.beacon = function(type, q, called_by_pageview) {
      console.log("Firing beacon...");
      q = q || '';
      type = type || 'pageview';
      if (typeof q == 'object') {
        if (q.type) type = q.type;
        var temp = '';
        for (var i in q) {
          if (i != 'type' && q.hasOwnProperty && q.hasOwnProperty(i)) temp += '&' + i + '=' + _self.enc(q[i]);
        }
        q = temp;
        delete temp;
      }
      var uuid = '',
      split = '';
      uuid = _self.get_cookie('_uuid');
      if (!uuid) {
        _self.set_cookie('_uuid', _self.randy());
        uuid = _self.get_cookie('_uuid');
      }
      if (type != 'ping') {
        if (mnstats_custom.split) {
          for (var i in mnstats_custom['split']) {
            if (mnstats_custom['split'].hasOwnProperty && mnstats_custom['split'].hasOwnProperty(i)) {
              split += '&split[' + _self.enc(i) + ']=' + _self.enc(mnstats_custom.split[i]);
            }
          }
          mnstats_custom.split = '';
        }
      }
      _self.store(_self.base(type) + '&type=' + type + q + split + (uuid ? '&uuid=' + uuid : '') + '&random=' + Math.random() + '');
      if (type == 'outbound' || type == 'download') _self.pause();
      _self.ref = '';
      _self.ping_start();
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
      var temp = name + "=" + _self.enc(value) + ";expires=" + ex.toGMTString() + ";path=/;";
      if (location.hostname.match(/\./)) temp += 'domain=.' + location.hostname.replace(/^www\./i, '') + ';';
      document.cookie = temp;
    };
    this.randy = function() {
      var i = 0;
      do {
        var r = Math.round(Math.random() * 4294967295);
      } while (r == 1421816160 && i++ < 100);
      return r;
    };
    this.pause = function(x) {
      var now = new Date();
      var stop = now.getTime() + (x || 500);
      while (now.getTime() < stop) var now = new Date();
    };
    this.enc = function(e) {
      return window.encodeURIComponent ? encodeURIComponent(e) : escape(e);
    };
    this.add_event = function(o, type, func) {
      if (o.addEventListener) {
        o.addEventListener(type, func, false);
      } else if (o.attachEvent) {
        o.attachEvent("on" + type, func);
      }
    };
    this.get_parent = function(e) {
      console.log("Resolving parent...");
      return e.parentElement || e.parentNode;
    };
    this.get_target = function(e) {
      console.log("Resolving target...");
      if (!e) var e = window.event;
      var t = e.target ? e.target : e.srcElement;
      if (t.nodeType && t.nodeType == 3) t = t.parentNode;
      return t;
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
if (!window.mnstats_custom) var mnstats_custom = {};
var mnstats = mnstats_obj.getInstance();
