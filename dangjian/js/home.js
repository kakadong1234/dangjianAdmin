var app = angular.module('myApp', []);
app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);
app.controller('myCtrl',
    function($scope, $http,$location) {
        var Request = new UrlSearch(); //实例化
        window.localStorage.setItem("corpid",$location.search().corpid);
        window.localStorage.setItem("corp_name",$location.search().corp_name);
        window.localStorage.setItem("user_id",$location.search().user_id);
        window.localStorage.setItem("name",$location.search().name);
        $scope.corpid=window.localStorage.getItem("corpid");
        $scope.corp_name=window.localStorage.getItem("corp_name");
        $scope.userid=window.localStorage.getItem("user_id");
        $scope.username=window.localStorage.getItem("name");

        console.log($scope.corpid)
        console.log($scope.corp_name)
        console.log($scope.userid)
        console.log($scope.username)
        $scope.page=1;
        $scope.type_id=21
        $scope.load=function(){
            getshuju($scope.page,$scope.type_id);
            $scope.downOnClick = function () {
                if($scope.page<$scope.pagesLists){
                    $scope.page = $scope.page+1;
                    getshuju($scope.page,21);
                }
            }
            $scope.upOnClick = function () {
                if($scope.page>1) {
                    $scope.page = $scope.page - 1;
                    getshuju($scope.page,21);
                }
            }


       //获取数据api
            function getshuju(pageID,type_id) {
                $http.get("https://dangjain.ishoubei.com/article?page="+pageID+"&type_id="+type_id)
                    .then(function (res) {
                        $scope.lists=res.data.rows;
                        $scope.total=res.data.total;
                        $scope.pagesLists=Math.ceil($scope.total/10);

                    });
            }


            $scope.deletearticle=function (article_id) {
                var id = Number(article_id)
                console.log(id)
                // var data ={article_id:article_id}
                // $.ajax({
                //     url:"https://dangjain.ishoubei.com/article/",
                //     type:"delete",
                //     contentType:"application/json",
                //     dataType:"json",
                //     data:data,
                //     success:function(msg){
                //         callback(msg);
                //         console.log(1)
                //     },
                //     error:function(xhr,textstatus,thrown){
                //
                //     }
                // });
                alert("确定删除？")
                $http.post("https://dangjain.ishoubei.com/article/del/"+id)
                    .then(function (res) {
                            console.log("已删除")
                        window.location.href='home.html'
                    })

            }

        }
        // $scope.fullName = function(conts) {
        //
        //     if(conts.length<30){
        //         var aa =conts
        //         return aa;
        //     }else{
        //         var aa =conts.substring(0,30) + "...";
        //         return aa;
        //     }
        // };



        $scope.onClick = function (article_id,type_id) {
            console.log("djaini ")
            window.location.href="article_list1.html?article_id="+article_id+"&type_id="+type_id;
        }

        function UrlSearch() {
            var name, value;
            var str = location.href; //取得整个地址栏
            var num = str.indexOf("?");
            str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

            var arr = str.split("&"); //各个参数放到数组里
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