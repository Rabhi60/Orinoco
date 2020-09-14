//Page index.js affiche les produit sur la page index et qui renvoie vers la page produit

// constante element-card  et codeError
let elementCard = document.getElementById('element-card');
let teddies;

// requete Get pour récuperer les produits
    let teddiesRequest = () => {
        return new Promise((resolve, reject) =>{
            teddies = new XMLHttpRequest();
            teddies.open('GET', "http://localhost:3000/api/teddies/");
            teddies.onreadystatechange = function () {
               try{
                    if (teddies.readyState === XMLHttpRequest.DONE) {
                        if (!teddies) {
                            console.log('Abandon :( Impossible de créer une instance de XMLHTTP');
                            elementCard.innerHTML =  codeError;
                            return false;
                        }if (teddies.status === 200) {
                            let response = JSON.parse(this.responseText);
                            console.log(response);
                            console.log("la requête a aboutit!");
                            let totalTeddies = response;
                            resolve(totalTeddies)
                        }else {
                            reject(teddies.statusText)
                            console.error('Il y a eu un problème avec la requête.' + teddies.statusText);
                            elementCard.innerHTML =  `<div class="col text-center">
                            <h2> ${teddies.statusText}</h2>
                            <p>veuillez nous excuser pour la gêne occasionnée</p>
                        </div>`;
                        }
                    }  
               } catch ( e ) {
                console.error("Une exception s’est produite : " + e.description);
               }
            }
        teddies.send();
        })
    }

    teddiesRequest().then(function(totalTeddies){
        for  (let i in totalTeddies) { //boucle for qui va récuperer les produits un à un
            {
                elementCard.innerHTML +=    `<div class="col-12 my-2"> 
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
        }
    }).catch((e) => console.error("Une exception s’est produite : " + e.description))
    
        
   



