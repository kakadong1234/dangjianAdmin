var app = angular.module('myApp', []);
app.controller('myCtrl',
    function($scope, $http) {
        var Request = new UrlSearch(); //实例化
        $scope.username=Request.xingming;
        localStorage.setItem("login_user_name",$scope.username);
        $scope.login_user_name=localStorage.getItem("login_user_name");
        $scope.user_id=Request.user_id
        console.log($scope.user_id)
        var map
        $scope.load=function(){
            map = new AMap.Map('mapbox', {
                resizeEnable: true,
                zoom:16,
                // center: [104.913155,25.102287]
            });
            var iconXing = new AMap.Icon({
                image : './img/xing.png',
                size : new AMap.Size(20,20)
            });
            // var marker = new AMap.Marker({
            //     position: new AMap.LngLat(104.913155,25.102287),
            //     title: '我在这',
            //     icon: iconXing
            // });
            // map.add(marker);


            $http.get("https://dangjain.ishoubei.com/dding/user/checkin?user_id="+$scope.user_id)
                .then(function (res) {

                });
        }




        $scope.onClick = function (article_id) {
            console.log("djaini ")
            window.location.href="article_list1.html?article_id="+article_id;
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