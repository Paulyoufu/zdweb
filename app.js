Parties1 = new Mongo.Collection("parties1");
Parties = new Mongo.Collection("parties");
Parties2 = new Mongo.Collection("parties2");
SetCarType = new Mongo.Collection("setCarType");
//Parties = new Mongo.Collection("parties");
Players = new Mongo.Collection("players");
Parties3 = new Mongo.Collection("parties3");
Parties4 = new Mongo.Collection("parties4");

if (Meteor.isClient) {
    angular.module('socially', [
        'angular-meteor',
        'ui.router'
    ]);

    angular.module('socially').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
            $locationProvider.html5Mode(true);

            $stateProvider
                .state('parties', {
                    url: '/parties',
                    templateUrl: 'parites-list.html'
                })
                .state('partyDetails', {
                    url: '/parties/policeClient',
                    templateUrl: 'policeClient.html'
                })
                .state('setPageContent', {
                    url: '/parties/setPage',
                    templateUrl: 'setPage.html'
                })
                .state('parties1', {
                    url: '/parties/parties1',
                    templateUrl: 'parites-list01.html'
                })
                .state('parties2', {
                    url: '/parties/parties2',
                    templateUrl: 'parites-list02.html'
                }) .state('parties3', {
                    url: '/parties/parties3',
                    templateUrl: 'parites-list03.html'
                })
                .state('parties4', {
                    url: '/parties/parties4',
                    templateUrl: 'parites-list04.html'
                });

            // })

            $urlRouterProvider.otherwise("/parties");
        }
    )


    angular.module('socially').controller('PoliceClient', ['$scope', '$meteor', '$reactive',
        function ($scope, $meteor, $reactive) {

            $scope.parties = $meteor.collection(Parties);
            $scope.parties1 = $meteor.collection(Parties1);
            $scope.setCarType = $meteor.collection(SetCarType);
            $reactive(this).attach($scope);
            this.helpers({
                    setCarType: () => {
                    return SetCarType.find({});
        }
        })
            $scope.remove = function(){
                $scope.parties.remove();
            };
            $scope.removeAll = function(){
                $scope.parties.remove();
            };
            Session.setDefault("id", null);
            $scope.status = function () {
                $scope.parties1.remove();
                var $inpvalue = $("#inpvalue");
                var status = $inpvalue.val() === "true" ? false : true;
                Parties1.insert({"status": status, "disabled": false});
            }
            $scope.$on("BUSY", function(){        $scope.busy = false;
            });
            $scope.$on("NOTBUSY", function(){        $scope.busy = false;
            });
            $scope.load = function(){
                $scope.$emit("BUSY");
                // get data from server
                // ...
                // when done call $scope.$emit("NOTBUSY");
            };
            $("input").bind("click", function () {

                window.id = $(this).attr("id");
                console.log("id = " + window.id);
                Session.set("id",window.id);
            })

            $(document).on('keyup', function (e) {

                var inpVal = $("#" + window.id).val();
                var id = Session.get("id");
                if (e.keyCode === 8) {

                    if (inpVal == " " || inpVal == "") {

                        validate(id, "不能为空!", true);

                    }
                    else {
                        check(id);
                    }
                }
                else {
                    if (inpVal !== " " || inpVal !== "") {
                        console.log("ID= " + id+"-----------");

                        check(id);
                    }
                }
            });

            check = function(id) {
                switch (id) {
                    case 'type':
                        console.log("type"+$("#type").length);
                        if($("#type").val().length>6)
                        {
                            validate(id, "长度超出范围!", true);
                            console.log("type"+$("#type").val().length);
                        }

                        break;
                    case 'number':
                        if($("#number").val().length>0 && $("#number").val().length<7)
                        { validate(id, "", false);
                            console.log("type"+$("#number").val().length);
                        }
                        if($("#number").val().length>7)
                        {

                            validate(id, "长度超出范围!", true);}

                        if(!IsNum($("#number").val()))
                        {
                            validate(id, "请输入数字!", true);
                        }
                        break;
                    case 'count':
                        if($("#count").val().length>0 && $("#count").val().length<3)
                        { validate(id, "", false);}
                        if(parseInt($("#count").val())>99)
                        {validate(id, "数值超出范围!", true);}
                        break;
                    case 'points':
                        if($("#points").val().length>0 && $("#points").val().length<3)
                        { validate(id, "", false);}
                        if(parseInt($("#points").val())>12)
                        {validate(id, "数值超出范围!", true);}

                        if(!IsNum($("#points").val()))
                        {
                            validate(id, "请输入数字!", true);
                        }
                        break;
                    case 'tel':
                        if($("#tel").val().length>0 && $("#tel").val().length<12)
                        { validate(id, "", false);}
                        if($("#tel").val().length>11)
                        { validate(id, "长度超出范围!", true);}

                        if(!IsNum($("#tel").val()))
                        {
                            validate(id, "请输入数字!", true);
                        }
                        break;
                }
            }
            function IsNum(num){    //验证是否为数字
                var reNum=/^\d*$/;
                return(reNum.test(num));
            }

            validate = function (id, mv, status) {
                switch (id) {
                    case 'type':
                        data();
                        Parties.update({_id: $scope.parties[0]._id}, {$set: {typeValidate: status}})
                        break;
                    case 'number':
                        data();
                        Parties.update({_id: $scope.parties[0]._id}, {$set: {carNumVal: mv, numberValidate: status}})
                        break;
                    case 'count':
                        data();
                        Parties.update({_id: $scope.parties[0]._id}, {$set: {countVal: mv, countValidate: status}})
                        break;
                    case 'points':
                        data();
                        Parties.update({_id: $scope.parties[0]._id}, {$set: {pointsVal: mv, pointsValidate: status}})
                        break;
                    case 'tel':
                        data();
                        Parties.update({_id: $scope.parties[0]._id}, {$set: {telVal: mv, telValidate: status}})
                        break;
                }
            }


            validatePC = function (id, status) {
                //  alert($scope.parties[0]._id);
                console.log("status ====" + status);
                switch (id) {
                    case 'type':
                        data();
                        Parties.update({_id: $scope.parties[0]._id}, {$set: {typeValidate: status}})
                        break;
                    case 'number':
                        data();
                        Parties.update({_id: $scope.parties[0]._id}, {$set: {numberValidate: status}})
                        break;
                    case 'count':
                        data();
                        //   console.log(updateText+"   222-----------------");
                        Parties.update({_id: $scope.parties[0]._id}, {$set: {countValidate: status}})
                        break;
                    case 'points':
                        data();
                        Parties.update({_id: $scope.parties[0]._id}, {$set: {pointsValidate: status}})
                        break;
                    case 'tel':
                        data();
                        Parties.update({_id: $scope.parties[0]._id}, {$set: {telValidate: status}})
                        break;
                }
            }

            $("#chooseBigCarPC img").click(function () {
                data();
                Parties.update({_id: $scope.parties[0]._id}, {$set: {smallCar: false, bigCar: true, other: false}})
            })

            $("#chooseSamllCarPC img").click(function () {
                data();
                Parties.update({_id: $scope.parties[0]._id}, {$set: {smallCar: true, bigCar: false, other: false}})
            })

            $("#chooseOtherPC img").click(function () {
                data();
                Parties.update({_id: $scope.parties[0]._id}, {$set: {smallCar: false, bigCar: false, other: true}})
            })

            $("#btnClose").bind("click", function () {
                $("#provicePC").toggle();
            })

            $("#chooseProvicePC").bind("click", function () {
                $("#provicePC").toggle();
            })

            $("#provicePC a").not("#btnClose").bind("click", function () {
                $("#chooseProvicePC").text($(this).text());
                data();
                Parties.update({_id: $scope.parties[0]._id}, {$set: {'provice': $(this).text()}})
            })

            $scope.selType = function ($index) {
                data();
                $("#getSelValPC").text($("#selTypePC li:eq(" + $index + ")").text());
                Parties.update({_id: $scope.parties[0]._id}, {$set: {'otherType': $("#selTypePC li:eq(" + $index + ")").text()}})
            }

            data = function () {
                if (Parties.find().count() === 0) {

                    var parties = [
                        {
                            'type': '',
                            'number': '',
                            'count': '',
                            'points': '',
                            'telnumber': '',
                            'status': '',
                        }
                    ];

                    for (var i = 0; i < parties.length; i++)
                        Parties.insert(parties[i]);
                }
            }
            $scope.inputing = function () {

            }

        }]);


    angular.module('socially').controller('setPage', ['$scope', '$meteor', '$reactive',
        function ($scope, $meteor, $reactive) {
            $reactive(this).attach($scope);
            $scope.setCarType = $meteor.collection(SetCarType);
            Session.setDefault("id",null);
            Session.setDefault("type",null);
            var availableTags = [
                "重型卡车",
                "大挂",
                "特种车辆",
                "公交车",
                "工程车辆",
                "拖车",
                "消防车",
                "厢式货车",
                "自卸货车",
                "油罐车",
                "农用汽车",
                "平板拖车",
                "微型货车",
                "扫路车",
                "普通货车"
            ];
            $("#tags").autocomplete({
                source: availableTags
            });

            this.helpers({
                    setCarType: () => {
                    return SetCarType.find({});
        }
        })

            $("#btnSummit").on("click",function(){

                if($("#inpCar").val()==""){return;}
                var count = SetCarType.find({type:$("#inpCar").val()}).count();

                if(count>0)
                {
                    alert("车型已经存在!");

                }
                else
                {
                    SetCarType.insert({type:$("#inpCar").val()});

                }


            })

            $scope.del = function(str,id) {
                var r=confirm("是否要删除车辆类型?")
                if (r==true)
                {
                    SetCarType.remove({_id: id},{type:str});
                }
            }
            $scope.change = function(str,id)
            {
                // alert("123456"+str+id);
                Session.set("id",id)
                Session.set("type",str)
                $("#divChange").show();
                //  alert(Session.get("type"));
            }
            $("#btnCancel").on("click",function(){

                $("#divChange").hide();
            });
            $("#btnSave").on("click",function()
                {
                    var count = SetCarType.find({type:$("#type").val()}).count();

                    if(count>0)
                    {
                        alert("车型已经存在!");

                    }
                    else{

                        SetCarType.update({_id: Session.get("id")},{type:$("#type").val()});
                    }

                    $("#divChange").hide();
                }
            )

        }]);


    angular.module('socially').controller('PartiesListCtrl', ['$scope', '$meteor', '$reactive',
        function ($scope, $meteor, $reactive) {
            $scope.parties = $meteor.collection(Parties);
            $scope.setCarType = $meteor.collection(SetCarType);
            $reactive(this).attach($scope);

            this.helpers({
                    setCarType: () => {
                    return SetCarType.find({});
        }
        })

            Session.setDefault("inputId", null);
            Session.setDefault("inputVal", null);
            Session.setDefault("status", false);
            Session.setDefault("keyStatus", null);
            Session.setDefault("validate", false);
            Session.setDefault("inputStatus", true);
            $scope.remove = function () {
                $scope.parties.remove();
            };

            $scope.removeAll = function () {
                $scope.parties.remove();
                dataRest();
                $(".form-group input").removeClass("inpCurrent");
            };


            $scope.status = function () {

                var validateType = $scope.parties[0].telValidate || $scope.parties[0].numberValidate || $scope.parties[0].countValidate
                    || $scope.parties[0].pointsValidate || $scope.parties[0].typeValidate;

                if (validateType )   //undefined || validateType
                {
                    if($scope.parties[0].telValidate == undefined)
                    {
                        validate("tel", "不能为空", true);
                    }
                    if($scope.parties[0].numberValidate == undefined)
                    {
                        validate("number", "不能为空", true);
                    }
                    if($scope.parties[0].countValidate == undefined)
                    {
                        validate("count", "不能为空", true);
                    }
                    if($scope.parties[0].pointsValidate == undefined)
                    {
                        validate("points", "不能为空", true);
                    }
                    if($scope.parties[0].typeValidate == undefined)
                    {
                        validate("type", "不能为空", true);
                    }

                }
                else {

                    $(".form-group input").removeClass("inpCurrent");
                    Parties.update({_id: $scope.parties[0]._id}, {$set: {status: true}})
                }
            }

            $("input").click(function () {

                $wordAtoM = $("#wordAtoM a");

                var id = $(this).attr("id");
                Session.set("inputId", id);
                //if($(this).val() == "")
                // {
                //     Session.set("inputVal", "");
                //    alert( Session.get("inputVal"));
                // }
                Session.set("inputVal", $(this).val());
                $(".form-group input").removeClass("inpCurrent");
                var inp = $("#" + Session.get("inputId"));
                inp.addClass("inpCurrent");
                if (id == 'number') {
                    Session.set("keyStatus", false);
                    $wordAtoM.removeAttr("disabled");

                }
                else {
                    Session.set("keyStatus", true);
                    $wordAtoM.attr("disabled", "disabled");

                }
            })

            $("#btnGroup a").click(function () {

                if($(this).attr("disabled") == "disabled")
                {
                    return;
                }
                var btnVal = $(this).text();
                var text = Session.get("inputVal");
                var thisId = Session.get("inputId");
                if($("#"+thisId).val() == " "){

                    Session.set("inputVal", "");

                }
                var len = text.length;
                var messValdate = "长度超出范围";
                text = text.substr(0, len - 1);
                if (btnVal === "-")
                {
                    Session.set("inputVal", text);
                    updateVal("");
                    if (text == "" || text == " ") {
                        console.log("len=" + len);
                        validate(thisId, "不能为空", true);
                        Session.set("validate", true);
                    }


                    if (len < 2 && thisId == "number") {

                        validate("number", "不能为空", true);
                    }
                    else  if (len > 7 && thisId == "number") {

                        validate(thisId, "车牌长度大于6位", true);
                    }
                    else if (len < 7 && thisId == "number") {

                        validate("number", "车牌长度不能小于6位", true);
                    }

                    else {
                        validate(thisId, "", false);
                        Session.set("validate", false);
                    }

                    if (len < 2 && thisId == "tel")
                    {

                        validate(thisId, "不能为空", true);
                    }
                    else if (len < 12 && thisId == "tel") {

                        validate(thisId, "长度不能小于11位 ", true);
                    }
                    else if (len > 12 && thisId == "tel") {

                        validate(thisId, "长度不能大于11位", true);
                    }
                    else if (len == 11 && thisId == "tel") {

                        validate(thisId, "", false);
                    }
                    else if (thisId == "count" && Number($scope.parties[0].count) > 12) {
                        //  validate(thisId, "不能大于12的整数", true);
                    }
                    else if (thisId == "points" && Number($scope.parties[0].points) > 12) {
                        validate(thisId, "不能大于12的整数", true);
                    }
                    else {
                        validate("tel", "", false);
                        Session.set("validate", false);
                    }
                }

                else {
                    updateVal(btnVal);
                    if (Session.get("keyStatus")) {
                        var regWord = /[A-Z]/g;
                        if (regWord.test(btnVal)) {
                            return;
                        }
                    }


                    if (len <0 && thisId == "number") {

                        validate(thisId, "不能为空", true);
                    }
                    else  if (len > 5 && thisId == "number") {

                        validate(thisId, "长度大于6位", true);
                    }
                    else if (len < 5 && thisId == "number") {

                        validate(thisId, "长度不能小于6位", true);
                    }
                    else if (len < 10 && thisId == "tel") {

                        validate(thisId, "长度不能小于11位 ", true);
                    }
                    else if (len > 10 && thisId == "tel") {

                        validate(thisId, "长度不能大于11位", true);
                    }
                    else if (len == 11 && thisId == "tel") {

                        validate(thisId, "", false);
                    }
                    else if (thisId == "count" && Number($scope.parties[0].count) > 12) {
                        //  validate(thisId, "不能大于12的整数", true);
                    }
                    else if (thisId == "points" && Number($scope.parties[0].points) > 12) {
                        validate(thisId, "不能大于12的整数", true);
                    }
                    else {
                        validate(thisId, "", false);
                        Session.set("validate", false);
                    }
                }

            })

            validate = function (id, mv, status) {
                switch (id) {
                    case 'type':

                        Parties.update({_id: $scope.parties[0]._id}, {$set: {typeValidate: status}})
                        break;
                    case 'number':

                        Parties.update({_id: $scope.parties[0]._id}, {$set: {carNumVal: mv, numberValidate: status}})
                        break;
                    case 'count':

                        Parties.update({_id: $scope.parties[0]._id}, {$set: {countVal: mv, countValidate: status}})
                        break;
                    case 'points':

                        Parties.update({_id: $scope.parties[0]._id}, {$set: {pointsVal: mv, pointsValidate: status}})
                        break;
                    case 'tel':

                        Parties.update({_id: $scope.parties[0]._id}, {$set: {telVal: mv, telValidate: status}})
                        break;
                }
            }




            var updateText ="";
            updateVal = function (btnVal) {

                var inputId = Session.get("inputId", $(this).attr("id"));

                updateText =  Session.get("inputVal") + btnVal;
                Session.set("inputVal", updateText);
                switch (inputId) {
                    case 'type':


                        Parties.update({_id: $scope.parties[0]._id}, {$set: {type: updateText}})
                        break;
                    case 'number':

                        Parties.update({_id: $scope.parties[0]._id}, {$set: {number: updateText}})

                        break;
                    case 'count':

                        Parties.update({_id: $scope.parties[0]._id}, {$set: {count: updateText}})

                        break;
                    case 'points':

                        Parties.update({_id: $scope.parties[0]._id}, {$set: {points: updateText}})
                        break;
                    case 'tel':

                        Parties.update({_id: $scope.parties[0]._id}, {$set: {telnumber: updateText}})
                        break;
                }
            }


            $("#btnChooseProvice").click(function () {
                $("#proviceList").toggle();
            })

            $("#proviceList a").not("#btnClose").click(function () {
                $("#btnChooseProvice").val($(this).text());

                Parties.update({_id: $scope.parties[0]._id}, {$set: {'provice': $(this).text()}})
            })

            $("#btnClose").click(function () {
                $("#proviceList").toggle();
            })

            $("#chooseMiddleCar img").click(function () {

                Parties.update({_id: $scope.parties[0]._id}, {
                    $set: {
                        smallCar: false,
                        middleCar: true,
                        bigCar: false,
                        typeValidate: false,
                        otherType:'卡车'
                    }
                })
            })


            $("#chooseSamllCar img").click(function () {

                Parties.update({_id: $scope.parties[0]._id}, {
                    $set: {
                        smallCar: true,
                        middleCar: false,
                        bigCar: false,
                        typeValidate: false,
                        other:true,
                        otherType:'卡车'
                    }
                })
            })

            $("#chooseBigCar img").click(function () {

                Parties.update({_id: $scope.parties[0]._id}, {
                    $set: {
                        smallCar: false,
                        middleCar: false,
                        bigCar: true,
                        typeValidate: false,
                        otherType:'卡车'
                    }
                })
            })

            $scope.selType = function ($index) {

                $("#getSelVal").text($("#selType li:eq(" + $index + ")").text());
                $("#getSelVal").append('<span class="caret"></span>');
                Parties.update({_id: $scope.parties[0]._id}, {$set: {'otherType': $("#selType li:eq(" + $index + ")").text()}})
            }

            dataRest = function () {
                var parties = [
                    {
                        'provice': '黑',
                        'number': '',
                        'count': '',
                        'points': '',
                        'telnumber': '',
                        'smallCar': true,
                        'middleCar':false,
                        'bigCar': false,
                        'otherType': '卡车',
                        'typeValidate': false,
                        'numberValidate': false,
                        'countValidate': false,
                        'pointsValidate': false,
                        'telValidate': false,
                        'carNumVal': "超出长度",
                        'telVal': "电话号超出长度",
                        'pointsVal': "0-12分之间",
                        'carTypeVal': '车的类型',
                        'countVal': "不能为空",
                        'policeIsOk':'false',
                        'status':false
                    }
                ];
                // Session.set("inputVal","");
                if(Parties.find().count() === 0)
                {
                    for (var i = 0; i < parties.length; i++)
                        Parties.insert(parties[i]);
                }

            }
        }]);


    angular.module('socially').controller('PartiesListCtrl01', ['$scope', '$meteor', '$reactive',
        function ($scope, $meteor, $reactive) {
            $scope.parties1 = $meteor.collection(Parties1);
            $scope.setCarType = $meteor.collection(SetCarType);
            $reactive(this).attach($scope);

            this.helpers({
                    setCarType: () => {
                    return SetCarType.find({});
        }
        })

            Session.setDefault("inputId1", null);
            Session.setDefault("inputVal1", null);
            Session.setDefault("status1", false);
            Session.setDefault("keyStatus1", null);
            Session.setDefault("validate1", false);
            Session.setDefault("inputStatus1", true);
            $scope.remove = function () {
                $scope.parties1.remove();
            };

            $scope.removeAll = function () {
                $scope.parties1.remove();
                dataRest();
                $(".form-group input").removeClass("inpCurrent");
            };


            $scope.status = function () {

                var validateType = $scope.parties1[0].telValidate || $scope.parties1[0].numberValidate || $scope.parties1[0].countValidate
                    || $scope.parties1[0].pointsValidate || $scope.parties1[0].typeValidate;

                if (validateType )   //undefined || validateType
                {
                    if($scope.parties1[0].telValidate == undefined)
                    {
                        validate("tel", "不能为空", true);
                    }
                    if($scope.parties1[0].numberValidate == undefined)
                    {
                        validate("number", "不能为空", true);
                    }
                    if($scope.parties1[0].countValidate == undefined)
                    {
                        validate("count", "不能为空", true);
                    }
                    if($scope.parties1[0].pointsValidate == undefined)
                    {
                        validate("points", "不能为空", true);
                    }
                    if($scope.parties1[0].typeValidate == undefined)
                    {
                        validate("type", "不能为空", true);
                    }

                }
                else {

                    $(".form-group input").removeClass("inpCurrent");
                    Parties1.update({_id: $scope.parties1[0]._id}, {$set: {status: true}})
                }
            }

            $("input").click(function () {

                $wordAtoM = $("#wordAtoM a");

                var id = $(this).attr("id");
                Session.set("inputId1", id);
                //if($(this).val() == "")
                // {
                //     Session.set("inputVal", "");

                // }
                Session.set("inputVal1", $(this).val());
                $(".form-group input").removeClass("inpCurrent");
                var inp = $("#" + Session.get("inputId1"));

                inp.addClass("inpCurrent");
                if (id == 'number') {
                    Session.set("keyStatus1", false);
                    $wordAtoM.removeAttr("disabled");

                }
                else {
                    Session.set("keyStatus1", true);
                    $wordAtoM.attr("disabled", "disabled");

                }
            })

            $("#btnGroup a").click(function () {

                if($(this).attr("disabled") == "disabled")
                {
                    return;
                }
                var btnVal = $(this).text();
                var text = Session.get("inputVal1");
                var thisId = Session.get("inputId1");
                if($("#"+thisId).val() == " "){

                    Session.set("inputVal1", "");

                }
                var len = text.length;
                var messValdate = "长度超出范围";
                text = text.substr(0, len - 1);
                if (btnVal === "-")
                {
                    Session.set("inputVal1", text);
                    updateVal("");
                    if (text == "" || text == " ") {
                        console.log("len=" + len);
                        validate(thisId, "不能为空", true);
                        Session.set("validate1", true);
                    }


                    if (len < 2 && thisId == "number") {

                        validate("number", "不能为空", true);
                    }
                    else  if (len > 7 && thisId == "number") {

                        validate(thisId, "车牌长度大于6位", true);
                    }
                    else if (len < 7 && thisId == "number") {

                        validate("number", "车牌长度不能小于6位", true);
                    }

                    else {
                        validate(thisId, "", false);
                        Session.set("validate1", false);
                    }

                    if (len < 2 && thisId == "tel")
                    {

                        validate(thisId, "不能为空", true);
                    }
                    else if (len < 12 && thisId == "tel") {

                        validate(thisId, "长度不能小于11位 ", true);
                    }
                    else if (len > 12 && thisId == "tel") {

                        validate(thisId, "长度不能大于11位", true);
                    }
                    else if (len == 11 && thisId == "tel") {

                        validate(thisId, "", false);
                    }
                    else if (thisId == "count" && Number($scope.parties1[0].count) > 12) {
                        //  validate(thisId, "不能大于12的整数", true);
                    }
                    else if (thisId == "points" && Number($scope.parties1[0].points) > 12) {
                        validate(thisId, "不能大于12的整数", true);
                    }
                    else {
                        validate("tel", "", false);
                        Session.set("validate1", false);
                    }
                }

                else {
                    updateVal(btnVal);
                    if (Session.get("keyStatus1")) {
                        var regWord = /[A-Z]/g;
                        if (regWord.test(btnVal)) {
                            return;
                        }
                    }


                    if (len <0 && thisId == "number") {

                        validate(thisId, "不能为空", true);
                    }
                    else  if (len > 5 && thisId == "number") {

                        validate(thisId, "长度大于6位", true);
                    }
                    else if (len < 5 && thisId == "number") {

                        validate(thisId, "长度不能小于6位", true);
                    }
                    else if (len < 10 && thisId == "tel") {

                        validate(thisId, "长度不能小于11位 ", true);
                    }
                    else if (len > 10 && thisId == "tel") {

                        validate(thisId, "长度不能大于11位", true);
                    }
                    else if (len == 11 && thisId == "tel") {

                        validate(thisId, "", false);
                    }
                    else if (thisId == "count" && Number($scope.parties1[0].count) > 12) {
                        //  validate(thisId, "不能大于12的整数", true);
                    }
                    else if (thisId == "points" && Number($scope.parties1[0].points) > 12) {
                        validate(thisId, "不能大于12的整数", true);
                    }
                    else {
                        validate(thisId, "", false);
                        Session.set("validate1", false);
                    }
                }

            })

            validate = function (id, mv, status) {
                switch (id) {
                    case 'type':

                        Parties1.update({_id: $scope.parties1[0]._id}, {$set: {typeValidate: status}})
                        break;
                    case 'number':

                        Parties1.update({_id: $scope.parties1[0]._id}, {$set: {carNumVal: mv, numberValidate: status}})
                        break;
                    case 'count':

                        Parties1.update({_id: $scope.parties1[0]._id}, {$set: {countVal: mv, countValidate: status}})
                        break;
                    case 'points':

                        Parties1.update({_id: $scope.parties1[0]._id}, {$set: {pointsVal: mv, pointsValidate: status}})
                        break;
                    case 'tel':

                        Parties1.update({_id: $scope.parties1[0]._id}, {$set: {telVal: mv, telValidate: status}})
                        break;
                }
            }




            var updateText ="";
            updateVal = function (btnVal) {

                var inputId = Session.get("inputId1", $(this).attr("id"));

                updateText =  Session.get("inputVal1") + btnVal;
                Session.set("inputVal1", updateText);
                switch (inputId) {
                    case 'type':


                        Parties1.update({_id: $scope.parties1[0]._id}, {$set: {type: updateText}})
                        break;
                    case 'number':

                        Parties1.update({_id: $scope.parties1[0]._id}, {$set: {number: updateText}})

                        break;
                    case 'count':

                        Parties1.update({_id: $scope.parties1[0]._id}, {$set: {count: updateText}})

                        break;
                    case 'points':

                        Parties1.update({_id: $scope.parties1[0]._id}, {$set: {points: updateText}})
                        break;
                    case 'tel':

                        Parties1.update({_id: $scope.parties1[0]._id}, {$set: {telnumber: updateText}})
                        break;
                }
            }


            $("#btnChooseProvice").click(function () {
                $("#proviceList").toggle();
            })

            $("#proviceList a").not("#btnClose").click(function () {
                $("#btnChooseProvice").val($(this).text());

                Parties1.update({_id: $scope.parties1[0]._id}, {$set: {'provice': $(this).text()}})
            })

            $("#btnClose").click(function () {
                $("#proviceList").toggle();
            })

            $("#chooseMiddleCar img").click(function () {

                Parties1.update({_id: $scope.parties1[0]._id}, {
                    $set: {
                        smallCar: false,
                        middleCar: true,
                        bigCar: false,
                        typeValidate: false,
                        otherType:'卡车'
                    }
                })
            })


            $("#chooseSamllCar img").click(function () {

                Parties1.update({_id: $scope.parties1[0]._id}, {
                    $set: {
                        smallCar: true,
                        middleCar: false,
                        bigCar: false,
                        typeValidate: false,
                        other:true,
                        otherType:'卡车'
                    }
                })
            })

            $("#chooseBigCar img").click(function () {

                Parties1.update({_id: $scope.parties1[0]._id}, {
                    $set: {
                        smallCar: false,
                        middleCar: false,
                        bigCar: true,
                        typeValidate: false,
                        otherType:'卡车'
                    }
                })
            })

            $scope.selType = function ($index) {

                $("#getSelVal").text($("#selType li:eq(" + $index + ")").text());
                $("#getSelVal").append('<span class="caret"></span>');
                Parties1.update({_id: $scope.parties1[0]._id}, {$set: {'otherType': $("#selType li:eq(" + $index + ")").text()}})
            }

            dataRest = function () {
                var parties1 = [
                    {
                        'provice': '黑',
                        'number': '',
                        'count': '',
                        'points': '',
                        'telnumber': '',
                        'smallCar': true,
                        'middleCar':false,
                        'bigCar': false,
                        'otherType': '卡车',
                        'typeValidate': false,
                        'numberValidate': false,
                        'countValidate': false,
                        'pointsValidate': false,
                        'telValidate': false,
                        'carNumVal': "超出长度",
                        'telVal': "电话号超出长度",
                        'pointsVal': "0-12分之间",
                        'carTypeVal': '车的类型',
                        'countVal': "不能为空",
                        'policeIsOk':'false',
                        'status':false
                    }
                ];
                // Session.set("inputVal","");
                if(Parties1.find().count() === 0)
                {
                    for (var i = 0; i < parties1.length; i++)
                        Parties1.insert(parties1[i]);
                }

            }
        }]);




    /**
     * Created by paul on 16/11/10.
     */
    angular.module('socially').controller('PartiesListCtrl02', ['$scope', '$meteor', '$reactive',
        function ($scope, $meteor, $reactive) {
            $scope.parties2 = $meteor.collection(Parties2);
            $scope.setCarType = $meteor.collection(SetCarType);
            $reactive(this).attach($scope);

            this.helpers({
                    setCarType: () => {
                    return SetCarType.find({});
        }
        })

            Session.setDefault("inputId2", null);
            Session.setDefault("inputVal2", null);
            Session.setDefault("status2", false);
            Session.setDefault("keystatus2", null);
            Session.setDefault("validate2", false);
            Session.setDefault("inputstatus2", true);
            $scope.remove = function () {
                $scope.parties2.remove();
            };

            $scope.removeAll = function () {
                $scope.parties2.remove();
                dataRest();
                $(".form-group input").removeClass("inpCurrent");
            };


            $scope.status = function () {

                var validateType = $scope.parties2[0].telValidate || $scope.parties2[0].numberValidate || $scope.parties2[0].countValidate
                    || $scope.parties2[0].pointsValidate || $scope.parties2[0].typeValidate;

                if (validateType )   //undefined || validateType
                {
                    if($scope.parties2[0].telValidate == undefined)
                    {
                        validate("tel", "不能为空", true);
                    }
                    if($scope.parties2[0].numberValidate == undefined)
                    {
                        validate("number", "不能为空", true);
                    }
                    if($scope.parties2[0].countValidate == undefined)
                    {
                        validate("count", "不能为空", true);
                    }
                    if($scope.parties2[0].pointsValidate == undefined)
                    {
                        validate("points", "不能为空", true);
                    }
                    if($scope.parties2[0].typeValidate == undefined)
                    {
                        validate("type", "不能为空", true);
                    }

                }
                else {

                    $(".form-group input").removeClass("inpCurrent");
                    parties2.update({_id: $scope.parties2[0]._id}, {$set: {status: true}})
                }
            }

            $("input").click(function () {

                $wordAtoM = $("#wordAtoM a");

                var id = $(this).attr("id");
                Session.set("inputId2", id);
                //if($(this).val() == "")
                // {
                //     Session.set("inputVal", "");

                // }
                Session.set("inputVal2", $(this).val());
                $(".form-group input").removeClass("inpCurrent");
                var inp = $("#" + Session.get("inputId2"));
              //  alert( Session.get("inputId2"));
                inp.addClass("inpCurrent");
                if (id == 'number') {
                    Session.set("keystatus2", false);
                    $wordAtoM.removeAttr("disabled");

                }
                else {
                    Session.set("keystatus2", true);
                    $wordAtoM.attr("disabled", "disabled");

                }
            })

            $("#btnGroup a").click(function () {

                if($(this).attr("disabled") == "disabled")
                {
                    return;
                }
                var btnVal = $(this).text();
                var text = Session.get("inputVal2");
                var thisId = Session.get("inputId2");
                if($("#"+thisId).val() == " "){

                    Session.set("inputVal2", "");
                }
                var len = text.length;
                var messValdate = "长度超出范围";
                text = text.substr(0, len - 1);
                if (btnVal === "-")
                {
                    Session.set("inputVal2", text);
                    updateVal("");
                    if (text == "" || text == " ") {
                        console.log("len=" + len);
                        validate(thisId, "不能为空", true);
                        Session.set("validate2", true);
                    }


                    if (len < 2 && thisId == "number") {

                        validate("number", "不能为空", true);
                    }
                    else  if (len > 7 && thisId == "number") {

                        validate(thisId, "车牌长度大于6位", true);
                    }
                    else if (len < 7 && thisId == "number") {

                        validate("number", "车牌长度不能小于6位", true);
                    }

                    else {
                        validate(thisId, "", false);
                        Session.set("validate2", false);
                    }

                    if (len < 2 && thisId == "tel")
                    {

                        validate(thisId, "不能为空", true);
                    }
                    else if (len < 12 && thisId == "tel") {

                        validate(thisId, "长度不能小于11位 ", true);
                    }
                    else if (len > 12 && thisId == "tel") {

                        validate(thisId, "长度不能大于11位", true);
                    }
                    else if (len == 11 && thisId == "tel") {

                        validate(thisId, "", false);
                    }
                    else if (thisId == "count" && Number($scope.parties2[0].count) > 12) {
                        //  validate(thisId, "不能大于12的整数", true);
                    }
                    else if (thisId == "points" && Number($scope.parties2[0].points) > 12) {
                        validate(thisId, "不能大于12的整数", true);
                    }
                    else {
                        validate("tel", "", false);
                        Session.set("validate2", false);
                    }
                }

                else {
                    updateVal(btnVal);
                    if (Session.get("keystatus2")) {
                        var regWord = /[A-Z]/g;
                        if (regWord.test(btnVal)) {
                            return;
                        }
                    }


                    if (len <0 && thisId == "number") {

                        validate(thisId, "不能为空", true);
                    }
                    else  if (len > 5 && thisId == "number") {

                        validate(thisId, "长度大于6位", true);
                    }
                    else if (len < 5 && thisId == "number") {

                        validate(thisId, "长度不能小于6位", true);
                    }
                    else if (len < 10 && thisId == "tel") {

                        validate(thisId, "长度不能小于11位 ", true);
                    }
                    else if (len > 10 && thisId == "tel") {

                        validate(thisId, "长度不能大于11位", true);
                    }
                    else if (len == 11 && thisId == "tel") {

                        validate(thisId, "", false);
                    }
                    else if (thisId == "count" && Number($scope.parties2[0].count) > 12) {
                        //  validate(thisId, "不能大于12的整数", true);
                    }
                    else if (thisId == "points" && Number($scope.parties2[0].points) > 12) {
                        validate(thisId, "不能大于12的整数", true);
                    }
                    else {
                        validate(thisId, "", false);
                        Session.set("validate2", false);
                    }
                }

            })

            validate = function (id, mv, status) {
                switch (id) {
                    case 'type':

                        Parties2.update({_id: $scope.parties2[0]._id}, {$set: {typeValidate: status}})
                        break;
                    case 'number':

                        Parties2.update({_id: $scope.parties2[0]._id}, {$set: {carNumVal: mv, numberValidate: status}})
                        break;
                    case 'count':

                        Parties2.update({_id: $scope.parties2[0]._id}, {$set: {countVal: mv, countValidate: status}})
                        break;
                    case 'points':

                        Parties2.update({_id: $scope.parties2[0]._id}, {$set: {pointsVal: mv, pointsValidate: status}})
                        break;
                    case 'tel':

                        Parties2.update({_id: $scope.parties2[0]._id}, {$set: {telVal: mv, telValidate: status}})
                        break;
                }
            }




            var updateText ="";
            updateVal = function (btnVal) {

                var inputId = Session.get("inputId2", $(this).attr("id"));

                updateText =  Session.get("inputVal2") + btnVal;
                Session.set("inputVal2", updateText);
                switch (inputId) {
                    case 'type':


                        Parties2.update({_id: $scope.parties2[0]._id}, {$set: {type: updateText}})
                        break;
                    case 'number':

                        Parties2.update({_id: $scope.parties2[0]._id}, {$set: {number: updateText}})

                        break;
                    case 'count':

                        Parties2.update({_id: $scope.parties2[0]._id}, {$set: {count: updateText}})

                        break;
                    case 'points':

                        Parties2.update({_id: $scope.parties2[0]._id}, {$set: {points: updateText}})
                        break;
                    case 'tel':

                        Parties2.update({_id: $scope.parties2[0]._id}, {$set: {telnumber: updateText}})
                        break;
                }
            }


            $("#btnChooseProvice").click(function () {
                $("#proviceList").toggle();
            })

            $("#proviceList a").not("#btnClose").click(function () {
                $("#btnChooseProvice").val($(this).text());

                Parties2.update({_id: $scope.parties2[0]._id}, {$set: {'provice': $(this).text()}})
            })

            $("#btnClose").click(function () {
                $("#proviceList").toggle();
            })

            $("#chooseMiddleCar img").click(function () {

                Parties2.update({_id: $scope.parties2[0]._id}, {
                    $set: {
                        smallCar: false,
                        middleCar: true,
                        bigCar: false,
                        typeValidate: false,
                        otherType:'卡车'
                    }
                })
            })


            $("#chooseSamllCar img").click(function () {

                Parties2.update({_id: $scope.parties2[0]._id}, {
                    $set: {
                        smallCar: true,
                        middleCar: false,
                        bigCar: false,
                        typeValidate: false,
                        other:true,
                        otherType:'卡车'
                    }
                })
            })

            $("#chooseBigCar img").click(function () {

                Parties2.update({_id: $scope.parties2[0]._id}, {
                    $set: {
                        smallCar: false,
                        middleCar: false,
                        bigCar: true,
                        typeValidate: false,
                        otherType:'卡车'
                    }
                })
            })

            $scope.selType = function ($index) {

                $("#getSelVal").text($("#selType li:eq(" + $index + ")").text());
                $("#getSelVal").append('<span class="caret"></span>');
                Parties2.update({_id: $scope.parties2[0]._id}, {$set: {'otherType': $("#selType li:eq(" + $index + ")").text()}})
            }

            dataRest = function () {
                var parties2 = [
                    {
                        'provice': '黑',
                        'number': '',
                        'count': '',
                        'points': '',
                        'telnumber': '',
                        'smallCar': true,
                        'middleCar':false,
                        'bigCar': false,
                        'otherType': '卡车',
                        'typeValidate': false,
                        'numberValidate': false,
                        'countValidate': false,
                        'pointsValidate': false,
                        'telValidate': false,
                        'carNumVal': "超出长度",
                        'telVal': "电话号超出长度",
                        'pointsVal': "0-12分之间",
                        'carTypeVal': '车的类型',
                        'countVal': "不能为空",
                        'policeIsOk':'false',
                        'status':false
                    }
                ];
                // Session.set("inputVal","");
                if(Parties2.find().count() === 0)
                {
                    for (var i = 0; i < parties2.length; i++)
                        Parties2.insert(parties2[i]);
                }

            }
        }]);

    angular.module('socially').controller('PartiesListCtrl03', ['$scope', '$meteor', '$reactive',
        function ($scope, $meteor, $reactive) {
            $scope.parties3 = $meteor.collection(Parties3);
            $scope.setCarType = $meteor.collection(SetCarType);
            $reactive(this).attach($scope);

            this.helpers({
                    setCarType: () => {
                    return SetCarType.find({});
        }
        })

            Session.setDefault("inputId3", null);
            Session.setDefault("inputVal3", null);
            Session.setDefault("status3", false);
            Session.setDefault("keystatus3", null);
            Session.setDefault("validate3", false);
            Session.setDefault("inputstatus3", true);
            $scope.remove = function () {
                $scope.parties3.remove();
            };

            $scope.removeAll = function () {
                $scope.parties3.remove();
                dataRest();
                $(".form-group input").removeClass("inpCurrent");
            };


            $scope.status = function () {

                var validateType = $scope.parties3[0].telValidate || $scope.parties3[0].numberValidate || $scope.parties3[0].countValidate
                    || $scope.parties3[0].pointsValidate || $scope.parties3[0].typeValidate;

                if (validateType )   //undefined || validateType
                {
                    if($scope.parties3[0].telValidate == undefined)
                    {
                        validate("tel", "不能为空", true);
                    }
                    if($scope.parties3[0].numberValidate == undefined)
                    {
                        validate("number", "不能为空", true);
                    }
                    if($scope.parties3[0].countValidate == undefined)
                    {
                        validate("count", "不能为空", true);
                    }
                    if($scope.parties3[0].pointsValidate == undefined)
                    {
                        validate("points", "不能为空", true);
                    }
                    if($scope.parties3[0].typeValidate == undefined)
                    {
                        validate("type", "不能为空", true);
                    }

                }
                else {

                    $(".form-group input").removeClass("inpCurrent");
                    parties3.update({_id: $scope.parties3[0]._id}, {$set: {status: true}})
                }
            }

            $("input").click(function () {

                $wordAtoM = $("#wordAtoM a");

                var id = $(this).attr("id");
                Session.set("inputId3", id);
                //if($(this).val() == "")
                // {
                //     Session.set("inputVal", "");

                // }
                Session.set("inputVal3", $(this).val());
                $(".form-group input").removeClass("inpCurrent");
                var inp = $("#" + Session.get("inputId3"));
                //  alert( Session.get("inputId3"));
                inp.addClass("inpCurrent");
                if (id == 'number') {
                    Session.set("keystatus3", false);
                    $wordAtoM.removeAttr("disabled");

                }
                else {
                    Session.set("keystatus3", true);
                    $wordAtoM.attr("disabled", "disabled");

                }
            })

            $("#btnGroup a").click(function () {

                if($(this).attr("disabled") == "disabled")
                {
                    return;
                }
                var btnVal = $(this).text();
                var text = Session.get("inputVal3");
                var thisId = Session.get("inputId3");
                if($("#"+thisId).val() == " "){

                    Session.set("inputVal3", "");
                }
                var len = text.length;
                var messValdate = "长度超出范围";
                text = text.substr(0, len - 1);
                if (btnVal === "-")
                {
                    Session.set("inputVal3", text);
                    updateVal("");
                    if (text == "" || text == " ") {
                        console.log("len=" + len);
                        validate(thisId, "不能为空", true);
                        Session.set("validate3", true);
                    }


                    if (len < 2 && thisId == "number") {

                        validate("number", "不能为空", true);
                    }
                    else  if (len > 7 && thisId == "number") {

                        validate(thisId, "车牌长度大于6位", true);
                    }
                    else if (len < 7 && thisId == "number") {

                        validate("number", "车牌长度不能小于6位", true);
                    }

                    else {
                        validate(thisId, "", false);
                        Session.set("validate3", false);
                    }

                    if (len < 2 && thisId == "tel")
                    {

                        validate(thisId, "不能为空", true);
                    }
                    else if (len < 12 && thisId == "tel") {

                        validate(thisId, "长度不能小于11位 ", true);
                    }
                    else if (len > 12 && thisId == "tel") {

                        validate(thisId, "长度不能大于11位", true);
                    }
                    else if (len == 11 && thisId == "tel") {

                        validate(thisId, "", false);
                    }
                    else if (thisId == "count" && Number($scope.parties3[0].count) > 12) {
                        //  validate(thisId, "不能大于12的整数", true);
                    }
                    else if (thisId == "points" && Number($scope.parties3[0].points) > 12) {
                        validate(thisId, "不能大于12的整数", true);
                    }
                    else {
                        validate("tel", "", false);
                        Session.set("validate3", false);
                    }
                }

                else {
                    updateVal(btnVal);
                    if (Session.get("keystatus3")) {
                        var regWord = /[A-Z]/g;
                        if (regWord.test(btnVal)) {
                            return;
                        }
                    }


                    if (len <0 && thisId == "number") {

                        validate(thisId, "不能为空", true);
                    }
                    else  if (len > 5 && thisId == "number") {

                        validate(thisId, "长度大于6位", true);
                    }
                    else if (len < 5 && thisId == "number") {

                        validate(thisId, "长度不能小于6位", true);
                    }
                    else if (len < 10 && thisId == "tel") {

                        validate(thisId, "长度不能小于11位 ", true);
                    }
                    else if (len > 10 && thisId == "tel") {

                        validate(thisId, "长度不能大于11位", true);
                    }
                    else if (len == 11 && thisId == "tel") {

                        validate(thisId, "", false);
                    }
                    else if (thisId == "count" && Number($scope.parties3[0].count) > 12) {
                        //  validate(thisId, "不能大于12的整数", true);
                    }
                    else if (thisId == "points" && Number($scope.parties3[0].points) > 12) {
                        validate(thisId, "不能大于12的整数", true);
                    }
                    else {
                        validate(thisId, "", false);
                        Session.set("validate3", false);
                    }
                }

            })

            validate = function (id, mv, status) {
                switch (id) {
                    case 'type':

                        Parties3.update({_id: $scope.parties3[0]._id}, {$set: {typeValidate: status}})
                        break;
                    case 'number':

                        Parties3.update({_id: $scope.parties3[0]._id}, {$set: {carNumVal: mv, numberValidate: status}})
                        break;
                    case 'count':

                        Parties3.update({_id: $scope.parties3[0]._id}, {$set: {countVal: mv, countValidate: status}})
                        break;
                    case 'points':

                        Parties3.update({_id: $scope.parties3[0]._id}, {$set: {pointsVal: mv, pointsValidate: status}})
                        break;
                    case 'tel':

                        Parties3.update({_id: $scope.parties3[0]._id}, {$set: {telVal: mv, telValidate: status}})
                        break;
                }
            }




            var updateText ="";
            updateVal = function (btnVal) {

                var inputId = Session.get("inputId3", $(this).attr("id"));

                updateText =  Session.get("inputVal3") + btnVal;
                Session.set("inputVal3", updateText);
                switch (inputId) {
                    case 'type':


                        Parties3.update({_id: $scope.parties3[0]._id}, {$set: {type: updateText}})
                        break;
                    case 'number':

                        Parties3.update({_id: $scope.parties3[0]._id}, {$set: {number: updateText}})

                        break;
                    case 'count':

                        Parties3.update({_id: $scope.parties3[0]._id}, {$set: {count: updateText}})

                        break;
                    case 'points':

                        Parties3.update({_id: $scope.parties3[0]._id}, {$set: {points: updateText}})
                        break;
                    case 'tel':

                        Parties3.update({_id: $scope.parties3[0]._id}, {$set: {telnumber: updateText}})
                        break;
                }
            }


            $("#btnChooseProvice").click(function () {
                $("#proviceList").toggle();
            })

            $("#proviceList a").not("#btnClose").click(function () {
                $("#btnChooseProvice").val($(this).text());

                Parties3.update({_id: $scope.parties3[0]._id}, {$set: {'provice': $(this).text()}})
            })

            $("#btnClose").click(function () {
                $("#proviceList").toggle();
            })

            $("#chooseMiddleCar img").click(function () {

                Parties3.update({_id: $scope.parties3[0]._id}, {
                    $set: {
                        smallCar: false,
                        middleCar: true,
                        bigCar: false,
                        typeValidate: false,
                        otherType:'卡车'
                    }
                })
            })


            $("#chooseSamllCar img").click(function () {

                Parties3.update({_id: $scope.parties3[0]._id}, {
                    $set: {
                        smallCar: true,
                        middleCar: false,
                        bigCar: false,
                        typeValidate: false,
                        other:true,
                        otherType:'卡车'
                    }
                })
            })

            $("#chooseBigCar img").click(function () {

                Parties3.update({_id: $scope.parties3[0]._id}, {
                    $set: {
                        smallCar: false,
                        middleCar: false,
                        bigCar: true,
                        typeValidate: false,
                        otherType:'卡车'
                    }
                })
            })

            $scope.selType = function ($index) {

                $("#getSelVal").text($("#selType li:eq(" + $index + ")").text());
                $("#getSelVal").append('<span class="caret"></span>');
                Parties3.update({_id: $scope.parties3[0]._id}, {$set: {'otherType': $("#selType li:eq(" + $index + ")").text()}})
            }

            dataRest = function () {
                var parties3 = [
                    {
                        'provice': '黑',
                        'number': '',
                        'count': '',
                        'points': '',
                        'telnumber': '',
                        'smallCar': true,
                        'middleCar':false,
                        'bigCar': false,
                        'otherType': '卡车',
                        'typeValidate': false,
                        'numberValidate': false,
                        'countValidate': false,
                        'pointsValidate': false,
                        'telValidate': false,
                        'carNumVal': "超出长度",
                        'telVal': "电话号超出长度",
                        'pointsVal': "0-12分之间",
                        'carTypeVal': '车的类型',
                        'countVal': "不能为空",
                        'policeIsOk':'false',
                        'status':false
                    }
                ];
                // Session.set("inputVal","");
                if(Parties3.find().count() === 0)
                {
                    for (var i = 0; i < parties3.length; i++)
                        Parties3.insert(parties3[i]);
                }

            }
        }]);
    angular.module('socially').controller('PartiesListCtrl04', ['$scope', '$meteor', '$reactive',
        function ($scope, $meteor, $reactive) {
            $scope.parties4 = $meteor.collection(Parties4);
            $scope.setCarType = $meteor.collection(SetCarType);
            $reactive(this).attach($scope);

            this.helpers({
                    setCarType: () => {
                    return SetCarType.find({});
        }
        })

            Session.setDefault("inputId4", null);
            Session.setDefault("inputVal4", null);
            Session.setDefault("status4", false);
            Session.setDefault("keystatus4", null);
            Session.setDefault("validate4", false);
            Session.setDefault("inputstatus4", true);
            $scope.remove = function () {
                $scope.parties4.remove();
            };

            $scope.removeAll = function () {
                $scope.parties4.remove();
                dataRest();
                $(".form-group input").removeClass("inpCurrent");
            };


            $scope.status = function () {

                var validateType = $scope.parties4[0].telValidate || $scope.parties4[0].numberValidate || $scope.parties4[0].countValidate
                    || $scope.parties4[0].pointsValidate || $scope.parties4[0].typeValidate;

                if (validateType )   //undefined || validateType
                {
                    if($scope.parties4[0].telValidate == undefined)
                    {
                        validate("tel", "不能为空", true);
                    }
                    if($scope.parties4[0].numberValidate == undefined)
                    {
                        validate("number", "不能为空", true);
                    }
                    if($scope.parties4[0].countValidate == undefined)
                    {
                        validate("count", "不能为空", true);
                    }
                    if($scope.parties4[0].pointsValidate == undefined)
                    {
                        validate("points", "不能为空", true);
                    }
                    if($scope.parties4[0].typeValidate == undefined)
                    {
                        validate("type", "不能为空", true);
                    }

                }
                else {

                    $(".form-group input").removeClass("inpCurrent");
                    parties4.update({_id: $scope.parties4[0]._id}, {$set: {status: true}})
                }
            }

            $("input").click(function () {

                $wordAtoM = $("#wordAtoM a");

                var id = $(this).attr("id");
                Session.set("inputId4", id);
                //if($(this).val() == "")
                // {
                //     Session.set("inputVal", "");

                // }
                Session.set("inputVal4", $(this).val());
                $(".form-group input").removeClass("inpCurrent");
                var inp = $("#" + Session.get("inputId4"));
                //  alert( Session.get("inputId4"));
                inp.addClass("inpCurrent");
                if (id == 'number') {
                    Session.set("keystatus4", false);
                    $wordAtoM.removeAttr("disabled");

                }
                else {
                    Session.set("keystatus4", true);
                    $wordAtoM.attr("disabled", "disabled");

                }
            })

            $("#btnGroup a").click(function () {

                if($(this).attr("disabled") == "disabled")
                {
                    return;
                }
                var btnVal = $(this).text();
                var text = Session.get("inputVal4");
                var thisId = Session.get("inputId4");
                if($("#"+thisId).val() == " "){

                    Session.set("inputVal4", "");
                }
                var len = text.length;
                var messValdate = "长度超出范围";
                text = text.substr(0, len - 1);
                if (btnVal === "-")
                {
                    Session.set("inputVal4", text);
                    updateVal("");
                    if (text == "" || text == " ") {
                        console.log("len=" + len);
                        validate(thisId, "不能为空", true);
                        Session.set("validate4", true);
                    }


                    if (len < 2 && thisId == "number") {

                        validate("number", "不能为空", true);
                    }
                    else  if (len > 7 && thisId == "number") {

                        validate(thisId, "车牌长度大于6位", true);
                    }
                    else if (len < 7 && thisId == "number") {

                        validate("number", "车牌长度不能小于6位", true);
                    }

                    else {
                        validate(thisId, "", false);
                        Session.set("validate4", false);
                    }

                    if (len < 2 && thisId == "tel")
                    {

                        validate(thisId, "不能为空", true);
                    }
                    else if (len < 12 && thisId == "tel") {

                        validate(thisId, "长度不能小于11位 ", true);
                    }
                    else if (len > 12 && thisId == "tel") {

                        validate(thisId, "长度不能大于11位", true);
                    }
                    else if (len == 11 && thisId == "tel") {

                        validate(thisId, "", false);
                    }
                    else if (thisId == "count" && Number($scope.parties4[0].count) > 12) {
                        //  validate(thisId, "不能大于12的整数", true);
                    }
                    else if (thisId == "points" && Number($scope.parties4[0].points) > 12) {
                        validate(thisId, "不能大于12的整数", true);
                    }
                    else {
                        validate("tel", "", false);
                        Session.set("validate4", false);
                    }
                }

                else {
                    updateVal(btnVal);
                    if (Session.get("keystatus4")) {
                        var regWord = /[A-Z]/g;
                        if (regWord.test(btnVal)) {
                            return;
                        }
                    }


                    if (len <0 && thisId == "number") {

                        validate(thisId, "不能为空", true);
                    }
                    else  if (len > 5 && thisId == "number") {

                        validate(thisId, "长度大于6位", true);
                    }
                    else if (len < 5 && thisId == "number") {

                        validate(thisId, "长度不能小于6位", true);
                    }
                    else if (len < 10 && thisId == "tel") {

                        validate(thisId, "长度不能小于11位 ", true);
                    }
                    else if (len > 10 && thisId == "tel") {

                        validate(thisId, "长度不能大于11位", true);
                    }
                    else if (len == 11 && thisId == "tel") {

                        validate(thisId, "", false);
                    }
                    else if (thisId == "count" && Number($scope.parties4[0].count) > 12) {
                        //  validate(thisId, "不能大于12的整数", true);
                    }
                    else if (thisId == "points" && Number($scope.parties4[0].points) > 12) {
                        validate(thisId, "不能大于12的整数", true);
                    }
                    else {
                        validate(thisId, "", false);
                        Session.set("validate4", false);
                    }
                }

            })

            validate = function (id, mv, status) {
                switch (id) {
                    case 'type':

                        Parties4.update({_id: $scope.parties4[0]._id}, {$set: {typeValidate: status}})
                        break;
                    case 'number':

                        Parties4.update({_id: $scope.parties4[0]._id}, {$set: {carNumVal: mv, numberValidate: status}})
                        break;
                    case 'count':

                        Parties4.update({_id: $scope.parties4[0]._id}, {$set: {countVal: mv, countValidate: status}})
                        break;
                    case 'points':

                        Parties4.update({_id: $scope.parties4[0]._id}, {$set: {pointsVal: mv, pointsValidate: status}})
                        break;
                    case 'tel':

                        Parties4.update({_id: $scope.parties4[0]._id}, {$set: {telVal: mv, telValidate: status}})
                        break;
                }
            }




            var updateText ="";
            updateVal = function (btnVal) {

                var inputId = Session.get("inputId4", $(this).attr("id"));

                updateText =  Session.get("inputVal4") + btnVal;
                Session.set("inputVal4", updateText);
                switch (inputId) {
                    case 'type':


                        Parties4.update({_id: $scope.parties4[0]._id}, {$set: {type: updateText}})
                        break;
                    case 'number':

                        Parties4.update({_id: $scope.parties4[0]._id}, {$set: {number: updateText}})

                        break;
                    case 'count':

                        Parties4.update({_id: $scope.parties4[0]._id}, {$set: {count: updateText}})

                        break;
                    case 'points':

                        Parties4.update({_id: $scope.parties4[0]._id}, {$set: {points: updateText}})
                        break;
                    case 'tel':

                        Parties4.update({_id: $scope.parties4[0]._id}, {$set: {telnumber: updateText}})
                        break;
                }
            }


            $("#btnChooseProvice").click(function () {
                $("#proviceList").toggle();
            })

            $("#proviceList a").not("#btnClose").click(function () {
                $("#btnChooseProvice").val($(this).text());

                Parties4.update({_id: $scope.parties4[0]._id}, {$set: {'provice': $(this).text()}})
            })

            $("#btnClose").click(function () {
                $("#proviceList").toggle();
            })

            $("#chooseMiddleCar img").click(function () {

                Parties4.update({_id: $scope.parties4[0]._id}, {
                    $set: {
                        smallCar: false,
                        middleCar: true,
                        bigCar: false,
                        typeValidate: false,
                        otherType:'卡车'
                    }
                })
            })


            $("#chooseSamllCar img").click(function () {

                Parties4.update({_id: $scope.parties4[0]._id}, {
                    $set: {
                        smallCar: true,
                        middleCar: false,
                        bigCar: false,
                        typeValidate: false,
                        other:true,
                        otherType:'卡车'
                    }
                })
            })

            $("#chooseBigCar img").click(function () {

                Parties4.update({_id: $scope.parties4[0]._id}, {
                    $set: {
                        smallCar: false,
                        middleCar: false,
                        bigCar: true,
                        typeValidate: false,
                        otherType:'卡车'
                    }
                })
            })

            $scope.selType = function ($index) {

                $("#getSelVal").text($("#selType li:eq(" + $index + ")").text());
                $("#getSelVal").append('<span class="caret"></span>');
                Parties4.update({_id: $scope.parties4[0]._id}, {$set: {'otherType': $("#selType li:eq(" + $index + ")").text()}})
            }

            dataRest = function () {
                var parties4 = [{
                        'provice': '黑',
                        'number': '',
                        'count': '',
                        'points': '',
                        'telnumber': '',
                        'smallCar': true,
                        'middleCar':false,
                        'bigCar': false,
                        'otherType': '卡车',
                        'typeValidate': false,
                        'numberValidate': false,
                        'countValidate': false,
                        'pointsValidate': false,
                        'telValidate': false,
                        'carNumVal': "超出长度",
                        'telVal': "电话号超出长度",
                        'pointsVal': "0-12分之间",
                        'carTypeVal': '车的类型',
                        'countVal': "不能为空",
                        'policeIsOk':'false',
                        'status':false
                    }];
                // Session.set("inputVal","");

                if(Parties4.find().count() === 0)
                {
                    for (var i = 0; i < parties4.length; i++)
                    {
                        Parties4.insert(parties4[i]);
                      // alert(parties4[i]+"  parties4");
                    }
                }

            }
        }]);



    function onReady() {
        angular.bootstrap(document, ['socially'], {
            strictDi: true
        });
    }


  //  if (Meteor.isCordova)
  //      angular.element(document).on("deviceready", onReady);
  //  else
  //      angular.element(document).ready(onReady);
}



