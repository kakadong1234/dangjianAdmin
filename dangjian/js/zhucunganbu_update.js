var app = angular.module('myApp', []);
app.controller('myCtrl',
    function($scope, $http) {
        var Request = new UrlSearch(); //实例化
        $scope.username=Request.xingming;
        localStorage.setItem("login_user_name",$scope.username);
        $scope.login_user_name=localStorage.getItem("login_user_name");
        $scope.user_id=decodeURI(Request.user_id);
        $scope.mingchen=decodeURI(Request.user_name);
        $scope.jingdu=decodeURI(Request.jingdu);
        $scope.weidu=decodeURI(Request.weidu);
        console.log($scope.user_id)
        console.log($scope.mingchen)
        console.log($scope.jingdu)
        console.log($scope.weidu)
        $scope.load=function(){

                $scope.tijiao=function () {
                    console.log("修改")
                    console.log($scope.user_id)
                    console.log($scope.mingchen)
                    console.log($scope.jingdu)
                    console.log($scope.weidu)
                    $http({
                        method:'post',
                        url:'https://dangjain.ishoubei.com/cadre',
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



        }


        $scope.quxiao=function () {
            console.log("取消")
            window.history.back(-1);
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