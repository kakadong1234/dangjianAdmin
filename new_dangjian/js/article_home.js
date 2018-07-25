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

        $scope.page=1;
        $scope.status=1;
        $scope.load=function(){
            getshuju($scope.page,$scope.status);
            $scope.downOnClick = function (status) {
                if($scope.page<$scope.pagesLists){
                    $scope.page = $scope.page+1;
                    getshuju($scope.page,status);
                }
            }
            $scope.upOnClick = function (status) {
                if($scope.page>1) {
                    $scope.page = $scope.page - 1;
                    getshuju($scope.page,status);
                }
            }


            //获取数据api
            function getshuju(pageID,status) {
                $http.get("http://api.lpszzb.gov.cn/article?page="+pageID+"&status="+status)
                    .then(function (res) {
                        $scope.lists=res.data.rows;
                        $scope.total=res.data.total;
                        $scope.pagesLists=Math.ceil($scope.total/10);
                        console.log($scope.pagesLists)
                    });
            }

            $scope.onleixingClick=function () {
                console.log($scope.status)
                getshuju(1,$scope.status);
            }
            //选择试题
            $scope.noshitiClick=function (article_id) {
                console.log(article_id)
                $scope.xubangdaingId=article_id
                //获取数据api
                $http.get("http://api.lpszzb.gov.cn/exam/question?eqt_id=1")
                    .then(function (res) {
                        $scope.shiti1=res.data.rows;

                    });
                $http.get("http://api.lpszzb.gov.cn/exam/question?eqt_id=2")
                    .then(function (res) {
                        $scope.shiti2=res.data.rows;
                        //$scope.shititotal=res.data.total;
                        // $scope.pagesLists=Math.ceil($scope.shiti/100);
                    });

            }

             $scope.xuancheClick=function (id) {
                 console.log(id)
                 $http.post("http://api.lpszzb.gov.cn/article/"+$scope.xubangdaingId+"/question?eq_id="+id)
                     .then(function (res) {

                     })
             }
             $scope.onshitiClick=function () {
                 window.location.href='article_home.html'
             }






            $scope.deletearticle=function (article_id) {
                var id = Number(article_id)
                console.log(id)
                alert("确定删除？")
                $http.post("http://api.lpszzb.gov.cn/article/del/"+id)
                    .then(function (res) {
                        console.log("已删除")
                        window.location.href='article_home.html'
                    })

            }

            $scope.bohuiClick=function (article_id) {
                var id = Number(article_id)
                console.log(id)
                alert("确定驳回？")
                $http.post("http://api.lpszzb.gov.cn/article/"+id+"?status=2")
                    .then(function (res) {
                        console.log("已驳回")
                        window.location.href='article_home.html'
                    })

            }
            $scope.tongguoClick=function (article_id) {
                var id = Number(article_id)
                console.log(id)
                alert("确定通过？")
                $http.post("http://api.lpszzb.gov.cn/article/"+id+"?status=5")
                    .then(function (res) {
                        console.log("已通过")
                        window.location.href='article_home.html'
                    })

            }


        //    推荐文章
            $scope.settuijian=function (article_id,recommend) {
                console.log(recommend)
                if(recommend==0){
                    $http.post("http://api.lpszzb.gov.cn/article/"+article_id+"?recommend=1")
                        .then(function (res) {
                            console.log("已设置为他山之玉")
                            // window.location.href='article_home.html'
                        })
                }else if(recommend==1){
                    $http.post("http://api.lpszzb.gov.cn/article/"+article_id+"?recommend=0")
                        .then(function (res) {
                            console.log("取消他山之玉设置")
                            // window.location.href='article_home.html'
                        })
                }


            }


            //    设置banner
            $scope.setbanner=function (article_id,banner) {
                console.log(banner)
                if(banner==0){
                    $http.post("http://api.lpszzb.gov.cn/article/"+article_id+"?banner=1")
                        .then(function (res) {
                            console.log("已设置为banner")
                            // window.location.href='article_home.html'
                        })
                }else if(banner==1){
                    $http.post("http://api.lpszzb.gov.cn/article/"+article_id+"?banner=0")
                        .then(function (res) {
                            console.log("取消banner设置")
                            // window.location.href='article_home.html'
                        })
                }

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



        $scope.onClick = function (article_id) {
            console.log("djaini ")
            window.location.href="article_detail.html?article_id="+article_id;
        }
        $scope.oncomment=function (article_id) {
            window.location.href="article_comment.html?article_id="+article_id;
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