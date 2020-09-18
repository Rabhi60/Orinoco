// fichier panier

let elementCard = document.getElementById('element-card');// #element-cart présent dans notre HTML
let totalBuy = document.getElementById('totalBuy');
let response;
let totalArticleChoice;
let resultatTotalPrice = 0;
let resultatTotalQuantité = 0;
//partie produits dans le panier

let allStorage = () =>{// la fonction allStorage contient tout les produits envoyé sur le panier
    for (let i = 0; i < localStorage.length; i++){//boucle for pour récuperer les produits dans le localStorage
        let key = localStorage.key(i)
        totalArticleChoice = (key, JSON.parse(localStorage.getItem(key)))// on récupère tout les produits
        return totalArticleChoice;
    }
}
allStorage();//appel de la fonction

let templateProductsTeddies = () =>{
    for(let i in totalArticleChoice){//boucle for pour le template des produits choisis
        elementCard.innerHTML += `<div class="col-12 col-sm-10 mx-auto mb-3"  > 
            <div class="card text-white bg-dark">
                <div class="card-body">
                    <h2 class="card-header"> Produit : ${totalArticleChoice[i].name} </h2>
                    <img class="d-block mx-auto my-2 float-sm-right"  width='180' height='120'  src="${totalArticleChoice[i].imageUrl}" alt="${totalArticleChoice[i].name}"></img>
                    <p >Prix : ${(totalArticleChoice[i].price)},00 € </p>
                    <p id="${totalArticleChoice[i].id}">Ref :  ${totalArticleChoice[i].id}</p>
                    <p>Couleur choisie : ${totalArticleChoice[i].color}</p>
                    <p>Quantité :  ${totalArticleChoice[i].qty}</p>
                    <p>Total produit : ${totalArticleChoice[i].price * totalArticleChoice[i].qty} €</p>
                </div>
            </div>
        </div>`; 
    }
}
templateProductsTeddies();

let templateTotalTeddies = () =>{
    if (localStorage.length>=1){//boucle for pour le template du total des produits choisis
        for (let i=0; i < totalArticleChoice.length; i++) {//card contenant le total des prix.
            resultatTotalPrice += (totalArticleChoice[i].price * totalArticleChoice[i].qty);
            resultatTotalQuantité += (totalArticleChoice[i].qty);
        }
        totalBuy.innerHTML =   `<div class=" col-12 col-sm-10 mx-auto mb-3"  > 
            <div class="card text-white bg-success">
                <h2 class="card-header"> Prix Total :  </h2>
                <div class="card-body" >
                    <p>Prix total  : ${resultatTotalPrice} €</p>
                    <p>Quantité total : ${resultatTotalQuantité} produit(s).</p>
                    <p>Veuillez remplir le formulaire ci-dessous pour valider votre panier</p>
                    <a class="btn btn-danger col-12  col-md-3 mb-2 mt-1 float-right" href="#" id="delete" >Vider le panier</a>
                </div>
            </div>
        </div>`; 

        let buttonDelete = document.getElementById('delete');// appel de l'id delete pour le bouton supprimer
        buttonDelete.addEventListener('click', function(){  //function pour le bouton supprimer
            if(typeof(Storage)) {
                if(localStorage) {
                    localStorage.clear();//supprimer le localStorage
                    window.location.reload()//rachaichir la page
                }
            }
        });
    } else {// si le panier est vide on aura le texte ci-dessous
        elementCard.innerHTML = "<h2 class='text-center'>Votre panier est vide :(</h2>";
    }
}
templateTotalTeddies();//appel de la fonction

function send (){// fonction send qui va récupèrer le contenu qui sera envoyé au serveur 
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let email = document.getElementById('email').value;
    let contact = {'firstName': firstName,  'lastName': lastName, 'address': address,  'city': city, 'email': email};//object contact
    let products = [];//tableau products
    let body = {  contact, products };// body recupère les deux variables
    totalArticleChoice.forEach( item => {// boucle forEach qui va être utile pour ajouter les id des produits dans le tableau products
        products.push(item.id);
    })
    orderTeddies(body).then(function(){//la réponse à la promise de la fonction orderTeddies
        let order = response.orderId;
        getLocalStorage = JSON.parse(localStorage.getItem('validate')) || [];
        getLocalStorage.push(order, resultatTotalPrice);
        localStorage.setItem('validate', JSON.stringify(getLocalStorage)) || [];
        window.location.replace("confirmed.html");// on est dirigé vers la page de confirmation
    })
}

function orderTeddies  (body) {//on a récupèré le contenu body à envoyer dans notre requête POST
    return new Promise((resolve, reject) =>{
        let request = new XMLHttpRequest();
        if (!request) {
            console.log('Abandon :( Impossible de créer une instance de XMLHTTP');
            elementCard.innerHTML =  `<div class="col text-center">
                <h2> Error 400 </h2>
                <p>veuillez nous excuser pour la gêne occasionnée</p>
            </div>`;
            return false;
        }
        request.open('POST','http://localhost:3000/api/teddies/order');
        request.setRequestHeader('content-type','application/json');// on utilise des headers pour une rquête POST, qui sont des en-têtes envoyés en même temps que la requête pour donner plus d'informations sur celle-ci.
        request.send(JSON.stringify(body));// envoi la requête losque les conditions dans la fonction block
        request.onreadystatechange =  function () {
            if (request.readyState !== XMLHttpRequest.DONE)  {
                return
            }
            if (request.status !== 201){//201 pour les requêtes POST (créé et modifié)
                return reject(request.statusText)
            }
            response = JSON.parse(this.responseText);
            console.log(response);
            resolve(response)
        }
    })
}

let buttonValidate = document.querySelector('#button');
buttonValidate.addEventListener('click', function block(event){
    let forms = document.getElementsByClassName('needs-validation');
    event.preventDefault();
    event.stopPropagation();
    let validation = Array.prototype.filter.call(forms, function(form) {// permet de filtrer le contenu du formulaire
        if (form.checkValidity() === false) {// si un ou plusieurs inputs ne sont pas bien rempli il y aura un code erreur et on sort de la fonction
            return form.classList.add('was-validated');
        } 
        if (localStorage.length === 0){// si le panier ne contient pas de produits aura le texte ci-dessous et on sort de la fonction
            return elementCard.innerHTML = "<h2 class='text-center'>Veuillez choisir au moins un teddy</h2>";
        }
        send();// si les conditions précédentes sont correct alors on envoi notre requête et on efface notre localStorage
        localStorage.clear()
    });
})