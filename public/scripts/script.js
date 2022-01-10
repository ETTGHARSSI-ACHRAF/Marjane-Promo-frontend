function selectProduit(){
    document.getElementById('remise').value=""
        if(document.getElementById('rayon').value==1){
            document.getElementById('remise').setAttribute("max", "20");
        }else{
            document.getElementById('remise').setAttribute("max", "50");
        }
        axios.get('http://localhost:3000/api/listeProduit/'+document.getElementById('rayon').value)
        .then((res)=>{
            document.getElementById('produit').innerHTML="<option hidden selected></option>";
            for(var i = 0 ;i<res.data.data.length;i++){
                document.getElementById('produit').innerHTML+='<option value="'+res.data.data[i].id_prod+'">'+res.data.data[i].nom_prod+'</option>'
            }
            
        })
        .catch(err2=>(console.log(err2)));

}