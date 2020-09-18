//Page index.js affiche les produit sur la page index et qui renvoie vers la page produit

// constante element-card  et codeError
let elementCard = document.getElementById('element-card');
let request;
// requete Get pour récuperer les produits
let teddiesRequest = () => {
    return new Promise((resolve, reject) =>{
        request = new XMLHttpRequest();
        if (!request) {
            console.log('Abandon :( Impossible de créer une instance de XMLHTTP');
            elementCard.innerHTML =  codeError;
            return false;
        }
        request.open('GET', "http://localhost:3000/api/teddies/");
        request.onreadystatechange = function () {
            if(request.readyState !== XMLHttpRequest.DONE) {          
                return
            } 
            if(request.status !== 200){
                return reject(request.statusText)
            }
            let totalTeddies = JSON.parse(this.responseText);
            resolve(totalTeddies)
        }
    request.send();
    })
}
teddiesRequest().then(function(totalTeddies){
    console.log(totalTeddies);
    console.log("la requête a aboutit!");
    for  (let i in totalTeddies) { //boucle for qui va récuperer les produits un à un
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
}).catch((e) => {
    console.error('Il y a eu un problème avec la requête.' + request.statusText);
    elementCard.innerHTML =  `<div class="col text-center">
        <h2> ${request.statusText}</h2>
        <p>veuillez nous excuser pour la gêne occasionnée</p>
    </div>`;
});