// page product-detail.js affiche un seul produit dynamiquement

//constantes globales
let elementCard = document.getElementById('element-card'); 
let codeError = `<div class="col text-center">
                    <h2> Error 400</h2>
                    <h3>Bad Request</h3>
                    <p>veuillez nous excuser pour la gêne occasionnée</p>
                </div>`;

//recherche de la partie id de l'url
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// requete get pour recuperer un seul objet
let teddyRequest = () => { // function teddyRequest()
    return new Promise((resolve, reject) =>{
        let request = new XMLHttpRequest();
        if (!request) {
            console.log('Abandon :( Impossible de créer une instance de XMLHTTP');
            elementCard.innerHTML =  codeError;
            return false; 
        }
        request.open('GET', "http://localhost:3000/api/teddies/"+id);//on demande à ouvrir une connexion vers notre serveur + id pour récuperer un objet.  méthode HTTP pour récuperer est GET 
        request.onreadystatechange = function () { // Pour récupérer l'état actuel de la requête, la fonction que l'on passe à  onreadystatechange  contiendra un objet  this  directement accessible dans la fonction, et qui nous permettra d'accéder aux propriétés suivantes : readyState, status, responseTexte.      
        if (request.readyState !== XMLHttpRequest.DONE) {
            return    
        }
        if (request.status !== 200) {
            reject(teddy.statusText)
        }
        let teddyChoice = JSON.parse(this.responseText);
        resolve(teddyChoice)
        }
    request.send();//on envoie finalement la requête 
    })
}

teddyRequest().then(function(teddyChoice){

    console.log(teddyChoice);
    console.log("la requête a aboutit!");

    elementCard.innerHTML = `<div class="col-12 mb-3"> 
                                                    <div class="card text-white bg-dark">
                                                        <img class="card-img-top" src="${teddyChoice.imageUrl}" alt="${teddyChoice.description}"></img>
                                                        <div class="card-body">
                                                            <h2 class="card-header"> Produit : ${teddyChoice.name} </h2>
                                                            <a class="btn btn-success col-12 col-md-3 mb-2 mt-2 float-right" href="./cart.html" id="buy" >Acheter</a>
                                                            <p>Prix : ${(teddyChoice.price/100)},00 € </p>
                                                            <p>Ref :  ${teddyChoice._id}</p>
                                                            <p>Description :  ${teddyChoice.description}</p>
                                                            <select name="color" id="select">
                                                                <option value='default' disabled 'selected'='selected'> Couleur </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>`;

    let select = document.getElementById("select");//pointe vers #select dans notre HTML
    
    for (let i in teddyChoice.colors){ //boucle for pour les couleurs
    {
    colorOption =  document.createElement('option');
    colorOption.setAttribute('value',  teddyChoice.colors[i]);
    colorOption.setAttribute('selected',  'selected');
    colorOption.innerHTML =  teddyChoice.colors[i];
    select.append(colorOption);
        }
    }

    let buttonBuy = document.getElementById('buy');//le chemin vers le bouton acheter

    buttonBuy.addEventListener('click', function() {// cliquer sur le bouton acheter pour mettre au panier le produit choisie
        let colorChoice = document.querySelector('#select').value ;// on selectionne la couleur puis on recharge la page pour avoir le bon index couleur
        window.location.reload()
        let panier = JSON.parse(localStorage.getItem('articleChoice')) || [];//on recuperer les données dans le localStorage si on en a un 
        let existingProductIndex =  panier.findIndex(Prod => Prod.id === id);// on cherche l'index du produit exisant
        let existingProduct = panier[existingProductIndex];// on stock la variable précédente pour la réutilisée dans nos conditions
        console.log(existingProductIndex);//permet de voir si on a bien récuperer le bon index
        
        let article = {"name": teddyChoice.name, "price": teddyChoice.price/100, "id": teddyChoice._id, "imageUrl": teddyChoice.imageUrl,"color": colorChoice, "qty": 1}
        if(typeof(Storage) !== "undefined") {
            if(localStorage.length === 0) { 
                panier.push(article);
                localStorage.setItem('articleChoice', JSON.stringify(panier)) || [];
                
            }else if (existingProduct && (existingProduct.color === article.color)){
        
                panier[existingProductIndex].qty = panier[existingProductIndex].qty + 1 ;
                localStorage.setItem('articleChoice', JSON.stringify(panier)) || [];
            
            } else {
                
                panier.push(article);
                localStorage.setItem('articleChoice', JSON.stringify(panier)) || [];
            }
        }
    });
}).catch((e) => {
    console.error('Il y a eu un problème avec la requête.' + teddy.statusText);
    elementCard.innerHTML =  `<div class="col text-center">
        <h2> ${request.statusText}</h2>
        <p>veuillez nous excuser pour la gêne occasionnée</p>
    </div>`;               
});
