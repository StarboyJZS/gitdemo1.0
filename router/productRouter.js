const router = require('express').Router()
const db = require('./sqlHelp')

router.post('/shopcart',(req,res)=>{
    let rid = req.body.ird
    console.log(rid);
    if(req.session.user){
        let userId = req.session.info.id
        //进行判断添加后的商品是否已经存在
        let sql2 = 'select * from shopcart where UserId=? and ruleId=?'
        db.query(sql2,[userId,rid],(err2,data2)=>{
            if(err2){
                console.log(err2);
            }else{
                if(data2.length>0){
                    //存在就在原有的基础上加一
                    let sql = 'update shopcart set num=num+1 where UserId=? and ruleId=?'
                    db.query(sql,[userId,rid],(err,data)=>{
                        if(err){
                            console.log(err);
                            res.send({code:500,msg:'数据库出错'})
                        }else{
                            if(data.affectedRows>0){
                                res.send({code:200,msg:'添加成功'})
                            }else{
                                res.send({code:202,msg:'添加失败'})
                            }
                        }
                    })
                }else{
                    //不存在就插入
                    let sql = 'insert into shopcart(UserId,RuleId) values(?,?)'
                    db.query(sql,[userId,rid],(err,data)=>{
                        if(err){
                            console.log(err);
                            res.send({code:500,msg:'数据库出错'})
                        }else{
                            if(data.affectedRows>0){
                                res.send({code:200,msg:'添加成功'})
                            }else{
                                res.send({code:202,msg:'添加失败'})
                            }
                        }
                    })
                }
            }
        })

    }else{
        res.send({code:201,msg:'请先登录'})
    }

})

module.exports=router