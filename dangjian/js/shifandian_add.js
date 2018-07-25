var app = angular.module('myApp', []);
app.controller('myCtrl',
    function($scope, $http) {
        var Request = new UrlSearch(); //实例化
        $scope.username=Request.xingming;
        localStorage.setItem("login_user_name",$scope.username);
        $scope.login_user_name=localStorage.getItem("login_user_name");

        $scope.load=function(){
            // 这里是把原来的 getActionUrl 方法备份 到 _bkGetActionUrl
            UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
            UE.Editor.prototype.getActionUrl = function (action) {
                // body...
                console.info(action);

                //拦截这两个，其他的不拦截,调用备份
                if (action == 'uploadimage' || action == 'uploadfile') {
                    return "https://dangjain.ishoubei.com/upload";
                } else{
                    return this._bkGetActionUrl.call(this, action);
                }
            };
            //实例化编辑器
            //建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
            var ue = UE.getEditor('editor',{
                allHtmlEnabled: false,//提交到后台的数据是否包含整个html字符串
                autoHeightEnabled: false,
                autoFloatEnabled: true,
                allowDivTransToP: false//阻止div标签自动转换为p标签
            });


        }

        $scope.tijiao=function () {
            console.log("开始提交")
            console.log($scope.mingchen)
            console.log($scope.dizhi)
            console.log($scope.aaa)
            console.log($scope.jingdu)
            console.log($scope.weidu)
            console.log($scope.jianjie)

            $http({
                method:'post',
                url:'https://dangjain.ishoubei.com/party',
                data:{
                    pb_name:$scope.mingchen,
                    pb_address:$scope.dizhi,
                    pb_pattern:Number($scope.aaa),
                    longitude:Number($scope.jingdu),
                    latitude:Number($scope.weidu),
                    pb_desc:$scope.jianjie,
                },
                headers:{'Content-Type': 'application/x-www-form-urlencoded'},
            }).success(function(req){
                window.location.href='flags_people.html'
            })

        }
        $scope.quxiaoadd=function () {
            window.location.href="flags_people.html"
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