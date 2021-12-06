jQuery(document).ready(function ($) {
	if ($(window).width() < 1024) {
		$('.cd-img-replace').each(function (i) {
			$(this).attr({
				'data-bs-toggle': "modal",
				'data-bs-target': '#exampleModal'+i/2
			});
		})
	} else {
		//open interest point description
		$('.cd-single-point').children('a').on('click', function () {
			var selectedPoint = $(this).parent('li');
			if (selectedPoint.hasClass('is-open')) {
				selectedPoint.removeClass('is-open').addClass('visited');
			} else {
				selectedPoint.addClass('is-open').siblings('.cd-single-point.is-open').removeClass('is-open').addClass('visited');
			}
		});
		//close interest point description
		$('.cd-close-info').on('click', function (event) {
			event.preventDefault();
			$(this).parents('.cd-single-point').eq(0).removeClass('is-open').addClass('visited');
		});
	}
});