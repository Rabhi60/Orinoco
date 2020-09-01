// page produit

//recherche de la partie id de l'url
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');



// requete get pour recuperer un seul objet
(function() {
    var teddy;
    
  
    function teddyRequest() {
      teddy = new XMLHttpRequest();
  
      if (!teddy) {
        console.log('Abandon :( Impossible de créer une instance de XMLHTTP');
        return false;
      }
      teddy.onreadystatechange = contents;
      teddy.open('GET', "http://localhost:3000/api/teddies/"+id);
      teddy.send();
    }
    teddyRequest();
  
    function contents() {
        
        try{
            if (teddy.readyState === XMLHttpRequest.DONE) {
                if (teddy.status === 200) {
                    var response = JSON.parse(this.responseText);
                    console.log("la requête a aboutit!");
                    let teddyChoice = response;

                    // Declaration function
                    const updateTeddyChoice = () => {

                        let elementCard = document.getElementById('element-card'); 

                        elementCard.innerHTML = `<div class="col-12 mb-3"> 
                                                    <div class="card text-white bg-dark">
                                                        <img class="card-img-top" src="${teddyChoice.imageUrl}" alt="${teddyChoice.description}"></img>
                                                        <div class="card-body">
                                                            <h2 class="card-header"> Produit : ${teddyChoice.name} </h2>
                                                            <a class="btn btn-success col-12 col-md-3 mb-2 mt-2 float-right" href="#">Acheter</a>
                                                            <p>Prix : ${(teddyChoice.price/100)},00 € </p>
                                                            <p>Ref :  ${teddyChoice._id}</p>
                                                            <p>Description :  ${teddyChoice.description}</p>
                                                            <select name="color" id="select">
                                                                <option disabled selected> Choix de la couleur :  </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>`;

                        let select = document.getElementById("select");

                        for (let i in teddyChoice.colors){ //boucle for pour les couleurs
                        {
                        colorOption =  document.createElement('option');
                        colorOption.setAttribute('value', 'color ' + teddyChoice.colors[i])
                        colorOption.innerHTML =  teddyChoice.colors[i];
                        select.append(colorOption);
                            }
                        }
                    };
                    updateTeddyChoice();
                    
                } else {
                    console.error('Il y a eu un problème avec la requête.');
                }
            }
        }
        catch( e ) {
            console.log("Une exception s’est produite : " + e.description);
        }    
    }
})();