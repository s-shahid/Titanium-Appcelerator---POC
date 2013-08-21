var defaults = {
	position : 'bottom',
	handleSize : 30
};

var settings = {
	bottom : {
		axis : 'y',
		multiplier : -1,
		dimension : 'height'
	},
	top : {
		axis : 'y',
		multiplier : 1,
		dimension : 'height'
	},
	left : {
		axis : 'x',
		multiplier : 1,
		dimension : 'width'
	},
	right : {
		axis : 'x',
		multiplier : -1,
		dimension : 'width'
	}
};

exports.createSlidingDrawer = function(o) {
	o = o || {};

	var content = o.contentView;
	var handle = o.handleView;
	var eventHandle = undefined;
	var position = o.position || defaults.position;
	var ps = undefined;

	// Make sure we are using a valid position
	if (position !== 'top' && position !== 'bottom' && position !== 'left' && position !== 'right') {
		Ti.API.warn('createSlidingDrawer warning: unknown position type, using \'' + defaults.position + '\' instead...');
		position = defaults.position;
	}
	ps = settings[position];

	// Make sure we have a content view
	if (!content) {
		content = Ti.UI.createView({
			backgroundColor : '#f00',
		});
	}
	content[position] = -1 * content[ps.dimension];
	if (!content[ps.dimension]) {
		content[ps.dimension] = 'auto';
	}

	content[ps.dimension === 'width' ? 'height' : 'width'] = '100%';

	if (!handle) {
		// Create a handle view
		handle = Ti.UI.createImageView({
			backgroundImage : '/images/pulldown_bar.png',
			backgroundSelectedImage : '/images/pulldown_bar_pressed.png'
		});
		handle[position] = 0;
		handle[ps.dimension] = o.handleSize || defaults.handleSize;
		handle[ps.dimension === 'width' ? 'height' : 'width'] = '80%';
		handle.height = '50dp';

		// Handle background styling for handle
		if (!o.handleBackgroundColor && !o.handleBackgroundGradient) {
			if (Ti.Platform.osname == 'android') {
				// no dynamic background gradients for android
				//handle.backgroundColor = defaults.handleBackgroundColor;
				//handle.backgroundImage = '/images/sliding_drawer_handle_bottom.png'
			} else {
				//handle.backgroundGradient = defaults.handleBackgroundGradient;
				//handle.backgroundImage = '/images/sliding_drawer_handle_bottom.png'
			}
		} else {
			if (o.handleBackgroundColor) {
				handle.backgroundColor = o.handleBackgroundColor;
			}
			if (o.handleBackgroundColor) {
				if (ps.axis === 'x') {
					o.handleBackgroundGradient
				}
				handle.backgroundGradient = o.handleBackgroundGradient;
			}
		}
	}

	// Position the event handling handle over the visible handle
	eventHandle = Ti.UI.createView({
		height : handle.height
	});
	eventHandle[position] = 0;
	eventHandle[ps.dimension] = o.handleSize || defaults.handleSize;
	eventHandle[ps.dimension === 'width' ? 'height' : 'width'] = '100%';

	var getSlideMax = function() {
		var max = eventHandle.parent.size[ps.dimension] <= content[ps.dimension] ? eventHandle.parent.size[ps.dimension] : content[ps.dimension];
		return max - eventHandle[ps.dimension];
	}
	// create touchmove handler for eventHandle
	var startPos = undefined;
	var lastPos = undefined;
	var direction = 1;

	var touchmoveHandler = function(e) {
		var slideMax = getSlideMax();
		var newValue = eventHandle[position] + (ps.multiplier * (e[ps.axis] - startPos));

		if (newValue <= slideMax && newValue >= 0 && newValue <= content.size[ps.dimension]) {
			handle[position] = newValue;
			content[position] = newValue - content[ps.dimension];
		}

		if (lastPos !== undefined && lastPos <= handle[position]) {
			direction = 1;
		} else {
			direction = -1;
		}

		lastPos = handle[position];
	};
	
	eventHandle.addEventListener('touchstart', function(e) {
		Ti.API.debug('touchstart');
		startPos = e[ps.axis];
		eventHandle.addEventListener('touchmove', touchmoveHandler);
	});

	eventHandle.addEventListener('touchend', function(e) {
		Ti.API.debug('touchend');
		var parentMax = eventHandle.parent.size[ps.dimension] - eventHandle[ps.dimension];
		var contentMax = content.width;
		var finalMax = parentMax <= contentMax ? parentMax : contentMax;
		var slideMax = getSlideMax();
		var slidePos = (direction > 0 ? slideMax : 0);
		var duration = 250;

		// reduce the duration as we approach each extreme
		duration *= (direction > 0) ? ((slideMax - handle[position]) / slideMax) : (handle[position] / slideMax);

		eventHandle.removeEventListener('touchmove', touchmoveHandler);

		// if handle has not been moved to one extreme or the other, animate there
		if (handle[position] !== 0 && handle[position] !== slideMax) {
			var animation = {
				duration : duration
			};
			animation[position] = slidePos;
			handle.animate(animation);
			animation[position] = slidePos - content[ps.dimension];
			content.animate(animation);
			eventHandle[position] = slidePos;
		} else {
			eventHandle[position] = handle[position];
		}
	});

	Ti.Gesture.addEventListener('orientationchange', function(e) {
		var slideMax = getSlideMax();

		// make sure we don't lose the handle on orientation change
		if (handle[position] > slideMax) {
			handle[position] = slideMax;
			eventHandle[position] = slideMax;
		}
	});

	return [handle, eventHandle, content];
};
