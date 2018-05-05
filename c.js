var mnstats_obj = mnstats_obj || (function() {
  var instance = null;

  function _ins() {
    var _self = this,
      monitors = 0,
      setup = 0;
    this.domain = 'http://goodyworks.com';
    if (!setup) {
      setup = 1;
      setTimeout(_self.setup, 100);
    }
    this.setup = function() {
      if (!_self.get_cookie('_first_pageview')) {
        _self.set_referrer();
        _self.set_cookie('_first_pageview', 1, 600);
      }
      setTimeout(_self.advanced, 1000);
      _self.start_monitors();
      if (!mnstats_custom.pageview_disable) {
        if (window.olark && typeof(olark) == 'function') {
          olark('api.boot.onIdentityReady', function(s, v, c) {
            _self.olark(s, v, c, 1);
          });
          setTimeout(function() {
            _self.pageview(1)
          }, 2000);
        } else {
          _self.pageview(1);
        }
      }
    };
    this.base = function(type) {
      var url = _self.domain + '/mnc?x';
      if (type == 'ping') return url;
      url += "&lang=" + (navigator.language || navigator.browserLanguage || 'xx').substr(0, 2);
      return url;
    };
    this.set_referrer = function() {
      var r = mnstats_custom.iframe ? top.document.referrer : document.referrer;
      r = r && r.match(/^https?:/) ? (RegExp("^https?://[^/]*" + location.host.replace(/^www\./i, "") + "/", "i").test(r) ? '' : r) : '';
      if (r) {
        _self.set_cookie('_referrer_og', r, 86400 * 90);
      } else {
        r = _self.get_cookie('_referrer_og');
      }
      _self.ref = r;
    };
    this.olark = function(s, v, c, do_pageview) {
      var o = s + ',' + v + ',' + c,
        c = _self.get_cookie('mnstats_olark');
      if (c && c == o) {
        if (do_pageview) _self.pageview(1);
        return;
      } else {
        if (c) _self.set_cookie('mnstats_olark', c, -3600);
        _self.set_cookie('mnstats_olark', o, 600);
        c = _self.get_cookie('mnstats_olark');
      }
      if (do_pageview) {
        _self.pageview(1, '&olark=' + o);
      } else if (c) {
        _self.beacon('ping', '&olark=' + o);
      }
    };
    this.pageview = function(only_once, extra) {
      var href = _self.get_href();
      _self.beacon('', '&title=' + _self.enc(mnstats_custom.title || window.mnstats_page_title || document.title) + (_self.ref ? '&ref=' + _self.enc(_self.ref) : '') + (extra || ''), (only_once ? 1 : 0));
    };
    this.get_href = function(enc) {
      var href = mnstats_custom.href || '';
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
      if (type == 'pageview') href = href.replace(/^https?:\/\/([^\/]+)/i, '');
      var o = {
        'type': (type || 'click'),
        'href': href,
        'title': (title || '')
      };
      if (!_self.queue_add(o)) _self.beacon(type, o);
    };
    this.queue_ok = function() {
      return window.JSON && typeof JSON == 'object' && JSON.stringify && JSON.parse && !mnstats_custom.cookies_disable && !mnstats_custom.queue_disable && !window.Prototype;
    };
    this.queue_add = function(o) {
      if (!_self.queue_ok()) return false;
      if (o.type.match(/pageview|download|outbound/i)) return false;
      var q = _self.queue_get();
      try {
        q.events.push(o);
      } catch (e) {
        if (_self.debug) console.log(e);
        return false;
      }
      _self.queue_set(q);
      return true;
    };
    this.queue_reset = function() {
      _self.queue_set(_self.queue_default());
    };
    this.queue_get = function() {
      var q = _self.get_cookie('_eventqueue');
      return q ? JSON.parse(q) : _self.queue_default();
    };
    this.queue_set = function(q, ex) {
      _self.set_cookie('_eventqueue', JSON.stringify(q), (ex || 600));
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
    this.doc_wh = function() {
      var db = document.body,
        de = document.documentElement;
      return {
        w: window.innerWidth || de.clientWidth || 1024,
        h: Math.max(db.scrollHeight, db.offsetHeight, de.clientHeight, de.scrollHeight, de.offsetHeight)
      }
    };
    this.start_monitors = function() {
      if (!monitors) {
        monitors = 1;
        if (_self.queue_ok()) {
          _self.queue_process();
          setInterval(_self.queue_process, 5000);
        }
        if (!mnstats_custom.history_disable && window.history && window.history.pushState) {
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
      var jsuid = '',
      split = '';
      jsuid = _self.get_cookie('_jsuid');
      if (!jsuid) {
        _self.set_cookie('_jsuid', _self.randy());
        jsuid = _self.get_cookie('_jsuid');
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
      if (called_by_pageview && type == 'pageview') {
        _self.inject(_self.base(type) + '&type=' + type + q + split + (jsuid ? '&jsuid=' + jsuid : '') + (mnstats_custom.cookies_disable ? '&noc' : '') + '&mime=js&x=' + Math.random() + '');
      }
      if (type == 'outbound' || type == 'download') _self.pause();
      _self.ref = '';
      _self.ping_start();
    };
    this.inject = function(src, type) {
      type = type || 'js';
      if (type == 'js') {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = src;
      }(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(s);
    };
    this.ping = function() {
      if (window.NO_PINGY) return;
      _self.beacon('ping');
    };
    this.ping_set = function() {
      var pingy = setInterval(_self.ping, 120000);
      setTimeout(function() {
        clearInterval(pingy);
      }, _self.ps_stop * 1000);
      _self.ping();
    };
    this.ping_start = function() {
      if (mnstats_custom.ping_disable || _self.pinging) return;
      _self.pinging = 1;
      _self.ps_stop = (mnstats_custom.timeout && mnstats_custom.timeout >= 5 && mnstats_custom.timeout <= 240) ? ((mnstats_custom.timeout * 60) - 120) + 5 : 485;
      setTimeout(_self.ping, 30000);
      setTimeout(_self.ping, 60000);
      setTimeout(_self.ping_set, 120000);
    };
    this.get_cookie = function(name) {
      if (mnstats_custom.sticky_data_disable && name.match(/^_(custom|referrer)/)) return '';
      var ca = document.cookie.split(';');
      for (var i = 0, l = ca.length; i < l; i++) {
        if (ca[i].match(new RegExp("\\b" + name + "="))) return decodeURIComponent(ca[i].split(name + '=')[1]);
      }
      return '';
    };
    this.set_cookie = function(name, value, expires) {
      if (mnstats_custom.cookies_disable || (mnstats_custom.sticky_data_disable && name.match(/^_(custom|referrer)/))) return false;
      var ex = new Date;
      ex.setTime(ex.getTime() + (expires || 20 * 365 * 86400) * 1000);
      var temp = name + "=" + _self.enc(value) + ";expires=" + ex.toGMTString() + ";path=/;";
      if (mnstats_custom.cookie_domain) {
        temp += 'domain=' + mnstats_custom.cookie_domain + ';';
      } else if (location.hostname.match(/\./)) temp += 'domain=.' + location.hostname.replace(/^www\./i, '') + ';';
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
      var stop = now.getTime() + (x || mnstats_custom.timer || window.mnstats_pause_timer || 500);
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
    this.download = function(e) {
      _self.adv_log(e, "download");
    };
    this.outbound = function(e) {
      _self.adv_log(e, "outbound");
    };
    this.click = function(e) {
      _self.adv_log(e, "click");
    };
    this.adv_log = function(e, type) {
      var obj = _self.get_target(e);
      _self.log(_self.adv_href(obj), _self.adv_text(obj), type);
    };
    this.adv_text = function(e) {
      do {
        var txt = e.text ? e.text : e.innerText;
        if (txt) return txt;
        if (e.alt) return e.alt;
        if (e.title) return e.title;
        if (e.src) return e.src;
        e = _self.get_parent(e);
      } while (e);
      return "";
    };
    this.adv_href = function(e) {
      do {
        if (e.href && !e.src) return e.href;
        e = _self.get_parent(e);
      } while (e);
      return "";
    };
    this.get_parent = function(e) {
      return e.parentElement || e.parentNode;
    };
    this.get_target = function(e) {
      if (!e) var e = window.event;
      var t = e.target ? e.target : e.srcElement;
      if (t.nodeType && t.nodeType == 3) t = t.parentNode;
      return t;
    };
    this.advanced = function() {
      var is_link = new RegExp("^(https?|ftp|telnet|mailto|tel):", "i");
      var is_link_internal = new RegExp("^https?:\/\/(.*)" + location.host.replace(/^www\./i, ""), "i");
      var is_download = new RegExp("\\.(7z|aac|apk|avi|cab|csv|dmg|doc(x|m|b)?|epub|exe|flv|gif|gz|jpe?g|js|m4a|mp(3|4|e?g)|mobi|mov|msi|ods|pdf|phps|png|ppt(x|m|b)?|rar|rtf|sea|sit|svgz?|tar|torrent|txt|vcf|wma|wmv|xls(x|m|b)?|xml|zip)$", "i");
      var a = document.getElementsByTagName("a");
      for (var i = 0; i < a.length; i++) {
        if (typeof(a[i].className) != 'string') continue;
        if (a[i].className.match(/mnstats_log/i)) {
          if (a[i].className.match(/mnstats_log_download/i)) {
            _self.add_event(a[i], "mousedown", _self.download);
          } else if (a[i].className.match(/mnstats_log_outbound/i)) {
            _self.add_event(a[i], "mousedown", _self.outbound);
          } else {
            _self.add_event(a[i], "mousedown", _self.click);
          }
        } else {
          if (mnstats_custom.outbound_disable || mnstats_custom.advanced_disable || window.mnstats_advanced_disable) continue;
          if (is_link.test(a[i].href) && !a[i].className.match(/mnstats_ignore/i)) {
            if (is_download.test(a[i].href)) {
              _self.add_event(a[i], "mousedown", _self.download);
            } else if (!is_link_internal.test(a[i].href)) {
              _self.add_event(a[i], "mousedown", _self.outbound);
            } else if (mnstats_custom.outbound_pattern) {
              var p = mnstats_custom.outbound_pattern;
              if (typeof p == 'object') {
                for (var j = 0; j < p.length; j++) {
                  if (_self.outbound_pattern_match(a[i].href, p[j])) {
                    _self.add_event(a[i], "mousedown", _self.outbound);
                    break;
                  }
                }
              } else if (typeof p == 'string') {
                if (_self.outbound_pattern_match(a[i].href, p)) _self.add_event(a[i], "mousedown", _self.outbound);
              }
            }
          }
        }
      }
    };
    this.outbound_pattern_match = function(href, pattern) {
      return RegExp(pattern.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")).test(href);
    };
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
var mnstats = mnstats_obj.getInstance();
if (!window.mnstats_custom) var mnstats_custom = {};
if (mnstats_custom.iframe && self == top) mnstats_custom.iframe = 0;
if (window.mnstats_custom_session) mnstats_custom.session = mnstats_custom_session;
if (mnstats_custom.session) mnstats_custom.visitor = mnstats_custom.session;
if (mnstats_custom.no_cookies) mnstats_custom.cookies_disable = 1;
mnstats_custom.async = 1;
var _genericStats = mnstats,
  _genericStatsCustom = mnstats_custom;
