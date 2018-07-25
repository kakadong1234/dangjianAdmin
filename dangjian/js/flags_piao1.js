var app = angular.module('myApp', []);
app.controller('myCtrl',
    function($scope, $http) {
        var Request = new UrlSearch(); //实例化
        $scope.username=Request.xingming;
        localStorage.setItem("login_user_name",$scope.username);
        $scope.login_user_name=localStorage.getItem("login_user_name");
        $scope.page=1;
        var map;
        var arry;
        var shifandianmarker=[];
        var zhibumarker=[];
        var zhucunmarker=[];
        var anchor = new qq.maps.Point(10, 10),
            size = new qq.maps.Size(20, 20),
            origin = new qq.maps.Point(0, 0),
            markerIconxing = new qq.maps.MarkerImage("./img/xing.png", size,origin, anchor);
        var anchor1 = new qq.maps.Point(12, 10),
            size1 = new qq.maps.Size(26, 22),
            origin1 = new qq.maps.Point(0, 0),
            markerIconyellow = new qq.maps.MarkerImage("./img/yellow.png", size1,origin1, anchor1);
        markerIconred = new qq.maps.MarkerImage("./img/red.png", size1,origin1, anchor1);

        $scope.load=function () {
            map = new qq.maps.Map(document.getElementById("mapbox"), {
                // 地图的中心地理坐标。
                center: new qq.maps.LatLng(26.58, 104.82),
                zoom: 10,
            });
             // arry=[[26.549837,104.955139],[26.622908,104.981918],[26.637025,104.718246],[26.503145,104.775925],[26.457050,104.813004],[26.517892,104.699707],[26.499458,104.974365],[26.690410,104.797211],[26.461967,104.654388],[26.386949,105.011444],[26.199806,105.498962],[26.175159,104.968872]]

            //党建示范点标记
            $http.get("https://dangjain.ishoubei.com/party?pb_pattern=1&page="+$scope.page)
                .then(function (res) {
                    var list=[];
                    $scope.listsshifandian=res.data.rows;
                    $scope.total=res.data.total;
                    var yeshu=Math.ceil($scope.total/10)
                    for (var i = 0; i < $scope.listsshifandian.length; i++) {
                        list.push([$scope.listsshifandian[i].latitude, $scope.listsshifandian[i].longitude,$scope.listsshifandian[i].pb_id, $scope.listsshifandian[i].pb_name]);
                    }
                    if(yeshu>1){
                        for(var a=2;a<=yeshu;a++){
                            $http.get("https://dangjain.ishoubei.com/party?pb_pattern=1&page="+a)
                                .then(function (resp) {
                                    for (var i = 0; i < resp.data.rows.length; i++) {
                                        list.push([resp.data.rows[i].latitude, resp.data.rows[i].longitude,resp.data.rows[i].pb_id, resp.data.rows[i].pb_name]);
                                    }
                                    shifandianmarker=list;
                                    xianshimarker(shifandianmarker,1)

                                    $scope.deletemarker=function () {
                                        console.log("点我消除")
                                        hidemarker(shifandianmarker,1)
                                    }

                                })
                        }
                    }else {
                        shifandianmarker=list;
                        xianshimarker(shifandianmarker,1)
                        hidemarker(shifandianmarker,1)
                    }
                });

            //党建示范点标记
            $http.get("https://dangjain.ishoubei.com/party?pb_pattern=0&page="+$scope.page)
                .then(function (res) {
                    var list1=[];
                    $scope.listszhibu=res.data.rows;
                    $scope.total=res.data.total;
                    var yeshu=Math.ceil($scope.total/10)
                    for (var i = 0; i < $scope.listszhibu.length; i++) {
                        list1.push([$scope.listszhibu[i].latitude, $scope.listszhibu[i].longitude,$scope.listszhibu[i].pb_id, $scope.listszhibu[i].pb_name]);
                    }
                    if(yeshu>1){
                        for(var a=2;a<=yeshu;a++){
                            $http.get("http://47.100.198.27/party?pb_pattern=0&page="+a)
                                .then(function (resp) {
                                    for (var i = 0; i < resp.data.rows.length; i++) {
                                        list1.push([resp.data.rows[i].latitude, resp.data.rows[i].longitude,resp.data.rows[i].pb_id, resp.data.rows[i].pb_name]);
                                    }
                                    zhibumarker=list1;
                                    xianshimarker(zhibumarker,2)
                                })
                        }
                    }else {
                        zhibumarker=list1;
                        xianshimarker(zhibumarker,2)
                    }
                });


            //驻村干部
            $http.get("https://dangjain.ishoubei.com/cadre?page="+$scope.page)
                .then(function (res) {
                    var list1=[];
                    $scope.listsganbu=res.data.rows;
                    $scope.total=res.data.total;
                    var yeshu=Math.ceil($scope.total/10)
                    console.log(yeshu)
                    for (var i = 0; i < $scope.listsganbu.length; i++) {
                        list1.push([$scope.listsganbu[i].latitude, $scope.listsganbu[i].longitude,$scope.listsganbu[i].user_id, $scope.listsganbu[i].user_name, $scope.listsganbu[i].created]);
                    }
                    if(yeshu>1){
                        for(var a=2;a<=yeshu;a++){
                            $http.get("https://dangjain.ishoubei.com/cadre?page="+a)
                                .then(function (resp) {
                                    for (var i = 0; i < resp.data.rows.length; i++) {
                                        list1.push([resp.data.rows[i].latitude, resp.data.rows[i].longitude,resp.data.rows[i].user_id, resp.data.rows[i].user_name, $scope.lists[i].created]);
                                    }
                                    zhucunmarker=list1;
                                    console.log(zhucunmarker)
                                    xianshimarker(zhucunmarker,3)
                                })
                        }
                    }else {
                        zhucunmarker=list1;
                        console.log(zhucunmarker)
                        xianshimarker(zhucunmarker,3)
                    }
                });




























            xianshimarker(arry,$scope.tubiao)
            //显示标记点方法
            function xianshimarker(arry,numbaaa) {
                if(numbaaa==1){
                    for(var i = 0;i < arry.length; i++) {
                        (function(n){
                            var latLng = new qq.maps.LatLng(arry[i][0], arry[i][1]);
                            var pd_id=arry[i][2]
                            var pd_name=arry[i][3]
                            var marker = new qq.maps.Marker({
                                position: latLng,
                                map: map,
                                zIndex:5,
                            });
                            marker.setIcon(markerIconyellow);
                            var info = new qq.maps.InfoWindow({
                                map: map,
                            });
                            qq.maps.event.addListener(marker, 'click', function() {
                                info.open();
                                info.setContent('<div style="width: 250px;height: 170px">' +
                                    '   <div style="width: 250px;height: 34px;border-bottom: solid 1px #d81e07;line-height: 34px; ">' +
                                    '      <a style="color: #d81e07">'+pd_name+'</a>' +
                                    '  </div>' +
                                    '  <div style="width: 250px;height: 112px;border-bottom: solid 1px #d81e07 ">' +
                                    '      <div style="width: 250px;line-height: 42px">' +
                                    '          <strong>地址：</strong>' +
                                    '          <small>贵州省六盘水市</small>' +
                                    '      </div>' +
                                    '      <div style="width: 250px;line-height: 22px">' +
                                    '          <strong>电话：</strong>' +
                                    '          <small>0000-2313123</small>' +
                                    '      </div>' +
                                    '      <div style="width: 250px;line-height: 40px">' +
                                    '          <strong>简介：</strong>' +
                                    '          <small>贵州省六盘水市45党支部</small>' +
                                    '      </div>' +
                                    '' +
                                    '  </div>' +
                                    '  <div style="text-align: center">' +
                                    '       <a class="btn" style="color: #5e6977" href="tuwenxiangqing.html?pd_id='+pd_id+'&fenlei='+'biubiu1'+'&pb_pattern='+1+'">图文详情</a>' +
                                    '   </div>' +
                                    '</div>');
                                info.setPosition(latLng);
                            });
                        })(i);
                    }
                }
                if(numbaaa==2){
                    for(var i = 0;i < arry.length; i++) {
                        (function(n){
                            var latLng = new qq.maps.LatLng(arry[i][0], arry[i][1]);
                            var pd_id=arry[i][2]
                            var pd_name=arry[i][3]
                            var marker = new qq.maps.Marker({
                                position: latLng,
                                map: map,
                                zIndex:4,
                            });
                            marker.setIcon(markerIconred);
                            var info = new qq.maps.InfoWindow({
                                map: map,
                            });
                            qq.maps.event.addListener(marker, 'click', function() {
                                info.open();
                                info.setContent('<div style="width: 250px;height: 170px">' +
                                    '   <div style="width: 250px;height: 34px;border-bottom: solid 1px #d81e07;line-height: 34px; ">' +
                                    '      <a style="color: #d81e07">'+pd_name+'</a>' +
                                    '  </div>' +
                                    '  <div style="width: 250px;height: 112px;border-bottom: solid 1px #d81e07 ">' +
                                    '      <div style="width: 250px;line-height: 42px">' +
                                    '          <strong>地址：</strong>' +
                                    '          <small>贵州省六盘水市</small>' +
                                    '      </div>' +
                                    '      <div style="width: 250px;line-height: 22px">' +
                                    '          <strong>电话：</strong>' +
                                    '          <small>0000-2313123</small>' +
                                    '      </div>' +
                                    '      <div style="width: 250px;line-height: 40px">' +
                                    '          <strong>简介：</strong>' +
                                    '          <small>贵州省六盘水市45党支部</small>' +
                                    '      </div>' +
                                    '' +
                                    '  </div>' +
                                    '  <div style="text-align: center">' +
                                    '       <a class="btn" style="color: #5e6977" href="tuwenxiangqing.html?pd_id='+pd_id+'&fenlei='+'biubiu1'+'&pb_pattern='+0+'">图文详情</a>' +
                                    '   </div>' +
                                    '</div>');
                                info.setPosition(latLng);
                            });
                        })(i);
                    }
                }
                if(numbaaa==3){
                    for(var i = 0;i < arry.length; i++) {
                        (function(n){
                            var latLng = new qq.maps.LatLng(arry[i][0], arry[i][1]);
                            var weidu=arry[i][0]
                            var jingdu=arry[i][1]
                            var id=arry[i][2]
                            var name=arry[i][3]
                            var created=arry[i][4]
                            var marker = new qq.maps.Marker({
                                position: latLng,
                                map: map,
                                zIndex:6,
                            });
                            marker.setIcon(markerIconxing);
                            var info = new qq.maps.InfoWindow({
                                map: map
                            });
                            qq.maps.event.addListener(marker, 'click', function() {
                                info.open();
                                info.setContent('<div style="width: 250px;height: 160px">\n' +
                                    '   <div style="width: 250px;height: 34px;border-bottom: solid 1px #d81e07;line-height: 34px; ">\n' +
                                    '      <a style="color: #d81e07">'+name+'</a>\n' +
                                    '      <a style="color: #d81e07">10:12</a>\n' +
                                    '  </div>\n' +
                                    '    <div style="width: 250px;height: 92px;border-bottom: solid 1px #d81e07 ">\n' +
                                    '        <div style="width: 40px;height: 92px;float: left;margin-right: 10px">\n' +
                                    '            <img src="img/a4.jpg" style="width: 40px;height: 40px;border-radius: 50%;margin-top: 26px;">\n' +
                                    '        </div>\n' +
                                    '        <div style="width: 170px;height: 92px;border-bottom: solid 1px #d81e07;float: left">\n' +
                                    '            <div style="width: 250px;line-height: 42px">\n' +
                                    '                <strong>签到地址：</strong>\n' +
                                    '                <small>贵州省六盘水市</small>\n' +
                                    '            </div>\n' +
                                    '            <div style="width: 250px;line-height: 22px">\n' +
                                    '                <strong>联系电话：</strong>\n' +
                                    '                <small>0000-2313123</small>\n' +
                                    '            </div>\n' +
                                    '        </div>\n' +
                                    '    </div>\n' +
                                    '  <div style="text-align: center">\n' +
                                    '       <a class="btn" style="color: #5e6977" href="tuwenxiangqing.html?user_id='+id+'&fenlei='+'biubiu3'+'&created='+created+'&weidu='+weidu+'&jingdu='+jingdu+'&name='+name+'">签到详情</a>\n' +
                                    '   </div>\n' +
                                    '</div>');
                                info.setPosition(latLng);
                            });

                        })(i);
                    }
                }
            }



            //移除标记点的方法
            function hidemarker(arry,numbaaa) {
                 console.log("一开始移除")
                 if(numbaaa=1){
                     for(var i = 0;i < arry.length; i++) {
                         (function(n){
                             var latLng = new qq.maps.LatLng(arry[i][0], arry[i][1]);
                             var marker = new qq.maps.Marker({
                                 position: latLng,
                                 map: map,
                                 zIndex:5,
                             });
                            marker.setMap(null)
                         })(i);
                     }

                 }
            }



            //     新增党建支部分布
            $scope.dangjian_add=function () {
                window.location.href="shifandian_add.html"
            }
            //新增驻村干部
            $scope.cunganbu_add=function () {
                window.location.href="zhucunganbu_add.html"
            }
        }


























































        function UrlSearch() {
            var name, value;
            var str = location.href; //取得整个地址栏
            console.log("地址="+str);
            var num = str.indexOf("?");
            str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

            var arr = str.split("&"); //各个参数放到数组里
            console.log("各个参数放到数组里="+arr);
            for (var i = 0; i < arr.length; i++) {
                num = arr[i].indexOf("=");
                if (num > 0) {
                    name = arr[i].substring(0, num);
                    value = arr[i].substr(num + 1);
                    this[name] = value;
                }
            }
        }
    });