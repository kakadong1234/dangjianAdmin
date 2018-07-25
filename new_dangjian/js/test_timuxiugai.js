var app = angular.module('myApp', []);
app.controller('myCtrl',
    function($scope, $http) {
        var Request = new UrlSearch(); //实例化
        // $scope.username=Request.xingming;
        // localStorage.setItem("login_user_name",$scope.username);
        $scope.user_id=localStorage.getItem("user_id");
        // $scope.user_id="142606654632975259";
        $scope.eqt_name=decodeURI(Request.eqt_name)
        $scope.eq_id=decodeURI(Request.eq_id)
        $scope.question=decodeURI(Request.question)
        $scope.answer=decodeURI(Request.answer)
        $scope.tags=decodeURI(Request.tags)
        $scope.op_a=decodeURI(Request.op_a)
        $scope.op_b=decodeURI(Request.op_b)
        $scope.op_c=decodeURI(Request.op_c)
        $scope.op_d=decodeURI(Request.op_d)


        $scope.submittijiao=function () {
            console.log("判断题修改")
            console.log($scope.question)
            console.log($scope.answer)
            console.log($scope.tags)
            console.log($scope.eq_id)
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
            var url = "http://api.lpszzb.gov.cn/exam/question/"+$scope.eq_id;
            var transFn = function (data) { return $.param(data) },
                postCfg = { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }, transformRequest: transFn };
            $http.post(url,$scope.data1,postCfg).success(function (obj) {
                window.location.href = "test_manage.html";

            });

        }


        $scope.danxuantijiao=function () {
            console.log("单选题修改")
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
            var url = "http://api.lpszzb.gov.cn/exam/question/"+$scope.eq_id;
            var transFn = function (data) { return $.param(data) },
                postCfg = { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }, transformRequest: transFn };
            $http.post(url,$scope.data1,postCfg).success(function (obj) {


                window.location.href = "test_manage.html";

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