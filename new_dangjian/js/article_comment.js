var app = angular.module('myApp', []);
app.controller('myCtrl',
    function($scope, $http,$location) {
        var Request = new UrlSearch(); //实例化
        $scope.corpid=localStorage.getItem("corpid");
        $scope.corp_name=localStorage.getItem("corp_name");
        $scope.userid=localStorage.getItem("user_id");
        $scope.username=localStorage.getItem("name");
        $scope.article_id=Request.article_id
        $scope.load=function () {
            getshuju($scope.page,$scope.article_id);
            $scope.downOnClick = function (status) {
                if($scope.page<$scope.pagesLists){
                    $scope.page = $scope.page+1;
                    getshuju($scope.page,$scope.article_id);
                }
            }
            $scope.upOnClick = function (status) {
                if($scope.page>1) {
                    $scope.page = $scope.page - 1;
                    getshuju($scope.page,$scope.article_id);
                }
            }


            //获取数据api
            function getshuju(pageID,id) {
                $http.get("http://api.lpszzb.gov.cn/article/"+id+"/aq?status=-1")
                    .then(function (res) {
                        $scope.lists=res.data.aq
                    });
            }


        }



        $scope.setstatusClick1=function (article_id) {
            var r=confirm("设置前端显示？");
            if (r==true)
            {

                $http.post("http://api.lpszzb.gov.cn/article/"+article_id+"?status=0")
                    .then(function (res) {
                        alert("已显示!");
                        window.location.reload()
                    })
            }
            else
            {
                alert("已取消!");
            }



        }


        $scope.setstatusClick2=function (article_id) {
            var r=confirm("设置前端隐藏？");
            if (r==true)
            {

                $http.post("http://api.lpszzb.gov.cn/article/"+article_id+"?status=1")
                    .then(function (res) {
                        alert("已隐藏!");
                        window.location.reload()
                    })
            }
            else
            {
                alert("已取消!");
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