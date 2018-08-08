var app = angular.module('myApp', []);
app.controller('myCtrl',
    function($scope, $http) {
        var Request = new UrlSearch(); //实例化
        $scope.username=Request.xingming;
        localStorage.setItem("login_user_name",$scope.username);
        $scope.login_user_name=localStorage.getItem("login_user_name");
        $scope.page=1;
        $scope.baseUrl = "http://192.168.0.110:8000";
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
                
                $http.get($scope.baseUrl + "/role")
                    .then(function (res) {
                        $scope.lists = res.data.data;
                        $scope.pagesLists = 1;
                    });
            }

        }



        $scope.addRole = function () {
            const body = {role_name: $scope.role_name};
            console.log(body)
            const url = $scope.baseUrl + "/role"
            $http.post(url, body)
            .then(function (res) {
                console.log(res)
                window.location.href = "role_list.html";
            })
        }

        $scope.setMenuClick = function (role_id, role_name) {
            console.log(role_id)
            $scope.role_id = role_id
            $scope.role_name = role_name
            $http.get($scope.baseUrl + "/menu")
            .then(function(res){
                $scope.menuList = res.data.data
                $http.get($scope.baseUrl + "/role/menu/" + role_id)
                .then(function (res) {
                    console.log(res.data.data)
                    $scope.selectedMenuList = res.data.data
                });
            })
        }


        $scope.roleClick = function(x){
            const filterList = $scope.selectedMenuList.filter(function(menu){
                return menu.menu_id !== x.menu_id
            })
            if(filterList.length === $scope.selectedMenuList.length){
                //add
                $scope.selectedMenuList.push(x)
            }
            else {
                //remove
                $scope.selectedMenuList = filterList
            }
        }
        
        $scope.isSelected = function(menu_id){
            if($scope.selectedMenuList){
                const isSelectedItem = $scope.selectedMenuList.find(function(menu){
                    return menu.menu_id === menu_id
                })
                return isSelectedItem !== undefined && isSelectedItem !== null 
            }
            return false
        }
        
        $scope.roleChangeClick = function(){
            const menuIdList = $scope.selectedMenuList.map(function(menu){
                return menu.menu_id
            })
            console.log($scope.selectedMenuList.map(function(menu){
                return menu.menu_name
            }))
            const body = {menus: menuIdList};
            const url = $scope.baseUrl + "/role/menu/" + $scope.role_id
            $http.post(url, body)
            .then(function (res) {
                console.log(res)
                window.location.reload()
            })
        } 
        
        $scope.onCancel = function(){
            window.location.reload()
        }

        $scope.isHaveChirdNode = function(item) {
            return item !== undefined &&  item !== null && item.nodes !== undefined && item.nodes !== null && item.nodes.length > 0
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