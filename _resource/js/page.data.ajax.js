var gPageNum = 1;

function moreLoadAjax(){
	var pageUrl = '';
	if( document.location.pathname.length > 0) {
		pageUrl = document.location.pathname.replace('.do','_ajax.do');
	} else {
		return;
	}
	gPageNum++;
	
	 jQuery.ajax({
                      type: "POST",
                      url: pageUrl,
                      data: {
                        'pageNum':gPageNum
                      },
                      dataType: 'json',
                      timeout: 600000,
	                  error: function (request, error) {
	                    console.log(error + '');
	                  },
	                  success: function(output){
	                	console.log(output);
						var html = '';
						$.each(output.list, function(k,v){
							
							if(output.type == 'news') { //보도자료
								var search_param1 = '';
								if(v['search_param1']){
									search_param1 = '&search_param1=' + v['search_param1'];
								}
								html+= '<li>';
								html+= '<a href="view.do?seq='+v['seq']+'&pageNum='+v['pageNum']+search_param1+'">';
								html+= '<div class="thumb">';
								if(v['attach1'] != ''){
									html+= '<img src="'+v['attach1']+'" alt="이미지" />';
								}
								if(v['attach1'] == '' && v['attach2'] != ''){
									html+= '<img src="'+v['attach1']+'" alt="이미지" />';
								}
								html+= '</div>';
								html+= '<div class="context">';
								html+= '<h5>' + v['title'] + '</h5>'; 
								html+= '<p>' + v['content'].substr(0,100) + '</p>';
								html+= '<p class="date">' + v['created'].substr(0,10).replace(/-/g,'.') + '</p>';
								html+= '</div>';
								html+= '</a>';
								html+= '</li>';
							} else if(output.type == 'notice') { //공지사항
								var index = output.data.totalCount - ( gPageNum-1 ) * output.data.perPage;
								index = index - k;
								html+= '<tr>';
								//html+= '<td>${data.idx - status.index}</td>';
								html+= '<td>'+index+'</td>';
								html+= '<td class="title"><a href="view.do?seq='+v['seq']+'&pageNum='+v['pageNum']+'">'+v['title']+'</a></td>';
								html+= '<td class="date">' + v['created'].substr(0,10).replace(/-/g,'.') + '</td>';
								html+= '</tr>';
							} else if(output.type == 'media') { //미디어
								var search_param1 = '';
								if(v['search_param1']){
									search_param1 = '&search_param1=' + v['search_param1'];
								}
								html+= '<li>';
								html+= '<a href="'+v['media_url']+'" target="_blank">';
								html+= '<div class="thumb">';
								if(v['attach1'] != ''){
									html+= '<img src="'+v['attach1']+'" alt="이미지" />';
								}
								if(v['attach1'] == '' && v['attach2'] != ''){
									html+= '<img src="'+v['attach1']+'" alt="이미지" />';
								}
								html+= '</div>';
								html+= '<div class="context">';
								html+= '<p class="media">'+v['media_mode']+'</p>';
								html+= '<h5>' + v['title'] + '</h5>'; 
								html+= '</div>';
								html+= '</a>';
								html+= '</li>';
							} else if(output.type == 'comp') { //컴플라이언스
								var index = output.data.totalCount - ( gPageNum-1 ) * output.data.perPage;
								index = index - k;
								html+= '<div class="item">';
								html+= "<span class=\"img\" style=\"background-image: url('"+v['attach1']+"');\"></span>";
								html+= '<div class="context">';
								html+= '<p>'+v['title']+'</p>';
								html+= '<div class="sub-text">'+v['content'].replace(/\n/g, "<br />")+'</div>';
								html+= '</div>';
								html+= '</div>';
							}
						});
						$('#div_data_lists').append(html);
						if (output.data){
							$('#pageNumber').html(gPageNum * output.data.perPage);
                    		$('#totalCount').html(output.data.totalCount);
                    		     
							if(output.data.perPage * gPageNum >= output.data.totalCount){
								$('.btn_more').hide();
								$('.more').hide();
							} else {
								$('.btn_more').show();
								$('.more').show();
							}
						}
	
					  }
	});

}