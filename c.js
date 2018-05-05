var clicky_obj = clicky_obj || (function() {
  var instance = null;

  function _ins() {
    this.sitekeys = [];
    var _self = this,
      site_ids = [],
      pageviews_fired = [],
      monitors = 0,
    setup = 0;
    this.domain = 'http://goodyworks.com';
    this.site_id_exists = function(site_id) {
      for (var s in site_ids)
        if (site_ids[s] == site_id) return true;
      return false;
    };
    this.sitekey = function(site_id, key_only) {
      if (_self.sitekeys && _self.sitekeys[site_id]) return (key_only ? '' : '&sitekey=') + _self.sitekeys[site_id];
      return '';
    };
    this.init = function(site_id) {
      if (_self.site_id_exists(site_id)) return;
      site_ids.push(site_id);
      if (!setup) {
        setup = 1;
        setTimeout(_self.setup, 100);
      }
    };
    this.setup = function() {
      if (!_self.get_cookie('_first_pageview')) {
        _self.set_referrer();
        _self.set_cookie('_first_pageview', 1, 600);
      }
      setTimeout(_self.advanced, 1000);
      _self.start_monitors();
      if (!clicky_custom.pageview_disable) {
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
    this.base = function(site_id_index, type) {
//      var url = _self.domain + '/in.php?site_id=' + site_ids[site_id_index];
      var url = _self.domain + '/mnc?site_id=' + site_ids[site_id_index];
      if (type == 'ping') return url;
      url += "&res=" + screen.width + "x" + screen.height + "&lang=" + (navigator.language || navigator.browserLanguage || 'xx').substr(0, 2) + _self.custom_data();
      return url;
    };
    this.custom_data = function() {
      var data = {},
        keys = clicky_custom.visitor_keys_cookie || ['username', 'name', 'email'],
        l = keys.length;
      for (var i = 0; i < l; i++) {
        var key = keys[i],
          temp = '';
        temp = _self.get_cookie('_custom_data_' + key);
        if (temp) data[key] = temp;
        if (clicky_custom.visitor) {
          temp = clicky_custom.visitor[key];
          if (temp) {
            data[key] = temp;
            _self.set_cookie('_custom_data_' + key, temp);
          }
        }
      }
      var url = '';
      if (clicky_custom.visitor) {
        for (var i in clicky_custom.visitor) {
          if (clicky_custom.visitor.hasOwnProperty && clicky_custom.visitor.hasOwnProperty(i))
            if (!data[i]) data[i] = clicky_custom.visitor[i];
        }
      }
      if (data) {
        for (var i in data) {
          if (data.hasOwnProperty && data.hasOwnProperty(i)) url += "&custom[" + _self.enc(i) + "]=" + _self.enc(data[i]);
        }
      }
      return url;
    };
    this.set_referrer = function() {
      var r = clicky_custom.iframe ? top.document.referrer : document.referrer;
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
        c = _self.get_cookie('clicky_olark');
      if (c && c == o) {
        if (do_pageview) _self.pageview(1);
        return;
      } else {
        if (c) _self.set_cookie('clicky_olark', c, -3600);
        _self.set_cookie('clicky_olark', o, 600);
        c = _self.get_cookie('clicky_olark');
      }
      if (do_pageview || pageviews_fired.length == 0) {
        _self.pageview(1, '&olark=' + o);
      } else if (c) {
        _self.beacon('ping', '&olark=' + o);
      }
    };
    this.pageview = function(only_once, extra) {
      var href = _self.get_href();
      _self.beacon('', '&href=' + _self.enc(href) + '&title=' + _self.enc(clicky_custom.title || window.clicky_page_title || document.title) + (_self.ref ? '&ref=' + _self.enc(_self.ref) : '') + (extra || ''), (only_once ? 1 : 0));
      for (var p = 0; p < site_ids.length; p++) {
        if (!_self.is_pageview_fired(site_ids[p])) {
          pageviews_fired.push(site_ids[p]);
        }
      }
    };
    this.get_href = function(enc) {
      var href = clicky_custom.href || '';
      if (!href) {
        if (clicky_custom.iframe) {
          href = top.location.pathname + top.location.search;
          clicky_custom.title = top.document.title;
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
      return window.JSON && typeof JSON == 'object' && JSON.stringify && JSON.parse && !clicky_custom.cookies_disable && !clicky_custom.queue_disable && !window.Prototype;
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
        if (!clicky_custom.history_disable && window.history && window.history.pushState) {
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
        if (q.type == 'goal' && q.query) {
          q = q.query;
        } else {
          var temp = '';
          for (var i in q) {
            if (i != 'type' && q.hasOwnProperty && q.hasOwnProperty(i)) temp += '&' + i + '=' + _self.enc(q[i]);
          }
          q = temp;
          delete temp;
        }
      }
      var jsuid = '',
        goal = '',
        split = '';
      jsuid = _self.get_cookie('_jsuid');
      if (!jsuid) {
        _self.set_cookie('_jsuid', _self.randy());
        jsuid = _self.get_cookie('_jsuid');
      }
      if (type != 'heatmap' && type != 'ping') {
        if (clicky_custom.split) {
          for (var i in clicky_custom['split']) {
            if (clicky_custom['split'].hasOwnProperty && clicky_custom['split'].hasOwnProperty(i)) {
              if (i == 'goal' && typeof clicky_custom['split'].goal == 'object') {
                for (var j = 0, l = clicky_custom['split'].goal.length; j < l; j++) {
                  split += '&split[goal][]=' + clicky_custom.split.goal[j];
                }
              } else split += '&split[' + _self.enc(i) + ']=' + _self.enc(clicky_custom.split[i]);
            }
          }
          clicky_custom.split = '';
        }
      }
      for (var site_id_index = 0; site_id_index < site_ids.length; site_id_index++) {
        var site_id = site_ids[site_id_index];
        if (_self.get_cookie('no_trackyy_' + site_id)) continue;
        if (_self.get_cookie('unpoco_' + site_id) && type != 'pageview') continue;
        if (called_by_pageview && type == 'pageview' && _self.is_pageview_fired(site_id)) continue;
        _self.inject(_self.base(site_id_index, type) + '&type=' + type + q + goal + split + (jsuid ? '&jsuid=' + jsuid : '') + (_self.get_cookie('unpoco_' + site_id) ? '&upset' : '') + (_self.get_cookie('heatmaps_g2g_' + site_id) ? '&hmset' : '') + (clicky_custom.cookies_disable ? '&noc' : '') + '&mime=js&x=' + Math.random() + '');
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
      } else if (type == 'css') {
        var s = document.createElement('link');
        s.type = 'text/css';
        s.rel = 'stylesheet';
        s.href = src;
      }(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(s);
    };
    this.is_pageview_fired = function(site_id) {
      for (var p = 0; p < pageviews_fired.length; p++)
        if (pageviews_fired[p] == site_id) return true;
      return false;
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
      if (clicky_custom.ping_disable || _self.pinging) return;
      _self.pinging = 1;
      _self.ps_stop = (clicky_custom.timeout && clicky_custom.timeout >= 5 && clicky_custom.timeout <= 240) ? ((clicky_custom.timeout * 60) - 120) + 5 : 485;
      setTimeout(_self.ping, 30000);
      setTimeout(_self.ping, 60000);
      setTimeout(_self.ping_set, 120000);
    };
    this.get_cookie = function(name) {
      if (clicky_custom.sticky_data_disable && name.match(/^_(custom|referrer)/)) return '';
      var ca = document.cookie.split(';');
      for (var i = 0, l = ca.length; i < l; i++) {
        if (ca[i].match(new RegExp("\\b" + name + "="))) return decodeURIComponent(ca[i].split(name + '=')[1]);
      }
      return '';
    };
    this.set_cookie = function(name, value, expires) {
      if (clicky_custom.cookies_disable || (clicky_custom.sticky_data_disable && name.match(/^_(custom|referrer)/))) return false;
      var ex = new Date;
      ex.setTime(ex.getTime() + (expires || 20 * 365 * 86400) * 1000);
      var temp = name + "=" + _self.enc(value) + ";expires=" + ex.toGMTString() + ";path=/;";
      if (clicky_custom.cookie_domain) {
        temp += 'domain=' + clicky_custom.cookie_domain + ';';
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
      var stop = now.getTime() + (x || clicky_custom.timer || window.clicky_pause_timer || 500);
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
        if (a[i].className.match(/clicky_log/i)) {
          if (a[i].className.match(/clicky_log_download/i)) {
            _self.add_event(a[i], "mousedown", _self.download);
          } else if (a[i].className.match(/clicky_log_outbound/i)) {
            _self.add_event(a[i], "mousedown", _self.outbound);
          } else {
            _self.add_event(a[i], "mousedown", _self.click);
          }
        } else {
          if (clicky_custom.outbound_disable || clicky_custom.advanced_disable || window.clicky_advanced_disable) continue;
          if (is_link.test(a[i].href) && !a[i].className.match(/clicky_ignore/i)) {
            if (is_download.test(a[i].href)) {
              _self.add_event(a[i], "mousedown", _self.download);
            } else if (!is_link_internal.test(a[i].href)) {
              _self.add_event(a[i], "mousedown", _self.outbound);
            } else if (clicky_custom.outbound_pattern) {
              var p = clicky_custom.outbound_pattern;
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
var clicky = clicky_obj.getInstance();
if (!window.clicky_custom) var clicky_custom = {};
if (clicky_custom.iframe && self == top) clicky_custom.iframe = 0;
if (window.clicky_custom_session) clicky_custom.session = clicky_custom_session;
if (clicky_custom.session) clicky_custom.visitor = clicky_custom.session;
if (clicky_custom.no_cookies) clicky_custom.cookies_disable = 1;
if (window.async_site_id) var clicky_site_id = async_site_id;
if (window.clicky_site_id) {
  var clicky_site_ids = clicky_site_ids || [];
  clicky_site_ids.push(clicky_site_id);
}
if (window.clicky_site_ids) {
  clicky_custom.async = 1;
  while (clicky_site_ids.length) clicky.init(clicky_site_ids.shift());
}
var _genericStats = clicky,
  _genericStatsCustom = clicky_custom;