if (Meteor.isServer) {
    Meteor.publish('Parties', function() {
        return Parties.find();
    });
    Meteor.publish('Parties1', function() {
        return Parties1.find();
    });
    Meteor.publish('Parties2', function() {
        return Parties2.find();
    });
    Meteor.publish('Parties3', function() {
        return Parties3.find();
    });
    Meteor.publish('Parties4', function() {
        return Parties4.find();
    });

    Meteor.methods({
        "receivedTask":function(pcNumber){

            switch(pcNumber)
            {
                case "parties":
                    Parties.Remove({});
                    break;
                case "parties1":
                    Parties1.Remove({});
                    break;
                case "parties2":
                    Parties2.Remove({});
                    break;
                case "parties3":
                    Parties3.Remove({});
                    break;
                case "parties4":
                    Parties4.Remove({});
                    break;
            }
        }
    });


    Meteor.startup(function () {
        var parties =
            [{
                'provice': '黑1',
                'number': ' 1',
                'count': '1 ',
                'points': ' 1',
                'telnumber': '1 ',
                'smallCar': true,
                'middleCar':false,
                'bigCar': false,
                'otherType': '卡车',
                'typeValidate': false,
                'numberValidate': false,
                'countValidate': false,
                'pointsValidate': false,
                'telValidate': false,
                'carNumVal': "超出长度",
                'telVal': "电话号超出长度",
                'pointsVal': "0-12分之间",
                'carTypeVal': '车的类型',
                'countVal': "不能为空",
                'policeIsOk':'false',
                'status':false
            }
        ];

        if(Parties.find().count() === 0)
        {
            for (var i = 0; i < parties.length; i++)
                Parties.insert(parties[i]);
        }

        var parties1 =
            [{
                'provice': '2黑',
                'number': '2 ',
                'count': ' 2',
                'points': ' 2',
                'telnumber': '2 ',
                'smallCar': true,
                'middleCar':false,
                'bigCar': false,
                'otherType': '卡车',
                'typeValidate': false,
                'numberValidate': false,
                'countValidate': false,
                'pointsValidate': false,
                'telValidate': false,
                'carNumVal': "超出长度",
                'telVal': "电话号超出长度",
                'pointsVal': "0-12分之间",
                'carTypeVal': '车的类型',
                'countVal': "不能为空",
                'policeIsOk':'false',
                'status':false
            }
            ];

        if(Parties1.find().count() === 0)
        {
            for (var i = 0; i < parties1.length; i++)
                Parties1.insert(parties1[i]);
        }


        var parties2 =
            [{
                'provice': '2黑',
                'number': '2 ',
                'count': ' 2',
                'points': ' 2',
                'telnumber': '2 ',
                'smallCar': true,
                'middleCar':false,
                'bigCar': false,
                'otherType': '卡车',
                'typeValidate': false,
                'numberValidate': false,
                'countValidate': false,
                'pointsValidate': false,
                'telValidate': false,
                'carNumVal': "超出长度",
                'telVal': "电话号超出长度",
                'pointsVal': "0-12分之间",
                'carTypeVal': '车的类型',
                'countVal': "不能为空",
                'policeIsOk':'false',
                'status':false
            }
            ];

        if(Parties2.find().count() === 0)
        {
            for (var i = 0; i < parties2.length; i++)
                Parties2.insert(parties2[i]);
        }

        var parties3 =
            [{
                'provice': '4黑',
                'number': '4',
                'count': '4',
                'points': '4',
                'telnumber': '4',
                'smallCar': true,
                'middleCar':false,
                'bigCar': false,
                'otherType': '卡车',
                'typeValidate': false,
                'numberValidate': false,
                'countValidate': false,
                'pointsValidate': false,
                'telValidate': false,
                'carNumVal': "超出长度",
                'telVal': "电话号超出长度",
                'pointsVal': "0-12分之间",
                'carTypeVal': '车的类型',
                'countVal': "不能为空",
                'policeIsOk':'false',
                'status':false
            }
            ];

        if(Parties3.find().count() === 0)
        {
            for (var i = 0; i < parties3.length; i++)
                Parties3.insert(parties3[i]);
        }

        var parties4 =
            [{
                'provice': '5黑',
                'number': '5',
                'count': '5',
                'points': '5',
                'telnumber': '5',
                'smallCar': true,
                'middleCar':false,
                'bigCar': false,
                'otherType': '卡车',
                'typeValidate': false,
                'numberValidate': false,
                'countValidate': false,
                'pointsValidate': false,
                'telValidate': false,
                'carNumVal': "超出长度",
                'telVal': "电话号超出长度",
                'pointsVal': "0-12分之间",
                'carTypeVal': '车的类型',
                'countVal': "不能为空",
                'policeIsOk':'false',
                'status':false
            }
            ];

        if(Parties4.find().count() === 0)
        {
            for (var i = 0; i < parties4.length; i++)
                Parties4.insert(parties4[i]);
        }
    });


    Meteor.methods({

        "removeTask":function(id){

            Parties.update({_id:id},{$set:{number:" ",count:" ",points:" ",telnumber:" ",provice:"",other:"大货车"}});
        }
    });

    Meteor.methods({
        updateStatusTask: function(parties,police,dataId,pcNumber){
            switch(pcNumber)
            {
                case "parties":
                    Parties.update({_id:dataId},{$set:{partiesIsOk: parties,policeIsOk:police}});
                    break;
                case "parties1":
                    Parties1.update({_id:dataId},{$set:{partiesIsOk: parties,policeIsOk:police}});
                    break;
                case "parties2":
                    Parties2.update({_id:dataId},{$set:{partiesIsOk: parties,policeIsOk:police}});
                    break;
                case "parties3":
                    Parties3.update({_id:dataId},{$set:{partiesIsOk: parties,policeIsOk:police}});
                    break;
                case "parties4":
                    Parties4.update({_id:dataId},{$set:{partiesIsOk: parties,policeIsOk:police}});
                    break;
            }

        }})




    Meteor.methods({
        updateTask: function(data,fields,dataId,pcNumber) {
            //  var arr = data.split("");
            console.log(pcNumber+"----------"+pcNumber);
            switch(pcNumber)
            {
                case "parties":
                    switch(fields)
                    {
                        case "number" :
                            Parties.update({_id:dataId},{$set:{number: data}});
                            break;
                        case "counts" :
                            Parties.update({_id:dataId},{$set:{count: data}});
                            break;
                        case "point" :
                            Parties.update({_id:dataId},{$set:{points: data}});
                            break;
                        case "tel" :
                            Parties.update({_id:dataId},{$set:{telnumber: data}});
                            break;
                        case "smallCar" :
                            Parties.update({_id:dataId},{$set:{smallCar: true,middleCar: false,bigCar: false}});
                            break;
                        case "middleCar" :
                            Parties.update({_id:dataId},{$set:{smallCar: false,middleCar: true,bigCar: false}});
                            break;
                        case "bigCar" :
                            Parties.update({_id:dataId},{$set:{smallCar: false,middleCar: false,bigCar: true}});
                            break;
                        case "provice":
                            Parties.update({_id:dataId},{$set:{provice: data}});
                            break;
                        case "otherType" :
                            Parties.update({_id:dataId},{$set:{otherType: data}});
                            break;
                        case "status" :
                            Parties.update({_id:dataId},{$set:{status: Boolean(data)}});
                            break;
                        case "carNumVal":
                            Parties.update({_id:dataId},{$set:{carNumVal:""}});
                    }
                    break;
                case "parties1":
                    switch(fields)
                    {
                        case "number" :
                            Parties1.update({_id:dataId},{$set:{number: data}});
                            break;
                        case "counts" :
                            Parties1.update({_id:dataId},{$set:{count: data}});
                            break;
                        case "point" :
                            Parties1.update({_id:dataId},{$set:{points: data}});
                            break;
                        case "tel" :
                            Parties1.update({_id:dataId},{$set:{telnumber: data}});
                            break;
                        case "smallCar" :
                            Parties1.update({_id:dataId},{$set:{smallCar: true,middleCar: false,bigCar: false}});
                            break;
                        case "middleCar" :
                            Parties1.update({_id:dataId},{$set:{smallCar: false,middleCar: true,bigCar: false}});
                            break;
                        case "bigCar" :
                            Parties1.update({_id:dataId},{$set:{smallCar: false,middleCar: false,bigCar: true}});
                            break;
                        case "provice":
                            Parties1.update({_id:dataId},{$set:{provice: data}});
                            break;
                        case "otherType" :
                            Parties1.update({_id:dataId},{$set:{otherType: data}});
                            break;
                        case "status" :
                            Parties1.update({_id:dataId},{$set:{status: Boolean(data)}});
                            break;
                        case "carNumVal":
                            Parties1.update({_id:dataId},{$set:{carNumVal:""}});
                    }
                    break;
                case "parties2":
                    switch(fields)
                    {
                        case "number" :
                            Parties2.update({_id:dataId},{$set:{number: data}});
                            break;
                        case "counts" :
                            Parties2update({_id:dataId},{$set:{count: data}});
                            break;
                        case "point" :
                            Parties2.update({_id:dataId},{$set:{points: data}});
                            break;
                        case "tel" :
                            Parties2.update({_id:dataId},{$set:{telnumber: data}});
                            break;
                        case "smallCar" :
                            Parties2.update({_id:dataId},{$set:{smallCar: true,middleCar: false,bigCar: false}});
                            break;
                        case "middleCar" :
                            Parties2.update({_id:dataId},{$set:{smallCar: false,middleCar: true,bigCar: false}});
                            break;
                        case "bigCar" :
                            Parties2.update({_id:dataId},{$set:{smallCar: false,middleCar: false,bigCar: true}});
                            break;
                        case "provice":
                            Parties2.update({_id:dataId},{$set:{provice: data}});
                            break;
                        case "otherType" :
                            Parties2.update({_id:dataId},{$set:{otherType: data}});
                            break;
                        case "status" :
                            Parties2.update({_id:dataId},{$set:{status: Boolean(data)}});
                            break;
                        case "carNumVal":
                            Parties2.update({_id:dataId},{$set:{carNumVal:""}});
                    }
                    break;
                case "parties3":
                    switch(fields)
                    {
                        case "number" :
                            Parties3.update({_id:dataId},{$set:{number: data}});
                            break;
                        case "counts" :
                            Parties3.update({_id:dataId},{$set:{count: data}});
                            break;
                        case "point" :
                            Parties3.update({_id:dataId},{$set:{points: data}});
                            break;
                        case "tel" :
                            Parties3.update({_id:dataId},{$set:{telnumber: data}});
                            break;
                        case "smallCar" :
                            Parties3.update({_id:dataId},{$set:{smallCar: true,middleCar: false,bigCar: false}});
                            break;
                        case "middleCar" :
                            Parties3.update({_id:dataId},{$set:{smallCar: false,middleCar: true,bigCar: false}});
                            break;
                        case "bigCar" :
                            Parties3.update({_id:dataId},{$set:{smallCar: false,middleCar: false,bigCar: true}});
                            break;
                        case "provice":
                            Parties3.update({_id:dataId},{$set:{provice: data}});
                            break;
                        case "otherType" :
                            Parties3.update({_id:dataId},{$set:{otherType: data}});
                            break;
                        case "status" :
                            Parties3.update({_id:dataId},{$set:{status: Boolean(data)}});
                            break;
                        case "carNumVal":
                            Parties3.update({_id:dataId},{$set:{carNumVal:""}});
                    }
                    break;
                case "parties4":
                    switch(fields)
                    {
                        case "number" :
                            Parties4.update({_id:dataId},{$set:{number: data}});
                            break;
                        case "counts" :
                            Parties4.update({_id:dataId},{$set:{count: data}});
                            break;
                        case "point" :
                            Parties4.update({_id:dataId},{$set:{points: data}});
                            break;
                        case "tel" :
                            Parties4.update({_id:dataId},{$set:{telnumber: data}});
                            break;
                        case "smallCar" :
                            Parties4.update({_id:dataId},{$set:{smallCar: true,middleCar: false,bigCar: false}});
                            break;
                        case "middleCar" :
                            Parties4.update({_id:dataId},{$set:{smallCar: false,middleCar: true,bigCar: false}});
                            break;
                        case "bigCar" :
                            Parties4.update({_id:dataId},{$set:{smallCar: false,middleCar: false,bigCar: true}});
                            break;
                        case "provice":
                            Parties4.update({_id:dataId},{$set:{provice: data}});
                            break;
                        case "otherType" :
                            Parties4.update({_id:dataId},{$set:{otherType: data}});
                            break;
                        case "status" :
                            Parties4.update({_id:dataId},{$set:{status: Boolean(data)}});
                            break;
                        case "carNumVal":
                            Parties4.update({_id:dataId},{$set:{carNumVal:""}});
                    }
                    break;
            }

        }
    });

}





