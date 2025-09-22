//request animation

(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
		|| window[vendors[x]+'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); },
				timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function(id) {  
			clearTimeout(id);
		};
}());
(function(window, document, parent){
	if(typeof console=="undefined"){
		console = {
			log	 : function(){},
			info	: function(){},
			warn	: function(){},
			error   : function(){}
		};
	}
}(window, document, parent));

/* google tagging */
/*
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
*/


//ga('create', 'UA-93172007-1', 'auto');
//ga('send', 'pageview');

function eventTrack(google){
	if(google != ''){
		//ga('send', 'event', google, 'click');
		gtag('event',google);
	}
}

window.EventDispatcher = (function(){
	var listeners = [];
	var isDispatchPlaying = false;
	var removeArr = [];

	function removeStart(){
		if(removeArr.length == 0) return;
		for(var i = 0, l = removeArr.length; i < l; ++i){
			removeListener(removeArr[i].s, removeArr[i].e, removeArr[i].c);
		}
		removeArr = [];
	}

	function removeListener(scope, evt_name, callback){
		if(typeof listeners[evt_name] != "undefined"){
			for(var i = 0, l = listeners[evt_name].length; i < l; ++i){
				if(listeners[evt_name][i].s == scope){
					delete listeners[evt_name][i].s;
					delete listeners[evt_name][i].c;

					listeners[evt_name].splice(i, 1);
					if(callback) callback();
					break;
				}
			}
		}
	}

	return {
		add:function(scope, evt_name, callback){
			if(typeof listeners[evt_name] == "undefined") listeners[evt_name] = [];
			listeners[evt_name].push({s:scope, c:callback});
		},
		is:function(evt_name, params){
			if(typeof listeners[evt_name] != "undefined"){
				isDispatchPlaying = true;
				for(var i = 0, l = listeners[evt_name].length; i < l; ++i){
					var s = listeners[evt_name][i].s;
					listeners[evt_name][i].c.call(s, params);

					if(i == l-1) isDispatchPlaying = false, removeStart();
				}
			}
		},
		remove:function(scope, evt_name, callback){
			if(isDispatchPlaying) removeArr.push({s:scope, e:evt_name, c:callback});
			else removeListener(scope, evt_name, callback);
		}
	};
})();
var Events = {
	STARTMAINTOP:"STARTMAINTOP",
	STOPMAINTOP:"STOPMAINTOP"
}
var CJFRESHWAY_GNB =  (function () {
	var gnbTimer, depth3PosAry =[138,228,317,407,497,586,682,751,840], depth3EnPosAry =[234,440,602,778,883];

	$('.top_btn a').on('click', function(e){
		e.preventDefault();
		$('html,body').animate({'scrollTop':0}, 500);
	});

  $('#gnb .depth1 > li > a').on('mouseover focus', function() {
    $('#gnb').addClass('over');	
		$('#gnb .depth1 > li').removeClass('active');
		$('.sub_nav').hide();
    TweenMax.to($(".nav_bg"), 0.5, { height: 0, ease: Cubic.easeOut });
		$(this).parent().addClass('active');

		if($(this).siblings('.sub_nav').length) {
			$(this).siblings('.sub_nav').show();	
			$('.nav_bg').show();
      TweenMax.to($(".nav_bg"), 0.5, { height: 300, ease: Cubic.easeOut });
		}
	})
  
	$('#gnb .depth1 > li').on('mouseleave focusout', function() {
    $('#gnb').removeClass('over');
    $(this).removeClass('active');
    $(this).find('.sub_nav').hide();
    TweenMax.to($(".nav_bg"), 0.5, { height: 0, ease: Cubic.easeOut });

	})



  $('.call_sitemap').on('click', function (e) {
	$('#sitemap').show().focus();
  });
  $('#close_sitemap').on('click', function () {
	$('#sitemap').hide();
  });

	$('.selectbox a').on('click', function(e){
		e.preventDefault();
		if($(this).parent().hasClass('on')){
			$(this).parent().removeClass('on');
		}else{
			$(this).parent().addClass('on');
		}
	});
	$('#realtedSites button').on('click', function(e){
		e.preventDefault();
		if($('#realtedSite .selectbox').hasClass('on')){
			$('#realtedSite .selectbox').removeClass('on');
		}
	});

	$('body').on('click',function(e){
		var wrapperClass = 'family';
		var $target = $(e.target),
			classNames = wrapperClass.split(' ').join('.');
		if(!$target.closest('.'+classNames).length && $('.selectbox').hasClass('on')){
			$('.selectbox').removeClass('on');
		}
	});

	function setDepth3(_$selector,_time){
		var idx = _$selector.parent().index();
		var w = _$selector.innerWidth();
		var isEn = location.href.indexOf('/en/')!=-1;
		TweenMax.to( $('#contents .depth3 .inner .pos'),_time,{left:(isEn?depth3EnPosAry[idx]:depth3PosAry[idx]),width:w,ease:Cubic.easeOut});

	}
	function transitionPath(t){
		var val=t*10;
		return 'M-160 44c30 0 58-'+val+' 88-'+val+'s 58 '+val+' 88 '+val+' 58-'+val+' 88-'+val+' 58 '+val+' 88 '+val+' v44h-352z';

	}
	
	if (document.documentMode || /Edge/.test(navigator.userAgent)) {
		$('body').on("mousewheel", function () {
			try{
				event.preventDefault();
				var wheelDelta = event.wheelDelta;
				var currentScrollPosition = window.pageYOffset;
				window.scrollTo(0, currentScrollPosition - wheelDelta);
			}catch (e){

			}

		});
	}

	$(window).scroll(function(e) {
    var scrTop = $(window).scrollTop();
    var sectionTopHeight;

		// if($('body').hasClass('main')){return;}
		
    if($('.section_top').length) {
      sectionTopHeight = $('.section_top')[0].scrollHeight;

      if (scrTop > sectionTopHeight - 155) { //80 + 75
        $('#gnb').addClass('scroll');
      }else {
        $('#gnb').removeClass('scroll');
      }
    }


		if($('#contents .depth3').length>0) {
			if (scrTop > 400) {
				$('#contents .depth3').addClass('white');
			} else {
				$('#contents .depth3').removeClass('white');
			}
		}

		//if($('.top_wave').length>0){
		//	var min_wave = $('.section_top').hasClass('full')?0: 0;
		//	var max_wave =min_wave+$('.top_wave').innerHeight();
		//	var per = (scrTop-min_wave)/(max_wave-min_wave);
		//	per = (per < 0)?0:(per>1)?1:per;
		//	var plus = $('#contents .section_top').hasClass('first')?90:0
		//	TweenMax.to($('.top_wave g'), 0.4, {x: per * 80+plus, ease: Quad.easeOut});
		//}

		if($('.section_top .text_container').length>0) {
			var text_container_pos=$('.section_top .text_container').offset().top;
			var max_tit = $('.section_top').hasClass('full')?text_container_pos:text_container_pos-120;
			var per_t = scrTop / max_tit;
			per_t = (per_t < 0) ? 0 : (per_t > 1) ? 1 : per_t;
			TweenMax.to($('#contents .section_top .text_container'), 0.2, {autoAlpha: 1 - per_t, ease: Quad.easeOut});
		}

	});

	var $title = $('#contents .section_top .section_inner .text_container').not('.nomotion').find('h2');
	function textSetMotion(){
		$('#contents .section_top .section_inner .text_container').css('opacity',1);
	}
	function textInMotion(){
		//$title.find('em').each(function(i,t){
		//	TweenMax.to($(this),0.8,{delay:i*0.05+0.5,x:0,opacity:1,ease:Cubic.easeOut})
		//});
	}
	textSetMotion();


	var url = window.location.href;
	
	// nav on/off
	if(url.indexOf("/career/") > -1) {
		$('.navi .depth1 > li:eq(4) >a').addClass('on');
	}
	if(url.indexOf("/en/career/") > -1) {
		$('.navi .depth1 > li:eq(3) >a').addClass('on');
	}
	
	if(url.indexOf("/sustainability/") > -1) {
		$('.navi .depth1 > li:eq(1) >a').addClass('on');
	}
	if(url.indexOf("/ir/") > -1) {
		$('.navi .depth1 > li > a').removeClass('on');
		$('.navi .depth1 > li:eq(3) >a').addClass('on');
	}
	if(url.indexOf("/en/ir/") > -1) {
		$('.navi .depth1 > li > a').removeClass('on');
		$('.navi .depth1 > li:eq(2) >a').addClass('on');
	}
	
	if(url.indexOf("/newsroom/") > -1 || url.indexOf("/en/about/") > -1) {
		$('.navi .depth1 > li > a').removeClass('on');
		$('.navi .depth1 > li:eq(2) >a').addClass('on');
	}
	if(url.indexOf("/solution/") > -1) {
		$('.navi .depth1 > li > a').removeClass('on');
		$('.navi .depth1 > li:eq(0) >a').addClass('on');
	}
	return {
		textInMotion:textInMotion
	}
})();

