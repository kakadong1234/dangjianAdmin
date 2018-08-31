var app = angular.module('myApp', []);
app.controller('myCtrl',
    function ($scope, $http) {
        var Request = new UrlSearch(); //实例化
        $scope.username = Request.xingming;
        $scope.ep_id = Request.ep_id;
        localStorage.setItem("login_user_name", $scope.username);
        $scope.login_user_name = localStorage.getItem("login_user_name");
        
        $scope.page = 1;
        $scope.load = function () {
            $scope.isLoading = false
            console.log($scope.isLoading)
            //init Exam Data
            getExamData()
        }
    
        function getExamData() {
            $http({
                method: 'post',
                url: 'http://api.lpszzb.gov.cn/exam/result?ep_id=' + $scope.ep_id + '&user_id=xiaowei',
            }).success(function (res) {
                console.log(res)
            })

        };

        function UrlSearch() {
            var name, value;
            var str = location.href; //取得整个地址栏
            console.log("地址=" + str);
            var num = str.indexOf("?");
            str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

            var arr = str.split("&"); //各个参数放到数组里
            console.log("各个参数放到数组里=" + arr);
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