// confirmation


    
    //let article = JSON.parse(localStorage.getItem('articleChoice'))
    //console.log(article);
  
    let numero = JSON.parse(localStorage.getItem('validate'))
    console.log(numero);
    let numeroCommande = document.getElementById('numeroCommande');
    numeroCommande.innerHTML = `Numero de commande : <span class='text-warning'>${numero[0]}€<span>`;
    let prixTotal = document.getElementById('prixTotal');
    prixTotal.innerHTML = `prix total de votre commande : <span class='text-success'>${numero[1]}€<span>`;
    localStorage.clear();