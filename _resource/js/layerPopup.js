var LAYERPOPUP =  (function () {
  function setCookie(name, value, expirehours){
    var todayDate = new Date();
    todayDate.setHours(todayDate.getHours() + expirehours);
    document.cookie = name + "=" + escape(value) + ";path=/;expires=" + todayDate.toGMTString() + ";";
  }
  function getCookie(name){
      var  cookiedata =  document.cookie;
      var index = cookiedata.indexOf(name + "=");
      if(index == -1) return null;

      index = cookiedata.indexOf("=", index) + 1;
      var endstr = cookiedata.indexOf(";", index);
      if(endstr == -1) endstr = cookiedata.length;
      return unescape(cookiedata.substring(index, endstr));
  }

  function setEvent(){
    //Main Layer Popup
    var getCookie0 = getCookie("saw_pop00");
    var getCookie1 = getCookie("saw_pop01");
    var getCookie2 = getCookie("saw_pop02");
    var target = '';

    getCookie0 == 'true' ? $('.container00').hide() :$('.container00').show();
 //   getCookie1 == 'true' ? $('.container01').hide() :$('.container01').show(); 
 //   getCookie2 == 'true' ? $('.container02').hide() :$('.container02').show();

    $('body').addClass('active-popup');

    if((getCookie0 === 'true')) {
      $('body').removeClass('active-popup');
    }

    if(!($('.layer-popup .swiper').is(':visible'))) {
      $('body').removeClass('active-popup');
    }

    $('.layerClose').on('click', function(e){
      target = $(this).parents('.wrapper').attr('class').replace('swiper', '').replace(' ', '');

      if($(this).prev('.check-content').children('input').prop("checked")) {
        setCookie('saw_pop00',true,24)
        // target === 'container01' ? setCookie('saw_pop01',true,24) : setCookie('saw_pop02',true,24) 
      } else {
        setCookie('saw_pop00','',-1)
        // target === 'container01' ? setCookie('saw_pop01','',-1) : setCookie('saw_pop02','',-1)
      }

      $(this).parents('.swiper').hide();
  
      if(!($('.layer-popup .swiper').is(':visible'))) {
        $('body').removeClass('active-popup');
      }
    });

    setTimeout(() => {
      $('html, body').animate({ scrollTop: 0 }, 0); 
    },1)
  

  }

  function init(){
    if($('.main .layer-popup .container').length) {
      setEvent();
    }
  }

  return {
    init: function () {
            init();
    }
  }
})();


$(function(){
  $(window).load(function(){
    LAYERPOPUP.init();
  });
});
