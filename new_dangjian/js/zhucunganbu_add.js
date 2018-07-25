var app = angular.module('myApp', []);
app.controller('myCtrl',
    function($scope, $http) {
        var Request = new UrlSearch(); //实例化
        $scope.user_id=localStorage.getItem("user_id");
        // $scope.user_id="142606654632975259";
        $scope.tijiao=function () {
            console.log("新建")
            console.log($scope.mingchen)
            console.log($scope.jingdu)
            console.log($scope.weidu)
            $http({
                method:'post',
                url:'http://api.lpszzb.gov.cn/cadre',
                data:{
                    user_id:$scope.user_id,
                    longitude:Number($scope.jingdu),
                    latitude:Number($scope.weidu),
                },
                headers:{'Content-Type': 'application/x-www-form-urlencoded'},
            }).success(function(req){
                window.location.href="ganbu_manage.html"
            })

        }
        $scope.quxiao=function () {
            console.log("取消")
            window.location.href="ganbu_manage.html"
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