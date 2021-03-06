var app = angular.module('myApp', []);
app.controller('myCtrl',
    function($scope, $http) {
        var Request = new UrlSearch(); //实例化
        $scope.username=Request.xingming;
        localStorage.setItem("login_user_name",$scope.username);
        $scope.login_user_name=localStorage.getItem("login_user_name");
        $scope.page=1;
        $scope.status=2;
        $scope.load=function(){
            getshuju($scope.page);
            $scope.downOnClick = function () {
                if($scope.page<$scope.pagesLists){
                    $scope.page = $scope.page+1;
                    getshuju($scope.page);
                }
            }
            $scope.upOnClick = function () {
                if($scope.page>1) {
                    $scope.page = $scope.page - 1;
                    getshuju($scope.page);
                }
            };


            //获取数据api
            function getshuju(pageID) {
                $http.get("https://dangjain.ishoubei.com/news?page="+pageID)
                    .then(function (res) {
                        $scope.lists=res.data.rows;
                        $scope.total=res.data.total;
                        $scope.pagesLists=Math.ceil($scope.total/10);
                    });
            };



            $scope.deletearticle=function (article_id) {
                var id = Number(article_id)
                console.log(id)
                alert("确定删除？")
                $http.post("https://dangjain.ishoubei.com/news/del/"+article_id)
                    .then(function (res) {
                        console.log("已删除")
                        window.location.href="news_manage.html"
                    })

            }
            
            
            $scope.tuijian=function (article_id,recommend) {
                if(recommend==0){

                    $scope.data1 = {
                        recommend: 1,
                    };
                    console.log($scope.data1)
                    var url = "https://dangjain.ishoubei.com/news/"+article_id;
                    var transFn = function (data) { return $.param(data) },
                        postCfg = { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }, transformRequest: transFn };
                    $http.post(url,$scope.data1,postCfg).success(function (res) {
                        console.log(res)
                        window.location.href="news_manage.html"
                    });
                }else if(recommend==1){
                    $scope.data1 = {
                        recommend: 0,
                    };
                    console.log($scope.data1)
                    var url = "https://dangjain.ishoubei.com/news/"+article_id;
                    var transFn = function (data) { return $.param(data) },
                        postCfg = { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }, transformRequest: transFn };
                    $http.post(url,$scope.data1,postCfg).success(function (res) {
                        console.log(res)
                        window.location.href="news_manage.html"
                    });
                }
            }





        }
        $scope.fullName = function(conts) {

            if(conts.length<30){
                var aa =conts
                return aa;
            }else{
                var aa =conts.substring(0,30) + "...";
                return aa;
            }
        };



        $scope.onClick = function (article_id,a) {
            console.log("djaini ")
            window.location.href="article_list1.html?article_id="+article_id+"&type_id="+a;
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