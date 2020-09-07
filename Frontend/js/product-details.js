// page produit



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
(function() {
    var teddy;
    
  
    async function teddyRequest() {
      teddy = new XMLHttpRequest();
  
      if (!teddy) {
        console.log('Abandon :( Impossible de créer une instance de XMLHTTP');
        elementCard.innerHTML =  codeError;
        return false;
      }
      teddy.onreadystatechange = contents;
      teddy.open('GET', "http://localhost:3000/api/teddies/"+id);
      teddy.send();
      return true;
    }
    teddyRequest().then(result => console.log(result));
      
    
 
    async function contents() {
        
        try{
            if (teddy.readyState === XMLHttpRequest.DONE) {
                if (teddy.status === 200) {
                    var response = JSON.parse(this.responseText);
                    console.log("la requête a aboutit!");
                    let teddyChoice = response;

                    // Declaration function
                    const updateTeddyChoice = () => {

                       

                        elementCard.innerHTML = `<div class="col-12 mb-3"> 
                                                    <div class="card text-white bg-dark">
                                                        <img class="card-img-top" src="${teddyChoice.imageUrl}" alt="${teddyChoice.description}"></img>
                                                        <div class="card-body">
                                                            <h2 class="card-header"> Produit : ${teddyChoice.name} </h2>
                                                            <a class="btn btn-success col-12 col-md-3 mb-2 mt-2 float-right" href="#" id="buy" >Acheter</a>
                                                            <a class="btn btn-danger col-12 col-md-3 mb-2 mt-2 mx-2 float-right" href="#" id="delete" >Vider le panier</a>
                                                            <p>Prix : ${(teddyChoice.price/100)},00 € </p>
                                                            <p>Ref :  ${teddyChoice._id}</p>
                                                            <p>Description :  ${teddyChoice.description}</p>
                                                            <select name="color" id="select">
                                                             
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>`;

                        let select = document.getElementById("select");
                        
                        
                        for (let i in teddyChoice.colors){ //boucle for pour les couleurs
                        {
                        colorOption =  document.createElement('option');
                        colorOption.setAttribute('value',  teddyChoice.colors[i]);
                        colorOption.setAttribute('selected',  'selected');
                        colorOption.innerHTML =  teddyChoice.colors[i];
                        select.append(colorOption);
                            }
                        }
                        
                        
                        
                    };
                    updateTeddyChoice();
                    
                   // select.addEventListener("click", updateValue);
                   //     function updateValue(e) {
                   //         let colorChoice = ''
                   //          colorChoice.textContent = e.target.value;
                   //         console.log(colorChoice);
                   //       }
                   //   
                    let buttonBuy = document.getElementById('buy');//le chemin vers le bouton acheter
                    let buttonDelete = document.getElementById('delete');
                   
                    
                    
                    
                    
                    
                    
                    buttonBuy.addEventListener('click', function() {
                        let colorChoice = document.querySelector('#select').value ;
                        window.location.reload()
                        let panier = JSON.parse(localStorage.getItem('articleChoice')) || [];
                        let existingProductIndex =  panier.findIndex(Prod => Prod.id === id);
                        let existingProduct = panier[existingProductIndex];
                        console.log(existingProductIndex);
                        
                        let article = {"name": teddyChoice.name, "price": teddyChoice.price/100, "id": teddyChoice._id, "imageUrl": teddyChoice.imageUrl,"color": colorChoice, "qty": 1}
                            if(typeof(Storage) !== "undefined") {
                                if(localStorage.length === 0) {
                                    
                                    panier.push(article);
                                    localStorage.setItem('articleChoice', JSON.stringify(panier)) || [];
                                    
                                  
                                }else if (existingProduct && (existingProduct.color == article.color)){
                                   
                                   
                                    panier[existingProductIndex].qty = panier[existingProductIndex].qty + 1 ;
                                    localStorage.setItem('articleChoice', JSON.stringify(panier)) || [];
                                    
                                    
                                } else {
                                   
                                    panier.push(article);
                                    localStorage.setItem('articleChoice', JSON.stringify(panier)) || [];
                                }
                        
                         
                            }
                           
                            window.location.reload()
                    });
                   
                    buttonDelete.addEventListener('click', function() 
                    {
                        
                        if(typeof(Storage)) {
                            if(localStorage) {
                                
                                localStorage.clear();

                            }
                        }
                    });
                   

                } else {
                    console.error('Il y a eu un problème avec la requête.');
                    elementCard.innerHTML = codeError;
                }
            }
        }
        catch( e ) {
            console.log("Une exception s’est produite : " + e);
        }    
    }

  
    
})()
