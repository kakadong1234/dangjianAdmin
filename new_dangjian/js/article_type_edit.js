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
            getArticleType($scope.id)
        }

        // 取消
        $scope.cancel = function () {
            window.history.go(-1);
        }
        // 编辑
        $scope.edit = function () {
            const data = {
                type_name: $scope.type_name,
                type_sort: $scope.type_sort,
                type_desc: $scope.type_desc,
                type_icon: $scope.type_icon,
                type_cover: $scope.type_cover
            }
            console.log(data)
            editArticleType(data);
        }

        //获取文章类型详情
        function getArticleType(id) {
            $http.get("http://api.lpszzb.gov.cn/type/" + id)
                .then(function (res) {
                    const data = res.data;
                    $scope.type_name = data.type_name;
                    $scope.type_sort = data.type_sort;
                    $scope.type_cover = data.type_cover;
                    $scope.type_icon = data.type_icon;
                    $scope.type_desc = data.type_desc;
                    console.log($scope.type_icon)
                    console.log($scope.type_cover)
                    $("#icon_img").attr("src", $scope.type_icon)
                    $("#cover_img").attr("src", $scope.type_cover)
                });
        }

        //编辑文章类型
        function editArticleType(data) {
            console.log('edit')
            $http({
                method: 'post',
                url: 'http://api.lpszzb.gov.cn/type/' + $scope.id,
                data: $.param(data),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).success(function (req) {
                window.location.href = "article_type.html";
            })
        }


        $scope.upload=function () {
            var form = document.getElementById('formtubiao'),
                formData = new FormData(form);
            console.log(formData)
            $.ajax({
                url:"http://api.lpszzb.gov.cn/upload",
                type:"post",
                data:formData,
                processData:false,
                contentType:false,
                success:function(res){
                    if(res.url){
                        fileurl = res.url
                        var httpurl="http://api.lpszzb.gov.cn"
                        $scope.type_icon = httpurl+""+fileurl
                        $("#icon_img").attr("src", $scope.type_icon)
                    }else {
                        alert("图片错误，请重新选择图片")
                    }


                },
                error:function(err){
                    alert("网络连接失败,稍后重试",err);
                }
            })
        }


        $scope.uponload=function () {
            var form = document.getElementById('formfengmian'),
                formData = new FormData(form);
            $.ajax({
                url:"http://api.lpszzb.gov.cn/upload",
                type:"post",
                data:formData,
                processData:false,
                contentType:false,
                success:function(res){
                    if(res.url){
                        fileurl2 = res.url
                        var httpurl="http://api.lpszzb.gov.cn"
                        $scope.type_cover = httpurl+""+fileurl2
                        $("#cover_img").attr("src", $scope.type_cover)
                    }else {
                        alert("图片错误，请重新选择图片")
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