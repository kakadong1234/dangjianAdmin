var app = angular.module('myApp', []);
app.controller('myCtrl',
    function($scope, $http) {
        var Request = new UrlSearch(); //实例化
        $scope.username=Request.xingming;
        localStorage.setItem("login_user_name",$scope.username);
        $scope.user_id=localStorage.getItem("user_id");
        // $scope.user_id="142606654632975259";
        $scope.meetingtijiao=function () {
            console.log($scope.type_id)
            console.log($scope.title)
            console.log($scope.convoke)
            console.log($scope.address)
            console.log($scope.outline)
            console.log($scope.compere)
            console.log($scope.should_nbr)
            console.log($scope.actual_nbr)
            console.log($scope.urls)


            $scope.data1 = {
                user_id:$scope.user_id,
                title:$scope.title,
                convoke:$scope.convoke,
                address:$scope.address,
                outline:$scope.outline,
                compere:$scope.compere,
                should_nbr:Number($scope.should_nbr),
                actual_nbr:Number($scope.actual_nbr),
                type_id:Number($scope.type_id),
            };

            var url = "https://dangjain.ishoubei.com/report/meeting";
            var transFn = function (data) { return $.param(data) },
                postCfg = { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }, transformRequest: transFn };
            $http.post(url,$scope.data1,postCfg).success(function (obj) {


                    // alert("点评成功");
                    window.location.href ="three_sessions.html";


            });


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