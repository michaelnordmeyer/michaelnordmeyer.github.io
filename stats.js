'use strict';

var botCheckerObject = botCheckerObject || (function() {
  var instance = null;

  function Instance() {
    var self = this;
  
    this.isHuman = function() {
      if (self.isBot(navigator.userAgent)) {
        return 'false';
      }
      // var isHuman = self.getCookieValueForKey('_isHuman');
      // if (!isHuman) {
      //   self.setCookie('_isHuman', 'true');
      //   isHuman = self.getCookieValueForKey('_isHuman');
      // }
      // return isHuman;
    };

    this.isBot = function(userAgent) {
      if (userAgent === '' ||
          userAgent.includes('e.ventures') ||
          userAgent.includes('facebookexternalhit') ||
          userAgent.includes('Googlebot') ||
          userAgent.includes('JobborseBot') ||
          userAgent.includes('woorank') ||
          userAgent.includes('YandexBot')) {
        return true;
      }
      return false;
    };

    this.getCookieValueForKey = function(key) {
      var cookies = document.cookie.split(';');
      if (cookies[0] === '') {
        return '';
      }
      for (var i = 0, length = cookies.length; i < length; i++) {
        if (cookies[i].match(new RegExp('\\b' + name + '='))) {
          return decodeURIComponent(cookies[i].split(name + '=')[1]);
        }
      }
      return '';
    };

    this.setCookie = function(key, value) {
      var cookie = key + '=' + encodeURIComponent(value) + ';path=/;secure;samesite';
      document.cookie = cookie;
    };
  }
  
  return new function() {
    this.getInstance = function() {
      if (instance == null) {
        instance = new Instance();
        instance.constructor = null;
      }
      return instance;
    };
  }
})();

var botChecker = botCheckerObject.getInstance();

if (botChecker.isHuman() === 'true') {
  var statsObject = statsObject || (function() {
    var instance = null;

    function Instance() {
      var self = this;
    
      this.pageview = function() {
        var query = '?url=' + encodedUrl;
        if (document.title === 'Not Found') {
          query = '?404=' + encodedUrl;
        }
        query += (encodedUserAgent ? '&ua=' + encodedUserAgent : '');
        query += (encodedReferrer ? '&ref=' + encodedReferrer : '');
        self.saveStats(query);
      };
    
      this.trackOutgoingLink = function() {
        var query = '?lnk=' + encodeURIComponent(self.removeProtocolFromUrl(this.href));
        query += (encodedUserAgent ? '&ua=' + encodedUserAgent : '');
        query += '&ref=' + encodedUrl;
        self.saveStats(query);
      };
    
      this.saveStats = function(query) {
        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', 'https://stats.michaelnordmeyer.com/' + query, true);
        xhttp.send();
      };
    
      this.resolveUserAgent = function() {
        var userAgent = navigator.userAgent;
        if (userAgent.includes('(iPhone') ||
            userAgent.includes('(iPod') ||
            (userAgent.includes('Android') && userAgent.includes('Mobile'))) {
          return 'mobile';
        } else if (
            userAgent.includes('(iPad') ||
            userAgent.includes('Android')) {
          return 'tablet'
        } else if (
            userAgent.includes('(Macintosh') ||
            userAgent.includes('(Windows') ||
            userAgent.includes('(X11')) {
          return 'desktop'
        } else if (
            userAgent.includes('(PlayStation') ||
            userAgent.includes('Xbox;')) {
          return 'console'
        } else {
          return userAgent;
  //        return 'unknown';
        }
      };
    
      this.resolveReferrer = function() {
        var referrer = document.referrer;
        referrer = referrer.match(/^https?:/)
          ? (RegExp('^https?://[^/]*' + location.host.replace(/^www\./i, '') + '/', 'i').test(referrer)
            ? ''
            : referrer)
          : '';
        return self.removeProtocolFromUrl(referrer);
      };
 
      this.removeProtocolFromUrl = function(url) {
        if (url.indexOf('://') > -1) {
            var urlWithoutProtocol = url.substr(url.indexOf('://') + '://'.length);
            if (urlWithoutProtocol.indexOf('/') == urlWithoutProtocol.lastIndexOf('/') && urlWithoutProtocol.lastIndexOf('/') == urlWithoutProtocol.length - 1) {
              // Only remove the / after TLD if it's the last character
              return urlWithoutProtocol.substr(0, urlWithoutProtocol.length - 1);
            }
            return urlWithoutProtocol;
        }
        return url;
      };
    
      this.getUrl = function() {
        var url = location.pathname + location.search;
        return (url.startsWith('/') && url.length > 1) ? url.substr(1) : 'homepage';
      };
        
      this.registerOutgoingLinks = function() {
        var links = document.getElementsByTagName('a');
        for(var i = 0, length = links.length; i < length; i++) {
          if (!links[i].href.startsWith('https://michaelnordmeyer.com')) {
            var query = '?lnk=' + encodeURIComponent(self.removeProtocolFromUrl(links[i].href));
            query += (encodedUserAgent ? '&ua=' + encodedUserAgent : '');
            query += '&ref=' + encodedUrl;
            // links[i].setAttribute('ping', 'https://stats.michaelnordmeyer.com/' + query);
            links[i].addEventListener('click', self.trackOutgoingLink);
          }
        }
      };

      var encodedUrl = encodeURIComponent(self.getUrl());
      var encodedUserAgent = encodeURIComponent(self.resolveUserAgent());
      var encodedReferrer = encodeURIComponent(self.resolveReferrer());
      self.pageview();
      self.registerOutgoingLinks();
    }
  
    return new function() {
      this.getInstance = function() {
        if (instance == null) {
          instance = new Instance();
          instance.constructor = null;
        }
        return instance;
      };
    }
  })();

  var stats = statsObject.getInstance();
}
