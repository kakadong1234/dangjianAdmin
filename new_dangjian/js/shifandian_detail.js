var app = angular.module('myApp', ['ngSanitize']);
app.controller('myCtrl',
    function($scope, $http, $sce) {
        var Request = new UrlSearch(); //实例化
        $scope.username=Request.xingming;
        localStorage.setItem("login_user_name",$scope.username);
        $scope.login_user_name=localStorage.getItem("login_user_name");
        $scope.pd_id=Request.pd_id
        $scope.pb_pattern=Request.pb_pattern
        $scope.load=function(){
            $http.get("http://api.lpszzb.gov.cn/party/"+$scope.pd_id)
                .then(function (res) {
                    $scope.jianjie=res.data.pb_desc
                    $scope.dianhua=res.data.pb_phone
                    $scope.shuji=res.data.pb_master
                    $scope.mingchen=res.data.pb_name
                    $scope.jingdu=res.data.longitude
                    $scope.weidu=res.data.latitude
                    $scope.dizhi=res.data.pb_address
                    $scope.pb_id=res.data.pb_id
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