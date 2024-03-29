/*
	Future Imperfect by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
$( document ).ready(function() {
				console.log("loaded");

(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$menu = $('#menu'),
			$sidebar = $('#sidebar'),
			$main = $('#main');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// IE<=9: Reverse order of main and sidebar.
			if (skel.vars.IEVersion <= 9)
				$main.insertAfter($sidebar);

		// Menu.

			$menu
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-menu-visible'
				});

		// Search (header).
			var $search = $('#search'),
				$search_input = $search.find('input');

			$body
				.on('click', '[href="#search"]', function(event) {

					event.preventDefault();

					// Not visible?
						if (!$search.hasClass('visible')) {

							// Reset form.
								$search[0].reset();

							// Show.
								$search.addClass('visible');

							// Focus input.
								$search_input.focus();

						}

				});

			$search_input
				.on('keydown', function(event) {

					if (event.keyCode == 27)
						$search_input.blur();

				})
				.on('blur', function() {
					window.setTimeout(function() {
						$search.removeClass('visible');
					}, 100);
				});

		// Intro.
			var $intro = $('#intro');

			// Move to main on <=large, back to sidebar on >large.
				skel
					.on('+large', function() {
						$intro.prependTo($main);
					})
					.on('-large', function() {
						$intro.prependTo($sidebar);
					});

	});

});

	$(".menu_button").click(function(){
		$("#menu").fadeIn();
	});

	$("#close_menu").click(function(){
		$("#menu").fadeOut();
	});

	$(document).mouseup(function(e) {

  if( e.target.id != 'menu') {
    $("#menu").fadeOut();
  }

	});

	function resizeBootstrapMap() {
    var mapParentWidth = $('.mapContainer').width();
    $('.map').width(mapParentWidth /1.3);
    $('.map').height(mapParentWidth / 2);
    console.log(mapParentWidth);
	}

	$(window).resize(resizeBootstrapMap);
	$(window).load(resizeBootstrapMap);

    $("#users_search").keyup(function() {
    	console.log("typing")
      $.get($("#users_search").attr("action"), $("#users_search").serialize(), null, "script");
      return false;
    });

     $("#requests_search").submit(function() {
    	console.log("typing")
      $.get($("#requests_search").attr("action"), $("#requests_search").serialize(), null, "script");
      return false;
    });

     $("#flights_search").submit(function() {
    	console.log("typing")
      $.get($("#flights_search").attr("action"), $("#flights_search").serialize(), null, "script");
      return false;
    });

$(".scrollable").animate({ scrollTop: $(document).height()*2 }, "fast");
  return false;

  });