function getURLParameter(name) {
	var rtnval = '';
	var nowAddress = unescape(location.href);
	var parameters = (nowAddress.slice(nowAddress.indexOf('?')+1,nowAddress.length)).split('&');

	for(var i = 0 ; i < parameters.length ; i++) {
		var varName = parameters[i].split('=')[0];
		if(varName.toUpperCase() == name.toUpperCase()) {
			rtnval = parameters[i].split('=')[1];
			break;
		}
	}
	return rtnval;
}
$(function(){
	$('.section_top.first .back_container').addClass('inmotion');

	//TweenMax.to($('#contents .section_top .section_inner .text_container span'),0.6,{opacity:1, delay:0.5,width:50, x:-25})
	//TweenMax.to($('#contents .section_top .section_inner .text_container p'),0.6,{opacity:1, delay:1,x:0});
	//CJFRESHWAY_GNB.textInMotion();
	//TweenMax.to($('.section_top.first .top_wave g'), 1, {x: 90,delay:0.2, ease: Quad.easeOut});
});

$(function() {
	if($('.tab_content_area').length > 0) { // in page tab
		var $tabContents = $('.section.tab ul li');
		$tabContents.find('a').click(function(){
			var idx = $(this).parent().index();
			$tabContents.find('a').removeClass('on');
			$(this).addClass('on');
			$('.tab_content_area').removeClass('on');
			$('.tab_content_area').eq(idx).addClass('on');
			return false;
		});
	}
	if($('.sub_tab_content_area').length > 0) {
		$('.sub_tab ul li a').click(function(){
			var idx = $(this).parent().index();
			$('.sub_tab ul li a').removeClass('on');
			$(this).addClass('on');
			$('.sub_tab_content_area').removeClass('on');
			$('.sub_tab_content_area').eq(idx).addClass('on');
			return false;
		});
	}
	if ($(".accordion").length > 0) { // accordion
		$(".accordion .trigger").on("click", function () {
		    var $target = $(this).next(".content");
		    $(this).toggleClass("on");
	    	if ($target.attr("aria-expanded") === "false") {
	      		$target.attr("aria-expanded", "true");
	    	} else {
	      		$target.attr("aria-expanded", "false");
	    	}
	    });
	}
})

