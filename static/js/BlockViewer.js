function BlockViewer(domElement, callback) {

	this.callback = callback;

	$.getJSON('/api/textures/blocks', function(blocks) {

		var showBlockTextures = function(domElement) {

			var img, wrapper, name;
			blocks.forEach(function(block) {
				wrapper = $(document.createElement('div'))
					.addClass('BlockImageWrapper');
					.data('texture-source', block);
					.on('click', (function(scope) {
						return function(e) {
							$('.clicked').removeClass('clicked');
							$(e.target).addClass('clicked');
							if (callback)
								callback(scope.data('texture-source'));
						};
					})(wrapper));

				$(document.createElement('span'))
					.addClass('BlockTextureName')
					.html(block)
					.appendTo(wrapper);

				$(document.createElement('img'))
					.addClass('BlockImage')
					.attr('src', block)
					.appendTo(wrapper);

				domElement.append(wrapper);
			});
		};

		showBlockTextures(domElement);

	});

}
