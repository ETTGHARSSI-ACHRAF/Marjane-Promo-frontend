const { default: axios } = require("axios");
const res = require("express/lib/response");
exports.addAdminCentre = (req,rese)=>{

    axios.post('http://localhost:3000/api/pdg/CreateAdminCentre',{
        
            "nom_admin":req.body.nom,
            "email_admin":req.body.email,
            "password_admin":req.body.password,
            "fk_centre":req.body.centre
        
    })
    .then(res=>(rese.redirect('/listeAdminsCentre')))
    .catch(err=>(console.log(err)));
}

exports.loginPdg = (req,rese)=>{
    axios.post('http://localhost:3000/api/pdg/login',{

            "email_pdg" : req.body.email,
            "password_pdg" : req.body.password
})
// .then(res=>(rese.redirect('/listeAdminsCentre')))
.then((res)=>{
    if(res.data.success==0){
        res.render('loginPdg');
    }
    else{
        rese.redirect('/listeAdminsCentre')
        // console.log(res.data);
    }
})
.catch(err=>(console.log(err)));

// console.log(var1);
}
exports.listeAdminCentre = (req,resu)=>{
    axios.get('http://localhost:3000/api/pdg/allAdminCentre')
    // .then(res=>(resu.render('listeAdminsCentre',{admins:res.data})))
    .then((res)=>{
        axios.get('http://localhost:3000/api/centres')
        .then(res2=>(resu.render('listeAdminsCentre',{admins:res.data,centres:res2.data})))
        .catch(err2=>(console.log(err2)));
    })
    .catch(err=>(console.log(err)))
}
exports.deleteAdmineCentre = (req,resu)=>{
    axios.delete('http://localhost:3000/api/pdg/deleteAdminCentre/'+req.params.id)
    .then(res=>(resu.redirect('/listeAdminsCentre')))
    .catch(err=>(console.log(err)));
}
exports.listePromos = (req,resu)=>{
    axios.get('http://localhost:3000/api/centres')
    .then(res2=>(resu.render('listePromos',{centres:res2.data,promos:''})))
    .catch(err2=>(console.log(err2)));
}

exports.listePromosCentre = (req,resu)=>{
    axios.get('http://localhost:3000/api/centres')
    .then(res2=>(
        axios.get('http://localhost:3000/api/promosCentre/'+req.body.centre)
        .then(res3=>(resu.render('listePromos',{centres:res2.data,promos:res3.data})))
        .catch(err2=>(console.log(err2)))
        ))
    .catch(err=>(console.log(err)));
}

