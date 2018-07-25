var app = angular.module('myApp', []);
app.controller('myCtrl',
    function($scope, $http,$filter) {
        $scope.page=1;
        $scope.sex = 1;
        $scope.Edit = 0;
        var Request = new UrlSearch(); //实例化
        $scope.username=Request.username;
        localStorage.setItem("login_user_name",$scope.username);
        $scope.login_user_name=localStorage.getItem("login_user_name");


       $scope.load=function () {


       }

























        var today = new Date();
        var times=$filter('date')(today, 'yyyy-MM-dd');
        $scope.date2=times.toString();
        console.log(times);
        console.log($scope.date2);


        var d=new Date();
        m = d.getMonth()+1;
        $scope.y = d.getFullYear();
        $scope.m = d.getMonth()+1;
        $scope.c = d.getDate();
        //-------------------------------------------
        var oBtn1 = document.getElementById('btn1');
        var oDate = document.getElementById('date1');
        var oBtn2 = document.getElementById('btn2');

        /* 日期初始化获取系统当前时间 */
        var tcur=showTime(0);
        $('#date1').val(tcur);

        /* 前一天 */
        $('#btn1').click(function(){
            var tcur = showTime(-1);
            $('#date1').val(tcur);
        });

        /* 后一天 */
        $('#btn2').click(function(){
            var tcur = showTime(1);
            var tcur1 = showTime();
            if(tcur>times){
                jAlert("不能填写明天的哦！")
            }else {
                $('#date1').val(tcur);
            }
        });

        function addByTransDate(dateParameter, num) {
            var translateDate = "", dateString = "", monthString = "", dayString = "";
            translateDate = dateParameter.replace("-", "/").replace("-", "/");
            var newDate = new Date(translateDate);
            newDate = newDate.valueOf();
            newDate = newDate + num * 24 * 60 * 60 * 1000;
            newDate = new Date(newDate);
            //如果月份长度少于2，则前加 0 补位
            if ((newDate.getMonth() + 1).toString().length == 1) {
                monthString = 0 + "" + (newDate.getMonth() + 1).toString();
            } else {
                monthString = (newDate.getMonth() + 1).toString();
            }
            //如果天数长度少于2，则前加 0 补位
            if (newDate.getDate().toString().length == 1) {
                dayString = 0 + "" + newDate.getDate().toString();
            } else {
                dayString = newDate.getDate().toString();
            }
            dateString = newDate.getFullYear() + "-" + monthString + "-" + dayString;
            return dateString;
        }

        function reduceByTransDate(dateParameter, num) {
            var translateDate = "", dateString = "", monthString = "", dayString = "";
            translateDate = dateParameter.replace("-", "/").replace("-", "/");
            var newDate = new Date(translateDate);
            newDate = newDate.valueOf();
            newDate = newDate - num * 24 * 60 * 60 * 1000;
            newDate = new Date(newDate);
            //如果月份长度少于2，则前加 0 补位
            if ((newDate.getMonth() + 1).toString().length == 1) {
                monthString = 0 + "" + (newDate.getMonth() + 1).toString();
            } else {
                monthString = (newDate.getMonth() + 1).toString();
            }
            //如果天数长度少于2，则前加 0 补位
            if (newDate.getDate().toString().length == 1) {
                dayString = 0 + "" + newDate.getDate().toString();
            } else {
                dayString = newDate.getDate().toString();
            }
            dateString = newDate.getFullYear() + "-" + monthString + "-" + dayString;
            return dateString;
        }

        //得到日期  主方法
        function showTime(pdVal) {
            var trans_day = "";
            var cur_date = oDate.value== "" ? new Date() : new Date($('#date1').val());/* 如果日期框内为空的话就获取系统的时间为输入框初始化赋值，如果有值（用户自己选择的时间），那就获取用户自己选择的时间 */
            var cur_year = cur_date.getFullYear();

            var cur_month = cur_date.getMonth() + 1;
            var real_date = cur_date.getDate();
            cur_month = cur_month > 9 ? cur_month : ("0" + cur_month);
            real_date = real_date > 9 ? real_date : ("0" + real_date);
            eT = cur_year + "-" + cur_month + "-" + real_date;
            if (pdVal == 1) {
                trans_day = addByTransDate(eT, 1);
            }
            else if (pdVal == -1) {
                trans_day = reduceByTransDate(eT, 1);
            }
            else {
                trans_day = eT;
            }
            //处理
            return trans_day;
        }

        /*//当前日期
        var tcur=showTime(0);
        //前一天
        var tqyt=showTime(-1);
        //后一天
        var thyt=showTime(1);*/
        $scope.OnExcel=function (account,model,type1,zhouqi) {

            console.log("/write/get.excel.php?account="+account+"&model="+model+"&type="+type1+"&zhouqi="+zhouqi);
            window.location.href="http://www.ishoubei.com/zhangshangguizhou/wechatapi/write/get.excel.php?account="+account+"&model="+model+"&type="+type1+"&zhouqi="+zhouqi;
        }
        $scope.xiugai=function (id) {
            window.location.href="taizhang_update.html?id="+id;
        }
        $scope.fullName = function(conts) {

            if(conts.length<150){
                var aa =conts
                return aa;
            }else{
                var aa =conts.substring(0,150) + "...";

                return aa;
            }

        };

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