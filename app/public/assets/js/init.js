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
  }); // end of document ready
})(jQuery); // end of jQuery name space