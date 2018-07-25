var app = angular.module('myApp', []);
app.controller('myCtrl',
    function($scope, $http) {
        var Request = new UrlSearch(); //实例化
        $scope.username=Request.xingming;
        localStorage.setItem("login_user_name",$scope.username);
        $scope.login_user_name=localStorage.getItem("login_user_name");
        $scope.pd_id=Request.pd_id;
        $scope.fenlei=Request.fenlei;
        $scope.user_id=Request.user_id;
        $scope.created=decodeURI(Request.created);
        $scope.weidu=Request.weidu;
        $scope.jingdu=Request.jingdu;
        $scope.name=decodeURI(Request.name);
        $scope.pb_pattern=decodeURI(Request.pb_pattern);
        console.log($scope.pb_pattern)
        $scope.load=function(){
           if ($scope.fenlei=='biubiu1'){
               $http.get("https://dangjain.ishoubei.com/party/"+$scope.pd_id)
                   .then(function (res) {
                       $scope.pb_desc=res.data.pb_desc
                       $scope.pb_name=res.data.pb_name
                       $scope.longitude=res.data.longitude
                       $scope.latitude=res.data.latitude
                       $scope.pb_address=res.data.pb_address
                       $scope.pb_id=res.data.pb_id
                   });

               $scope.deleteClick=function (id) {
                   console.log(id)
                   $http.delete("https://dangjain.ishoubei.com/party/"+id)
                       .then(function (res) {
                           alert("确认删除？");
                           window.location.href="flags_piao.html"
                       })
               }
           }else if($scope.fenlei=='biubiu2'){
               $http.get("https://dangjain.ishoubei.com/party/"+$scope.pd_id)
                   .then(function (res) {
                       $scope.pb_desc=res.data.pb_desc
                       $scope.pb_name=res.data.pb_name
                       $scope.longitude=res.data.longitude
                       $scope.latitude=res.data.latitude
                       $scope.pb_address=res.data.pb_address
                       $scope.pb_id=res.data.pb_id
                   });

               $scope.deleteClick=function (id) {
                   $http.delete("https://dangjain.ishoubei.com/party/"+id)
                       .then(function (res) {
                           alert("确认删除？");
                           window.location.href="flags_piao.html"
                       })
               }
           }else if($scope.fenlei=='biubiu3'){
               $scope.deleteClick=function (id) {
                   $http.delete("https://dangjain.ishoubei.com/cadre/"+id)
                       .then(function (res) {
                           alert("确认删除？");
                           window.location.href="flags_piao.html"
                       })
               }
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