$(window).load(function(){
	$(window).resize(function(){
		var scrTop =  $(window).scrollTop();
		if(scrTop > 0){
			$(window).scroll();
		}

	});
	$(window).resize();
});

$('#call_sitemap').on('click', function(e) {
	e.preventDefault();
	$('#sitemap').show();
});
$('#close_sitemap').on('click', function(e) {
	$('#sitemap').hide();
});
$('.popup .btn_close').click(function(){
	$(this).parents('.popup').hide();
});


// 2021-05-27 추가 - 아이누리 브랜드 관련 스크립트
$(function(){
	var pre_pos = $(window).scrollTop(),		
		win_h = $(window).height(),
		header_h = $('#header').height(),
		btm_pos = $('#footer').offset().top;
		fixed_pos = btm_pos + header_h - win_h;

	$(window).resize(function(){
		win_h = $(window).height(),
		header_h = $('#header').height(),
		setPosition();
	});
	

	$(window).scroll(function(){
		setBtmButton();
	});
	
	if ($(".board_slides").length > 0) {
		mediaCarousel();
	}
	$('.view_detail').on({
		'click' : function(e){
			e.preventDefault();
			if($(this).parents('li').hasClass('open')){
				$(this).parents('li').removeClass('open');
			}else{
				$(this).parents('li').addClass('open');
			}
			setPosition();
		}
	});
	
	function setBtmButton(){
		pre_pos = $(window).scrollTop();
		if(pre_pos >= fixed_pos){
			if(!$('.section.inuri').hasClass('fixed')) $('.section.inuri').addClass('fixed');
		}else{
			if($('.section.inuri').hasClass('fixed')) $('.section.inuri').removeClass('fixed');
		}
	}

	function setPosition(){
		btm_pos = $('#footer').offset().top;
		fixed_pos = btm_pos + header_h - win_h;
		setBtmButton();
	}
});


