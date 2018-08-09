var app = angular.module('myApp', []);
app.controller('myCtrl',
    function($scope, $http) {
        var Request = new UrlSearch(); //实例化
        $scope.username=Request.xingming;
        localStorage.setItem("login_user_name",$scope.username);
        $scope.login_user_name=localStorage.getItem("login_user_name");
        $scope.page=1;
        // $scope.baseUrl = "http://192.168.0.110:8000";
        $scope.baseUrl = "http://api.lpszzb.gov.cn";
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
                $http.get("http://api.lpszzb.gov.cn/cadre?page="+$scope.page)
                    .then(function (res) {
                        $scope.lists=res.data.rows;
                        $scope.total=res.data.total;
                        $scope.pagesLists=Math.ceil($scope.total/10);
                    });
            }

        }


        $scope.setRoleClick = function (user_id, user_name) {
            console.log(user_id)
            $scope.user_id = user_id
            $scope.user_name = user_name
            $http.get($scope.baseUrl + "/role")
            .then(function(res){
                $scope.roleList = res.data.data
                $http.get($scope.baseUrl + "/user/role/" + user_id)
                .then(function (res) {
                    console.log(res.data.data)
                    $scope.selectedRoleList = res.data.data
                });
            })
        }


        $scope.roleClick = function(x){
            const filterList = $scope.selectedRoleList.filter(function(role){
                return role.role_id !== x.role_id
            })
            if(filterList.length === $scope.selectedRoleList.length){
                //add
                $scope.selectedRoleList.push(x)
            }
            else {
                //remove
                $scope.selectedRoleList = filterList
            }
        }
        
        $scope.isSelected = function(role_id){
            if($scope.selectedRoleList){
                const isSelectedItem = $scope.selectedRoleList.find(function(role){
                    return role.role_id === role_id
                })
                return isSelectedItem !== undefined && isSelectedItem !== null 
            }
            return false
        }
        
        $scope.roleChangeClick = function(){
            const roleIdList = $scope.selectedRoleList.map(function(role){
                return role.role_id
            })
            console.log($scope.selectedRoleList.map(function(role){
                return role.role_name
            }))
            const body = {roles: roleIdList};
            const url = $scope.baseUrl + "/user/role/" + $scope.user_id
            $http.post(url, body)
            .then(function (res) {
                console.log(res)
                window.location.reload()
            })
        } 
        
        $scope.onCancel = function(){
            window.location.reload()
        }

        $scope.onClick = function (user_id) {
            // window.location.href="zhucunganbu_detail.html?user_id="+user_id;
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