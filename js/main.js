jQuery(document).ready(function ($) {
	if ($(window).width() < 1024) {
		$(".cd-projects-previews").css("width", "100%");
	} else {
		$(".cd-projects-previews").css("width", "calc(100% - 3.1rem)");
	}

	//define store some initial variables
	var halfWindowH = $(window).height() * 0.5,
		halfWindowW = $(window).width() * 0.5,
		//define a max rotation value (X and Y axises)
		maxRotationY = 5,
		maxRotationX = 3,
		aspectRatio;
	//detect if hero <img> has been loaded and evaluate its aspect-ratio
	$('.cd-floating-background').find('img').eq(0).load(function () {
		aspectRatio = $(this).width() / $(this).height();
		if ($('html').hasClass('preserve-3d')) initBackground();
	}).each(function () {
		//check if image was previously load - if yes, trigger load event
		if (this.complete) $(this).load();
	});

	//detect mouse movement
	$('.cd-background-wrapper').each(function () {
		$(this).on('mousemove', function (event) {
			var wrapperOffsetTop = $(this).offset().top;
			if ($('html').hasClass('preserve-3d')) {
				window.requestAnimationFrame(function () {
					moveBackground(event, wrapperOffsetTop);
				});
			}
		});
	});

	//on resize - adjust .cd-background-wrapper and .cd-floating-background dimentions and position
	$(window).on('resize', function () {
		if ($('html').hasClass('preserve-3d')) {
			window.requestAnimationFrame(function () {
				halfWindowH = $(window).height() * 0.5,
					halfWindowW = $(window).width() * 0.5;
				initBackground();
			});
		} else {
			$('.cd-background-wrapper').attr('style', '');
			$('.cd-floating-background').attr('style', '').removeClass('is-absolute');
		}
	});

	function initBackground() {
		var wrapperHeight = Math.ceil(halfWindowW * 2 / aspectRatio),
			proportions = (maxRotationY > maxRotationX) ? 1.1 / (Math.sin(Math.PI / 2 - maxRotationY * Math.PI / 180)) : 1.1 / (Math.sin(Math.PI / 2 - maxRotationX * Math.PI / 180)),
			newImageWidth = Math.ceil(halfWindowW * 2 * proportions),
			newImageHeight = Math.ceil(newImageWidth / aspectRatio),
			newLeft = halfWindowW - newImageWidth / 2,
			newTop = (wrapperHeight - newImageHeight) / 2;

		//set an height for the .cd-background-wrapper
		$('.cd-background-wrapper').css({
			'height': wrapperHeight
		});
		if (($(window).height() > $(window).width() * 0.8) && ($(window).width() > 992)) {
			$('.desc .age').addClass('fontagerem');
			$('.desc ul a').addClass('fontagerem2');
			$('.desc .ul2 a').addClass('fontagerem3');
			$('.image-3').attr('src', './img/alex (3).png')
			$('.hhh').css({
				'height': '3vh'
			})
		}
		$('.desc-header h1').addClass('font11rem')
		$('.parallax-text').css({
			'transform': 'translateZ(510px) translateY(0) translateX(0)'
		});
		$('.cd-primary-nav .parallax-text').parent().css({
			'padding': -newTop * 3 + 'px 0 0' + (-newLeft) + 'px',
		});
		//set dimentions and position of the .cd-background-wrapper		
		$('.cd-floating-background').addClass('is-absolute').css({
			'left': newLeft,
			'top': newTop,
			'width': newImageWidth,
		});
		$('.text').addClass('is-absolute').css({
			'left': newLeft,
			'top': newTop,
			'width': newImageWidth,
		});
	}

	function moveBackground(event, topOffset) {
		var rotateY = ((-event.pageX + halfWindowW) / halfWindowW) * maxRotationY,
			yPosition = event.pageY - topOffset,
			rotateX = ((yPosition - halfWindowH) / halfWindowH) * maxRotationX;

		if (rotateY > maxRotationY) rotateY = maxRotationY;
		if (rotateY < -maxRotationY) rotateY = -maxRotationY;
		if (rotateX > maxRotationX) rotateX = maxRotationX;
		if (rotateX < -maxRotationX) rotateX = -maxRotationX;

		$('.cd-floating-background').css({
			'-moz-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
			'-webkit-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
			'-ms-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
			'-o-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
			'transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
		});
	}
});

/*
* BG Loaded
* Copyright (c) 2014 Jonathan Catmull
* Licensed under the MIT license.
*/
(function ($) {
	$.fn.bgLoaded = function (custom) {
		var self = this;

		// Default plugin settings
		var defaults = {
			afterLoaded: function () {
				this.addClass('bg-loaded');
			}
		};

		// Merge default and user settings
		var settings = $.extend({}, defaults, custom);

		// Loop through element
		self.each(function () {
			var $this = $(this),
				bgImgs = $this.css('background-image').split(', ');
			$this.data('loaded-count', 0);
			$.each(bgImgs, function (key, value) {
				var img = value.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
				$('<img/>').attr('src', img).load(function () {
					$(this).remove(); // prevent memory leaks
					$this.data('loaded-count', $this.data('loaded-count') + 1);
					if ($this.data('loaded-count') >= bgImgs.length) {
						settings.afterLoaded.call($this);
					}
				});
			});

		});
	};
})(jQuery);

/* 	Detect "transform-style: preserve-3d" support, or update csstransforms3d for IE10 ? #762
	https://github.com/Modernizr/Modernizr/issues/762 */
(function getPerspective() {
	var element = document.createElement('p'),
		html = document.getElementsByTagName('html')[0],
		body = document.getElementsByTagName('body')[0],
		propertys = {
			'webkitTransformStyle': '-webkit-transform-style',
			'MozTransformStyle': '-moz-transform-style',
			'msTransformStyle': '-ms-transform-style',
			'transformStyle': 'transform-style'
		};

	body.insertBefore(element, null);

	for (var i in propertys) {
		if (element.style[i] !== undefined) {
			element.style[i] = "preserve-3d";
		}
	}

	var st = window.getComputedStyle(element, null),
		transform = st.getPropertyValue("-webkit-transform-style") ||
			st.getPropertyValue("-moz-transform-style") ||
			st.getPropertyValue("-ms-transform-style") ||
			st.getPropertyValue("transform-style");

	if (transform !== 'preserve-3d') {
		html.className += ' no-preserve-3d';
	} else {
		html.className += ' preserve-3d';
	}
	document.body.removeChild(element);

})();