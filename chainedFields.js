;
(function ($, window, document, undefined) {

	var pluginName = 'chainedFields',
			defaults = {
				propertyName:"value"
			};

	function Plugin(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	Plugin.prototype.init = function () {
		this.setElements();
		this.setEvents();
	};

	Plugin.prototype.setElements = function () {
		this.inputs = this.element.find('input[type=text]');
	};

	Plugin.prototype.setEvents = function () {
		var self = this;
		this.inputs.each(function (i, el) {
			$(el).keyup(function (e) {
				if (e.which != 8 && self.isNotControlKey(e.which) && $(this).val().length == $(this).attr('maxlength') && self.inputs.length > i + 1 && self.isNotSelected(self.inputs[i])) {
					$(el).trigger('blur');
					self.moveTo(self.inputs[i + 1]);
				}
			});

			$(el).keydown(function (e) {
				if (e.which == 8 && self.isNotControlKey(e.which) && $(this).val().length == 0 && i != 0) {
					$(el).trigger('blur');
					self.moveTo(self.inputs[i - 1]);
				}

				if (e.which != 8 && self.isNotControlKey(e.which) && $(this).val().length == $(this).attr('maxlength') && self.inputs.length > i + 1 && self.isNotSelected(self.inputs[i])) {
					$(el).trigger('blur');
					self.moveTo(self.inputs[i + 1]);
				}

				if (e.which == 37 && self.getRange(self.inputs[i]) == 0 && i != 0) {
					e.stopPropagation();
					e.preventDefault();
					$(el).trigger('blur');
					self.moveTo(self.inputs[i - 1]);
				}

				if (e.which == 39 && self.getRange(self.inputs[i]) == $(this).attr('maxlength') && self.inputs.length > i + 1) {
					e.stopPropagation();
					e.preventDefault();
					$(el).trigger('blur');
					self.moveTo(self.inputs[i + 1], 0);
				}
			});
		});
	};

	Plugin.prototype.isNotControlKey = function(which){
		return which != 9 && which != 16 && which != 37 && which != 39 && which != 46;
	};

	Plugin.prototype.moveTo = function (el, start) {
		$(el).focus();
		if (start) {
			this.setRange(el, start, start);
		} else {
			this.setRange(el, $(el).val().length, $(el).val().length);
		}
	};

	Plugin.prototype.setRange = function (el, start, end) {
		if (el.setSelectionRange) {
			$(el).focus();
			el.setSelectionRange(start, end);
		} else if (el.createTextRange) {
			var range = el.createTextRange();
			range.collapse(true);
			range.moveEnd('character', start);
			range.moveStart('character', end);
			range.select();
		}
	};

	Plugin.prototype.getRange = function (el) {
		if (el.selectionStart) {
			return el.selectionStart;
		} else if (document.selection) {
			var r = document.selection.createRange();

			if (r == null) {
				return 0;
			}
			var re = el.createTextRange(),
				rc = re.duplicate();
			re.moveToBookmark(r.getBookmark());
			rc.setEndPoint('EndToStart', re);

			return rc.text.length;
		}
		return 0;
	};

	Plugin.prototype.isNotSelected = function (el) {
		if (el.selectionStart) {
			return el.selectionEnd - el.selectionStart == 0;
		} else if (document.selection) {
			var r = document.selection.createRange();

			if (r == null) {
				return 0;
			}
			var re = el.createTextRange(),
					rc = re.duplicate();
			re.moveToBookmark(r.getBookmark());
			rc.setEndPoint('EndToStart', re);

			return rc.text.length == el.value.length;
		}
		return 0;
	};

	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}
		});
	}

})(jQuery, window, document);