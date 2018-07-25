var app = angular.module('myApp', []);
app.controller('myCtrl',
    function($scope, $http,$location) {
        var Request = new UrlSearch(); //实例化
        var fileurl = "";
        var fileurl2 = "";
        $scope.corpid=localStorage.getItem("corpid");
        $scope.corp_name=localStorage.getItem("corp_name");
        $scope.userid=localStorage.getItem("user_id");
        $scope.username=localStorage.getItem("name");
        $scope.load=function(){
            $http.get("http://api.lpszzb.gov.cn/type?status=0")
                .then(function (res) {
                    $scope.lists=res.data.data;
                    $scope.fenlei=$scope.lists[0].type_id
                    $scope.lists0=res.data.data[0].childs;
                    $scope.lists1=res.data.data[1].childs;
                    $scope.lists2=res.data.data[2].childs;
                    $scope.lists3=$scope.lists[3].childs;
                    console.log($scope.lists)
                    console.log($scope.lists[3])
                });

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
                        var  title=res.title
                        console.log(fileurl)
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
                        var  title=res.title
                        console.log(fileurl2)
                    }else {
                        alert("图片错误，请重新选择图片")
                    }


                },
                error:function(err){
                    alert("网络连接失败,稍后重试",err);
                }
            })
        }





        $scope.setstatusClick1=function (type_name,type_sort,type_fid,type_id,type_desc,type_state) {
            console.log(type_name)
            var r=confirm("设置前端显示？");
            if (r==true)
            {

                $http.post("http://api.lpszzb.gov.cn/type/"+type_id+"?type_state=2")
                    .then(function (res) {
                        alert("已显示!");
                        window.location.href="article_type.html"
                    })
            }
            else
            {
                alert("已取消!");
            }



        }


        $scope.setstatusClick2=function (type_name,type_sort,type_fid,type_id,type_desc,type_state) {
            console.log(type_name)
            var r=confirm("设置前端隐藏？");
            if (r==true)
            {

                $http.post("http://api.lpszzb.gov.cn/type/"+type_id+"?type_state=0")
                    .then(function (res) {
                        alert("已隐藏!");
                        window.location.href="article_type.html"
                    })
            }
            else
            {
                alert("已取消!");
            }



        }
        
        
        


        $scope.Click = function (id) {
            $scope.Tid=id;
            console.log($scope.Tid)
        }

        $scope.edit = function (id) {
            window.location.href = 'article_type_edit.html?id=' + id
        }

        $scope.DeleClick=function (id) {
            var r=confirm("确定删除？");
            if (r==true)
            {

                $http.post("http://api.lpszzb.gov.cn/type/del/"+id)
                    .then(function (res) {
                        //alert("删除成功！");
                        window.location.href="article_type.html"
                    });
            }
            else
            {
                alert("已取消!");
            }
        }








        $scope.xinjianfenlei=function () {
            var httpurl="http://api.lpszzb.gov.cn"
            var imageurl=httpurl+""+fileurl
            var imageurl2=httpurl+""+fileurl2

            $scope.data1 = {
                type_fid:$scope.fenlei,
                type_name:$scope.type_name,
                type_icon:imageurl,
                type_cover:imageurl2,
                type_sort:Number($scope.type_sort),
                type_desc:$scope.type_desc
            };
            var url = "http://api.lpszzb.gov.cn/type";
            var transFn = function (data) { return $.param(data) },
                postCfg = { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }, transformRequest: transFn };
            $http.post(url,$scope.data1,postCfg).success(function (res) {
                alert("提交成功！");
                window.location.href='article_type.html';
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