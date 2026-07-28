// JavaScript Document
$(function(){
	
	
	   var ra = 0;
       moveSlider(0);
                    
       $('.prev').click(function(){
                 if(ra !=0){
                    ra--;
                  moveSlider(ra); 
                  }else{
					  
                    ra=1;
					moveSlider(ra); 
				  }
                       
       });
	   $('.next').click(function(){
                 if(ra !=1){
                    ra++;
                   moveSlider(ra); 
                   }else {
					   
                    ra=0;
					moveSlider(ra); 
					}
	   });
	
	   function moveSlider(index){
       var moveLeft = -(index*1200);
	   
	   
       $('#frame_box').animate({
         left : moveLeft
       },'slow');
                        
       }
});