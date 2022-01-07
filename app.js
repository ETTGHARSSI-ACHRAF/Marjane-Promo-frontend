// require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const query = require('./controllers/query');


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/pdg',(req,res)=>{
    res.render('loginPdg');
});
app.get('/adminCentre',(req,res)=>{
    res.render('loginAdmin');
});
app.post('/loginPdg',query.loginPdg);
app.get('/adminRayon',(req,res)=>{
    res.render('loginRAyon');
});
app.get('/listeAdminsCentre',query.listeAdminCentre);

app.post('/lesPromosDeCentre',query.listePromosCentre);

app.get('/listePromo',query.listePromos);

app.post('/deleteAdminCentre/:id',query.deleteAdmineCentre);
app.post('/insertAdminCentre',query.addAdminCentre)

const port = process.env.portServer || 5000;
app.listen(port,()=>{console.log(`http://localhost:${port}`);});