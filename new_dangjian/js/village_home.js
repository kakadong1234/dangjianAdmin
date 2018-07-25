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
                $http.get("http://api.lpszzb.gov.cn/party?page="+$scope.page)
                    .then(function (res) {
                        $scope.lists=res.data.rows;
                        $scope.total=res.data.total;
                        $scope.pagesLists=Math.ceil($scope.total/10);

                    });
            }



            $scope.deletearticle=function (pb_id) {
                var id = Number(pb_id)
                console.log(id)
                alert("确定删除？")
                $http.post("http://api.lpszzb.gov.cn/party/del/"+id)
                    .then(function (res) {
                        console.log("已删除")
                        window.location.href="flags_people.html"
                    })

            }

        }

        $scope.fullName = function(conts) {

            if(conts.length<30){
                var aa =conts
                return aa;
            }else{
                var aa =conts.substring(0,30) + "...";
                return aa;
            }
        };


        $scope.onClick = function (pd_id,pb_pattern) {
            window.location.href="shifandian_detail.html?pd_id="+pd_id+"&pb_pattern="+pb_pattern;
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