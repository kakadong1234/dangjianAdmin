qq.maps.event.addListener(marker, 'click', function() {
    info.open();
    info.setContent('<div style="text-align:center;white-space:nowrap;'+
        'margin:10px;"><a style="text-decoration: none;color: #d81e07;font-size: 16px;font-weight: bold" href="biaojixiangqing.html?user_id='+id+'&fenlei='+'biubiu3'+'&created='+created+'&weidu='+weidu+'&jingdu='+jingdu+'&name='+name+'">'+name+'</a></div>');
    info.setPosition(latLng);
});