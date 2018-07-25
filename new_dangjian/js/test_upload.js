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
            
        }

        // 取消
        $scope.cancel = function () {
            window.history.go(-1);
        }
        // 
        $scope.upload = function () {
            $scope.user_id = 'XueHaifeng'
            upload();
        }

        function upload(){
            var form = document.getElementById('formtubiao'),
                formData = new FormData(form);
            console.log(formData)
            $.ajax({
                url:"http://api.lpszzb.gov.cn/exam/question/up",
                type:"post",
                data:formData,
                processData:false,
                contentType:false,
                success:function(res){
                    if(res){
                        console.log(res)
                        window.location.href = "test_manage.html";
                    }else {
                        alert("文件上传错误")
                    }


                },
                error:function(err){
                    alert("网络连接失败,稍后重试",err);
                }
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