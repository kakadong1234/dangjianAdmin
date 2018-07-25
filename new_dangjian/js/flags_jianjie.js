var app = angular.module('myApp', ['ngSanitize']);
app.controller('myCtrl',
    function($scope, $http, $sce) {
        var Request = new UrlSearch(); //实例化
        $scope.username=Request.xingming;
        localStorage.setItem("login_user_name",$scope.username);
        $scope.login_user_name=localStorage.getItem("login_user_name");
        $scope.user_id=Request.user_id

        $scope.load=function(){
            $http.get("http://api.lpszzb.gov.cn/cadre/"+$scope.user_id)
                .then(function (res) {
                    $scope.jianjie=res.data.pb_desc
                    $scope.mingchen=res.data.user_name
                    $scope.jingdu=res.data.longitude
                    $scope.weidu=res.data.latitude
                    $scope.dizhi=res.data.address
                    $scope.period=res.data.period
                    $scope.content=HTMLDecode(res.data.pb_details);
                    $sce.trustAsHtml( $scope.content);
                    function HTMLDecode(text) {
                        var temp = document.createElement("div");
                        temp.innerHTML = text;
                        var output = temp.innerText || temp.textContent;
                        temp = null;
                        return output;
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