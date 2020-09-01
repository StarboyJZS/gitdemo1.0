/**
 * Created by SYT on 2016-07-31.
 */
var Box = document.getElementById("Box");
var loginBox = document.getElementById("loginBox");
var zhuceBox = document.getElementById("zhuceBox");

function login() {
    Box.style.visibility = "visible";
    loginBox.style.visibility = "visible"
    console.log("456")
}

function switchLogin() {
    Box.style.visibility = "visible";
    zhuceBox.style.visibility = "hidden";
    loginBox.style.visibility = "visible"
}

function switchZhuce() {
    Box.style.visibility = "visible";
    loginBox.style.visibility = "hidden";
    zhuceBox.style.visibility = "visible"
}

function zhuce() {
    Box.style.visibility = "visible";
    zhuceBox.style.visibility = "visible"
}

function close1() {
    console.log("123")
    Box.style.visibility = "hidden";
    loginBox.style.visibility = "hidden";
    zhuceBox.style.visibility = "hidden"
}


$(function () {
    // 登录
    var layer = layui.layer;
    $('#loginBtn').click(function () {
        let user = $('#loginUser').val();
        let pwd = $('#loginPwd').val();
        if (user.trim().length == 0) {
            layer.alert('用户名不能为空')
        } else if (pwd.trim().length == 0) {
            layer.alert('密码不能为空')
        } else {
            // loading
            var index = myloading();
            $.ajax({
                // ajax
                type: 'POST',
                url: '/userLogin',
                data: 'user=' + user + "&pwd=" + pwd,
                success: function (data) {
                    layer.close(index);
                    layer.alert(data.message);
                    if (data.code == 200) {
                        location.reload();
                        // close1();
                        // $('#user').html('<img class="userHead" src="' + data.data[0].HeadImage + '"/><span>' + user + '</span>')
                    }
                }
            })
        }
    })

    // 注册
    $('#zhuceBtn').click(function () {
        var obj = {
            'Email': '邮箱',
            'zhuceUser': '用户名',
            'zhucePwd': '密码不能为空',
            'resPwd': '确认密码不能为空'
        };
        var flag = true;
        for (var key in obj) {
            if ($('#' + key).val().trim().length == 0) {
                flag = false;
                layer.alert(obj[key] + '不能为空');
                break;
            }
        }
        if (flag) {
            var index = myloading();
            $.ajax({
                type: 'post',
                url: '/reg',
                data: $('#frmReg').serialize(),
                success: function (data) {
                    layer.close(index);
                    layer.alert(data);
                    if (data == '注册成功') {
                        switchLogin();
                    }
                }
            })
        }
    })
})


// 加载
function myloading() {
    return layer.load(2, {
        shade: [0.1, '#fff'] //0.1透明度的白色背景
    });
}