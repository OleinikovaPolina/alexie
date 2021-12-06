jQuery(document).ready(function ($) {
	$('#menu').html(`
	<!-- home_mobile -->
		<div class="mobile" style="height: 0!important;">
			<div class="container">
				<div class="d-flex w-75 justify-content-end primary-nav__logo">
					<a href="https://spbculture.ru/ru/" target="_blank" class="col-4">
						<img src="./img/803 (1).png" class="h-100 logo1" alt=""></a>
					<a href="https://www.hermitagemuseum.org" target="_blank" class="col-4">
						<img src="./img/eff03463.svg" alt="" class="logo2"></a>
				</div>
				<div>
					<ul>
						<li><a href="./vr.html" class="cd-nav-trigger underline-link position-static">vr-видео и app</a>
						</li>
						<li><a href="./menualexander.html" class="cd-nav-trigger underline-link position-static">Князь
								Александр</a></li>
						<li><a href="./menumemory.html" class="cd-nav-trigger underline-link position-static">память и
								почесть</a>
						</li>
						<li><a href="./article.html" class="cd-nav-trigger underline-link position-static">Эрмитаж</a>
						</li>
						<li><a href="./menuinteractive.html"
								class="cd-nav-trigger underline-link position-static">Интерактив</a>
						</li>
					</ul>
				</div>
				<div class="w-100 d-flex">
					<ul class="ul2 d-flex pt-5">
						<li><a href="./menuabout.html" class="cd-nav-trigger position-static">О проекте</a></li>
						<li><a href="./partners.html" class="position-static">Партнеры</a></li>
					</ul>
				</div>
			</div>
		</div>
		<!-- home_desktop -->
		<div class="desc h-100" style="width: fit-content;">
			<div class="h-100 d-flex align-items-center" style="padding-left: 5rem; padding-right: 1.9rem; background: url(../img/cd-img-1.jpg);
			background-size: cover;">
				<div>
					<ul>
						<li><a href="./vr.html"
								class="cd-nav-trigger underline-link position-static nav-visible">vr-видео и
								app</a></li>
						<li><a href="./menualexander.html"
								class="cd-nav-trigger underline-link position-static nav-visible">Князь
								Александр</a>
						</li>
						<li><a href="./menumemory.html"
								class="cd-nav-trigger underline-link position-static nav-visible">память и
								почесть</a>
						</li>
						<li><a href="./article.html"
								class="cd-nav-trigger underline-link position-static nav-visible">Эрмитаж</a>
						</li>
						<li><a href="./menuinteractive.html"
								class="cd-nav-trigger underline-link position-static nav-visible">Интерактив</a>
						</li>
					</ul>
					<div class="w-100 d-flex">
						<ul class="ul2 d-flex pt-4">
							<li><a href="./menuabout.html" class="cd-nav-trigger position-static nav-visible">О
									проекте</a></li>
							<li><a href="./partners.html" class="position-static">Партнеры</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	`)
	// btn up
	$('body').append(`<div class="desc-btnscroll upbtn-container">
	<div class="navigation__bottom-part">
		<a href='#' class="linkBack navigation__link upbtn">
			<svg class="linkBack-svg navigation__svg preview-image_historical-summary__svg"
				width="65" height="65" viewBox="0 0 65 65" fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<circle cx="32.5" cy="32.5" r="32" stroke="#F4CEA2" />
				<path d="M16.9238 31.999H49.9238L47.9238 33.999H16.9238V31.999Z"
					fill="#F4CEA2" />
				<path
					d="M15.9236 31.9582L30.8818 17L31.023 19.6405L16.5675 34.1427L15.9236 31.9582Z"
					fill="#F4CEA2" />
				<path
					d="M15 32.9043L29.882 47.7863L29.882 44.9998L16.4142 31.4901L15 32.9043Z"
					fill="#F4CEA2" />
			</svg>
		</a>
	</div>
</div>`);
	$(".cd-projects-previews").css("width", "0");

	$('.cd-projects-container').scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('.upbtn').css({
				bottom: '15px'
			});
		} else {
			$('.upbtn').css({
				bottom: '-80px'
			});
		}
	});
	$('.upbtn').on('click', function () {
		$('.cd-projects-container').animate({
			scrollTop: 0
		}, 500);
		return false;
	});
	// vr anim
	setInterval(function () {
		$('#kupasen-ugakimev>span').addClass('blink_on');
		setTimeout(function () { $('#kupasen-ugakimev>span').removeClass('blink_on') }, 1500);
	}, 4000)
	// adaptive home old
	if (($(window).height() > $(window).width()) && ($(window).width() > 992)) {
		$('.cd-nav-trigger').addClass('font7rem')
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
		aspectRatio = $(this).width() / $(this).height();
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
		$('.parallax-text').css({
			'transform': 'translateZ(510px) translateY(0) translateX(0)'
		});
		$('.parallax-text').parent().css({
			'padding': -newTop + 'px 0 0' + (-newLeft) + 'px',
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
	// sliding
	var number = 0;
	var lastnumber = 0;
	var newlength = 0;
	//cache DOM elements
	var projectsContainer = $('.cd-projects-container'),
		projectsPreviewWrapper = projectsContainer.find('.cd-projects-previews'),
		projectPreviews = projectsPreviewWrapper.children('li'),
		navigationTrigger = $('.cd-nav-trigger'),
		navigation = $('.cd-primary-nav'),
		//if browser doesn't support CSS transitions...
		transitionsNotSupported = ($('.no-csstransitions').length > 0);
	var animating = false;

	
	navigationTrigger.each(function () {
		$(this).on('click', function (event) {
			if (animating == false) {
				// animating = true;
				if (navigationTrigger.eq(0).hasClass('nav-visible')) {
					$('.cd-projects-previews').css({
						'z-index': '1'
					})
					// menugo
					if ($(window).width() < 1024) {
						$(".cd-primary-nav ").animate({
							bottom: '100%'
						}, 1000);
					} else {
						$(".cd-primary-nav ").animate({
							left: '-' + $('#menu .desc').width() + 'px'
						}, 1000);
					}
					setTimeout(() => {
						$('#menu').css({
							'height': '0'
						})
						$('#menu .desc').css({
							'height': '0'
						})
						$('#menu .mobile').css({
							'height': '0'
						})
					}, 1000)
					number = $(this).attr('href').replace('#', '')
					lastnumber = 0
					newlength = 0
					projectPreviews.each(function () {
						if ($(this).children('a').attr('class') != 'menu' + number) {
							if (newlength == 0) { lastnumber += 1; }
							$(this).css({
								'flex': '0 0 0%'
							})
						} else {
							newlength++;
							lastnumber += 1;
							$(this).css({
								'flex': '1 0 0%'
							})
						}
					})
					//close main navigation
					navigationTrigger.eq(0).removeClass('nav-visible');
					// setTimeout(() => {
					// 	if (transitionsNotSupported) { projectPreviews.removeClass('slide-out'); }
					// 	else { slideToggleProjects(projectsPreviewWrapper.children('li'), -1, 0, false); }
					// }, 1000)
				} else {
					$('#menu').css({
						'height': '100%'
					})
					$('#menu .desc').css({
						'height': '100%'
					})
					$('#menu .mobile').css({
						'height': '100%'
					})
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
					//open main navigation
					navigationTrigger.eq(0).addClass('nav-visible');
					navigation.addClass('nav-visible');
					if ($(window).width() < 1024) {
						$(".cd-primary-nav ").animate({
							bottom: 0
						}, 1000);
					} else {
						$(".cd-primary-nav ").animate({
							left: 0
						}, 1000);
					}
					// navigation.addClass('nav-clickable');
					// if (transitionsNotSupported) projectPreviews.addClass('slide-out');
					// else slideToggleProjects(projectsPreviewWrapper.children('li'), -1, 0, true);
				}
			}

			if (transitionsNotSupported) animating = false;
		});
	})
	//scroll down to project info

	projectsContainer.on('click', '.scroll2', function () {
		projectsContainer.animate({ 'scrollTop': 1 }, 0);
	});
	if (!$('body').hasClass('notscroll')) {
		let scroll1 = false;
		let scroll2 = false;
		let st = 0;
		let prevst = 0
		$('.cd-projects-container').on('scroll', function (e) {
			prevst = st
			st = $(this).scrollTop()
			if (!scroll1 && !scroll2 && $('.cd-projects-container').scrollTop() < 3 && prevst - st < 0) {
				scroll1 = true;
				$('.cd-projects-container').addClass('stop')
				projectsContainer.animate({ 'scrollTop': $(window).height() }, 800, function () {
					scroll1 = false;
					$('.cd-projects-container').removeClass('stop')
				});
			}
			if (!scroll1 && !scroll2 && $('.cd-projects-container').scrollTop() < $(window).height() && prevst - st > 0) {
				scroll2 = true;
				$('.cd-projects-container').addClass('stop')
				projectsContainer.animate({ 'scrollTop': 0 }, 800, function () {
					scroll2 = false;
					$('.cd-projects-container').removeClass('stop')
				});
			}
		})
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
