var app = angular.module('myApp', []);
app.controller('myCtrl',
    function($scope, $http) {
        var Request = new UrlSearch(); //实例化
        $scope.username=Request.xingming;
        localStorage.setItem("login_user_name",$scope.username);
        $scope.login_user_name=localStorage.getItem("login_user_name");
        $scope.page=1;
        $scope.load=function(){
            getshuju($scope.page);
            $scope.downOnClick = function () {
                if($scope.page<$scope.pagesLists){
                    $scope.page = $scope.page+1;
                    getshuju($scope.page);
                }
            }
            $scope.upOnClick = function () {
                if($scope.page>1) {
                    $scope.page = $scope.page - 1;
                    getshuju($scope.page);
                }
            }
            //获取数据api
            function getshuju(pageID) {
                $http.get("https://dangjain.ishoubei.com/cadre?page="+$scope.page)
                    .then(function (res) {
                        $scope.lists=res.data.rows;
                        $scope.total=res.data.total;
                        $scope.pagesLists=Math.ceil($scope.total/10);
                        console.log($scope.lists)
                    });
            }



            $scope.deletearticle=function (user_id) {
                console.log(user_id)
                alert("确定删除？")
                $http.delete("https://dangjain.ishoubei.com/cadre?user_id="+user_id)
                    .then(function (res) {
                        console.log("已删除")
                        window.location.href="ganbu_manage.html"
                    })

            }

        }




        $scope.onClick = function (article_id) {
            console.log("djaini ")
            // window.location.href="#.html?article_id="+article_id;
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