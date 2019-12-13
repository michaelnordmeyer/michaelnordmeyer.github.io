'use strict';

var isHuman = function(userAgent) {
  if (userAgent === '' ||
      userAgent.includes('bingbot') ||
      userAgent.includes('Dataprovider') ||
      userAgent.includes('DuckDuckBot') ||
      userAgent.includes('e.ventures') ||
      userAgent.includes('facebookexternalhit') ||
      userAgent.includes('Googlebot') ||
      userAgent.includes('Google-Structured-Data-Testing-Tool') ||
      userAgent.includes('JobborseBot') ||
      userAgent.includes('Slurp') ||
      userAgent.includes('woorank') ||
      userAgent.includes('YandexBot')) {
    return false;
  }
  return true;
};

if (isHuman(navigator.userAgent) === true) {
  var statsObject = statsObject || (function() {
    var instance = null;

    function Instance() {
      var self = this;
    
      this.countPageview = function() {
        var query = '?url=' + encodedUrl;
        if (document.title === 'Not Found') {
          query = '?404=' + encodedUrl;
        }
        query += (encodedUserAgent ? '&ua=' + encodedUserAgent : '');
        query += (encodedReferrer ? '&ref=' + encodedReferrer : '');
        self.saveStats(query);
      };
        
      // this.registerOutgoingProfileLinksWithPing = function() {
      //   var links = document.getElementsByClassName('outgoing-profile-link');
      //   for (var i = 0, length = links.length; i < length; i++) {
      //     var query = '?lnk=' + encodeURIComponent(self.sanitizeUrlForLogging(links[i].href));
      //     query += (encodedUserAgent ? '&ua=' + encodedUserAgent : '');
      //     query += '&ref=' + encodedUrl;
      //     links[i].setAttribute('ping', 'https://s.michaelnordmeyer.com/' + query);
      //   }
      // };
        
      // this.registerOutgoingLinks = function() {
      //   var links = document.getElementsByTagName('a');
      //   for (var i = 0, length = links.length; i < length; i++) {
      //     if (!links[i].href.startsWith('https://michaelnordmeyer.com')) {
      //       links[i].addEventListener('click', self.linkClicked);
      //     }
      //   }
      // };
    
      this.registerOutgoingProfileLinks = function() {
        var links = document.getElementsByClassName('outgoing-profile-link');
        for (var i = 0, length = links.length; i < length; i++) {
          links[i].addEventListener('click', self.linkClicked);
        }
      };
    
      this.linkClicked = function() {
        var query = '?lnk=' + encodeURIComponent(self.sanitizeUrlForLogging(this.href));
        query += (encodedUserAgent ? '&ua=' + encodedUserAgent : '');
        query += '&ref=' + encodedUrl;
        self.saveStats(query);
      };
    
      this.saveStats = function(query) {
        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', 'https://s.michaelnordmeyer.com/' + query, true);
        xhttp.send();
      };
    
      this.resolveUrl = function() {
        var url = decodeURIComponent(location.pathname + location.search);
        return url.startsWith('/') && url.length > 1 ? url.substr(1) : 'homepage';
      };

      this.resolveUserAgent = function() {
        var userAgent = navigator.userAgent;
        if (userAgent.includes('(iPhone') ||
            userAgent.includes('(iPod') ||
            (userAgent.includes('Android') && userAgent.includes('Mobile'))) {
          return 'mobile';
        } else if (
            userAgent.includes('(iPad') ||
            (userAgent.includes('Android') && userAgent.includes('Tablet'))) {
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
          // return 'unknown';
        }
      };
    
      this.resolveReferrer = function() {
        var referrer = document.referrer;
        var sanitizedReferrer = RegExp(/^https?:\/\//i).test(referrer) ? self.sanitizeUrlForLogging(referrer) : '';
        return RegExp(location.host.replace(/^www\./i, ''), 'i').test(sanitizedReferrer) ? '' : sanitizedReferrer;
      };
    
      this.sanitizeUrlForLogging = function(url) {
        var urlWithoutProtocol = url.replace(/^https?:\/\//i, '');
        
        if (urlWithoutProtocol[0] == '/') {
          // Removes leading slash from relative URL
          return urlWithoutProtocol.substr(1, urlWithoutProtocol.length);
        } else if (urlWithoutProtocol.lastIndexOf('/') == urlWithoutProtocol.length - 1 && urlWithoutProtocol.indexOf('/') == urlWithoutProtocol.lastIndexOf('/')) {
          // Removes trailing slash from domain names (= path is root)
          return urlWithoutProtocol.substr(0, urlWithoutProtocol.length - 1);
        }
        
        return urlWithoutProtocol;
      };
    
      var encodedUrl = encodeURIComponent(self.resolveUrl());
      var encodedUserAgent = encodeURIComponent(self.resolveUserAgent());
      var encodedReferrer = encodeURIComponent(self.resolveReferrer());
      self.countPageview();
      self.registerOutgoingProfileLinks();
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
