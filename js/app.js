/**
 * Double loop used to dynamically generate rows and divs that will contain
 * icons retrieving information from the icon collection (js/arrayIcons.js").
 * First loop used to draw rows.Second loop used to draw icons
*/
for ( var i = 0 ; i < Math.ceil(arrayIcons.length/10) ; i++ ) {
	// number of icons
	var aIconsLength = arrayIcons.length;
	// number of rows (maximum 10 icons per row as convention)
	var numRows = Math.ceil(arrayIcons.length/10);
	// generate div with attributes (row)
	$('#content').append($('<div>').attr('id',i));
	// variables used in second loop
	var init = aIconsLength - i*10 - 1 ;
	var condition = (i == numRows - 1 && aIconsLength%numRows != 0  ) ? -1 : (init - 10);
	// generate divs containing icons
	for ( var j = init  ;  j > condition ; j-- ) {
		// css selector
		var selector = "." + ((arrayIcons[j].className).trim()).split(' ').join('.') + ":before";
		// codePoint
		var codePoint = arrayIcons[j].codePoint;
		// stylesheet rule
		addCSSRule(document.styleSheets[1], selector, 'content: "'+codePoint+'";', 0);
		// html attributes of container div
		var attr = {
			'class': arrayIcons[j].className,
			'data-codepoint': arrayIcons[j].codePoint
		};
		// html element
		var element = $('<div>',attr);
		// generate div with attributes (icon)
		//$('#'+i).append($('<div>',attr1).append($('<div>',attr2)));
		$('#'+i).append(element);
	}
}
// Event handler
$('.iconosGeneral').on('click', function(event){
	//
	$('#info').slideUp('fast', 'linear', function(){
		//
		$('.iconosGeneral').filter(function(){
			return ( $(this).css('color') == 'rgb(177, 46, 37)' );
		}).css({color:'#000'});
		//
		$(event.target).css({color: '#b12e25'});
		//
		$('#info')
			.hide()
			.insertAfter($(event.target).closest('div[id]'))
			.slideDown('slow')
		//
		$('.classNameValue').html($(event.target).attr('class'));
		$('.codePointValue').html($(event.target).data('codepoint'));
	});
});
//
function addCSSRule(sheet, selector, rules, index) {
	if("insertRule" in sheet) {
		sheet.insertRule(selector + "{" + rules + "}", index);
	}
	else if("addRule" in sheet) {
		sheet.addRule(selector, rules, index);
	}
}
// Layout fixing
$('.content-wrapper').css({
	height: $(window).height() - $('#header').outerHeight()- $('#footer').outerHeight()
});
$('#footer').css({
	position: 'fixed',
	top: $(window).height() - $('#footer').outerHeight(),
	width: '100%'
});