// 이미지형 게시판 상단
function mediaCarousel() {
    var wrapW = $(".board_slides").innerWidth();
    var $slides = $(".board_slides .item_list");
    var $slide_item = $(".board_slides .item_list li");
    var $slides_count = $(".board_slides .item_list li").length;
    var currIdx = 0;
  
    // init
    $(".board_slides .item_list").css({ position: "absolute", display: "flex" });
    $slide_item.css("width", wrapW + "px");
    $(".board_slides .indicator").html("");
    $(".board_slides .indicator").append("<ul></ul>");
    for (var i = 0; i < $slides_count; i++) {
      $(".board_slides .indicator ul").append("<li><button></button></li>");
    }
    $slide_item.eq(currIdx).show();
    $(".board_slides .indicator li").eq(currIdx).children("button").addClass("on");
  
    function nav () {
          if(currIdx==0){
              $(".board_slides .nav .btn_left").hide();
              $(".board_slides .nav .btn_right").show();
          } else if (currIdx==$slides_count-1){
              $(".board_slides .nav .btn_left").show();
              $(".board_slides .nav .btn_right").hide();
          } else {
              $(".board_slides .nav .btn_left").show();
              $(".board_slides .nav .btn_right").show();
          }
      }
      nav();
  
      $(".board_slides .indicator button").unbind('click').bind("click", function () {
          var actionIdx = $(this).parent().index();
          $slides.animate({ left: actionIdx * wrapW * -1 }, 500);
          $slide_item.eq($(this).parent().index()).show();
          $(".board_slides .indicator button").removeClass("on");
          $(this).addClass("on");
          currIdx = actionIdx;
          nav();
      });
  
      $(".board_slides .nav .btn_left").unbind('click').bind("click", function () {
          var actionIdx = $('.indicator button.on').parent().index() - 1;
          $slides.animate({ left: actionIdx * wrapW * -1 }, 500);
          $slide_item.eq(actionIdx).show();
          $(".board_slides .indicator button").removeClass("on");
          $('.board_slides .indicator button').eq(actionIdx).addClass("on");
          currIdx = actionIdx;
          nav();
      });
  
      $(".board_slides .nav .btn_right").unbind('click').bind("click", function () {
          var actionIdx = $('.indicator button.on').parent().index() + 1;
          $slides.animate({ left: actionIdx * wrapW * -1 }, 500);
          $slide_item.eq(actionIdx).show();
          $(".board_slides .indicator button").removeClass("on");
          $('.board_slides .indicator button').eq(actionIdx).addClass("on");
          currIdx = actionIdx;
          nav();
      });
  }

// 2023-03-23 추가 - 이미지 원본보기 새창  imgOpen('이미지경로','새창타이틀')
var imgOpen = (imgsrc, pageName) => {
    var imgObj = new Image();
    if(imgsrc == "") {
        alert('등록된 이미지가 없습니다.');
        return;
    }
    imgObj.src = imgsrc;
    setTimeout(() => {imgShow(imgObj, pageName)}, 100);
}
var imgShow = (imgObj, pageName) => {
    if(!imgObj.complete) {
        setTimeout(() => {imgShow(imgObj, pageName)}, 100);
        return;
    }
    var w_screen = screen.width;
    var h_screen = screen.height;
    var w_size = imgObj.width;
    var h_size = imgObj.height;

    if(w_size > w_screen) w_size = w_screen;
    if(h_size > h_screen) h_size = h_screen;

    var imageWin = window.open("", "win_declaration", "width=" + w_size + "px, height=" + h_size + "px"); 
    imageWin.document.write("<html><body style='margin:0'>"); 
    imageWin.document.write("<a href=javascript:window.close()><img src='" + imgObj.src + "' border='0' style='width:100%;'></a>"); 
    imageWin.document.write("</body><html>");
    imageWin.document.title = pageName;
}