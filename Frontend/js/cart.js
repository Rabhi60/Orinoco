// fichier panier

let elementCard = document.getElementById('element-card');// #element-cart présent dans notre HTML
let totalBuy = document.getElementById('totalBuy');

//partie produits dans le panier

async function allStorage () {
    for (let i = 0; i < localStorage.length; i++){//boucle for pour récuperer les produits dans le localStorage
        let key = localStorage.key(i)
        let totalArticleChoice = (key, JSON.parse(localStorage.getItem(key)))
        return totalArticleChoice;
    }
}allStorage().then(function(totalArticleChoice){

    for(let i in totalArticleChoice){//boucle for pour le template dans le panier
        {
        elementCard.innerHTML += `<div class="mx-auto mb-3" style="width: 65vw;" > 
                                    <div class="card text-white bg-dark">

                                        <div class="card-body">
                                            <h2 class="card-header"> Produit : ${totalArticleChoice[i].name} </h2>
                                            <img class=" my-2 mx-auto float-sm-right "  width='165' height='120'  src="${totalArticleChoice[i].imageUrl}" alt="${totalArticleChoice[i].name}"></img>
                                            <p >Prix : ${(totalArticleChoice[i].price)},00 € </p>
                                            <p id="${totalArticleChoice[i].id}">Ref :  ${totalArticleChoice[i].id}</p>
                                            <p>Couleur choisie : ${totalArticleChoice[i].color}</p>
                                            <p>Quantité :  ${totalArticleChoice[i].qty}</p>
                                            <p>Total produit : ${totalArticleChoice[i].price * totalArticleChoice[i].qty} €</p>
                                        </div>
                                    </div>
                                </div>`; 
        }
    }
});

allStorage().then(function(totalArticleChoice){
    let resultatTotalPrice = 0;
    let resultatTotalQuantité = 0;
    if (localStorage.length>=1){
        for (let i=0; i < totalArticleChoice.length; i++) {//card contenant le total des prix.
            resultatTotalPrice += (totalArticleChoice[i].price * totalArticleChoice[i].qty);
            resultatTotalQuantité += (totalArticleChoice[i].qty);
            totalBuy.innerHTML =   `<div class="mx-auto mb-3" style="width: 65vw;" > 
                                    <div class="card text-white bg-success">
                                        <h2 class="card-header"> Prix Total :  </h2>
                                        <div class="card-body" >
                                            <p>Prix total  : ${resultatTotalPrice} €</p>
                                            <p>Quantité total : ${resultatTotalQuantité} produit(s).</p>
                                            <p>Veuillez remplir le formulaire ci-dessous pour valider votre panier</p>
                                            <a class="btn btn-danger col-12  col-md-3 mb-2 mt-1 float-right" href="#" id="delete" >Vider le panier</a>
                                        </div>
                                    </div>
                                </div>`; 
                    }
            
            let buttonDelete = document.getElementById('delete');// appel de l'id delete pour le bouton supprimer
    
            buttonDelete.addEventListener('click', function(){  //function pour le bouton supprimer
                if(typeof(Storage)) {
                        if(localStorage) {
                            localStorage.clear();//supprimer le localStorage
                            window.location.reload()//rachaichir la page
                        }
                    }
                });
    
    } else {
        elementCard.innerHTML = "<h2 class='text-center'>Votre panier est vide :(</h2>";
    }
});

allStorage().then(function(totalArticleChoice){
    // partie formulaire

   (function() {
       'use strict';
        window.addEventListener('load', function() {
           // Nous allons récupérer le formulaire et lui appliquer des styles de validations.
           let forms = document.getElementsByClassName('needs-validation');
           // tant que le formulaire n'est pas valide on bloque la soumission.
           let validation = Array.prototype.filter.call(forms, function(form) {
             form.addEventListener('submit', function(event) {
               if (form.checkValidity() === false) {
                 event.preventDefault();
                 event.stopPropagation();
               }
               form.classList.add('was-validated');
             }, false);
           });
       }, false);
   })();

    // Envoi des données au serveur
    let resultatTotalPrice = 0;
        if (localStorage.length>=1){
        for (let i=0; i < totalArticleChoice.length; i++) {//card contenant le total des prix.
            resultatTotalPrice += (totalArticleChoice[i].price * totalArticleChoice[i].qty);}}
     function Send (){
        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        let address = document.getElementById('address').value;
        let city = document.getElementById('city').value;
        let email = document.getElementById('email').value;
        let contact = {'firstName': firstName,  'lastName': lastName, 'address': address,  'city': city, 'email': email};
        let products = [];
        let body = {  contact, products };

        
        
        totalArticleChoice.forEach( item => {
            products.push(item.id);
            
        })
        let orderTeddies = new XMLHttpRequest();
        orderTeddies.open('POST','http://localhost:3000/api/teddies/order');
        orderTeddies.setRequestHeader('content-type','application/json');
        orderTeddies.send(JSON.stringify(body));
        
      
       orderTeddies.onreadystatechange =  function () {
        if (this.readyState == 4 && this.status == 201) {
          let response = JSON.parse(this.responseText);
           // console.log(response);

            let order = response.orderId;
            let getLocalStorage = JSON.parse(localStorage.getItem('validate')) || [];
            getLocalStorage.push(order);
            localStorage.setItem('validate', JSON.stringify(getLocalStorage)) || [];
            getLocalStorage.push(resultatTotalPrice);
            localStorage.setItem('validate', JSON.stringify(getLocalStorage)) || [];
            for (let i = 0; i < localStorage.length; i++){//boucle for pour récuperer les produits dans le localStorage
                let key = localStorage.key(i)
                let resultatFinal = (key, JSON.parse(localStorage.getItem(key)))
                //console.log(resultatFinal);
                //return resultatFinal;
            }
        }
      }
       
     // console.log(body);
    }

    let buttonValidate = document.querySelector('#button');
    buttonValidate.addEventListener('click', function block(event){
        event.preventDefault();
       Send();
       localStorage.clear();
       setTimeout(function() {
        window.location.replace("confirmed.html");
    }, 500);
        
    })
});

     
    












