// JavaScript Document


$(function(){ 
$('#b1').click(function(event){ //클릭되는위치 //맵페이지
	event.preventDefault();
	$('#popup').bPopup({   //아래 팝업창띄우는 id값과 일치
		content:'iframe', //'ajax', 'iframe' or 'image'
		contentContainer:'.contents',
		loadUrl:'html/sub01_about.html',
		position:['auto',15]
		});
	});
$('#b2').click(function(event){ //클릭되는위치 //맵페이지
	event.preventDefault();
	$('#popup').bPopup({   //아래 팝업창띄우는 id값과 일치
		content:'iframe', //'ajax', 'iframe' or 'image'
		contentContainer:'.contents',
		loadUrl:'html/sub02_course.html',
		position:['auto',15]
		});
	});
$('#b3').click(function(event){ //클릭되는위치 //맵페이지
	event.preventDefault();
	$('#popup').bPopup({   //아래 팝업창띄우는 id값과 일치
		content:'iframe', //'ajax', 'iframe' or 'image'
		contentContainer:'.contents',
		loadUrl:'html/sub03_course.html',
		position:['auto',15]
		});
	});
$('#b4').click(function(event){ //클릭되는위치 //맵페이지
	event.preventDefault();
	$('#popup').bPopup({   //아래 팝업창띄우는 id값과 일치
		content:'iframe', //'ajax', 'iframe' or 'image'
		contentContainer:'.contents',
		loadUrl:'html/sub04_notice.html',
		position:['auto',15]
		});
	});
$('#b5').click(function(event){ //클릭되는위치 //맵페이지
	event.preventDefault();
	$('#popup').bPopup({   //아래 팝업창띄우는 id값과 일치
		content:'iframe', //'ajax', 'iframe' or 'image'
		contentContainer:'.contents',
		loadUrl:'html/sub05_notice.html',
		position:['auto',15]
		});
	});
	
	
});