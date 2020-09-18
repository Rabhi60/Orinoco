//Page index.js affiche les produit sur la page index et qui renvoie vers la page produit

// constante element-card  et request
let elementCard = document.getElementById('element-card');
let request;// On a déclaré la request
// requete Get pour récuperer les produits
let teddiesRequest = () => {
    return new Promise((resolve, reject) =>{// ajout d'une promise 
        request = new XMLHttpRequest();// On crée un nouvel objet de type  XMLHttpRequest  qui correspond à notre objet AJAX. C'est grâce à lui qu'on va créer et envoyer notre requête ;
        if (!request) {
            console.log('Abandon :( Impossible de créer une instance de XMLHTTP');
            elementCard.innerHTML =  `<div class="col text-center">
                <h2> Error 400 </h2>
                <p>veuillez nous excuser pour la gêne occasionnée</p>
            </div>`;
            return false;
        }
        request.open('GET', "http://localhost:3000/api/teddies/");//  on demande à ouvrir une connexion vers notre service web. Nous avons mis une méthode HTTP GET, ainsi que l'URL des teddies ;
        request.onreadystatechange = function () { // On utilise la propriété onreadystatechange  en lui passant une fonction. Cette fonction sera appelée à chaque fois que l'état de la requête évolue.
            if(request.readyState !== XMLHttpRequest.DONE) {     //readyState contient l'état de la requête ;     
                return
            } 
            if(request.status !== 200){//status contient le code de statut de la requête ( 2xx quand ça s'est bien passé, 3xx pour les redirections, 4xx pour les erreurs...) ;
                return reject(request.statusText)//si la promesse est rompue la fonction reject() va être appelée
            }
            let totalTeddies = JSON.parse(this.responseText);//contient la réponse du service web au format texte. Ainsi, si le texte que l'on attend est au format JSON, il va falloir le transformer en objet JavaScript avec la fonction  JSON.parse(texteJSON) .
            resolve(totalTeddies)//Si la promesse est tenue, la fonction resolve() sera appelée
        }
        request.send();//on envoie finalement la requête au service web.
    })
}
teddiesRequest().then(function(totalTeddies){// ici on va récupérer la réponse à notre promise avec en paramètre le contenu récuperé de la requête
    console.log(totalTeddies);
    console.log("la requête a aboutit!");
    for  (let i in totalTeddies) { //boucle for qui va récuperer les produits un à un pour créer le template de chaque teddy et avoir notre liste de produits
        elementCard.innerHTML +=    `<div class=" col-md-8 col-lg-10 my-2 mx-auto "> 
            <div class="card text-white bg-dark">
                <img class="card-img-top" src="${totalTeddies[i].imageUrl}" alt="${totalTeddies[i].description}"></img>
                <div class="card-body">
                    <h2 class="card-header"> Produit : ${totalTeddies[i].name} </h2>
                    <p class="mt-2">Prix :  ${(totalTeddies[i].price/100)},00 €</p>
                    <p>Ref :  ${totalTeddies[i]._id}</p>
                    <a class="col-12 btn btn-primary mb-2 mt-2 col-md-3 float-right" href="../Frontend/html/product-details.html?id=${totalTeddies[i]._id}">Voir le Produit</a>
                </div>
            </div>
        </div>`;
    }
}).catch((e) => {//  la méthode catch() qui va prendre une unique fonction de rappel en argument qui va être appelée si la promesse est rompue.
    console.error('Il y a eu un problème avec la requête.' + request.statusText);
    elementCard.innerHTML =  `<div class="col text-center">
        <h2> ${request.statusText}</h2>
        <p>veuillez nous excuser pour la gêne occasionnée</p>
    </div>`;
});