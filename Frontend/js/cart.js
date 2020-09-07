// fichier panier

let elementCard = document.getElementById('element-card');// #element-cart présent dans notre HTML

//partie produits dans le panier

    for (let i = 0; i < localStorage.length; i++){//boucle for pour récuperer les produits dans le localStorage
        let key = localStorage.key(i)
        let totalArticleChoice = (key, JSON.parse(localStorage.getItem(key)))
        console.log(totalArticleChoice);
        
        for(let i in totalArticleChoice){//boucle for pour le template dans le panier
            {
                elementCard.innerHTML += `<div class="mx-auto mb-3" style="width: 60vw;" > 
                        <div class="card text-white bg-dark">
                        <img class=" mt-2  mx-auto"  width='180' height='120'  src="${totalArticleChoice[i].imageUrl}" alt="${totalArticleChoice[i].name}"></img>
                            <div class="card-body">
                                <h2 class="card-header"> Produit : ${totalArticleChoice[i].name} </h2>
                                <p >Prix : ${(totalArticleChoice[i].price)},00 € </p>
                                <p>Ref :  ${totalArticleChoice[i].id}</p>
                                <p>Couleur choisie : ${totalArticleChoice[i].color}</p>
                                <p>Quantité :  ${totalArticleChoice[i].qty}</p>
                                <a class="btn btn-danger col-12  col-md-3 mb-2 mt-2 float-right" href="#" id="delete" >Vider le panier</a>
                            </div>
                        </div>
                    </div>`;
            }
        } 

         let buttonDelete = document.getElementById('delete');// appel de l'id delete pour le bouton supprimer
         buttonDelete.addEventListener('click', function() //function pour le bouton supprimer
         { 
             if(typeof(Storage)) {
                 if(localStorage) {
                     localStorage.clear();
                 }
             }
         });

    }

    






// partie formulaire