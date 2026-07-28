(function($) {

  $.minibike = function(options) {

    // VARIABLES
    var minibike = this;
    var currentInd = 0;
    var destinationInd = 0;
    var waterLevel = 900;
    var currentWaterPos = 0;

    var defaults = {};
    minibike.settings = $.extend({}, defaults, options);

    // CONSTRUCTOR
    function init() {
      $('#minibike').css('top', 660 + 'px');
      minibike.adjustMinibikeHorizontal(660);      
      minibike.turnLights("off");
      minibike.turnDir("right");  
      minibike.floatMyBike();     
    }

    // PUBLIC METHODS    
    minibike.floatMyBike = function(){  
      if(parseInt($('#minibike').css('marginTop')) > 0){
        $('#minibike').animate ({marginTop:'10'}, {duration:1000, easing:'easeInOutQuad', step:function(){minibike.updateWaterLevel(currentWaterPos, {prop:'top'})}, complete:function(){minibike.floatMyBike()}});
      }
      else{
        $('#minibike').animate ({marginTop:'30px'}, {duration:1000, easing:'easeInOutQuad', step:function(){minibike.updateWaterLevel(currentWaterPos, {prop:'top'})}, complete:function(){minibike.floatMyBike()}});
      }
    }
    
    minibike.turnDir = function(dir){  
      this.dir = dir;
      if(dir == "right") {
        $('#minibike').addClass('right');
      }
      else{
        $('#minibike').removeClass('right');
      }      
    } 
	
    minibike.turnLights = function(dir){  
      this.lights = dir;
      if(dir == "on") {
        $('#minibike #minibike-lights').stop().animate({opacity:1}, {duration:900, easing:'easeInElastic'});
      }
      else{
        $('#minibike #minibike-lights').stop().animate({opacity:0}, {duration:800, easing:'easeOutQuad'});
      }
    } 
    
    minibike.adjustMinibikeHorizontal = function(top){    
      var section_height = 2800;
      var horizontal_center = 780;
      var maximum_offset = 280;
      var initial_top = 1000;
      
      // position after xx; just go straight down
      if(top>6000) {top=6000;}
      
      var degrees = ((top - initial_top) / (section_height / 3)) * (Math.PI/2.2);
      var left = horizontal_center + Math.sin(degrees) * maximum_offset;

      $('#minibike').css('left', left+"px");
    }

    
    minibike.updateWaterLevel = function(currentTop, fx){ 
      if(fx.prop == "top") {        
        currentWaterPos = currentTop;
        var h = waterLevel - currentTop - parseInt($('#minibike').css('marginTop'));        
        h = (h<0) ? 0 : (h>84) ? 84 : h;        
        $('#minibike-object-above').css('height', h + 'px');
      }
    }
        
       

    // INIT
    init();

    return minibike;
  }

})(jQuery);

var minibike;
var oldScroll = 0;
var waypoints = [0, 750, 850, 2850, 2950, 3650, 4650, 5650, 6650, 9999];
var currentZone = 0;
var zone;
var pos;
var wasDown = true;


function anim() {
  // determine percentage of page that has been scrolled down
  var offset = $(document).scrollTop();
  var windowHeight = $(window).height();
  var docHeight = $(document).height(); 
  
  // on smaller screens we need to offset the submarine's fixed container so it only shows when scrolled down
  if(offset < ((860 + 83) - (windowHeight - 700))) {
    $('#minibike-container').css('top', -offset * 0.54 + 'px');    
  }
  
  // reset the pinned minibike
  $('#minibike').css('top', 660 + 'px');
  
  // calculate the position (in relation to the content)
  pos = parseInt($('#minibike').css('top')) + parseInt($('#minibike-container').css('top')) + offset;
  
  // calculate the position (in relation to the midground / water)
  var waterpos = parseInt($('#minibike').css('top')) + parseInt($('#minibike-container').css('top')) - parseInt($('#bg-midground').css('top'));
  
  // pin the submarine when scrolled all the way down

  	if(pos >= 7000) {
  		var spos = 7000 - parseInt($('#minibike-container').css('top')) - offset
    $('#minibike').css('top', spos + 'px');
    return;
  }
    
  // calculate the sine path
  minibike.adjustMinibikeHorizontal(pos);
  
  // adjust the water level
  minibike.updateWaterLevel(waterpos, {prop : 'top'});

  // check direction
  isDown = pos > oldScroll;
  var dif = pos - oldScroll;
  oldScroll = pos;
  
  // turn around the submarine when changing direction

  	if(wasDown != isDown && pos<7000) {
   minibike.turnDir((minibike.dir == "left") ? "right" : "left");
  }
  wasDown = isDown;

 
  // check what zone we are in
  for(var i = currentZone - 1; i < waypoints.length; i++) {
    if(offset < waypoints[i]) {
      zone = i;
      break;
    }
  }
  
  // if changed zone take action
  if(currentZone != zone) {
    currentZone = zone;
    var m = (isDown) ? waypoints[currentZone - 1] : waypoints[currentZone];
    switch(m) {
      case 0:
        minibike.turnDir('right');
        break;
	  case 750:
        minibike.turnLights(((isDown) ? "on" : "off"));
        break;
      case 850:
        minibike.turnDir('left');
        break;
      case 2850:
        minibike.turnDir('right');
        break;
                           
    }   
  }
}




$(function() {
 
  
  // minibike
  minibike = $.minibike({ el:'#minibike'});


  // add parallax layers
   
 

  // add a smooth mousewheel
  $('body').mousewheel(function(event, delta) {    
    $.scrollTo.window().queue([]).stop();
    if (delta < 0) {
      $('body').stop().scrollTo('+=300', 400);
    } else
      $('body').stop().scrollTo('-=300', 400);

    return false;
  });
  
  // add a scroll reaction    
  $(window).scroll(anim); 
  anim();			 
  
  
  w = $(window).width();
  $(window).resize(function(){
	  if(w < 1200){
		  
	  }
	});
  });
 
