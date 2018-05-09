// https://stackoverflow.com/a/17415677/1543851
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
    this.domain = 'https://stats.michaelnordmeyer.com/';
    this.pageview_date = '';
    
    this.get_referrer = function() {
      //console.log("Setting referrer...");
      var referrer = document.referrer;
      referrer = referrer.match(/^https?:/) ? (RegExp("^https?://[^/]*" + location.host.replace(/^www\./i, "") + "/", "i").test(referrer) ? '' : referrer) : '';
      return _self.referrerWithoutProtocol(referrer);
    };
 
    this.referrerWithoutProtocol = function(url) {
      if (url.indexOf("://") > -1) {
          var referrer = url.substr(url.indexOf("://") + "://".length);
          if (referrer.indexOf('/') == referrer.lastIndexOf('/') && referrer.lastIndexOf('/') == referrer.length - 1) {
            return referrer.substr(0, referrer.length - 1);
          }
          return referrer;
      }
      return url;
    }
 
    this.extractHostname = function(url) {
      // https://stackoverflow.com/a/23945027/1543851
      var hostname;

      if (url.indexOf("://") > -1) {
          hostname = url.split('/')[2];
      } else {
          hostname = url.split('/')[0];
      }

      return hostname.split(':')[0];
    }
    
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
    };

    this.pageview = function() {
      //console.log("Register pageview...");
      var referrer = _self.get_referrer();
      _self.pageview_date = new Date().toIsoString();
      _self.beacon('pgvw', '&url=' + encodeURIComponent(_self.get_url()) + (referrer ? '&ref=' + encodeURIComponent(referrer) : '') + '&ua=' + encodeURIComponent(navigator.userAgent) + (_self.hasDoNotTrackEnabled() ? '&dnt=1' : ''));
      // _self.beacon('pgvw', '&url=' + encodeURIComponent(_self.get_url()) + '&title=' + encodeURIComponent(stats_custom.title || window.stats_page_title || document.title) + (referrer ? '&ref=' + encodeURIComponent(referrer) : ''));
      // _self.ping_start();
    };
    
    this.ping_on_close = function() {
      navigator.sendBeacon(_self.domain + '/?end=' + _self.get_cookie('_uid'));
    };
    
    this.ping_on_visibilitychange = function() {
      navigator.sendBeacon(_self.domain + ((document.visibilityState !== 'visible') ? '/?hid=' : '/?vis=') + _self.get_cookie('_uid'));
    };
    
    this.ping_start = function() {
      //console.log("Starting ping...");
      window.addEventListener("unload", _self.ping_on_close, false);
      document.addEventListener("visibilitychange", _self.ping_on_visibilitychange, false);
      var pingInterval = setInterval(_self.ping, 5 * 1000);
      setTimeout(function() {
        clearInterval(pingInterval);
        _self.beacon('mxpn');
      }, 10 * 60 * 1000);
    };
    
    this.ping = function() {
      //console.log("Pinging...");
      _self.beacon('ping');
    };
    
    this.get_url = function() {
      var url = location.pathname + location.search;
      return (url.startsWith('/') && url.length > 1) ? url.substr(1) : url;
    };
    
    this.get_cookie = function(name) {
      //console.log("Getting cookie " + name);
      var cookies = document.cookie.split(';');
      for (var i = 0, length = cookies.length; i < length; i++) {
        if (cookies[i].match(new RegExp("\\b" + name + "="))) {
          return decodeURIComponent(cookies[i].split(name + '=')[1]);
        }
      }
      return '';
    };
    
    this.set_cookie = function(name, value, expires) {
      //console.log("Setting cookie " + name);
      var expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + (expires || 20 * 365 * 86400) * 1000);
      var cookie = name + "=" + encodeURIComponent(value) + ";expires=" + expirationDate.toGMTString() + ";path=/;";
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
      return Math.floor((Math.random() * 9000000000) + 1000000000);
    };
    
    this.hasDoNotTrackEnabled = function() {
      return (window.doNotTrack === "1" || navigator.doNotTrack === "1" || navigator.doNotTrack === "yes" || navigator.msDoNotTrack === "1") ? true : false;
    }
    
    _self.pageview();
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

var stats = stats_obj.getInstance();
