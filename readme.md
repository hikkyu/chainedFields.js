# Chained Field


## How to use
Declare some inputs in a container and add `max-length` attribute to all :

	<div class="chainedFields">
		<input type="text" maxlength="5" value="" name="field1">
		<input type="text" maxlength="7" value="" name="field2">
		<input type="text" maxlength="3" value="" name="field3">
		<input type="text" maxlength="5" value="" name="field4">
	</div>

Jquery function:

	$('.chainedFields').chainedFields();


## Required
- jQuery

## Tested on
- IE7+
- Firefox 3.6
-