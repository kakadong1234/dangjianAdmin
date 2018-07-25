var app = angular.module('myApp', []);
app.controller('myCtrl',
    function($scope, $http) {
        var Request = new UrlSearch(); //实例化
        $scope.username=Request.xingming;
        localStorage.setItem("login_user_name",$scope.username);
        $scope.login_user_name=localStorage.getItem("login_user_name");
        $scope.article_id=Request.article_id
        console.log($scope.article_id)
        $scope.load=function(){
            $http.get("https://dangjain.ishoubei.com/article?article_id="+$scope.article_id)
                .then(function (res) {
                    $scope.lists=res.data.rows;
                    $scope.type_name=$scope.lists[0].type_name;
                    $scope.title=$scope.lists[0].title;
                    $scope.created=$scope.lists[0].created;
                    $scope.content=$scope.lists[0].content;
                    $scope.user_id=$scope.lists[0].user_id;
                    $scope.medias=$scope.lists[0].medias;
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