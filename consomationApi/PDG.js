const { default: axios } = require("axios");

// ajouter Admin centre par le PDG
exports.addAdminCentre = (req,rese)=>{
    if(req.app.locals.data[0]){
        axios.post('http://localhost:3000/api/pdg/CreateAdminCentre',{
        
            "nom_admin":req.body.nom,
            "email_admin":req.body.email,
            "password_admin":req.body.password,
            "fk_centre":req.body.centre    
    })
    .then(res=>(rese.redirect('/listeAdminsCentre')))
    .catch(err=>(console.log(err)));
}else{
    resu.redirect('/');
}
    
}
// authantifacation de PDG
exports.loginPdg = (req,rese)=>{
    axios.post('http://localhost:3000/api/pdg/login',{

            "email_pdg" : req.body.email,
            "password_pdg" : req.body.password
})
.then((res)=>{
    if(res.data.success==0){
        
        rese.render('loginPdg',{err:'1'});
    }
    else{
        req.app.locals.data[0]=res.data.data.result;
        rese.redirect('/listeAdminsCentre')
    }
})
.catch(err=>(console.log(err)));
}

// afficher la liste des admin de centre et remplire select par les centre 
exports.listeAdminCentre = (req,resu)=>{
    if(req.app.locals.data[0]){
    axios.get('http://localhost:3000/api/pdg/allAdminCentre')
    // .then(res=>(resu.render('listeAdminsCentre',{admins:res.data})))
    .then((res)=>{
        axios.get('http://localhost:3000/api/centres')
        .then(res2=>(resu.render('listeAdminsCentre',{admins:res.data,centres:res2.data,name:req.app.locals.data[0].nom_pdg})))
        .catch(err2=>(console.log(err2)));
    })
    .catch(err=>(console.log(err)))
}else{
    resu.redirect('/');
}
}

// supprimer un admin de centre par le PDG
exports.deleteAdmineCentre = (req,resu)=>{
    if(req.app.locals.data[0]){
    axios.delete('http://localhost:3000/api/pdg/deleteAdminCentre/'+req.params.id)
    .then(res=>(resu.redirect('/listeAdminsCentre')))
    .catch(err=>(console.log(err)));
}else{
    resu.redirect('/');
}
}

// remplire une select par les centre est afficher la page des promo
exports.listePromos = (req,resu)=>{
    if(req.app.locals.data[0]){
    axios.get('http://localhost:3000/api/centres')
    .then(res2=>(resu.render('listePromos',{centres:res2.data,promos:'',name:req.app.locals.data[0].nom_pdg})))
    .catch(err2=>(console.log(err2)));
}else{
    resu.redirect('/');
}
}

// afficher la liste des promos d'une centre
exports.listePromosCentre = (req,resu)=>{
    if(req.app.locals.data[0]){
    axios.get('http://localhost:3000/api/centres')
    .then(res2=>(
        axios.get('http://localhost:3000/api/promosCentre/'+req.body.centre)
        .then(res3=>(resu.render('listePromos',{centres:res2.data,promos:res3.data,name:req.app.locals.data[0].nom_pdg})))
        .catch(err2=>(console.log(err2)))
        ))
    .catch(err=>(console.log(err)));
}else{
    resu.redirect('/');
}
}

exports.statistique = (req,resu)=>{

    if(req.app.locals.data[0]){
axios.get('http://localhost:3000/api/promo')
.then(res=>(resu.render('statistquePdg',{stat:res.data,name:req.app.locals.data[0].nom_pdg}),console.log(res)))
.catch(err=>(console.log(err)));
}else{
    resu.redirect('/');
}
}
exports.logout = (req,resu)=>{
    req.app.locals.data[0]='';
    resu.redirect('/');
}