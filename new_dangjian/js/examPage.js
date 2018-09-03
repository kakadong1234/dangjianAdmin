var app = angular.module('myApp', []);
app.controller('myCtrl',
    function ($scope, $http) {
        var Request = new UrlSearch(); //实例化
        $scope.username = Request.xingming;
        $scope.ep_id = Request.ep_id;
        localStorage.setItem("login_user_name", $scope.username);
        $scope.login_user_name = localStorage.getItem("login_user_name");
        
        $scope.page = 1;
        $scope.load = function () {
            $scope.isLoading = false
            console.log($scope.isLoading)
            //init Exam Data
            getExamData()
        }
    
        function getExamData() {
            $http({
                method: 'post',
                url: 'http://api.lpszzb.gov.cn/exam/result?ep_id=' + $scope.ep_id + '&user_id=xiaowei',
            }).success(function (res) {
                console.log(res)
                res.plan.eq2_all_score = res.plan.eq2_val * res.plan.eq2_cnt
                res.plan.eq1_all_score = res.plan.eq1_val * res.plan.eq1_cnt
                res.plan.ep_all_score = res.plan.eq2_all_score + res.plan.eq1_all_score
                $scope.plan = res.plan
                // 选择题
                $scope.eq2_obj =  getEQ2(res.eq2_obj, res.eq2_ids.split(','))
                // 判断题
                $scope.eq1_obj =  getEQ1(res.eq1_obj, res.eq1_ids.split(','))
            })

        };

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

        function getEQ2(arr, sortArr) { //index, selectItem.selectIndex selectItem.selectValue
            const list = []
            for(let i=0; i<arr.length; i++){
                console.log(sortArr[i])
                const item = arr.find(function(q){
                    return q.eq_id === Number(sortArr[i])
                })
                console.log(item)
                item.index = i + 1;
                item.selectItem = [
                    { selectIndex: 'A',selectValue: item.op_a},
                    { selectIndex: 'B',selectValue: item.op_b},
                    { selectIndex: 'C',selectValue: item.op_c},
                    { selectIndex: 'D',selectValue: item.op_d},
                ]
                list.push(item)
            }
            return list
        }

        function getEQ1(arr, sortArr) {
            const list = []
            for(let i=0; i<arr.length; i++){
                const item = arr.find(function(q){
                    return q.eq_id === Number(sortArr[i])
                })
                item.index = i + 1;
                item.selectItem = [
                    { selectIndex: 'A',selectValue: 'V'},
                    { selectIndex: 'B',selectValue: 'X'}
                ]
                list.push(item)
            }
            return list
        }
    });