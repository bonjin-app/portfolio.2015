// JavaScript Document
/*intro*/
$(function(){
	/*nav click*/
     /*$(".nav>li>a").click(function(){
		 $(".nav>li>a").css({color: '#000000'});	 
	     $(this).css({color: '#e77f8a'});	  
	});/*nav click*/
	
	/*click button action*/
	clickButton();
	function clickButton(){
	   $("#click img").animate({opacity: 0.3},700,function(){
	   $(this).animate({opacity:1},700,function(){
		   clickButton();
		   });	
	   });
    };
	
});
$(function(){
		 var winWidth = $(window).width();
		 var winHeight = $(window).height(); 
		 var introHeight = $(window).height()/2;
		 $("#introWrap").stop().delay(1500).animate({top:-winHeight*2},2500,'easeInOutCirc');
		
}) ;
/*intro end*/
/*slide*/
$(function(){
				var timer = null;
				var active = 0;
				var isFirst = true;
				
				var imgSlider = {
					init : function(){
						imgSlider.play();
					},
					active : 0,
					wrap : $(".slide_panal"),
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
				imgSlider.wrap.find("li").eq(active).siblings().removeClass("on").stop().animate({"opacity":"0"}, 700);
				imgSlider.wrap.find("li").eq(active).addClass("on").stop().animate({"opacity":"1"}, 700);
				$(".slide_panal").find("li").eq(active).addClass("active");
				$(".slide_panal").find("li").eq(active).siblings().removeClass("active");
							
					},
					play : function(){
						if(isFirst) active = imgSlider.active + 1;
						if(imgSlider.wrap.hasClass("prev")) active += 1; 
						imgSlider.wrap.removeClass("prev").addClass("next");
						timer = setInterval(function(){
							imgSlider.slide();
							isFirst = false;
							active++;
							}, 2500);
					},
					stop : function(){
						clearInterval(timer);
					},
					next : function(){
						isFirst = false;
						if(imgSlider.wrap.hasClass("prev")) active += 1; 
						imgSlider.wrap.removeClass("prev").addClass("next");
						imgSlider.stop();
						imgSlider.slide();
						imgSlider.play();
						active++;
					},
					prev : function(){
						if(active <= 0) active = 1;
						isFirst = false;
						if(imgSlider.wrap.hasClass("next")) active -= 1; 
						imgSlider.wrap.removeClass("next").addClass("prev");
						active--;
						console.log(active);
						imgSlider.stop();
						imgSlider.slide();
						imgSlider.play();
					}
				}
				
				
				imgSlider.init();
				
				$(".arr-prev").click(function(){
					imgSlider.prev();
				});
				$(".arr-next").click(function(){
					imgSlider.next();
				});
				$(".slide_panal li").each(function(i){
					$(this).find("a").on("click", function(){
						if($(this).parent().hasClass("active")) return false;
						imgSlider.wrap.removeClass("next").addClass("prev");
						active = i;
						imgSlider.slide();
					});
				});
});	  