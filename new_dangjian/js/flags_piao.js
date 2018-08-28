var app = angular.module('myApp', []);
app.controller('myCtrl',
    function($scope, $http) {
        var Request = new UrlSearch(); //实例化
        var map;
        var yellowmarkers=[];
        var redmarkers=[];
        var xingmarkers=[];
        $scope.newduoduo=[
            {
                title:'',
                article_id:''
            }
        ]
        $scope.markerArry=[];
        $scope.num_one=true;
        $scope.num_two=true;
        $scope.num_three=true;
        $scope.page=1;
        $scope.load=function () {

            map = new AMap.Map('mapbox', {
                resizeEnable: true,
                zoom:10,
                center: [ 104.82, 26.58]
            });

            newsget(100)
            tashanzhiyuget()
            bannerget()



            //党建示范点标记
            $http.get("http://api.lpszzb.gov.cn/party?pb_pattern=1&platform=app&page="+$scope.page + "&limit=100000")
                .then(function (res) {
                    var beizhu=[];
                    var list=[]
                    $scope.listsshifandian=res.data.rows;
                    $scope.total=res.data.total;
                    var yeshu=Math.ceil($scope.total/10)
                    //因为后台列表接口是分页接口, 但是要把所有数据都拿出来
                    for (var i = 0; i < $scope.listsshifandian.length; i++) {
                        list.push([$scope.listsshifandian[i].longitude, $scope.listsshifandian[i].latitude]);
                        beizhu.push([
                            $scope.listsshifandian[i].pb_name, 
                            $scope.listsshifandian[i].pb_pattern, 
                            $scope.listsshifandian[i].pb_address, 
                            $scope.listsshifandian[i].pb_desc,
                            $scope.listsshifandian[i].pb_id,
                            $scope.listsshifandian[i].pb_phone,
                            $scope.listsshifandian[i].pb_master,
                            $scope.listsshifandian[i].pb_details,
                            ])
                    }
                    if(yeshu>1){
                        for(var a=2;a<=yeshu;a++){
                            $http.get("http://api.lpszzb.gov.cn/party?pb_pattern=1&platform=app&page="+a + "&limit=100000")
                                .then(function (resp) {
                                    for (var i = 0; i < resp.data.rows.length; i++) {
                                        list.push([resp.data.rows[i].longitude, resp.data.rows[i].latitude]);
                                        beizhu.push([
                                            resp.data.rows[i].pb_name, 
                                            resp.data.rows[i].pb_pattern, 
                                            resp.data.rows[i].pb_address, 
                                            resp.data.rows[i].pb_desc, 
                                            resp.data.rows[i].pb_id,
                                            resp.data.rows[i].pb_phone,
                                            resp.data.rows[i].pb_master,
                                            resp.data.rows[i].pb_details,
                                        ])
                                    }
                                    addMarker(list,beizhu,1)
                                    //控制标记点显示与隐藏
                                    $scope.onClickone=function () {

                                        if($scope.num_one==true){
                                            addMarker(list,beizhu,1)
                                        }else {
                                            map.remove(yellowmarkers);
                                        }
                                    }
                                })
                        }
                    }else {
                        addMarker(list,beizhu,1)
                        //控制标记点显示与隐藏
                        $scope.onClickone=function () {

                            if($scope.num_one==true){
                                addMarker(list,beizhu,1)
                            }else {
                                map.remove(yellowmarkers);
                            }
                        }
                    }
                });


            //党支部分布
            $http.get("http://api.lpszzb.gov.cn/party?pb_pattern=0&platform=app&page="+$scope.page + "&limit=100000")
                .then(function (res) {
                    var beizhu=[];
                    var list=[]
                    $scope.listsshifandian=res.data.rows;
                    $scope.total=res.data.total;
                    var yeshu=Math.ceil($scope.total/10)

                    for (var i = 0; i < $scope.listsshifandian.length; i++) {
                        list.push([
                            $scope.listsshifandian[i].longitude, 
                            $scope.listsshifandian[i].latitude,
                            $scope.listsshifandian[i].pb_name, 
                            $scope.listsshifandian[i].pb_pattern, 
                            $scope.listsshifandian[i].pb_address, 
                            $scope.listsshifandian[i].pb_desc, 
                            $scope.listsshifandian[i].pb_id,
                            $scope.listsshifandian[i].pb_phone,
                            $scope.listsshifandian[i].pb_master,
                            $scope.listsshifandian[i].pb_details,
                        ]);
                        // beizhu.push([$scope.listsshifandian[i].pb_name, $scope.listsshifandian[i].pb_pattern, $scope.listsshifandian[i].pb_address, $scope.listsshifandian[i].pb_desc, $scope.listsshifandian[i].pb_id])
                    }
                    if(yeshu>1){
                        for(var a=2;a<=yeshu;a++){
                            $http.get("http://api.lpszzb.gov.cn/party?pb_pattern=0&platform=app&page="+a + "&limit=100000")
                                .then(function (resp) {
                                    for (var i = 0; i < resp.data.rows.length; i++) {
                                        list.push([
                                            resp.data.rows[i].longitude, 
                                            resp.data.rows[i].latitude, 
                                            resp.data.rows[i].pb_name, 
                                            resp.data.rows[i].pb_pattern, 
                                            resp.data.rows[i].pb_address, 
                                            resp.data.rows[i].pb_desc, 
                                            resp.data.rows[i].pb_id,
                                            resp.data.rows[i].pb_phone,
                                            $scope.listsshifandian[i].pb_master,
                                            $scope.listsshifandian[i].pb_details,
                                        ]);
                                        // beizhu.push([resp.data.rows[i].pb_name, resp.data.rows[i].pb_pattern, resp.data.rows[i].pb_address, resp.data.rows[i].pb_desc, resp.data.rows[i].pb_id])
                                    }
                                    addMarker(list,beizhu,2)
                                    //控制标记点显示与隐藏
                                    $scope.onClicktwo=function () {
                                        if($scope.num_two==true){
                                            addMarker(list,beizhu,2)
                                        }else {
                                            map.remove(redmarkers);
                                        }
                                    }
                                })
                        }
                    }else {
                        addMarker(list,beizhu,2)
                        //控制标记点显示与隐藏
                        $scope.onClicktwo=function () {
                            if($scope.num_two==true){
                                addMarker(list,beizhu,2)
                            }else {
                                map.remove(redmarkers);
                            }
                        }
                    }
                });


            //驻村干部
            $http.get("http://api.lpszzb.gov.cn/cadre?page="+$scope.page + "&platform=app&limit=100000" )
                .then(function (res) {
                    var beizhu=[];
                    var list=[]
                    $scope.listsshifandian=res.data.rows;
                    $scope.total=res.data.total;
                    var yeshu=Math.ceil($scope.total/10)
                    for (var i = 0; i < $scope.listsshifandian.length; i++) {
                        list.push([$scope.listsshifandian[i].longitude, $scope.listsshifandian[i].latitude]);
                        beizhu.push([$scope.listsshifandian[i].user_name, $scope.listsshifandian[i].user_id, $scope.listsshifandian[i].pb_desc,$scope.listsshifandian[i].address,])
                    }
                    if(yeshu>1){
                        for(var a=2;a<=yeshu;a++){
                            $http.get("http://api.lpszzb.gov.cn/cadre?page="+a + "&platform=app&limit=100000")
                                .then(function (resp) {
                                    for (var i = 0; i < resp.data.rows.length; i++) {
                                        list.push([resp.data.rows[i].longitude, resp.data.rows[i].latitude]);
                                        beizhu.push([resp.data.rows[i].user_name, resp.data.rows[i].user_id, resp.data.rows[i].pb_desc, resp.data.rows[i].address])
                                    }
                                    addMarker(list,beizhu,3)
                                    //控制标记点显示与隐藏
                                    $scope.onClickthree=function () {
                                        if($scope.num_three==true){
                                            addMarker(list,beizhu,3)
                                        }else {
                                            map.remove(xingmarkers);
                                        }
                                    }
                                })
                        }
                    }else {
                        addMarker(list,beizhu,3)
                        //控制标记点显示与隐藏
                        $scope.onClickthree=function () {
                            if($scope.num_three==true){
                                addMarker(list,beizhu,3)
                            }else {
                                map.remove(xingmarkers);
                            }
                        }
                    }
                });







            // var arry=[[104.955139,26.549837],[104.981918,26.622908],[104.718246,26.637025],[104.775925,26.503145],[104.813004,26.457050]]


            //定义图标显示
            var iconXing = new AMap.Icon({
                image : './img/xing.png',
                size : new AMap.Size(16,16)
            });
            var iconred = new AMap.Icon({
                image : './img/red.png',
                size : new AMap.Size(26,22)
            });
            var iconyellow = new AMap.Icon({
                image : './img/yellow.png',
                size : new AMap.Size(52,44)
            });



            //实例化标记
            function addMarker(arry,beizhu,a) {
                if(a==1){
                    for (var i = 0, marker; i < arry.length; i++) {
                     var   marker = new AMap.Marker({
                            map: map,
                            position: arry[i],
                            icon:iconyellow,
                            zIndex:5
                        });
                        yellowmarkers.push(marker);

                        marker.name=beizhu[i][0]
                        marker.shifoushifandian=beizhu[i][1]
                        marker.dizhi=beizhu[i][2]
                        marker.jianjie=beizhu[i][3]
                        marker.id=beizhu[i][4]
                        marker.haoma=""
                        marker.phone = beizhu[i][5] === '' ? '010-86586743': beizhu[i][5]

                        //鼠标点击marker弹出自定义的信息窗体
                        AMap.event.addListener(marker, 'click', function(e) {
                            //实例化信息窗体
                            var title = ''+this.name+'',
                                content = [];
                            content.push('地址：'+this.dizhi+'');
                            content.push('电话：'+ this.phone +'');
                            // content.push('简介：'+this.jianjie+'');
                            content.push("<a  href='tuwenxiangqing.html?pd_id="+this.id+"&fenlei="+"biubiu1"+"&pb_pattern="+this.shifoushifandian+"'>图文详情</a>");
                            var infoWindow2 = new AMap.InfoWindow({
                                isCustom: true,  //使用自定义窗体
                                content: createInfoWindow(title, content.join("<br/>")),
                                offset: new AMap.Pixel(26, -30)
                            });
                            infoWindow2.open(map, e.target.getPosition());
                        });
                    }
                }else if(a==2){
                    for (var i = 0, marker; i < arry.length; i++) {
                       var  marker = new AMap.Marker({
                            map: map,
                            position: arry[i],
                            icon:iconred,
                            zIndex:4
                        });
                        redmarkers.push(marker);
                        marker.name=arry[i][2]
                        marker.dizhi=arry[i][4]
                        marker.jianjie=arry[i][5]
                        marker.shifoushifandian=arry[i][3]
                        marker.id=arry[i][6]
                        marker.phone = arry[i][7] === '' ? '010-86586743': arry[i][7]

                        //鼠标点击marker弹出自定义的信息窗体
                        AMap.event.addListener(marker, 'click', function(e) {
                            //实例化信息窗体
                            var title = ''+this.name+'',
                                content = [];
                            content.push('地址：'+ this.dizhi +'');
                            content.push('电话：'+ this.phone +'');
                            // content.push('简介：'+this.jianjie+'');
                            content.push("<a  href='tuwenxiangqing.html?pd_id="+this.id+"&fenlei="+"biubiu2"+"&pb_pattern="+this.shifoushifandian+"'>图文详情</a>");
                            var infoWindow2 = new AMap.InfoWindow({
                                isCustom: true,  //使用自定义窗体
                                content: createInfoWindow(title, content.join("<br/>")),
                                offset: new AMap.Pixel(16, -45)
                            });
                            infoWindow2.open(map, e.target.getPosition());
                        });
                    }
                }else if(a==3){
                    for (var i = 0, marker; i < arry.length; i++) {
                     var   marker = new AMap.Marker({
                            map: map,
                            position: arry[i],
                            icon:iconXing,
                            zIndex:4
                        });
                        xingmarkers.push(marker);
                        marker.name=beizhu[i][0]
                        marker.id=beizhu[i][1]
                        marker.jianjie=beizhu[i][2]
                        marker.dizhi=beizhu[i][3]
                        marker.jingdu=arry[i][0]
                        marker.weidu=arry[i][1]
                        // marker.dizhi="六盘水市区"

                        //鼠标点击marker弹出自定义的信息窗体
                        AMap.event.addListener(marker, 'click', function(e) {
                            //实例化信息窗体
                            var title = ''+this.name+'',
                                content = [];
                            content.push('<img src="./img/a4.jpg">地址：'+this.dizhi+'');
                            content.push('个人简介：'+ this.jianjie +'');
                            content.push("<a  href='flags_jianjie.html?user_id="+this.id+"&fenlei="+"biubiu3"+"&created="+this.created+"&weidu="+this.weidu+"&jingdu="+this.jingdu+"'>个人详情</a>");
                            var infoWindow2 = new AMap.InfoWindow({
                                isCustom: true,  //使用自定义窗体
                                content: createInfoWindow(title, content.join("<br/>")),
                                offset: new AMap.Pixel(16, -45)
                            });
                            infoWindow2.open(map, e.target.getPosition());
                        });
                    }

                }

            }

            //构建自定义信息窗体
            function createInfoWindow(title, content) {
                var info = document.createElement("div");
                info.className = "info";

                //可以通过下面的方式修改自定义窗体的宽高
                //info.style.width = "400px";
                // 定义顶部标题
                var top = document.createElement("div");
                var titleD = document.createElement("div");
                var closeX = document.createElement("img");
                top.className = "info-top";
                titleD.innerHTML = title;
                closeX.src = "http://webapi.amap.com/images/close2.gif";
                closeX.onclick = closeInfoWindow;

                top.appendChild(titleD);
                top.appendChild(closeX);
                info.appendChild(top);

                // 定义中部内容
                var middle = document.createElement("div");
                middle.className = "info-middle";
                middle.style.backgroundColor = 'white';
                middle.innerHTML = content;
                info.appendChild(middle);

                // 定义底部内容
                var bottom = document.createElement("div");
                bottom.className = "info-bottom";
                bottom.style.position = 'relative';
                bottom.style.top = '0px';
                bottom.style.margin = '0 auto';
                var sharp = document.createElement("img");
                sharp.src = "http://webapi.amap.com/images/sharp.png";
                bottom.appendChild(sharp);
                info.appendChild(bottom);
                return info;
            }

            //关闭信息窗体
            function closeInfoWindow() {
                map.clearInfoWindow();
            }










            //     新增党建支部分布
       $scope.dangjian_add=function () {
           window.location.href="shifandian_add.html"
       }
       //新增驻村干部
            $scope.cunganbu_add=function () {
                window.location.href="zhucunganbu_add.html"
            }


            //新闻动态
            function newsget() {
                var tashanzhiyu=[]
                var bannerlist=[]
                var dongtailist=[]
                $http.get("http://api.lpszzb.gov.cn/article?status=5&type_id=41")
                    .then(function (res) {
                       $scope.showlists=res.data.rows
                       for (var i=0;i<$scope.showlists.length;i++){
                           // if($scope.showlists[i].banner==1){
                           //     bannerlist.push([
                           //         $scope.showlists[i].article_id, $scope.showlists[i].title
                           //     ])
                           //     $scope.bannerlist=bannerlist
                           //     console.log($scope.bannerlist)
                           // }

                           // if($scope.showlists[i].recommend==1){
                           //     tashanzhiyu.push([
                           //         $scope.showlists[i].article_id, $scope.showlists[i].title
                           //     ])
                           //     $scope.tashanzhiyu=tashanzhiyu
                           //     console.log($scope.tashanzhiyu)
                           // }

                           for (var m=0;m<$scope.showlists[i].type_ids.length;m++){
                               if($scope.showlists[i].type_ids[m].type_name=="党建新闻"){
                                   dongtailist.push([
                                       $scope.showlists[i].article_id, $scope.showlists[i].title
                                   ])
                                   $scope.dongtailist=dongtailist
                               }
                           }

                       }
                    });
            }


            //banner
            function bannerget() {
                $http.get("http://api.lpszzb.gov.cn/article?status=5&type_id=45")
                    .then(function (res) {
                        $scope.bannerlist=res.data.rows
                    });
            }

            //他山之石
            function tashanzhiyuget() {
                $http.get("http://api.lpszzb.gov.cn/article?status=5&type_id=44")
                    .then(function (res) {
                        $scope.tashanzhiyu=res.data.rows
                    });
            }


            $scope.onClick= function (article_id,a) {
                window.location.href="article_detail.html?article_id="+article_id+"&type_id="+a;
            }
        }












        function UrlSearch() {
            var name, value;
            var str = location.href; //取得整个地址栏
            var num = str.indexOf("?");
            str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

            var arr = str.split("&"); //各个参数放到数组里
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