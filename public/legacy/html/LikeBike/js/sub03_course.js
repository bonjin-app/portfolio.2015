
$(function(){
				$('.map_hover_02').hover(function(){
					$('.map_hover_02').animate({"opacity":"1"});
					},function(){
				    $('.map_hover_02').animate({"opacity":"0"});
				});
				
				var timer = null;
				var active = 0;
				var isFirst = true;
				
				var imgSlider = {
					init : function(){
						$("#bar_03 .indices_02").find("li").eq(imgSlider.active).addClass("active");
						imgSlider.wrap.find("li").not(":eq(0)").css({"opacity":"0"});
						imgSlider.play();
					},
					active : 0,
					wrap : $("#slider_map_02 .slide_panal_02"),
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
				$("#bar_03 .indices_02").find("li").eq(active).addClass("active");
				$("#bar_03 .indices_02").find("li").eq(active).siblings().removeClass("active");
							
					},
					play : function(){
						if(isFirst) active = imgSlider.active + 1;
						if(imgSlider.wrap.hasClass("prev")) active += 1; 
						imgSlider.wrap.removeClass("prev").addClass("next");
						/*timer = setInterval(function(){
							imgSlider.slide();
							isFirst = false;
							active++;
							}, 4000);*/
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
						if(active <= 0) active = 3;
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
				
				$(".btn-prev_02").click(function(){
					imgSlider.prev();
				});
				$(".btn-next_02").click(function(){
					imgSlider.next();
				});
				$("#bar_03 .indices_02 li").each(function(i){
					$(this).find("a").on("click", function(){
						if($(this).parent().hasClass("active")) return false;
						imgSlider.wrap.removeClass("next").addClass("prev");
						active = i;
						imgSlider.slide();
					});
				});
});	  