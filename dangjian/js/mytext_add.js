var app = angular.module('myApp', []);
app.controller('myCtrl',
    function($scope, $http) {
        var Request = new UrlSearch(); //实例化
        $scope.username=Request.xingming;
        localStorage.setItem("login_user_name",$scope.username);
        $scope.login_user_name=localStorage.getItem("login_user_name");
        $scope.user_id="142606654632975259";
        $scope.title="";
        $scope.type_id="";
        $scope.abstrac="";
        $scope.subtijiao=function () {
            console.log("开始提交")
            console.log($scope.title)
            console.log($scope.type_id)
            console.log($scope.abstrac)
            console.log($scope.content)



            $scope.data1 = {
                user_id: $scope.user_id,
                title: xiangzhen,
                type_id:cun,
                abstrac: wurenxiaozu,
                phone:$scope.lianxifangshi,
                name:$scope.xingming,
            };

            var url = "../../wechatapi/manage/savewuren.php";
            var transFn = function (data) { return $.param(data) },
                postCfg = { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }, transformRequest: transFn };
            $http.post(url,$scope.data1,postCfg).success(function (obj) {
                if (obj.code==100) {

                    // alert("点评成功");
                    // window.location.href = document.referrer;

                }
                else {

                    $(function () {
                        $("[data-toggle='popover']").popover();
                    });
                }
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