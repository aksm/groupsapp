// Hide divs as necessary
function hide(element) {
	element.removeClass("show");
	element.addClass("hide");
}

// Show divs as necessary
function show(element) {
	element.removeClass("hide");
	element.addClass("show");	
}

(function($){
  $(function(){

  	// Initialize typed.js animation.
    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('.modal').modal();
    $('#typer').typed({
    	strings: ["Motivated.", "Together.", "Organized."],
    	typeSpeed: 50
    });

    // dashboard code
    $('#select-group').modal({dismissible: false});
    $('#select-group').modal('open');
    $('.group-action').on('click', function() {
    	hide($('.group-action'));
    	switch($(this).attr('id')) {
    		case 'group-add':
	    		show($('#group-add-form'));
    		break;
    		case 'group-join':
	    		show($('#group-join-form'));    		
    		break;
    		default:
    		console.log('error');
    	}
    });

    // load fullcalendar
	$('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,basicWeek,basicDay'
		},
		defaultDate: '2016-09-12',
		navLinks: true, // can click day/week names to navigate views
		editable: true,
		eventLimit: true, // allow "more" link when too many events
		events: [
			{
				title: 'All Day Event',
				start: '2016-09-01'
			},
			{
				title: 'Long Event',
				start: '2016-09-07',
				end: '2016-09-10'
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: '2016-09-09T16:00:00'
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: '2016-09-16T16:00:00'
			},
			{
				title: 'Conference',
				start: '2016-09-11',
				end: '2016-09-13'
			},
			{
				title: 'Meeting',
				start: '2016-09-12T10:30:00',
				end: '2016-09-12T12:30:00'
			},
			{
				title: 'Lunch',
				start: '2016-09-12T12:00:00'
			},
			{
				title: 'Meeting',
				start: '2016-09-12T14:30:00'
			},
			{
				title: 'Happy Hour',
				start: '2016-09-12T17:30:00'
			},
			{
				title: 'Dinner',
				start: '2016-09-12T20:00:00'
			},
			{
				title: 'Birthday Party',
				start: '2016-09-13T07:00:00'
			},
			{
				title: 'Click for Google',
				url: 'http://google.com/',
				start: '2016-09-28'
			}
		]
	});

  }); // end of document ready
})(jQuery); // end of jQuery name space