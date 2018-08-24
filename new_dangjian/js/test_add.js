var app = angular.module('myApp', []);
app.controller('myCtrl',
    function($scope, $http) {
        var Request = new UrlSearch(); //实例化
        var tagsarry=[];
        $scope.user_id=localStorage.getItem("user_id");
        $scope.isShow=false;
        $scope.eqt_name="判断题";
        // $scope.user_id="142606654632975259";
        $scope.load=function () {
            $scope.isLoading = false
            console.log($scope.isLoading)
            //获取标签
            $http.get("http://api.lpszzb.gov.cn/exam/tags")
                .then(function (res) {
                    $scope.tagszu=res.data.rows
                    console.log( $scope.tagszu[0])
                });
        }




        $scope.xuanzhetag=function (tagszhi) {
            $scope.tags=tagszhi;
        }
        
        $scope.addtags=function () {
            $scope.isShow=true;
        }
        $scope.biubiu=function () {
            $scope.data1 = {
                et_name: $scope.et_name,
            };
            var url = "http://api.lpszzb.gov.cn/exam/tags";
            var transFn = function (data) { return $.param(data) },
                postCfg = { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }, transformRequest: transFn };
            $http.post(url,$scope.data1,postCfg).success(function (obj) {
                $scope.isShow=false;
                window.location.href="test_add.html"
            });

        }



        $scope.tixingbianhua=function () {
            console.log($scope.eqt_name)
        }
        $scope.submittijiao=function () {
            $scope.isLoading = true
            console.log($scope.isLoading)
            console.log("判断题新增")
            console.log($scope.question)
            console.log($scope.answer)
            console.log($scope.tags)
            // $http.post("https://dangjain.ishoubecoi.m/exam/question?eqt_id="+1+"&question="+$scope.question+"&answer="+$scope.answer)
            //     .then(function (res) {
            //            console.log("已添加成功")
            //     });
            $scope.data1 = {
                eqt_id: 1,
                question: $scope.question,
                answer:$scope.answer,
                tags:$scope.tags,
                user_id:$scope.user_id
            };
            var url = "http://api.lpszzb.gov.cn/exam/question";
            var transFn = function (data) { return $.param(data) },
                postCfg = { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }, transformRequest: transFn };
            $http.post(url,$scope.data1,postCfg).success(function (obj) {
                window.location.href="test_manage.html"
            });

        }


        $scope.danxuantijiao=function () {
            $scope.isLoading = true
            console.log($scope.isLoading)
            console.log("单选题新增")
            console.log($scope.question)
            console.log($scope.answer)
            console.log($scope.tags)
            // $http.post("https://dangjain.ishoubecoi.m/exam/question?eqt_id="+1+"&question="+$scope.question+"&answer="+$scope.answer)
            //     .then(function (res) {
            //            console.log("已添加成功")
            //     });
            $scope.data1 = {
                eqt_id: 2,
                question: $scope.question,
                op_a: $scope.op_a,
                op_b: $scope.op_b,
                op_c: $scope.op_c,
                op_d: $scope.op_d,
                answer:$scope.answer,
                tags:$scope.tags,
                user_id:$scope.user_id
            };
            var url = "http://api.lpszzb.gov.cn/exam/question";
            var transFn = function (data) { return $.param(data) },
                postCfg = { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }, transformRequest: transFn };
            $http.post(url,$scope.data1,postCfg).success(function (obj) {
                window.location.href = "test_manage.html";
                if (obj.code==100) {
                    // alert("点评成功");
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