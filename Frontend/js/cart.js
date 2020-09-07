// fichier panier

let elementCard = document.getElementById('element-card');


    for (let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i)
        let totalArticleChoice = (key, JSON.parse(localStorage.getItem(key)))
        console.log(totalArticleChoice);
        
        for(let i in totalArticleChoice){
            {
                elementCard.innerHTML += `<div class="mx-auto mb-3" style="width: 50vw;" > 
                        <div class="card text-white bg-dark">
                        
                            <div class="card-body">
                                <h2 class="card-header"> Produit : ${totalArticleChoice[i].name} </h2>
                                <img class="float-right mt-4" width='100' height='100' src="${totalArticleChoice[i].imageUrl}" alt="${totalArticleChoice[i].name}"></img>
                                <p>Prix : ${(totalArticleChoice[i].price)},00 € </p>
                                <p>Ref :  ${totalArticleChoice[i].id}</p>
                                <p>Couleur choisie : ${totalArticleChoice[i].color}</p>
                                <p>Quantité :  ${totalArticleChoice[i].qty}</p>
                                <a class="btn btn-success col-12 col-md-3 mb-2  float-right" href="#" id="buy" >Acheter</a>
                                <a class="btn btn-danger col-12 mx-0 col-md-3 mb-2  mx-2 float-right" href="#" id="delete" >Vider le panier</a>
                            </div>
                           
                        </div>
                    </div>`;
            }

        } 
                    let buttonBuy = document.getElementById('buy');//le chemin vers le bouton acheter
                    let buttonDelete = document.getElementById('delete');


                    buttonDelete.addEventListener('click', function() 
                    {
                        
                        if(typeof(Storage)) {
                            if(localStorage) {
                                
                                localStorage.clear();

                            }
                        }
                    });

    }

    






// partie formulaire