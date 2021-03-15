'use strict';

const isHuman = function(userAgent) {
  if (userAgent === '' ||
      userAgent.includes('Applebot') ||
      userAgent.includes('Baiduspider') ||
      userAgent.includes('bingbot') ||
      userAgent.includes('Dataprovider') ||
      userAgent.includes('DuckDuckBot') ||
      userAgent.includes('e.ventures') ||
      userAgent.includes('facebookexternalhit') ||
      userAgent.includes('Googlebot') ||
      userAgent.includes('Google-Structured-Data-Testing-Tool') ||
      userAgent.includes('JobborseBot') ||
      userAgent.includes('Seekport') ||
      userAgent.includes('Slurp') ||
      userAgent.includes('woorank') ||
      userAgent.includes('YandexBot')) {
    return false;
  }
  return true;
};

if (isHuman(navigator.userAgent) === true) {
  var statsObject = statsObject || (function() {
    let instance = null;

    function Instance() {
      const self = this;
      const site = 'https://michaelnordmeyer.com/';
      const statsSite = 'https://s.michaelnordmeyer.com/';
    
      this.countPageview = function() {
        let query = '?url=' + encodedUrl;
        if (document.title === 'Not Found' && encodedUrl != 'null') {
          query = '?404=' + encodedUrl;
        }
        query += (encodedUserAgent ? '&ua=' + encodedUserAgent : '');
        query += (encodedReferrer ? '&ref=' + encodedReferrer : '');
        self.saveStats(query);
      };
      
      // this.registerOutgoingProfileLinksWithPing = function() {
      //   const links = document.getElementsByClassName('outgoing-profile-link');
      //   for (let i = 0, length = links.length; i < length; i++) {
      //     let query = '?lnk=' + encodeURIComponent(self.sanitizeUrlForLogging(links[i].href));
      //     query += (encodedUserAgent ? '&ua=' + encodedUserAgent : '');
      //     query += '&ref=' + encodedUrl;
      //     links[i].setAttribute('ping', statsSite + query);
      //   }
      // };
      
      // this.registerOutgoingLinks = function() {
      //   const links = document.getElementsByTagName('a');
      //   for (let i = 0, length = links.length; i < length; i++) {
      //     if (!links[i].href.startsWith(site)) {
      //       links[i].addEventListener('click', self.linkClicked);
      //     }
      //   }
      // };
    
      this.registerOutgoingProfileLinks = function() {
        const links = document.getElementsByClassName('outgoing-profile-link');
        for (let i = 0, length = links.length; i < length; i++) {
          links[i].addEventListener('click', self.linkClicked);
        }
      };
    
      this.linkClicked = function() {
        let query = '?lnk=' + encodeURIComponent(self.sanitizeUrlForLogging(this.href));
        query += (encodedUserAgent ? '&ua=' + encodedUserAgent : '');
        query += '&ref=' + encodedUrl;
        self.saveStats(query);
      };
    
      this.saveStats = function(query) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', statsSite + query, true);
        xhr.send();
      };
    
      this.resolveUrl = function() {
        // const url = decodeURIComponent(location.pathname + location.search);
        const url = decodeURIComponent(location.pathname);
        return url.startsWith('/') && url.length > 1 ? url.substr(1) : 'homepage';
      };

      this.resolveUserAgent = function() {
        const userAgent = navigator.userAgent;
        if (userAgent.includes('(iPhone') ||
            userAgent.includes('(iPod') ||
            (userAgent.includes('Android') && userAgent.includes('Mobile')) ||
            (userAgent.includes('OPT') && userAgent.includes('Mobile'))) {
          return 'mobile';
        } else if (
            userAgent.includes('(iPad') ||
            userAgent.includes('Android')) {
            // (userAgent.includes('Android') && userAgent.includes('Tablet'))) {
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
        const referrer = document.referrer;
        const sanitizedReferrer = RegExp(/^https?:\/\//i).test(referrer) ? self.sanitizeUrlForLogging(referrer) : 'direct';
        return RegExp(location.host.replace(/^www\./i, ''), 'i').test(sanitizedReferrer) ? '' : sanitizedReferrer;
      };
    
      this.sanitizeUrlForLogging = function(url) {
        const urlWithoutProtocol = url.replace(/^https?:\/\//i, '');
        
        if (urlWithoutProtocol[0] == '/') {
          // Removes leading slash from relative URL
          return urlWithoutProtocol.substr(1, urlWithoutProtocol.length);
        } else if (urlWithoutProtocol.lastIndexOf('/') == urlWithoutProtocol.length - 1
            && urlWithoutProtocol.indexOf('/') == urlWithoutProtocol.lastIndexOf('/')) {
          // Removes trailing slash from domain names (= path is root)
          return urlWithoutProtocol.substr(0, urlWithoutProtocol.length - 1);
        }
        
        return urlWithoutProtocol;
      };
    
      const encodedUrl = encodeURIComponent(self.resolveUrl());
      const encodedUserAgent = encodeURIComponent(self.resolveUserAgent());
      const encodedReferrer = encodeURIComponent(self.resolveReferrer());
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

  const stats = statsObject.getInstance();
}
