var app = angular.module('myApp', []);
app.controller('myCtrl',
    function ($scope, $http) {
        var Request = new UrlSearch(); //实例化
        $scope.username = Request.xingming;
        localStorage.setItem("login_user_name", $scope.username);
        $scope.login_user_name = localStorage.getItem("login_user_name");
        $scope.page = 1;
        $scope.load = function () {
            console.log(this)
            getCreditPageList();
        }

        // 详情
        $scope.onClick = function (id) {
            console.log(id)
            window.location.href = "study_credit_edit_detail.html?id=" + id + "&isEdit=0";
        }

        // 编辑
        $scope.goToEditPage = function (id) {
            console.log(id)
            window.location.href = "study_credit_edit_detail.html?id=" + id + "&isEdit=1";
        }

        //获取考试配置列表
        function getCreditPageList() {
            $http.get("https://dangjain.ishoubei.com/cadre/type")
                .then(function (res) {
                    $scope.lists = res.data.rows;
                    $scope.total = res.data.total;
                });
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