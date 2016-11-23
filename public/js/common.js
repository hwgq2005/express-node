
define([
	'jquery',
	'hbook'
], function($) {


	// 导航下拉
	$('.navbar-toggle').click(function(event) {
		$(this).toggleClass('collapsed');
		$('#navbar').toggleClass('in');
	});
	
});