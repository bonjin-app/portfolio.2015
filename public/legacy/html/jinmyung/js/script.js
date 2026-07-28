$(document).ready(function(e) {
    /*var win = $(window).width();
	  if(win > 1280){
		alert("줄엇다");
		$(".all-menu").css('display','none');
		$(".slide-toggle").css('display','none');
		$(".menu-icon").css('display','none');
	}*/
	 
	

});// JavaScript Document




$(function(){ 
		$(".side-menu ul li span").css({opacity : 0});
        $(".side-menu ul li").hover(function(){
			 $(".side-menu ul li span").css({opacity : 0});
		     $(this).find("span").css({opacity : 1});
		},function(){
			 $(this).find("span").css({opacity : 1});
			 $(".side-menu ul li span").css({opacity : 0});
		});
		
		
	$(".i-sub-prev").click(function(){
		$( ".s-slide-panal ul" ).animate({
			marginLeft : '100%'
		}, 700, "swing",function(){
			$(".s-slide-panal ul").css("margin-left","0px");
			$(".s-slide-panal ul li:last").prependTo(".s-slide-panal ul");
		});
	});
	
	$(".i-sub-next").click(function() {
		$( ".s-slide-panal ul" ).animate({ 
			marginLeft : '-100%'
		}, 700, "swing",function(){
			$(".s-slide-panal ul").css("margin-left", "0px");
			$(".s-slide-panal ul li:first").appendTo(".s-slide-panal ul");
		});
	});
	
	$(".p-01").hide();
	$(".popup-01").click(function(){
			$(".p-01").fadeToggle();
			$(".p-02").hide();
		});
	$(".p-01 b").click(function(){
			$(".p-01").fadeToggle();
		});
		
    $(".p-02").hide();
	$(".popup-02").click(function(){
			$(".p-02").fadeToggle();
			$(".p-01").hide();
		});
	$(".p-02 b").click(function(){
			$(".p-02").fadeToggle();
		});
		
		
	$(".all-menu").hide();
	$(".slide-toggle").hide();
	$(".menu-icon").click(function(){
		$(".nav-menu").slideUp("slow");
		$(".all-menu").slideToggle('slow');
	    $(".slide-toggle").slideToggle('slow');
	});
	
	$('.sub').hide();
	$('.all-menu>ul>li').hover(function(){
		$(this).find('.sub').fadeIn();
	},function(){	
		$(this).find('.sub').fadeOut();		
	});

	$(".all-menu>ul>li").click(function(){
		$('.all-menu>ul>li').removeClass('on');
		$(this).addClass('on')	;
	});
	
    $(".head ul li>a").click(function(){
        $(".nav-menu").slideToggle("slow");
		$(".all-menu").slideUp('slow');
	    $(".slide-toggle").slideUp('slow');
    });
	
});






   /*==========================index 상단 이미지==========================*/
$(function(){
	   /*==========nav 메뉴 펼치기==========*/
		
	 
	
	
	            var timer = null;
				var active = 0;
				var isFirst = true;
				
				var imgSlider = {
					init : function(){
						$(".image-btn").find("li").eq(imgSlider.active).addClass("active");
						imgSlider.wrap.find("li").not(":eq(0)").css({"opacity":"0"});
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
				imgSlider.wrap.find("li").eq(active).siblings().removeClass("on").stop().animate({"opacity":"0"}, 1000);
				imgSlider.wrap.find("li").eq(active).addClass("on").stop().animate({"opacity":"1"}, 1000);
				$(".image-btn").find("li").eq(active).addClass("active");
				$(".image-btn").find("li").eq(active).siblings().removeClass("active");
							
					},
					play : function(){
						if(imgSlider.wrap.hasClass("pause")) return false;
						if(isFirst) active = imgSlider.active + 1;
						if(imgSlider.wrap.hasClass("prev")) active += 1; 
						imgSlider.wrap.removeClass("prev").addClass("next");
						subtimer = setInterval(function(){
							imgSlider.slide();
							isFirst = false;
							active++;
							}, 4000);
					},
					stop : function(){
						clearInterval(subtimer);
					}
				}
				
				
				imgSlider.init();
				$(".image-btn li").each(function(i){
					$(this).find("img").on("click", function(){
						if($(this).parent().hasClass("active")) return false;
						imgSlider.wrap.removeClass("next").addClass("prev");
						active = i;
						imgSlider.slide();
					});
				});
});
	
	/*=========================index 아래 이미지==========================*/
$(function(){	     
	
	            var subtimer = null;
				var subactive = 0;
				var subisFirst = true;
				
				var iconSlider = {
					init : function(){
						$(".icon-btn").find("li").eq(iconSlider.subactive).addClass("subactive");
						iconSlider.wrap.find("li").not(":eq(0)").css({"opacity":"0"});
						iconSlider.play();
					},
					subactive : 0,
					wrap : $(".last-slide ul"),
					sliderCount : function(){
						return iconSlider.wrap.find("li").length;
					},
					fn_active : function(){
						iconSlider.wrap.find("li").each(function(i){
							if($(this).hasClass("on"))
							iconSlider.subactive = i;
						});
						return iconSlider.subactive;
					},
					slide : function(){
						
				if(subactive >= iconSlider.sliderCount()) subactive = 0;
				iconSlider.wrap.find("li").eq(subactive).siblings().removeClass("subon").stop().animate({"opacity":"0"}, 1000);
				iconSlider.wrap.find("li").eq(subactive).addClass("subon").stop().animate({"opacity":"1"}, 1000);
				$(".icon-btn").find("li").eq(subactive).addClass("subactive");
				$(".icon-btn").find("li").eq(subactive).siblings().removeClass("subactive");
							
					},
					play : function(){
						if(iconSlider.wrap.hasClass("pause")) return false;
						if(subisFirst) subactive = iconSlider.subactive + 1;
						if(iconSlider.wrap.hasClass("prev")) subactive += 1; 
						iconSlider.wrap.removeClass("prev").addClass("next");
						/*subtimer = setInterval(function(){
							imgSlider.slide();
							subisFirst = false;
							subactive++;
							}, 4000);*/
					},
					stop : function(){
						clearInterval(subtimer);
					},
					next : function(){
						subisFirst = false;
						if(iconSlider.wrap.hasClass("prev")) subactive += 1; 
						iconSlider.wrap.removeClass("prev").addClass("next");
						iconSlider.stop();
						iconSlider.slide();
						iconSlider.play();
						subactive++;
					},
					prev : function(){
						if(subactive <= 0) subactive = 5;
						subisFirst = false;
						if(iconSlider.wrap.hasClass("next")) subactive -= 1; 
						iconSlider.wrap.removeClass("next").addClass("prev");
						subactive--;
						console.log(subactive);
						iconSlider.stop();
						iconSlider.slide();
						iconSlider.play();
					}
				}
				
				
				iconSlider.init();
				
				$(".btn-prev").click(function(){
					iconSlider.prev();
				});
				$(".btn-next").click(function(){
					iconSlider.next();
				});
				$(".icon-btn li").each(function(i){
					$(this).find("p").on("click", function(){
						if($(this).parent().hasClass("subactive")) return false;
						iconSlider.wrap.removeClass("next").addClass("prev");
						subactive = i;
						iconSlider.slide();
					});
				});

});