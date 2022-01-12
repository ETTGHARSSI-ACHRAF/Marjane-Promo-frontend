const { default: axios } = require("axios");

// authantifacation de Admnin de centre
exports.loginAdminCentre = (req,rese)=>{
    axios.post('http://localhost:3000/api/adminCentre/login',{

            "email_admin" : req.body.email,
            "password_admin" : req.body.password
})
.then((res)=>{
    if(res.data.success==0){
      
        rese.render('loginAdmin',{err:'1'});
    }
    else{
        req.app.locals.data[1]=res.data.data.result;
        rese.redirect('/listeAdminRayon')

    }
})
.catch(err=>(console.log(err)));
}


exports.listeAdminRayon = (req,result) =>{
    if(req.app.locals.data[1]){
        axios.get('http://localhost:3000/api/adminCentre/AllAdminRayon/'+req.app.locals.data[1].fk_centre)
    .then((res)=>{
        axios.get('http://localhost:3000/api/rayons')
        .then(res2=>(result.render('listeAdminRayon',{admins:res.data,rayons:res2.data,name:req.app.locals.data[1].nom_admin})))
        .catch(err2=>(console.log(err2)));
    })
    .catch(err=>(console.log(err)))
}else{
    result.redirect('/');
}
}

// supprimer un admin de rayon par le Admin de centre
exports.deleteAdmineRayon = (req,resu)=>{
    if(req.app.locals.data[1]){
    axios.delete('http://localhost:3000/api/adminCentre/deleteAdminRayon/'+req.params.id)
    .then(res=>(resu.redirect('/listeAdminRayon')))
    .catch(err=>(console.log(err)));
}else{
    resu.redirect('/');
}
}

// ajouter Admin rayon par admin de centre
exports.addAdminRayon = (req,rese)=>{
    if(req.app.locals.data[1]){
    axios.post('http://localhost:3000/api/adminCentre/crearteAdminRayon',{
        
            "nom_admin_rayon":req.body.nom,
            "email_admin_rayon":req.body.email,
            "password_admin_rayon":req.body.password,
            "fk_centre":req.app.locals.data[1].fk_centre,
            "fk_cat":req.body.categorie
    })
    .then(res=>(rese.redirect('/listeAdminRayon')))
    .catch(err=>(console.log(err)));
}else{
    rese.redirect('/');
}
}


// afficher la liste des promos de centre de l'admine connecter
exports.listePromosCentre = (req,resu)=>{
    if(req.app.locals.data[1]){
        axios.get('http://localhost:3000/api/promosCentre/'+req.app.locals.data[1].fk_centre)
        .then((res)=>{
                axios.get('http://localhost:3000/api/rayons')
                .then(res2=>(resu.render('listePromoCentre',{promos:res.data,name:req.app.locals.data[1].nom_admin,rayons:res2.data})))
                .catch(err2=>(console.log(err2)));
            })


        .catch(err=>(console.log(err)))
        
    }else{
        resu.redirect('/');
    }
}

exports.addPromo = (req,resu)=>{
    if(req.app.locals.data[1]){
    axios.post('http://localhost:3000/api/promo/create',{
        
        "remise":req.body.remise,
        "fk_admin":req.app.locals.data[1].id_admin,
        "fk_rayon":req.body.categorie,
        "date_debut":req.body.dateD,
        "nombreDay":req.body.jour,
        "fk_prod":req.body.produit
})
.then(res=>(resu.redirect('/listePromoCentre')))
.catch(err=>(console.log(err)));
}else{
    resu.redirect('/');
}
}

exports.statistiqueByCentre = (req,resu)=>{
    console.log(req.app.locals.data[1].fk_centre);
    if(req.app.locals.data[1]){
        axios.get('http://localhost:3000/api/promo/statistiqueCentre/'+req.app.locals.data[1].fk_centre)
        .then(res=>(resu.render('statistqueCentre',{stat:res.data,name:req.app.locals.data[1].nom_admin})))
        .catch(err=>(console.log(err)));
    }else{
        resu.redirect('/');
    }
}

exports.logoutAdmin = (req,resu)=>{
    req.app.locals.data[0]='';
    resu.redirect('/');
}


