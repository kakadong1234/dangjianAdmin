var app = angular.module('myApp', []);
app.controller('myCtrl',
    function ($scope, $http) {
        $(".form_datetime_start").datetimepicker({
            format: 'yyyy-mm-dd hh:ii',
            startDate: new Date(),
            autoclose: true,
        })
        $(".form_datetime_end").datetimepicker({
            format: 'yyyy-mm-dd hh:ii',
            startDate: new Date(),
            autoclose: true,
        })
        var Request = new UrlSearch(); //实例化
        $scope.username = Request.xingming;
        $scope.id = Request.id;
        $scope.isEdit = Request.isEdit;
        localStorage.setItem("login_user_name", $scope.username);
        $scope.login_user_name = localStorage.getItem("login_user_name");
        $scope.page = 1;
        $scope.questionTypeList = [
            { type: '判断题', score: 0, number: 0 },
            { type: '单选题', score: 0, number: 0 },
        ]
        $scope.load = function () {
            console.log(this);
            console.log($scope.id);
            getExamPage($scope.id);
            getInitList();
        }

        // 取消
        $scope.cancel = function () {
            window.history.go(-1);
        }
        // 编辑
        $scope.edit = function () {
            const id = $scope.id
            console.log(id)
            const questionSetting = {}
            $scope.questionTypeList.map(function (qSetting) {
                if (qSetting.type === "判断题") {
                    questionSetting.eq1_cnt = Number(qSetting.number);
                    questionSetting.eq1_val = Number(qSetting.score);
                }
                else if (qSetting.type === "单选题") {
                    questionSetting.eq2_cnt = Number(qSetting.number);
                    questionSetting.eq2_val = Number(qSetting.score);
                }
                else {
                    questionSetting.eq3_cnt = Number(qSetting.number);
                    questionSetting.eq3_val = Number(qSetting.score);
                }
                return qSetting;
            })
            console.log($scope.tags)
            const tags = $scope.tags.reduce(function (x, y) {
                return x + ',' + y
            })
            const eps_time = $(".form_datetime_start").val()
            const epe_time = $(".form_datetime_end").val()
            const data = Object.assign({
                // user_id: $scope.username,
                user_id: 'xuehaifeng', //TODO
                ep_name: $scope.ep_name,
                ep_type: $scope.ep_type,
                eps_time: eps_time,
                epe_time: epe_time,
                ep_limit: Number($scope.ep_limit),
                tags: tags,
                ep_desc: "13",
            }, questionSetting)
            console.log(data)
            editExamPage(id, data);
        }

        $scope.isTagsSelected = function (item, tags) {
            console.log(tags)
            console.log(item)
            if(tags === undefined){
                return false
            }
            // else if(tags.indexOf(",") === -1){
            //     console.log(1)
            //     return item === tags;
            // }
            // console.log(2)
            // const tagList = tags.split(",")
            // console.log(tagList.indexOf(item) !== -1)
            return tags.indexOf(item) !== -1
        }

        //获取某个考试配
        function getExamPage(id) {
            $http.get("http://api.lpszzb.gov.cn/exam/plan/" + id)
                .then(function (res) {
                    //TODO: 接口异常???
                    $scope.ep_name = res.data.ep_name;
                    $scope.ep_type = res.data.ep_type;
                    $scope.eps_time = res.data.eps_time;
                    $scope.epe_time = res.data.epe_time;
                    $scope.ep_limit = res.data.ep_limit;
                    $scope.tags = res.data.tags.indexOf(",") === -1 ? [res.data.tags] : res.data.tags.split(",");
                    $(".form_datetime_start").val = res.data.eps_time;
                    $(".form_datetime_end").val = res.data.epe_time;
                    console.log('------------------------')
                    const qList = [];
                    if(res.data.eq1_cnt !== null){
                        qList.push({ type: '判断题', score: res.data.eq1_val !== null ? res.data.eq1_val : 0 , number: res.data.eq1_cnt })
                    }
                    if(res.data.eq2_cnt !== null){
                        qList.push({ type: '单选题', score: res.data.eq2_val !== null ? res.data.eq2_val : 0 , number: res.data.eq2_cnt })
                    }
                    console.log('------------------------')
                    console.log(qList)
                    $scope.questionTypeList = qList;
                    $scope.statusTxt = res.data.status === 5 ? '已发布' : '未发布'
                
                });
        }

        function getInitList() {
            $scope.typeList = ['一试一卷', '一人一卷']
            getTags()
        }

        function editExamPage(id, data) {
            //TODO: http request
            console.log('edit')
            $http({
                method: 'post',
                url: 'http://api.lpszzb.gov.cn/exam/plan/' + id,
                data: $.param(data),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).success(function (req) {
                // window.history.go(-1);
                window.location.href = "examination_paper_list.html";
            })
        }

        function getTags() {
            $http.get("http://api.lpszzb.gov.cn/exam/tags")
                .then(function (res) {
                    //TODO: 接口异常???
                    $scope.initScopeList = res.data.rows
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