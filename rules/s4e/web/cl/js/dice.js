/* Roleplaying is Magic Website Dice JS
** Written by the RiM team in 2014, what a wonderful new year!
** Licensed under the BSD 2-clause license
*/

$( document ).ready(function() {
	// add our own extension, .class_list() on an element returns the equiv. of .classList(), has _ to not collide
	$.fn.class_list = function() {return this.attr('class').split(/\s+/);};

	// use UHEPRNG for our RNG, because we can
	var prng = uheprng();

	prng.initState();
	prng.addEntropy();

	calculate_dice();

	// we need to do this so iphones can click dice
	// they won't actually go to this site, don't worry
	$('.die').each(function(index) {
		$(this).attr('href', 'http://mlprim.com');
	});
	$('.die-add').each(function(index) {
		$(this).attr('href', 'http://mlprim.com');
	});
	$('.die-remove').each(function(index) {
		$(this).attr('href', 'http://mlprim.com');
	});

	// dice rolling
	$('.dice-holder').on('click', '.showonce', function() {
		$('.showonce').remove()
	});

	$('.dice-holder').on('click', '.die', function(event) {
		event.preventDefault();

		$('.showonce').remove()

		calculate_dice();
	});

	// calculation!
	function calculate_dice() {
		dice_list = [];

		// iterate over each .die, grab its size from class name and calculate the new value!
		$('.dice-holder .die').each(function(index, value) {
			this_die = $(this);
			class_list = this_die.class_list();

			for (var i in class_list) {
				if (class_list[i].substr(0,6) == 'die-d-') {
					die_result = prng(parseInt(class_list[i].substr(6))) + 1;
					dice_list.push(die_result);
					this_die.text(die_result);
				}
			}
		});

		// history
		roll_history = $('<div class="roll"></div>');

		$('.dice-holder .die').each(function(index, value) {
			roll_history.append($(this).clone());
		});

		$('.die-history').prepend(roll_history);

		// and remove old history
		if ($('.die-history .roll').length > 9) {
			$('.die-history .roll:last').remove();
		}

		return dice_list;
	}

	// add dice!
	$('.dice-adder').on('click', '.die-add', function(event) {
		event.preventDefault();

		class_list = $(this).class_list();

		for (var i in class_list) {
			if (class_list[i].substr(0,6) == 'die-d-') {
				die_type = parseInt(class_list[i].substr(6));
				$('.dice-holder').append('<div class="die die-d-'+die_type+'" title="Re-roll!">'+die_type+'</div>')
			}
		}
	});

	// remove dice!
	$('.dice-adder').on('click', '.die-remove', function(event) {
		event.preventDefault();

		class_list = $(this).class_list();

		for (var i in class_list) {
			if (class_list[i].substr(0,6) == 'die-d-') {
				die_type = parseInt(class_list[i].substr(6));
				$('.dice-holder .die-d-'+die_type+':last').remove();
			}
		}
	});

});
