/**
 * Created by sujini on 2017-05-25.
 */
var Validate = (function(){
    var isEn = location.href.indexOf('/en/')!=-1;
    function isEmail() {
        var strEmail;
        var strMessage = (arguments[2]) ? arguments[2] : (isEn? "Please check your E-mail address." :  "이메일이 부정확합니다.");


        if (!arguments[0]) {
            if(isEn){
                alert("Write Your E-mall.");
            }else {
                alert("이메일을 입력하세요");
            }
            return false;

        } else if (arguments[0] && !arguments[1]) {
            strEmail = arguments[0];

        } else {
            strEmail = arguments[0] + "@" + arguments[1];

        }
        var re = /^[0-9a-zA-Z-_\.]*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if (re.test(strEmail)) {
            if (strEmail.length > 100) {
                if(isEn) { alert("Email: Must be less than 100 characters.");
                }else{alert("email을 100자 이내로 입력 하세요.");}
                return false;
            }
            return true;

        } else {
            alert(strMessage);

            return false;
        }
    }


    /* 숫자만 입력 */
    function onlyNumber() {
        var oElement = (arguments[0] != null) ? arguments[0] : this;
        var charChk;
        var length = oElement.value.length;
        var maxLength = arguments[1];

        for(var i=0; i<length; i++){
            charChk = oElement.value.charCodeAt(i);

            if(charChk > 57 || charChk < 48){
                if(isEn) { alert("Please enter the number without spaces.");
                }else { alert("공백없이 숫자로만 입력해주세요.");}
                oElement.value = oElement.value.substring(0, i);
                oElement.focus();
                return;
            }
        }


        if( length > maxLength ) {
            if(isEn) { alert( maxLength + " character limit." );
            }else {alert( maxLength + "자 안에서 입력해 주세요." );}
            oElement.value =  oElement.value.substr( 0, maxLength-1 );
            oElement.focus();
            return;

        }
    }
    /* max글자 체크 */
    function checkLength(){
        var oElement = (arguments[0] != null) ? arguments[0] : this;

        var length = oElement.value.length;
        var maxLength = arguments[1];

        if( length > maxLength ) {
            if(isEn) { alert( maxLength + " character limit." );
            }else {alert( maxLength + "글자 안에서 입력해 주세요." );}
            oElement.value =  oElement.value.substr( 0, maxLength-2 );
        }
    }

    $('input').on('keyup', function(e){
        var targetName = this.name
        if(targetName.indexOf('email') > -1){
            this.value=this.value.replace(/[^0-9a-zA-Z.;-_]/g,'');
        }
        if(targetName.indexOf('phone') > -1){
            this.value=this.value.replace(/[^0-9]/g,'');
        }
        if(targetName.indexOf('birth') > -1){
            this.value=this.value.replace(/[^0-9]/g,'');
        }
    });
    $('input').on('focusout', function(e){
        var targetName = this.name
        if(targetName.indexOf('email') > -1){
            this.value=this.value.replace(/[^0-9a-zA-Z.;-_]/g,'');
        }
        if(targetName.indexOf('phone') > -1){
            this.value=this.value.replace(/[^0-9]/g,'');
        }
        if(targetName.indexOf('birth') > -1){
            this.value=this.value.replace(/[^0-9]/g,'');
        }
    });
    return {
        isEmail : isEmail,
        onlyNumber : onlyNumber,
        checkLength : checkLength
    }
})();

