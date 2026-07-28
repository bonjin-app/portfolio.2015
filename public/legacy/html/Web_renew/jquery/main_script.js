// JavaScript Document
/*상단 메뉴*/
$(function(){
	
	$('.gnblist>li').hover(function(){
	   $(this).find('ul').slideDown();
	   	
	},function(){
		$(this).find('ul').slideUp();
		
		});
	
    });
     $('.util>li').click(function(){
		   $(this).fadeToggle();
		 
		});
//왼쪽 메뉴 
$(function(){
	 $('.boxList').hover(function(){
		 $(this).addClass('hover_box');
		 $('.boxList').css('background','url(../images/community/left_ho.png)');
		 $(this).css('background','url(../images/community/left_box.png)');
	 },function(){
	     $(this).removeClass('hover_box');
		 $('.boxList').css('background','url(../images/community/left_ho.png)');
	 });
});