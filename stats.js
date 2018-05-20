'use strict';

var stats_obj = stats_obj || (function() {
  var instance = null;

  function _ins() {
    var _self = this;
    
    this.pageview = function() {
      if (_self.isHuman() === "true") {
        var referrer = _self.resolveReferrer();
        var query = '?url=' + encodeURIComponent(_self.getUrl());
        query += (referrer ? '&ref=' + encodeURIComponent(referrer) : '');
        query += '&ua=' + _self.resolveUserAgent();
        query += (_self.hasDoNotTrackEnabled() ? '&dnt=1' : '');
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", 'https://stats.michaelnordmeyer.com/' + query, true);
        xhttp.send();
      }
    };
    
    this.isHuman = function() {
      var userAgent = navigator.userAgent;
      if (userAgent.includes('YandexBot') ||
          userAgent.includes('JobborseBot')) {
        return "false";
      }
      var isHuman = _self.getCookie('_isHuman');
      if (!isHuman) {
        _self.setCookie('_isHuman', "true");
        isHuman = _self.getCookie('_isHuman');
      }
      return isHuman;
    };
    
    this.getCookie = function(name) {
      var cookies = document.cookie.split(';');
      for (var i = 0, length = cookies.length; i < length; i++) {
        if (cookies[i].match(new RegExp("\\b" + name + "="))) {
          return decodeURIComponent(cookies[i].split(name + '=')[1]);
        }
      }
      return '';
    };
    
    this.setCookie = function(name, value) {
      var cookie = name + "=" + encodeURIComponent(value) + ";path=/;secure;";
      if (location.hostname.match(/\./)) {
        cookie += 'domain=.' + location.hostname.replace(/^www\./i, '') + ';';
      }
      document.cookie = cookie;
    };
    
    this.resolveUserAgent = function() {
      var userAgent = navigator.userAgent;
      if (userAgent.includes('(iPhone') ||
          userAgent.includes('(iPod touch') ||
          (userAgent.includes('Android') && userAgent.includes('Mobile'))) {
        return "mobile";
      } else if (userAgent.includes('(iPad') ||
          userAgent.includes('Android')) {
        return "tablet"
      } else if (userAgent.includes('(Macintosh') ||
          userAgent.includes('(Windows') ||
          userAgent.includes('(X11')) {
        return "desktop"
      } else {
        return encodeURIComponent(userAgent);
//        return "unknown";
      }
    }
    
    this.resolveReferrer = function() {
      var referrer = document.referrer;
      referrer = referrer.match(/^https?:/) ? (RegExp("^https?://.*\." + location.host.replace(/^www\./i, "") + "/", "i").test(referrer) ? '' : referrer) : '';
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
    
    this.getUrl = function() {
      var url = location.pathname + location.search;
      return (url.startsWith('/') && url.length > 1) ? url.substr(1) : "homepage";
    };
    
    this.hasDoNotTrackEnabled = function() {
      return (
        window.doNotTrack === "1" ||
        navigator.doNotTrack === "1" ||
        navigator.doNotTrack === "yes" ||
        navigator.msDoNotTrack === "1"
      ) ? true : false;
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
