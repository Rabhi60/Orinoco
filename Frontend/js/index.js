//Page index.js affiche les produit sur la page index et qui renvoie vers la page produit

// constante element-card //

let elementCard = document.getElementById('element-card');
let codeError = `<div class="col text-center">
                    <h2> Error 400</h2>
                    <h3>Bad Request</h3>
                    <p>veuillez nous excuser pour la gêne occasionnée</p>
                </div>`;

// requete Get pour récuperer les produits
(function() {
    var teddies;
    
    async function teddiesRequest  ()  {
        teddies = new XMLHttpRequest();
  
      if (!teddies) {
        console.log('Abandon :( Impossible de créer une instance de XMLHTTP');
        elementCard.innerHTML =  codeError;
        return false;
      }
      teddies.onreadystatechange = contents;
      teddies.open('GET', "http://localhost:3000/api/teddies/");
      teddies.send();
      return true;
    }
    teddiesRequest().then(result => console.log(result));
  
    async function contents () {
        
        try{
            if (teddies.readyState === XMLHttpRequest.DONE) {
                if (teddies.status === 200) {
                    var response = JSON.parse(this.responseText);
                    console.log(response);
                    console.log("la requête a aboutit!");
                    let totalTeddies = response;

                    // Declaration function
                    const updateTeddies = () => {

                        for  (let i in totalTeddies) { //boucle for qui va récuperer les produits un à un
                            {
                                elementCard.innerHTML +=    `<div class="col-12 mb-3"> 
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
                    };
                    updateTeddies();
                    
                } else {
                    
                    console.error('Il y a eu un problème avec la requête.');
                    elementCard.innerHTML =  codeError;
                }
            }    
        }
        catch( e ) {
            console.log("Une exception s’est produite : " + e.description);
        }    
    }
   
})();


