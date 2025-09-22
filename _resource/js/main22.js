var $window = $(window);
var delta = 0;
var direction;
var inH = window.innerHeight;
var yPos;
$window.on("scroll", function () {
  var yPos = $(window).scrollTop();
  var trig = yPos + $(window).innerHeight() / 3;
  if (yPos - delta > 0) {
    direction = "down";
  } else {
    direction = "up";
  }
  // if (direction === "up") {
  // } else {
  // }

  // console.log(direction);
  delta = yPos;
});

var CJFRESHWAY_MAIN = (function () {
  function init() {}
  return {
    init: function () {
      // $("#gnb").hide();
      $(".ctx1, .ctx2").addClass("off");
      $(".solutions").addClass("off");
      init();
    },
  };
})();

$(function () {
	CJFRESHWAY_MAIN.init();


    var banners = new Swiper(".layer-popup .swiper", {
       
       
        /*  
        
        //팝업롤링시 주석 제거 S
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {     
            delay: 3000,
        }, 
        slidesPerView: 1,
        spaceBetween: -100,
        pagination: {
            el: '.layer-popup .swiper-pagination',
        },
        
        //팝업롤링시 주석 제거 E
        
        */
        
    });
	banners.autoplay.paused = false;
    banners.autoplay.running = true;
    
    $('.layer-popup .swiper').hover(function() {    
        banners.autoplay.stop();}, 
    function(){    
        banners.autoplay.start();}
    );   
    
    
     
/*
  var heroes = new Swiper(".heroes", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 2000,
    },
    pagination: {
      el: '.swiper-nav ul',
      clickable: true,
      renderBullet: function (index, className) {
        return '<li class="' + className + '">0' + (index + 1) + '</li>';
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      init: function(){
		$('.heroes .swiper-play').removeClass('on');
      	$('.heroes .swiper-pause').addClass('on');
      },
    }
  });
  function checkPaused() {
    if(heroes.autoplay.running) {
      $('.heroes .swiper-play').removeClass('on');
      $('.heroes .swiper-pause').addClass('on');
    } else {
      $('.heroes .swiper-pause').removeClass('on');
      $('.heroes .swiper-play').addClass('on');
    }
  }
  $('.heroes .swiper-play').on('click', function(){
    heroes.autoplay.start();
    checkPaused();
  });
  $('.heroes .swiper-pause').on('click', function(){
    heroes.autoplay.stop();
    checkPaused();
  });
*/



if($('.heroes .video-util')) {
  $('.heroes .video-util .v-play').hide();
  $('.heroes .video-util .v-pause').show();

  $('.heroes .video-util .v-play').on('click', function(e) {
    $('.heroes video').trigger('play');
    $('.heroes .video-util .v-pause').show();
    $('.heroes .video-util .v-play').hide();
  })
  $('.heroes .video-util .v-play').focus( ()=> {
    $('.heroes video').trigger('play');
  })
  
  $('.heroes .video-util .v-pause').on('click', function(e) {
    $('.heroes video').trigger('pause');
    $('.heroes .video-util .v-pause').hide();
    $('.heroes .video-util .v-play').show();
  })
  $('.heroes .video-util .v-pause').focus( ()=> {
    $('.heroes video').trigger('pause');
  })
}

  var solutions = new Swiper(".solutions .swiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    pagination: {
      el: '.swiper-nav ul',
      clickable: true,
      renderBullet: function (index, className) {
        var slideName = $('.solutions .swiper-slide').eq(index + 1).find('h3').html();
        return '<li class="' + className + '">' + slideName + '</li>';
      },
    },
  });
  var esg = new Swiper(".esg .swiper", {
    freeMode: true,
    mousewheel: true,
    width: 410,
  });
});

