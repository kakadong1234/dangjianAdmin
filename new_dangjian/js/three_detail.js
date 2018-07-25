var app = angular.module('myApp', []);
app.controller('myCtrl',
    function($scope, $http) {
        var Request = new UrlSearch(); //实例化
        $scope.username=Request.xingming;
        localStorage.setItem("login_user_name",$scope.username);
        $scope.login_user_name=localStorage.getItem("login_user_name");
        $scope.page=1;
        $scope.ir_id=Request.ir_id
        $scope.type_name=decodeURI(Request.type_name);
        console.log( $scope.ir_id)
        $scope.load=function(){

            $http.get("http://api.lpszzb.gov.cn/report/meeting/"+ $scope.ir_id)
                .then(function (res) {
                    $scope.user_id=res.data.user_id
                    $scope.address=res.data.address
                    $scope.title=res.data.title
                    $scope.outline=res.data.outline
                    $scope.compere=res.data.compere
                    $scope.convoke=res.data.convoke
                    $scope.should_nbr=res.data.should_nbr
                    $scope.updated=res.data.updated
                    $scope.created=res.data.created
                    $scope.urls=res.data.urls
                    $scope.actual_nbr=res.data.actual_nbr
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