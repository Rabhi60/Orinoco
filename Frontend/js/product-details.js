// page product-detail.js affiche un seul produit dynamiquement

//constantes globales
const elementCard = document.getElementById('element-card'); 
let request;
let codeError;    
//recherche de la partie id de l'url
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// requete get pour recuperer un seul objet
let teddyRequest = () => { // function teddyRequest()
    return new Promise((resolve, reject) =>{
        request = new XMLHttpRequest();// on crée notre requête 
        if (!request) {// si on a pas la rq
            console.log('Abandon :( Impossible de créer une instance de XMLHTTP');
            elementCard.innerHTML =  codeError;
            return false; 
        }
        request.open('GET', `http://localhost:3000/api/teddies/${id}`);//on demande à ouvrir une connexion vers notre serveur + id pour récuperer un objet.  méthode HTTP pour récuperer est GET 
        request.onreadystatechange = function () { // Pour récupérer l'état actuel de la requête, la fonction que l'on passe à  onreadystatechange  contiendra un objet  this  directement accessible dans la fonction, et qui nous permettra d'accéder aux propriétés suivantes : readyState, status, responseTexte.      
        if (request.readyState !== XMLHttpRequest.DONE) {
            return    
        }
        if (request.status !== 200) {
            codeError =  `<div class="col text-center">
                <h2>Error ${request.status}</h2>
                <h3>${request.statusText}</h3>
                <p>veuillez nous excuser pour la gêne occasionnée</p>
            </div>`;
            reject(request.statusText)
        }
        const teddyChoice = JSON.parse(this.responseText);
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

    const select = document.getElementById("select");//pointe vers #select dans notre HTML
    for (let i in teddyChoice.colors){ //boucle for pour les couleurs
    select.innerHTML += `<option value='${teddyChoice.colors[i]}' selected='selected' > ${teddyChoice.colors[i]}</option>`
    }
    sendToCart(teddyChoice);

}).catch((e) => {
    console.error('Il y a eu un problème avec la requête.' + request.statusText);
    elementCard.innerHTML =  codeError;
             
})

function sendToCart (teddyChoice)  {
    const buttonBuy = document.getElementById('buy');//le chemin vers le bouton acheter
    buttonBuy.addEventListener('click', function () {// cliquer sur le bouton acheter pour mettre au panier le produit choisie
    let colorChoice = document.querySelector('#select').value ;// on selectionne la couleur puis on recharge la page pour avoir le bon index couleur
    let panier = JSON.parse(localStorage.getItem('articleChoice')) || [];//on recuperer les données dans le localStorage si on en a un 
    let existingProductIndex =  panier.findIndex(Prod => Prod.id === id);// on cherche la position du produit exisant
    let existingProduct = panier[existingProductIndex];// on recupère le produit existant
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
}