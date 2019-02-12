'use strict';

var stats_obj = stats_obj || (function() {
  var instance = null;

  function _ins() {
    var _self = this;
    
    this.pageview = function() {
      if (_self.isHuman() === "true") {
        var referrer = _self.resolveReferrer();
        if (document.title === "Not Found") {
          var query = '?404=' + encodeURIComponent(_self.getUrl());
        } else {
          var query = '?url=' + encodeURIComponent(_self.getUrl());
        }
        var userAgent += _self.resolveUserAgent();
        if (userAgent.includes("Googlebot")) {
          return;
        }
        query += '&ua=' + encodeURIComponent(userAgent);
        query += (referrer ? '&ref=' + encodeURIComponent(referrer) : '');
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", 'https://stats.michaelnordmeyer.com/' + query, true);
        xhttp.send();
      }
    };
    
    this.trackExternalLink = function(link) {
      if (_self.isHuman() === "true") {
        var query = '?lnk=' + encodeURIComponent(link);
        var userAgent += _self.resolveUserAgent();
        if (userAgent.includes("Googlebot")) {
          return;
        }
        query += '&ua=' + encodeURIComponent(userAgent);
        query += '&ref=' + encodeURIComponent(_self.getUrl());
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", 'https://stats.michaelnordmeyer.com/' + query, true);
        xhttp.send();
      }
    };
    
    this.isHuman = function() {
      if (_self.isBot(navigator.userAgent)) {
        return 'false';
      }
      var isHuman = _self.getCookie('_isHuman');
      if (!isHuman) {
        _self.setCookie('_isHuman', 'true');
        isHuman = _self.getCookie('_isHuman');
      }
      return isHuman;
    };
    
    this.isBot = function(userAgent) {
      if (userAgent == "" ||
          userAgent.includes('e.ventures') ||
          userAgent.includes('facebookexternalhit') ||
          userAgent.includes('JobborseBot') ||
          userAgent.includes('woorank') ||
          userAgent.includes('YandexBot')) {
        return true;
      }
      return false;
    };
    
    this.getCookie = function(name) {
      var cookies = document.cookie.split(';');
      if (cookies[0] === "") {
        return '';
      }
      for (var i = 0, length = cookies.length; i < length; i++) {
        if (cookies[i].match(new RegExp("\\b" + name + "="))) {
          return decodeURIComponent(cookies[i].split(name + '=')[1]);
        }
      }
      return '';
    };
    
    this.setCookie = function(name, value) {
      var cookie = name + "=" + encodeURIComponent(value) + ";path=/;secure";
      document.cookie = cookie;
    };
    
    this.resolveUserAgent = function() {
      var userAgent = navigator.userAgent;
      if (userAgent.includes('(iPhone') ||
          userAgent.includes('(iPod') ||
          (userAgent.includes('Android') && userAgent.includes('Mobile'))) {
        return "mobile";
      } else if (
          userAgent.includes('(iPad') ||
          userAgent.includes('Android')) {
        return "tablet"
      } else if (
          userAgent.includes('(Macintosh') ||
          userAgent.includes('(Windows') ||
          userAgent.includes('(X11')) {
        return "desktop"
      } else if (
          userAgent.includes('(PlayStation') ||
          userAgent.includes('Xbox;')) {
        return "console"
      } else {
        return userAgent;
//        return "unknown";
      }
    };
    
    this.resolveReferrer = function() {
      var referrer = document.referrer;
      referrer = referrer.match(/^https?:/)
        ? (RegExp("^https?://[^/]*" + location.host.replace(/^www\./i, "") + "/", "i").test(referrer)
          ? ''
          : referrer)
        : '';
      return _self.removeProtocolFromUrl(referrer);
    };
 
    this.removeProtocolFromUrl = function(url) {
      if (url.indexOf("://") > -1) {
          var referrer = url.substr(url.indexOf("://") + "://".length);
          if (referrer.indexOf('/') == referrer.lastIndexOf('/') && referrer.lastIndexOf('/') == referrer.length - 1) {
            // Only remove the / after TLD if it's the last character
            return referrer.substr(0, referrer.length - 1);
          }
          return referrer;
      }
      return url;
    };
    
    this.getUrl = function() {
      var url = location.pathname + location.search;
      return (url.startsWith('/') && url.length > 1) ? url.substr(1) : "homepage";
    };
        
    this.registerLinks = function() {
      var links = document.getElementsByTagName('a');
      for(var i = 0, length = links.length; i < length; i++) {
        console.log(links[i].href); 
        if (links[i].href.startsWith("http")) {
          links[i].onclick = function() {
            _self.trackExternalLink(this.href);
          }
        }
      }
    };
    
    _self.pageview();
  }
  
  return new function() {
    this.getInstance = function() {
      if (instance == null) {
        instance = new _ins();
        instance.constructor = null;
      }
      return instance;
    };
  }
})();

var stats = stats_obj.getInstance();
