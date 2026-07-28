$(document).ready(function(e) {
	
	/*모바일에선 모바일웹으로 보여지게*/
	$('.moweb').click(function () {
	  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ){ 
       window.open('about:blank').location.href ="http://geniuschoi.dothome.co.kr/html/Web_renew_m/index.html";
	   return false;
       }
    });
	  
	  
  $("html,body").animate({scrollTop: 0}, 1000);  //새로고침시 처음으로
});


$(function(){

	/*클릭버튼 opacity*/
	clickButton1();
	function clickButton1(){
	   $(".icon-arr-down").animate({opacity: 0.3},700,function(){
	   $(this).animate({opacity:1},700,function(){
		   clickButton1();
		   });	
	   });
    };
	/*clickButton2();
	function clickButton2(){
	   $(".icon-menu").animate({opacity: 0.3},700,function(){
	   $(this).animate({opacity:1},700,function(){
		   clickButton2();
		   });	
	   });
    };*/
	
	
	 /*overlay 클릭시 animate*/
	 $(".icon-overlay").click(function(){
	  if($(".left-side").hasClass("o-screen")){
		  $(".left-side").animate({
             left: "-350px"
            },500);
			$(".icon-overlay").fadeOut();
            $(".btn-icon").removeClass("action");
            $(".left-side").removeClass("o-screen");   
	  }
	 });
	 /*메뉴클릭시 animate*/
	 $(".lt-1").click(function(){
		  $(".left-side").animate({
			 left: 0 
		  },500);
		  $(".icon-overlay").fadeIn();
		  $(".btn-icon").addClass("action");
		  $(".left-side").addClass("o-screen");
	 });

	
	/*스크롤시 메뉴 animate*/
	$(window).scroll(function(){
        if ($(".left-side").hasClass("o-screen")) {
            $(".left-side").animate({
                left: "-350px"
            },500);
			$(".icon-overlay").fadeOut();
            $(".btn-icon").removeClass("action");
            $(".left-side").removeClass("o-screen");     
        }
    });	
	
	
	  var home_position = $("#home").offset().top +700;
	  var about_position =$("#about").offset().top-100;
	  var works_position =$("#works").offset().top-100;
	  var contact_position = $("#contact").offset().top-180;
	  
	  /*Scroll 변경*/
	  $(window).scroll(function(){
	     /*스크롤 높이*/
		 var position = $(window).scrollTop();
		 
		 
		 /*스크롤 변경함수*/				 
		 
		 /*side menu bar생성 함수*/
		 if(position > 0 && position < home_position){
			 $(".side-menu ul li").removeClass('active');
			 $(".side-menu ul li").find('a').removeClass('active');
		 }
		 else if(position > about_position && position < works_position){
			 $(".side-menu ul li").removeClass('active');
			 $(".side-menu ul li").find('a').removeClass('active');
			 $(".gnb2").addClass('on');
			 $(".gnb2").find('a').addClass('active');
		 }
		 else if(position > works_position && position < contact_position){
			 $(".side-menu ul li").removeClass('active');
			 $(".side-menu ul li").find('a').removeClass('active');
			 $(".gnb3").addClass('active');
			 $(".gnb3").find('a').addClass('active');
		 }
		 else if(position > contact_position){
			 $(".side-menu ul li").removeClass('active');
			 $(".side-menu ul li").find('a').removeClass('active');
			 $(".gnb4").addClass('active');
			 $(".gnb4").find('a').addClass('active');
		 }
		 
		 
		 /*close class opacity 변경*/
		 $('.close').each(function(){
			var scrollTop = $(window).scrollTop(),
			elementOffset = $(this).offset().top,
			distance      = (elementOffset - scrollTop),
	    	windowHeight  = $(window).height(),
	    	breakPoint    = windowHeight*0.8;
            //console.log(scrollTop);  //확인 로그
			if(distance > breakPoint) {
				$(this).removeClass("open");	
					
			}  
			if(distance < breakPoint) {
				
				$(this).delay(400).addClass("open");	
			}
			if(distance < 0) {
				$(this).removeClass("open");		
			}
		}); 
		
		/*top move about변경*/
		 $('.one-half').each(function(){
			var scrollTop = $(window).scrollTop(),
			elementOffset = $(this).offset().top,
			distance      = (elementOffset - scrollTop),
	    	windowHeight  = $(window).height(),
	    	breakPoint    = windowHeight*1.1;
			if(distance > breakPoint) {
				$(this).removeClass("move-top");	
					
			}  
			if(distance < breakPoint) {
				
				$(this).delay(400).addClass("move-top");	
			}
			if(distance < 0) {
				$(this).removeClass("move-top");		
			}
		}); 
		
		 
		  /*move-left*/
		$('.mv-left').each(function(){
			var scrollTop = $(window).scrollTop(),
			elementOffset = $(this).offset().top,
			distance      = (elementOffset - scrollTop),
	    	windowHeight  = $(window).height(),     /*높이 가져오기*/
	    	breakPoint    = windowHeight*0.9;       /*고정값*/

			if(distance > breakPoint) {
				$(this).removeClass("move-left");	
					
			}  if(distance < breakPoint) {
				$(this).delay(400).addClass("move-left");	
			}  if(distance < -1000) {
				$(this).removeClass("move-left");		
			}
		});
		
		
		  /*move-left*/
		$('.mv-right').each(function(){
			var scrollTop = $(window).scrollTop(),
			elementOffset = $(this).offset().top,
			distance      = (elementOffset - scrollTop),
	    	windowHeight  = $(window).height(),     /*높이 가져오기*/
	    	breakPoint    = windowHeight*0.9;       /*고정값*/

			if(distance > breakPoint) {
				$(this).removeClass("move-right");	
					
			}  if(distance < breakPoint) {
				$(this).delay(400).addClass("move-right");	
			}  if(distance < -1000) {
				$(this).removeClass("move-right");		
			}
		});

	  });
	  
	  
	
	  /*Scroll 부드럽게*/
	  var scrollSpeed=700;
	  function pageScroll(object){
		  if(!object){
			  $("html,body").animate({scrollTop: 0}, scrollSpeed);
		  }else{
			 var topPos=$(object).offset().top;  //.top-60
			  $("html,body").animate({scrollTop: topPos}, scrollSpeed);
	      }
	   };
	  /*main left menu click*/
	  $(".main-menu ul li").click(function(){
		  var goPage = $(this).find('a').attr('href');
		  pageScroll(goPage);
		  return false;		   
      }); 
	  /*main right button click*/
	  $(".move-works").click(function(){
		  var goPage = $(this).find('a').attr('href');
		  pageScroll(goPage); 
		  return false;
	  });
	  /*side munu click*/
	  $(".side-menu ul li").click(function(){
		  var goPage = $(this).find('a').attr('href');
		  pageScroll(goPage); 
		  return false;
	  });
	  /*top 2번째 화면 클릭시*/
	   $(".ha-2").click(function(){
		  var goPage = $(this).find('a').attr('href');
		  pageScroll(goPage); 
		  return false;
	  });
	  
	  $(".lt-2").click(function(){
		  var goPage = $(this).find('a').attr('href');  
		  pageScroll(goPage)+100;
		  return false;
	  });
	  $(".mypage").click(function(){
		  var goPage = $(this).find('a').attr('href');  
		  pageScroll(goPage)+100;
		  return false;
	  });

	 /*image slide*/
	            var timer = null;
				var active = 0;
				var isFirst = true;
				var imgSlider = {
					init : function(){
						imgSlider.play();
					},
					active : 0,
					wrap : $(".slide-panal"),
					sliderCount : function(){
						return imgSlider.wrap.find("li").length;
					},
					fn_active : function(){
						imgSlider.wrap.find("li").each(function(i){
							if($(this).hasClass("on"))
							imgSlider.active = i;
						});
						return imgSlider.active;
					},
					slide : function(){
						
				if(active >= imgSlider.sliderCount()) active = 0;
				imgSlider.wrap.find("li").eq(active).siblings().removeClass("on").stop().animate({"opacity":"0"},'slow');
				imgSlider.wrap.find("li").eq(active).addClass("on").stop().animate({"opacity":"1"},'slow');
							
					},
					play : function(){
						if(active <= 0) active = 2;
						isFirst = false;
						if(isFirst) active = imgSlider.active + 1;
						timer = setInterval(function(){
							imgSlider.slide();
							isFirst = false;
							active++;
							}, 3000);
					}
				}
				
				
				imgSlider.init();
		
	    /*팝업 외부 플러그인 함수*/
		$('.popup-gallery-l').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title');
			}
		}
	   });
	   
	   $('.popup-gallery-e').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title');
			}
		}
	    });
		
		$('.popup-gallery-j').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title');
			}
		}
	    });
		
		$('.popup-gallery-board').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title');
			}
		}
	    });
		
		$('.popup-gallery-login').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title');
			}
		}
	    });
	
	
	$('.popup-epl').click(function () {
		//alert('rksk');
		
		$('.popepl').trigger('click');
		return false;
	});
	$('.popup-love').click(function () {
		//alert('rksk');
		
		$('.poplove').trigger('click');
		return false;
	});
	$('.popup-jjang').click(function () {
		//alert('rksk');
		
		$('.popjjang').trigger('click');
		return false;
	});
		
	$('.popup-board').click(function () {
		//alert('rksk');
		
		$('.popboard').trigger('click');
		return false;
	});	
	$('.popup-login').click(function () {
		//alert('rksk');
		
		$('.poplogin').trigger('click');
		return false;
	});	
});






















































