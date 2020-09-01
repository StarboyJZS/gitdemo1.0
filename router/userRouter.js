"user strict"
const router = require('express').Router();
const db = require('./sqlHelp');
router.post('/userLogin', (req, res) => {
    let user = req.body.user;
    let pwd = req.body.pwd;
    let sql = 'select * from user where username=? and pwd=?'
    db.query(sql, [user, pwd], function (err, data) {
        if (err) {
            res.send({
                code: 500,
                message: '数据库出错'
            });
        } else {
            if (data.length > 0) {
                req.session.user = user;
                req.session.headImage=data[0].HeadImage;
                req.session.info = data[0];
                res.send({
                    code: 200,
                    message: '登陆成功',
                    data: data
                })
            } else {
                res.send({
                    code: 201,
                    message: '登陆失败'
                })
            }
        }
    })
})
router.post('/reg', (req, res) => {
    let email = req.body.Email;
    let user = req.body.user;
    let pwd = req.body.zhucePwd;
    let sql = 'insert into user(username,pwd,email) values(?,?,?)'
    db.query(sql, [user, pwd, email], function (err, data) {
        if (err) {
            res.send('数据出错')
        } else {
            if (data.affectedRows > 0) {
                res.send('注册成功')
            } else {
                res.send('注册失败')
            }
        }
    })
})
module.exports = router;