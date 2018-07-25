var app = angular.module('myApp', []);
app.controller('myCtrl',
    function ($scope, $http) {
        var Request = new UrlSearch(); //实例化
        $scope.username = Request.xingming;
        $scope.id = Request.id;
        $scope.isEdit = Request.isEdit;
        localStorage.setItem("login_user_name", $scope.username);
        $scope.login_user_name = localStorage.getItem("login_user_name");
        $scope.load = function () {
            getCredit($scope.id);
        }

        // 取消
        $scope.cancel = function () {
            window.history.go(-1);
        }
        // 编辑
        $scope.edit = function () {
            const id = $scope.id
            console.log(id)
            const data = {
                type_id: id,
                credit:  $scope.credit,
            }
            console.log(data)
            editExamPage(data);
        }

        //获取在线学习学分
        function getCredit(id) {
            $http.get("https://dangjain.ishoubei.com/cadre/type")
                .then(function (res) {
                    const credit = res.data.rows.find(function (item) {
                        return item.type_id === Number(id);
                    });
                    $scope.type_name = credit.type_name;
                    $scope.credit = credit.credit;
                });
        }

        //配置在线学习学分
        function editExamPage(data) {
            console.log('edit')
            $http({
                method: 'post',
                url: 'https://dangjain.ishoubei.com/cadre/type',
                data: $.param(data),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).success(function (req) {
                window.location.href = "study_credit_list.html";
            })
        }

        function UrlSearch() {
            var name, value;
            var str = location.href; //取得整个地址栏
            console.log("地址=" + str);
            var num = str.indexOf("?");
            str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

            var arr = str.split("&"); //各个参数放到数组里
            console.log("各个参数放到数组里=" + arr);
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