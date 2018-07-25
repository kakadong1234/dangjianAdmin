var app = angular.module('myApp', []);
app.controller('myCtrl',
    function($scope, $http) {
        var Request = new UrlSearch(); //实例化
        $scope.username=Request.xingming;
        localStorage.setItem("login_user_name",$scope.username);
        $scope.login_user_name=localStorage.getItem("login_user_name");
        $scope.id=decodeURI(Request.pb_id)
        $scope.aaa=decodeURI(Request.pb_pattern)
        console.log( $scope.id)
        $scope.load=function(){
            $http.get("http://api.lpszzb.gov.cn/party/"+$scope.id)
                .then(function (res) {
                    $scope.jianjie=res.data.pb_desc
                    $scope.mingchen=res.data.pb_name
                    $scope.jingdu=res.data.longitude
                    $scope.weidu=res.data.latitude
                    $scope.dizhi=res.data.pb_address
                    $scope.pb_id=res.data.pb_id
                });
        }
        $scope.tijiao=function () {
            console.log("修改")

            $http({
                method:'post',
                url:'http://api.lpszzb.gov.cn/party/'+$scope.id,
                data:{
                    pb_name:$scope.mingchen,
                    pb_address:$scope.dizhi,
                    pb_desc:$scope.jianjie,
                    pb_pattern:Number($scope.aaa),
                    longitude:Number($scope.jingdu),
                    latitude:Number($scope.weidu),
                },
                headers:{'Content-Type': 'application/x-www-form-urlencoded'},
            }).success(function(req){
                window.location.href="flags_people.html"
            })

        }
        $scope.quxiao=function () {
            console.log("取消")
            window.location.href="flags_people.html"
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