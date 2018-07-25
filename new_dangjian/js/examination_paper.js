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
        localStorage.setItem("login_user_name", $scope.username);
        $scope.login_user_name = localStorage.getItem("login_user_name");
        $scope.questionTypeList = [
            { type: '判断题', score: 0, number: 0 },
            { type: '单选题', score: 0, number: 0 },
        ]
        $scope.page = 1;
        $scope.load = function () {
            console.log(this)
            getExamPageList($scope.page);
            getInitList();
        }
        // 下一页
        $scope.downOnClick = function () {
            if ($scope.page < $scope.pagesLists) {
                $scope.page = $scope.page + 1;
                getExamPageList($scope.page);
            }
        }
        // 上一页
        $scope.upOnClick = function () {
            if ($scope.page > 1) {
                $scope.page = $scope.page - 1;
                getExamPageList($scope.page);
            }
        }
        // 发布
        $scope.changeStatus = function(id){
            console.log('发布/取消发布');
            const item = $scope.lists.find(function(exam){
                return exam.ep_id === Number(id);
            })
            if(item.status === 1) {
                // 未发布 --> 发布
                console.log('发布')
                send(id)
            } 
        }

        // 删除
        $scope.delete = function (id) {
            var id = Number(id)
            console.log(id)
            alert("确定删除？")
            $http.post("http://api.lpszzb.gov.cn/exam/plan/del/" + id)
                .then(function (res) {
                    console.log("已删除")
                    window.location.reload()
                })
        }

        // 详情
        $scope.onClick = function (id) {
            console.log(id)
            window.location.href = "examination_paper_edit_detail.html?id=" + id + "&isEdit=0";
        }

        // 编辑
        $scope.goToEditPage = function (id) {
            console.log(id)
            window.location.href = "examination_paper_edit_detail.html?id=" + id + "&isEdit=1";
        }

        // 创建
        $scope.goToCreatePage = function () {
            console.log(id)
            window.location.href = "examination_paper_add.html";
        }

        // 创建
        $scope.create = function () {
            console.log($scope.questionTypeList)
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
            }, questionSetting)
            console.log(data)
            createExamPage(data);
        }

        //显示试卷 -- 生成试卷, 前端可见
        $scope.showExamPage = function (id) {
            //TODO: 显示试卷 -- http request
            const examPage = $scope.lists.find(function (item) {
                return item.id === Number(id);
            })
            alert("是开启试卷" + examPage.title + "?")
            window.location.reload()
        }

        // 取消
        $scope.cancel = function () {
            window.history.go(-1);
        }

        $scope.isNoSendStatus = function(id) {
            const item = $scope.lists.find(function(exam){
                return exam.ep_id === Number(id);
            })
            return item.status === 1
        }

        //获取考试配置列表
        function getExamPageList(pageID) {
            var pageCount = 20
            $http.get("http://api.lpszzb.gov.cn/exam/plan?page=" + pageID + "&limit=" + pageCount)
                .then(function (res) {
                    //TODO: 接口异常???
                    $scope.total = res.data.total
                    $scope.pagesLists = Math.ceil($scope.total / pageCount);
                    $scope.lists = res.data.rows.map(function (item) {
                        item.statusTxt = item.status === 5 ? '已发布' : '未发布'
                        // item.sendBtnTxt = item.status === 5 ? '取消发布' : '发布'
                        return item
                    })
                    console.log($scope.lists)
                });
        }

        function getInitList() {
            $scope.typeList = ['一试一卷', '一人一卷']
            getTags()
        }

        function createExamPage(data) {
            console.log(data)
            $http({
                method: 'post',
                url: 'http://api.lpszzb.gov.cn/exam/plan',
                data: $.param(data),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).success(function (req) {
                // window.history.go(-1);
                window.location.href = "examination_paper_list.html";
            })
        }

        function send(id) {
            $http({
                method: 'post',
                url: 'http://api.lpszzb.gov.cn/exam/plan/pub',
                data: $.param({
                    ep_id: id
                }),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).success(function (req) {
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