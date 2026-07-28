// JavaScript Document

$(function(){

				
				$(document).ready(function(e) {
                    $('.control_button:nth-child(1)').addClass('active');
					
                });
				var ran;
                $('.control_button').each(function(index){
                    $(this).attr('data-index', index);
                });
						
                $('.control_button').click(function(){
                    var i = $(this).attr('data-index');
                    ran = i; 
					moveSlider(ran);
                });
				

				
                
               /* ran = 0; //랜덤으로 보여줄때 Math.round(Math.random()*4);
                moveSlider(ran);
                
                $('.pre_move').click(function(){
                   
		
					if(ran != 0){
                        ran--;
                        moveSlider(ran);
                    }else{
						ran=4
						moveSlider(ran);
					}
               
				});
                
                $('.next_move').click(function(){
                    
		
					if(ran != 4){
                        ran++;
                        moveSlider(ran);
                    }else{
                        ran=0
                        moveSlider(ran);
                    }
               
				});*/
                
                function moveSlider(index){
                    var moveLeft = -(index*523);
                    $('.slider_panel').animate({
                        left: moveLeft
                    },'slow');
                   $('.control_button[data-index='+index+']').addClass('active');
		  		   $('.control_button[data-index!='+index+']').removeClass('active');
                    
                }
				
	
	
});
				
				
			












