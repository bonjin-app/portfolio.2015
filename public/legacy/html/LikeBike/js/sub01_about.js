// JavaScript Document

$(function(){
	
				var ran;
                $('.control_button').each(function(index){
                    $(this).attr('data-index', index);
                });
                
				
                $('.control_button').click(function(){
                    var i = $(this).attr('data-index');
                    ran = i;
                    moveSlider(ran);
                });
				 
                /*ran = Math.round(Math.random()*4);
                moveSlider(ran);*/
                ran=0;
                $('.pre_move').click(function(){
                    if(ran != 0){
                        ran--;
                        moveSlider(ran);
                    }else{
						ran=4
						moveSlider(ran)
					}
                });
                
                $('.next_move').click(function(){
                    if(ran != 4){
                        ran++;
                        moveSlider(ran);
                    }else{
                        ran=0
                        moveSlider(ran)
                    }
                });
                
                function moveSlider(index){
                    var moveLeft = -(index*758);
                   
					$('.slider_panel').animate({
                        left: moveLeft
                    },'slow');
                    $('.control_button[data-index=' + index +']').addClass('active');
                    $('.control_button[data-index!=' + index +']').removeClass('active');
                }
            });
				
				
				
	/*$(".pre_move").click(function(){
		$( ".slider_panel" ).animate({
			marginLeft : 758
		}, 700, "swing",function(){
			$(".slider_panel").css("margin-left","0px");
			$(".slider_panel li:last").prependTo(".slider_panel");
		});
	});
	
	$(".next_move").click(function() {
		$( ".slider_panel" ).animate({ 
			marginLeft : -758
		}, 700, "swing",function(){
			$(".slider_panel").css("margin-left", "0px");
			$(".slider_panel li:first").appendTo(".slider_panel");
		});
	});*/
	

				
				
			