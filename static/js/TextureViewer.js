$(document).ready(function() {
	'use strict';
	
	var $blockView    = $('#blockview-wrapper');
	var $blockChooser = $('#blockchooser-wrapper');

	$.getJSON('/api/textures', function(data) {
		console.log($blockChooser);
		console.log('Got Data');
		console.log(data);
		var $select = $(document.createElement('select'));
		data.forEach(function(val) {
			$(document.createElement('option'))
				.attr('value', val)
				.text(val)
				.appendTo($select);
		});

		$select.change(function() {
			$.getJSON('/api/textures/' + $(this).val(), function(data) {
				$('.texture').remove();
				data.forEach(function(val) {
					$(document.createElement('img'))
						.addClass('texture')
						.attr('src', val)
						.appendTo($blockChooser);
				});
			});
		});

		$select.appendTo($blockChooser);
	});


});
