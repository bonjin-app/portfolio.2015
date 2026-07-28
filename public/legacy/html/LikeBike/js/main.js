// JavaScript Document

$(function(){ 


	var scrollSpeed = 700;

		function pageScroll(obj) {
			if(!obj) {
				 $.scrollTo({top:0, left:0}, scrollSpeed, {easing : "swing"});
			} else {
				 var topPos = $(obj).offset().top - 60;
				 $.scrollTo({top:topPos , left:0}, scrollSpeed, {easing : "swing"});
			}
		};
		
		
		/* gnb 메뉴 */
		$('#menu li').click(function(){
			var goPage = $(this).find('a').attr('href');
			pageScroll(goPage);
			return false;
		});

    // 스크롤 감지 
	$("#header").hide();

    $(window).scroll(function(){ 
       // 스크롤 top의 위치가 50이 넘을경우 보여준다 
	  if($(window).scrollTop()>=50){ 
          $("#header").slideDown(); 
        // 아닐경우는 감춘다 
         }else{ 
         $("#header").slideUp(); 
     } 
    });
	$('#bike_1_1').hide();
	  $('.bike_1').click(function(){
		$('#bike_1_1').animate({
		top: 1200,
		left: 500				
		},1000);	
	});
	 //구름애니메이션  
	  setInterval(function(){ 
	     $('#cloud1').animate({
		 right:1920
	    },35000,function(){
			$(this).css('right',-300);
			$(this).animate({
				right:-300
				},300)
			
			})
	  },1000);
		
		
	 setInterval(function(){ 
	     $('#cloud2').animate({
		left:1920
	    },37000,function(){
			$(this).css('left',-200);
			$(this).animate({
				left:-300
				},500)
			
			})
	  },100);
	  
	  	  setInterval(function(){ 
	     $('#cloud3').animate({
		 left:1920
	    },27000,function(){
			$(this).css('left',-300);
			$(this).animate({
				left:-300
				},500)
			
			})
	  },100);   
	  
	
  //메뉴 호버
      $('#b1,#b2,#b3,#b4,#b5').hover(function(){
		  $(this).animate({
		      opacity:0.3},50)
	  },function(){
		  $(this).animate({
			  opacity:1},50)
		  
	  });
//로고 호버
    $('#logo_y').hover(function(){
		     $(this).animate({
		      opacity:1},50)
	  },function(){
		  $(this).animate({
			  opacity:0},50)
  });
  
  //메인라이트
  setInterval(function(){
	   $('#mainlight').toggle(500);
		},500);	   
		
//창문라이트
  setInterval(function(){
	   $('#windowlight').fadeToggle(500);  
	},1000);
  
 
 //등대 불빛 페이드토글
    setInterval(function(){
    $('#lighthouse1').fadeToggle(2000);  
	},1000);
	setInterval(function(){
    $('#lighthouse2').fadeToggle(1500);  
	},1000);
	
//가로등 불빛 	
    setInterval(function(){
		$("#light1").fadeToggle(2000);		
	},2000);
	
	setInterval(function(){
		$("#light2").fadeToggle(3000);		
	},3000);
//창문불빛	
	setInterval(function(){
    $('#light3').fadeToggle(1500);  
	},1000);
	
	setInterval(function(){
    $('#light4').fadeToggle(1500);  
	},1000);
	
	
	
//분수대	
	setInterval(function(){
		$("#water1").fadeToggle(200);		
	},200);


			 
});
 
 
 

