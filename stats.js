Date.prototype.toIsoString = function() {
  var tzo = -this.getTimezoneOffset();
  var dif = tzo >= 0 ? '+' : '-';
  var pad = function(num) {
    var norm = Math.floor(Math.abs(num));
    return (norm < 10 ? '0' : '') + norm;
  };
  return this.getFullYear() +
    '-' + pad(this.getMonth() + 1) +
    '-' + pad(this.getDate()) +
    'T' + pad(this.getHours()) +
    ':' + pad(this.getMinutes()) +
    ':' + pad(this.getSeconds()) +
    dif + pad(tzo / 60) +
    ':' + pad(tzo % 60);
}

var stats_obj = stats_obj || (function() {
  var instance = null;

  function _ins() {
    var _self = this;
    this.domain = 'https://stats.michaelnordmeyer.com';
    this.pageview_date = '';
    
    this.set_referrer = function() {
      //console.log("Setting referrer...");
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
      //console.log("Storing...");
      var xhttp = new XMLHttpRequest();
      xhttp.open("GET", url, true);
      xhttp.send();
    };
    
    this.beacon = function(type, query) {
      //console.log("Firing beacon...");
      query = query || '';
      if (typeof query == 'object') {
        //console.log("Query is object");
        if (query.type) {
          type = query.type;
        }
        var temp = '';
        for (var i in query) {
          if (i != 'type' && query.hasOwnProperty && query.hasOwnProperty(i)) {
            temp += '&' + i + '=' + encodeURIComponent(query[i]);
          }
        }
        query = temp;
        delete temp;
      }
      var uid = '',
      split = '';
      uid = _self.get_uid();
      _self.store(_self.domain + '?' + type + (uid ? '=' + uid : '') + query + '');
      // _self.store(_self.domain + '?' + type + (uid ? '=' + uid : '') + (_self.pageview_date ? ('&pageview_date=' + encodeURIComponent(_self.pageview_date)) : '') + query + '');
      _self.referrer = '';
    };

    this.pageview = function() {
      //console.log("Register pageview...");
      _self.pageview_date = new Date().toIsoString();
      _self.beacon('pgvw', '&url=' + encodeURIComponent(_self.get_url()) + (_self.referrer ? '&ref=' + encodeURIComponent(_self.referrer) : ''));
      // _self.beacon('pgvw', '&url=' + encodeURIComponent(_self.get_url()) + '&title=' + encodeURIComponent(stats_custom.title || window.stats_page_title || document.title) + (_self.referrer ? '&ref=' + encodeURIComponent(_self.referrer) : ''));
      _self.ping_start();
    };
    
    this.ping_start = function() {
      //console.log("Starting ping...");
      _self.ps_stop = 10 * 60 * 1000;
      var pingInterval = setInterval(_self.ping, 5 * 1000);
      setTimeout(function() {
        clearInterval(pingInterval);
        _self.beacon('mxpn');
      }, _self.ps_stop);
    };
    
    this.ping = function() {
      //console.log("Pinging...");
      _self.beacon('ping');
    };
    
    this.get_url = function() {
      //console.log("Resolving url...");
      var url = '';
      if (stats_custom.iframe) {
        url = top.location.pathname + top.location.search;
        stats_custom.title = top.document.title;
      }
      if (!url) {
        url = location.pathname + location.search;
      }
      return url;
    };
    
    this.get_cookie = function(name) {
      //console.log("Getting cookie " + name);
      var ca = document.cookie.split(';');
      for (var i = 0, l = ca.length; i < l; i++) {
        if (ca[i].match(new RegExp("\\b" + name + "="))) {
          return decodeURIComponent(ca[i].split(name + '=')[1]);
        }
      }
      return '';
    };
    
    this.set_cookie = function(name, value, expires) {
      //console.log("Setting cookie " + name);
      var ex = new Date();
      ex.setTime(ex.getTime() + (expires || 20 * 365 * 86400) * 1000);
      var cookie = name + "=" + encodeURIComponent(value) + ";expires=" + ex.toGMTString() + ";path=/;";
      if (location.hostname.match(/\./)) {
        cookie += 'domain=.' + location.hostname.replace(/^www\./i, '') + ';';
      }
      document.cookie = cookie;
    };
    
    this.get_uid = function() {
      var uid = _self.get_cookie('_uid');
      if (!uid) {
        _self.set_cookie('_uid', _self.create_uid());
        uid = _self.get_cookie('_uid');
      }
      return uid;
    };

    this.create_uid = function() {
      var i = 0;
      do {
        var random = Math.round(Math.random() * 4294967295);
      } while (random == 1421816160 && i++ < 100);
      return random;
    };
    
    this.ping_on_close = function() {
      navigator.sendBeacon(_self.domain + '/?end=' + _self.get_cookie('_uid'));
    };
    
    this.ping_on_visibilitychange = function() {
      if (document.visibilityState !== 'visible') {
        navigator.sendBeacon(_self.domain + '/?hid=' + _self.get_cookie('_uid'));
      } else {
        navigator.sendBeacon(_self.domain + '/?vis=' + _self.get_cookie('_uid'));
      }
    };
    
    this.setup = function() {
      //console.log("Setting up...");
      if (!_self.get_cookie('_referrer')) {
        _self.set_referrer();
      }
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
window.addEventListener("unload", stats.ping_on_close, false);
document.addEventListener("visibilitychange", stats.ping_on_visibilitychange, false);
