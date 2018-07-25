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

        var yixuanDanxuan=[]
        var yixuanPanduan=[]
        var typebbbb=[{
            type_name: "全选",
            type_sort: 1,
            type_state: 2,
            type_desc: "",
            type_fid: '',
            type_id:0,
        }]
       var  page=1
        $scope.page=1
       var  status=1
        $scope.load=function () {        //获取数据api
            $http.get("http://api.lpszzb.gov.cn/exam/question?eqt_id=1")
                .then(function (res) {
                    $scope.shiti1=res.data.rows;

                });
            $http.get("http://api.lpszzb.gov.cn/exam/question?eqt_id=2")
                .then(function (res) {
                    $scope.shiti2=res.data.rows;
                });
            getArticletype()
            //获取文章类型
            function getArticletype() {
                $http.get("http://api.lpszzb.gov.cn/type")
                    .then(function (res) {
                        $scope.typelistone=res.data.data;
                        for(var i=0;i<$scope.typelistone.length;i++){
                            for (var m=0;m<$scope.typelistone[i].childs.length;m++){
                                typebbbb.push($scope.typelistone[i].childs[m])
                            }
                        }
                        $scope.typelists22=typebbbb
                        $scope.articleType=$scope.typelists22[0]
                        getshuju($scope.page,status, $scope.articleType.type_id)
                    });
            }

            //获取数据api
            function getshuju(pageID,status,type_id) {
                $http.get("http://api.lpszzb.gov.cn/article?page="+pageID+"&status="+status+"&type_id="+type_id+"&limit=8")
                    .then(function (res) {
                        $scope.lists=res.data.rows;
                        $scope.total=res.data.total;
                        $scope.pagesLists=Math.ceil($scope.total/10);
                    });
            }



            //获取试题
            $http.get("http://api.lpszzb.gov.cn/exam/question?eqt_id=1")
                .then(function (res) {
                    $scope.shiti1=res.data.rows;

                });
            $http.get("http://api.lpszzb.gov.cn/exam/question?eqt_id=2")
                .then(function (res) {
                    $scope.shiti2=res.data.rows;
                });




            $scope.clickType=function () {

                $scope.newsDangjian=$scope.articleType.type_name
                getshuju($scope.page,status,$scope.articleType.type_id)
            }
            $scope.onleixingClick1=function () {
                status=1;
                $scope.newsDangjian=$scope.articleType.type_name
                getshuju($scope.page,status,$scope.articleType.type_id)
            }
            $scope.onleixingClick2=function () {
                status=2;
                $scope.newsDangjian=$scope.articleType.type_name
                getshuju($scope.page,status,$scope.articleType.type_id)
            }
            $scope.onleixingClick5=function () {
                status=5;
                $scope.newsDangjian=$scope.articleType.type_name
                getshuju($scope.page,status,$scope.articleType.type_id)
            }
            $scope.downOnClick= function () {
                if($scope.page<$scope.pagesLists){
                    $scope.page = $scope.page+1;
                    getshuju($scope.page,status,$scope.articleType.type_id);
                }
            }
            $scope.upOnClick= function () {
                if($scope.page>1) {
                    $scope.page = $scope.page - 1;
                    getshuju($scope.page,status,$scope.articleType.type_id);
                }
            }


            //选择试题
            $scope.noshitiClick=function (article_id) {
                $http.get("http://api.lpszzb.gov.cn/article/"+article_id+"/question")
                    .then(function (res) {
                        $scope.Article_question=res.data.rows
                        $scope.questionShow=$scope.Article_question.length
                        for (var i=0;i<$scope.Article_question.length;i++){
                                yixuanPanduan.push($scope.Article_question[i].eq_id)
                        }
                        for(var a=0;a<$scope.shiti1.length;a++){
                            for(var b=0;b<yixuanPanduan.length;b++){
                                var tem = yixuanPanduan[b];
                                $("input:checkbox[value='"+tem+"']").attr("checked","checked");

                            }
                        }


                    });




                $scope.xubangdaingId=article_id


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
                var r=confirm("确定删除？");
                if (r==true)
                {

                    $http.post("http://api.lpszzb.gov.cn/article/del/"+id)
                        .then(function (res) {
                            console.log("已删除")
                            window.location.href='article_home.html'
                        })
                }
                else
                {
                    alert("已取消!");
                }
            }



            $scope.bohuiClick=function (article_id) {
                var id = Number(article_id)
                var r=confirm("确定驳回？");
                if (r==true)
                {

                    $http.post("http://api.lpszzb.gov.cn/article/"+id+"?status=2")
                        .then(function (res) {
                            window.location.reload()
                        })
                }
                else
                {
                    alert("已取消!");
                }
            }


            $scope.tongguoClick=function (article_id) {
                var id = Number(article_id)
                var r=confirm("确定通过？");
                if (r==true)
                {

                    $http.post("http://api.lpszzb.gov.cn/article/"+id+"?status=5")
                        .then(function (res) {
                            window.location.href='article_home.html'
                        })
                }
                else
                {
                    alert("已取消!");
                }
            }



            //    推荐文章
            $scope.settuijian=function (article_id,recommend) {
                console.log(recommend)
                if(recommend==0){
                    $http.post("http://api.lpszzb.gov.cn/article/"+article_id+"?recommend=1")
                        .then(function (res) {
                            console.log("已设置为他山之玉")
                            window.location.href='article_home.html?'
                        })
                }else if(recommend==1){
                    $http.post("http://api.lpszzb.gov.cn/article/"+article_id+"?recommend=0")
                        .then(function (res) {
                            console.log("取消他山之玉设置")
                            window.location.href='article_home.html'
                        })
                }


            }







            $scope.onClick = function (article_id) {
                console.log("djaini ")
                window.location.href="article_detail.html?article_id="+article_id;
            }
            $scope.oncomment=function (article_id) {
                window.location.href="article_comment.html?article_id="+article_id;
            }


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