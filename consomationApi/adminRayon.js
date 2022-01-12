const { default: axios } = require("axios");
// authantifacation de Admnin de centre
exports.loginAdminRayon = (req,rese)=>{
    axios.post('http://localhost:3000/api/adminRayon/login',{

            "email_admin_rayon" : req.body.email,
            "password_admin_rayon" : req.body.password
})
.then((res)=>{
    if(res.data.success==0){
      
        rese.render('loginRayon',{err:'1'});
    }
    else{
        req.app.locals.data[2]=res.data.data.result;
        rese.redirect('/listePromoRayon')

    }
})
.catch(err=>(console.log(err)));
}

exports.listePromoRayon = (req,rese)=>{
    if(req.app.locals.data[2]){
        axios.get('http://localhost:3000/api/promo/'+req.app.locals.data[2].fk_cat)
        .then(res=>(rese.render('listePromoRayon',{name:req.app.locals.data[2].nom_admin_rayon,promos:res.data})))
        .catch(err=>(console.log(err)));
        
    }else{
        rese.redirect('/');
    }

}

exports.traitementPromo = (req,rese)=>{
    if(req.app.locals.data[2]){
        axios.post('http://localhost:3000/api/promo/validePromo',{
            statu:req.body.statu,
            commentaire:req.body.commentaire,
            id_promo_prod:req.body.id
        })
        .then(res=>(rese.redirect('/listePromoRayon')))
        .catch(err=>(console.log(err)));
        
    }else{
        rese.redirect('/');
    }
}

exports.logoutRayon = (req,rese)=>{
    req.app.locals.data[2]='';
    rese.redirect('/');
}