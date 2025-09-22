var inquiry = (function(){

    var curIdx  = 0;// 선택된 대분류
	var idx2	= 0;	// 선택된 소분류

	var $email		= $("input[name=email_id], select[name=email_domain_select], input[name=email_domain]");

    var notRunning= true,isSubmit=false;



    function setInquiryEvent(){

        $('.btn_inquiry >a').click(function(){
            $('.inquiry_area').addClass('active');
            $('body').css('overflow','hidden');
            EventDispatcher.is(Events.STOPMAINTOP);
        });
        $('.btn_inquiry_close').click(function(){

            if($('.inquiry_area .inquiry_content .q_box.active').hasClass('complete')){
                setInquiryContent(0);
                $('.inquiry_area').removeClass('active');
                $('body').css('overflow','auto');
                EventDispatcher.is(Events.STARTMAINTOP);
            }else{
                $('#pop_alert').attr('data-idx','close').show();
            }


        });
        $('.inquiry_area .bg').click(function(e){
            e.preventDefault();
            $('.btn_inquiry_close').click();
        });


        $(document).on('click','.inquiry_area .q_box.done .btn_qbox',function(e){
            if(isSubmit)return;
            var idx = $(this).parent().index();
            setQboxContent(idx);
        });



        $('#pop_alert .btn_confirm').on('click',function(){

            setInquiryContent(0);
            $('.inquiry_area').removeClass('active');
            $('body').css('overflow','auto');
            EventDispatcher.is(Events.STARTMAINTOP);

            $('#pop_alert').hide();
        });
        $('#pop_alert .btn_cancel').on('click',function(){
            $('#pop_alert').hide();
        });



        /* 이메일 직접입력 */
        $('select[name="email_domain_select"]').change(function(e){
            e.preventDefault();
            var $selfBox = $(this).parent().find('input[name="email_domain"]');
            if($(this).val() == 'SELF'){
                $selfBox.val('');
                $selfBox.css('display','block');
            }else{
                $selfBox.val($(this).val());
                $selfBox.css('display','none');
            }
            return false;
        });
        /* 파일 업로드 */
        $('.file_area .input_hidden').change(function(e){
            e.preventDefault();
            var fileName = '';
            if( this.files && this.files.length > 1 ){
                fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
            }else{
                fileName = e.target.value.split( '\\' ).pop();
            }

            if( fileName ){
                var fileExtension = ['pdf', 'pptx', 'doc', 'hwp', 'jpg', 'png'];
                if ($.inArray(fileName.split('.').pop().toLowerCase(), fileExtension) == -1) {
                    alert('The file can only be pdf, pptx, doc, jpg, png format of 2MB or less.');
                    $('.btn_file_remove').trigger('click');
                }else{
                    try{
                        if(this.files[0].size > 2000000){
                            alert('The file can only be format of 2MB or less.');
                            $('.btn_file_remove').trigger('click');
                            return;
                        }
                    }catch (e){
                    }
                    $(this).parents('.file_area').addClass('on');
                    $(this).parents('.file_area').find('.file_val').val(fileName);
                }
            }

            return false;
        });
        $('.btn_file_remove').on('click', function(e){
            e.preventDefault();
            $(this).parents('.file_area').removeClass('on');
            $(this).parents('.file_area').find('.file_val').val('');
            $(this).parents('.file_area').find('.file_val').html('');
            $(this).parents('.file_area').find('input[type="file"]').val('');
        });

        /* 20190403 division click event add (KNH) */
        $('input[name=big_catg]:radio').on('click', function(e) {
        	var division = $(this).attr('id');
        	$('.country .user_input').hide();
        	$('.country .user_input').find('input[name=nation]').val('');								// Country init
        	$('.country .user_input').find('input[name=country]').prop('checked', false);		// Country choice init
        	$('.country').find('[data-big-catg=' + division + ']').show();
        });
        
        /* Country choice value setting */
        $('.btn_next').filter('.submit').on('click', function(e) {
        	if ($('input[name="big_catg"]:checked').attr('id') == 'big_catg_food_service' ) {
        		$('input[name=nation]').val($('input[name=country]:checked').val());	
        	}
        });

        $(window).resize(function(){

            setActiveInquiry(0);
        });
        $(window).resize();
    }


    function checkValidate(_idx2,_callback){
        var $qbox = $('.inquiry_area .inquiry_content0 .q_box'+_idx2);
        var curEmail = [$qbox.find('input[name="email_id"]').val(),$qbox.find('select[name="email_domain_select"]').val(),$qbox.find('input[name="email_domain"]').val()];
        var curEmailId = curEmail[0], curEmailDomain = ( curEmail[1] != "SELF" ? curEmail[1] : curEmail[2] );


        switch(_idx2){
            case 0:

                if(curEmailId+curEmailDomain!='' && !Validate.isEmail(curEmailId, curEmailDomain)) {
                    return false;
                }
                
                if ($qbox.find('input[name="big_catg"]:checked').length == 0) {
                	alert('Please select division.');
                	return false;
                } else if ($qbox.find('input[name="big_catg"]:checked').attr('id') == 'big_catg_food_distribution' && $.trim($qbox.find('input[name="nation"]').val()) == '') {
                	alert('Write your Country.');return false;
                } else if($qbox.find('input[name="big_catg"]:checked').attr('id') == 'big_catg_food_service' && $qbox.find('input[name="country"]:checked').length == 0){
                    alert('Please select your Country.');return false;
                }else if($.trim($qbox.find('input[name="user_name"]').val())==''){
                    alert('Write your Name.');return false;
                }else if(curEmailId+curEmailDomain=='') {
                    alert('Write your Email.');return false;
                }else if($qbox.find('input[name="user_phone"]').val()=='') {
                    alert('Write your contact number.');return false;
                }else if($qbox.find('input[name="user_phone"]').val().length<9) {
                    alert('Please check your contact number.');return false;
                }else if($.trim($qbox.find('input[name="title"]').val())=='') {
                    alert('Write your Subject.');return false;
                }else if($.trim($qbox.find('textarea[name="content"]').val())=='') {
                    alert('Write your Comment.');return false;
                }else{
                    $('.inquiry_area .btn_area').addClass('submit');

                }

                break;

        }
        _callback();

    }
    function setQboxContent(_idx){
        var $curInquiry =$('.inquiry_area .inquiry_content'+curIdx);

        $curInquiry.find('.q_box.active').removeClass('active').addClass('done');
        $curInquiry.find('.q_box'+(_idx)).addClass('active');

        $('.inquiry_title > ul.text_tab'+curIdx+' li.on').removeClass('on');
        $('.inquiry_title > ul.text_tab'+curIdx+' li').eq(_idx).addClass('on');
        setActiveInquiry(0.6);

    }
    function setInquiryContent(_idx){
        curIdx=_idx;
        idx2=0;
        isSubmit=false;
        $('.inquiry_area').attr('data-idx',curIdx);
        $('.inquiry_area .inquiry_ul li a').removeClass('active');
        $('.inquiry_area .inquiry_ul li').eq(curIdx).find('a').addClass('active');
        $('.inquiry_area .inquiry_content'+curIdx+' .q_box').removeClass('active done');
        $('.inquiry_area .inquiry_content'+curIdx+' .q_box0').addClass('active');
        $('.inquiry_title > ul.text_tab'+curIdx+' li.on').removeClass('on');
        $('.inquiry_title > ul.text_tab'+curIdx+' li').eq(0).addClass('on');
        $('.inquiry_area .inquiry_content'+curIdx+' .file_area').removeClass('on');
        $('.inquiry_area .inquiry_content'+curIdx+' .file_area').find('.file_val').val('');
        $('.inquiry_area .inquiry_content'+curIdx+' .file_area').find('.file_val').html('');
        $('.inquiry_area .inquiry_content'+curIdx+' .file_area').find('input[type="file"]').val('');
        inputReset();
        setActiveInquiry(0);

    }

    function inputReset(){
        $('.inquiry_area .inquiry_content'+curIdx+' input').val('');
        $('.inquiry_area .inquiry_content'+curIdx+' textarea').val('');
        $('.inquiry_area .inquiry_content'+curIdx+' select').prop('selectedIndex',0);
        $('.inquiry_area .inquiry_content'+curIdx+' input[type=checkbox]').prop('checked',false);

    }
    function setActiveInquiry(_time){
        var $active = $('.inquiry_area .inquiry_content'+curIdx);
        var idx = $active.find('.q_box.active').index();
        var val=0;
        for(var j=0;j< idx;j++){
            val +=$active.find('.q_box').eq(j).innerHeight()+80;
        }
        var sub =  ($active.innerHeight()-$active.find('.q_box'+(idx)).innerHeight())/2-80;
        sub=sub<0?0:sub;	
        TweenMax.to($active.find('.q_content_inner'),_time,{top:-val+sub,ease:Cubic.easeOut});
    }
    function completeInquiry(){
        var $curInquiry = $('.inquiry_area .inquiry_content'+curIdx);
        var idx = $curInquiry.find('.q_box.active').index();
        setQboxContent(idx+1);
        isSubmit=true;
    }


    return {
		init : function(){
            setInquiryEvent();

			// 이메일
			$email.on('blur', function() {
				var $now = $(this).parents("form").find("input[name=email_id], select[name=email_domain_select], input[name=email_domain]");
				var mail = [
					$now.eq(0).val(),
					$now.eq(1).val(),
					$now.eq(2).val()
				];
				var val = mail[0] + "@" + ( mail[1] != "SELF" ? mail[1] : mail[2] );
				$("input[name=user_mail]").val(val);
			});


            $('.inquiry_area .inquiry_content .btn_next').on('click',function(){
                var $self = $(this);
                var $curInquiry = $self.parents('.inquiry_content');

                var idx = $curInquiry.find('.q_box.active').index();

                checkValidate(idx,function(){
                    if($self.hasClass('submit')){
                        if( notRunning ) {
                            notRunning = false;
                            $self.parents("form").submit();
                            // inquiry.completeInquiry();
                            setTimeout(function () {
                                notRunning = true;
                            }, 2000);
                        }else {
                            alert( "Processing." );
                        }
                    }else{
                        setQboxContent(idx+1);
                    }

                });

            });


		},
        completeInquiry:completeInquiry
	}
})();

inquiry.init();