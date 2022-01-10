// require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const queryPdg = require('./consomationApi/PDG');
const queryAdmineCentre = require('./consomationApi/adminCentre');


app.locals.data = [];

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req,res)=>{
    res.render('index');
});

// routes PDG
app.get('/pdg',(req,res)=>{
    res.render('loginPdg',{err:''});
});
app.post('/loginPdg',queryPdg.loginPdg);

app.get('/listeAdminsCentre',queryPdg.listeAdminCentre);

app.post('/lesPromosDeCentre',queryPdg.listePromosCentre);

app.get('/listePromo',queryPdg.listePromos);

app.post('/deleteAdminCentre/:id',queryPdg.deleteAdmineCentre);
app.post('/insertAdminCentre',queryPdg.addAdminCentre)


// routes ADMINE CENTRE
app.get('/adminCentre',(req,res)=>{
    res.render('loginAdmin',{err:''});
});

app.post('/loginAdmin',queryAdmineCentre.loginAdminCentre);

app.get('/listeAdminRayon',queryAdmineCentre.listeAdminRayon);
app.post('/deleteAdminRayon/:id',queryAdmineCentre.deleteAdmineRayon);
app.post('/insertAdminRayon',queryAdmineCentre.addAdminRayon);
app.get('/listePromoCentre',queryAdmineCentre.listePromosCentre);
app.post('/insertPromo',queryAdmineCentre.addPromo);
// routes admin RAyon
app.get('/adminRayon',(req,res)=>{
    res.render('loginRAyon');
});

const port = process.env.portServer || 5000;
app.listen(port,()=>{console.log(`http://localhost:${port}`);});