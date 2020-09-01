const router = require('express').Router();
const db = require('./sqlHelp');
router.get('/',(req,res)=>{
    res.redirect('/index.html');
})
router.get('/index.html', async (req, res) => {
    let bannerList=await getBanner();
    let newList=await getNewList();
    if (req.session.user) {
        res.render('index', {
            user: req.session.user,
            headImage: req.session.info.HeadImage,
            lunbo: bannerList,
            newList: newList
        })
    } else {
        res.render('index', {
            user: req.session.user,
            lunbo: bannerList,
            newList: newList
        })
    }
})
function getBanner(){
    return new Promise((resolve,reject)=>{
        let sql = 'select * from banner where keyName="lun"';
        db.query(sql,[],(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}
function getNewList(){
    return new Promise((resolve, reject) =>{
        let sql2=`SELECT product.*,productrule.Id AS rid FROM product JOIN productrule ON product.Id = productrule.productId WHERE isDefault=1
        AND isNew = 1`;
        db.query(sql2,[],(err,data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}
router.get('/product.html', (req, res) => {
    res.render('product')
})
router.get('/user.html', (req, res) => {
    let sql = 'select * from user';
    db.query(sql, [], function (err, data) {
        res.render('user', {
            userList: data
        })
    })
})
router.get('/productDetail.html',(req,res)=>{
    let id = req.query.id
    let sql = 'select *,r.Id as rid from product as p join productrule as r on p.Id=r.productId  where r.Id=?'
    db.query(sql,[id],(err,data)=>{
        res.render('productDetail',{info:data[0],headImage:req.session.headImage,user:req.session.user})
    })

})
module.exports = router;
