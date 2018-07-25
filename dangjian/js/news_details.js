var app = angular.module('myApp', []);
app.controller('myCtrl',
    function($scope, $http) {
        var Request = new UrlSearch(); //实例化
        $scope.username=Request.xingming;
        localStorage.setItem("login_user_name",$scope.username);
        $scope.login_user_name=localStorage.getItem("login_user_name");
        $scope.page=1;
        $scope.status=2;
        $scope.content="历史会铭记这一时间，2017年10月18日至10月24日，中国共产党第十九次全国代表大会在北京胜利召开。党的十九大是在全面建成小康社会关键阶段、中国特色社会主义发展关键时期召开的一次十分重要的大会，对鼓舞和动员全党全国各族人民继续推进全面建成小康社会、坚持和发展中国特色社会主义具有重大意义。这次大会的召开标志着中国社会主义现代化建设进入了新时代。同时，党的十九大的胜利召开对于像我这样服务基层的大学生村官也给与了深刻的内心触动，现将学习的心得体会总结如下。<p>一、常怀感恩之心，真诚对待工作 <p>2017年10月18日上午9:00，中国共产党第十九次全国代表大会在人民大会堂开幕。习近平代表第十八届中央委员会向大会作了题为《决胜全面建成小康社会 夺取新时代中国特色社会主义伟大胜利》的报告。这场报告结束后，朋友圈不禁被刷屏：“64岁，210分钟，32440余字，全程站立无休息，没有喝一口水。没有任何人能轻松地对待工作，没有人能不用付出努力就能得到众人的青睐。目的都一样，责任都一样，只是岗位不同，共勉！”这样的画面与话语给了我内心深深的触动，我们的主席，党的新时代的领导人物，用自己的切身行动向我们传递了一种对工作认真负责的态度，给我们作出了很好的榜样。而我们，作为大学生村官，扎根基层、服务基层就是时代赋予我们的特殊使命。我们的政党是一个与人民群众血肉联系的政党，而我们中国是一个农业大国，对服务群众的政党来说就是要深入到基层去，深入到一线去。虽然工作的环境相对复杂，但就像上面说的，没有人能轻松地对待工作，我们只有常怀感恩之心，利用好国家和社会提供给我们的平台，才能干好自己的工作，真正地熟悉基层，心贴群众，促进我们的百姓，我们的乡村更好更快地发展。<p>二、常思进取之心，不断与时俱进<p>当今社会是一个不断前进与发展的社会，社会发展的各个方面正发生着深刻的变革。这就要求我们必须要有长远的眼光，常思进取之心，不断学习，才能在社会竞争中处于优势，同时用我们的先进所学、新颖观念去感染我们接触的百姓，使我们的服务对象也能跟上时代发展的步伐。例如现今的时代，网络服务已经遍布我们生产生活的各个方面。有些农民能够利用好网络提供的平台，将自家产的水果、特色产品等在网络上进行推广销售，取得了很好的成绩"
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
                $http.get("#")
                    .then(function (res) {
                        $scope.lists=res.data.rows;
                        $scope.total=res.data.total;
                        $scope.pagesLists=Math.ceil($scope.total/10);
                    });
            }


            // $scope.deletearticle=function (article_id) {
            //     var id = Number(article_id)
            //     console.log(id)
            //     alert("确定删除？")
            //     $http.delete("https://dangjain.ishoubei.com/article/"+article_id)
            //         .then(function (res) {
            //             console.log("已删除")
            //         })
            //
            // }

            $scope.onClick=function () {
                window.location.href="news_manage.html";
            }

        }
        $scope.fullName = function(conts) {

            if(conts.length<30){
                var aa =conts
                return aa;
            }else{
                var aa =conts.substring(0,30) + "...";
                return aa;
            }
        };



        // $scope.onClick = function (article_id) {
        //     console.log("djaini ")
        //     window.location.href="article_list1.html?article_id="+article_id;
        // }

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