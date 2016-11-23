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

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    $('.modal').modal();

    // index code
    // $('.login-row>a').on('click', function() {
    // 	var route = $(this).data('route');
    // 	$.get(route).
    // 	done(function(data) {
    // 		console.log(data);
    // 	});
    // });

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
    $('.group-post').on('submit', function(event) {
    	event.preventDefault();
    	var form = $(this);
    	var group = $(this).find('input').val();
    	var route = $(this).data('route');
    	$.post(route, {'group': group})
    	.done(function(data) {
	    	form[0].reset();
		    $('#select-group').modal('close');
    	});

    });
  }); // end of document ready
})(jQuery); // end of jQuery name space