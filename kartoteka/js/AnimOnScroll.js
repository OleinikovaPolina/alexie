"use strict";

/**
 * animOnScroll.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
;

(function (window) {
  'use strict';

  var docElem = document.querySelector('.cd-projects-container');

  function getViewportH() {
    var client = docElem['clientHeight'],
        inner = window['innerHeight'];
    if (client < inner) return inner;else return client;
  }

  function scrollY() {
    return document.querySelector('.cd-projects-container').pageYOffset || document.querySelector('.cd-projects-container').scrollTop;
  } // http://stackoverflow.com/a/5598797/989439


  function getOffset(el) {
    var offsetTop = 0,
        offsetLeft = 0;

    do {
      if (!isNaN(el.offsetTop)) {
        offsetTop += el.offsetTop;
      }

      if (!isNaN(el.offsetLeft)) {
        offsetLeft += el.offsetLeft;
      }
    } while (el = el.offsetParent);

    return {
      top: offsetTop,
      left: offsetLeft
    };
  }

  function inViewport(el, h) {
    var elH = el.offsetHeight,
        scrolled = scrollY(),
        viewed = scrolled + getViewportH(),
        elTop = getOffset(el).top,
        elBottom = elTop + elH,
        // if 0, the element is considered in the viewport as soon as it enters.
    // if 1, the element is considered in the viewport only when it's fully inside
    // value in percentage (1 >= h >= 0)
    h = h || 0;
    return elTop + elH * h <= viewed && elBottom - elH * h >= scrolled;
  }

  function extend(a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }

    return a;
  }

  function AnimOnScroll(el, options) {
    this.el = el;
    this.options = extend(this.defaults, options);

    this._init();
  }

  AnimOnScroll.prototype = {
    defaults: {
      // Minimum and a maximum duration of the animation (random value is chosen)
      minDuration: 0,
      maxDuration: 0,
      // The viewportFactor defines how much of the appearing item has to be visible in order to trigger the animation
      // if we'd use a value of 0, this would mean that it would add the animation class as soon as the item is in the viewport. 
      // If we were to use the value of 1, the animation would only be triggered when we see all of the item in the viewport (100% of it)
      viewportFactor: 0
    },
    _init: function _init() {
      this.items = Array.prototype.slice.call(document.querySelectorAll('#' + this.el.id + ' > li'));
      this.itemsCount = this.items.length;
      this.itemsRenderedCount = 0;
      this.didScroll = false;
      var self = this;
      imagesLoaded(this.el, function () {
        // initialize masonry
        new Masonry(self.el, {
          itemSelector: 'li',
          transitionDuration: 0
        });

        if (Modernizr.cssanimations) {
          // the items already shown...
          self.items.forEach(function (el, i) {
            if (inViewport(el)) {
              self._checkTotalRendered();

              classie.add(el, 'shown');
            }
          }); // animate on scroll the items inside the viewport

          document.querySelector('.cd-projects-container').addEventListener('scroll', function () {
            self._onScrollFn();
          }, false);
          window.addEventListener('resize', function () {
            self._resizeHandler();
          }, false);
        }

        var p1 = parseInt(document.querySelector('ul.grid li:nth-last-child(1)').style.top.replace('px', ''));
        var p2 = parseInt(document.querySelector('ul.grid li:nth-last-child(2)').style.top.replace('px', ''));

        if (Math.abs(p1 - p2) > 60) {
          document.querySelector('.linkothers').parentElement.style.width = '100%';
          console.log('ds');
        } else {
          document.querySelector('.linkothers').style.paddingTop = (document.querySelector('.navigation').getBoundingClientRect().y - document.querySelector('.linkothers').getBoundingClientRect().y) / 2.5 + 'px';
        }
      });
    },
    _onScrollFn: function _onScrollFn() {
      var self = this;

      if (!this.didScroll) {
        this.didScroll = true;
        setTimeout(function () {
          self._scrollPage();
        }, 60);
      }
    },
    _scrollPage: function _scrollPage() {
      var self = this;
      this.items.forEach(function (el, i) {
        if (!classie.has(el, 'shown') && !classie.has(el, 'animate') && inViewport(el, self.options.viewportFactor)) {
          setTimeout(function () {
            var perspY = scrollY() + getViewportH() / 2;
            self.el.style.WebkitPerspectiveOrigin = '50% ' + perspY + 'px';
            self.el.style.MozPerspectiveOrigin = '50% ' + perspY + 'px';
            self.el.style.perspectiveOrigin = '50% ' + perspY + 'px';

            self._checkTotalRendered();

            if (self.options.minDuration && self.options.maxDuration) {
              var randDuration = Math.random() * (self.options.maxDuration - self.options.minDuration) + self.options.minDuration + 's';
              el.style.WebkitAnimationDuration = randDuration;
              el.style.MozAnimationDuration = randDuration;
              el.style.animationDuration = randDuration;
            }

            classie.add(el, 'animate');
          }, 25);
        }
      });
      this.didScroll = false;
    },
    _resizeHandler: function _resizeHandler() {
      var self = this;

      function delayed() {
        self._scrollPage();

        self.resizeTimeout = null;
      }

      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }

      this.resizeTimeout = setTimeout(delayed, 1000);
    },
    _checkTotalRendered: function _checkTotalRendered() {
      ++this.itemsRenderedCount;

      if (this.itemsRenderedCount === this.itemsCount) {
        window.removeEventListener('scroll', this._onScrollFn);
      }
    }
  }; // add to global namespace

  window.AnimOnScroll = AnimOnScroll;
})(window);

jQuery(document).ready(function ($) {
  $('body').append("\n\t<div class=' nav2'>\n\t<div class='container'>\n\t<nav class=\"codrops-demos grid my-0\">\n\t".concat($('nav').html(), "\n\t</div></div>\n\t</div>"));

  function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  var containerEl = $('.cd-projects-container')[0];
  var scrollbarWidth = containerEl.offsetWidth - containerEl.clientWidth;
  t = $('.cd-project-info').offset().top + convertRemToPixels(2.5);
  $('.nav2').css({
    'right': scrollbarWidth + 'px'
  });
  $('.cd-projects-container').on('scroll', function () {
    if ($('.cd-projects-container').scrollTop() >= t && $('.nav2').css('opacity') != '1') {
      $('.nav2').css({
        'opacity': 1,
        'z-index': '2'
      });
    } else if ($('.cd-projects-container').scrollTop() < t && $('nav').css('opacity') == '1') {
      $('.nav2').css({
        'opacity': 0,
        'z-index': '-1'
      });
    }
  });
});