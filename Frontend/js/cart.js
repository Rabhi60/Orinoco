// fichier panier

let elementCard = document.getElementById('element-card');// #element-cart présent dans notre HTML
let totalBuy = document.getElementById('totalBuy');
let totalArticleChoice;
let resultatTotalPrice = 0;
let resultatTotalQuantité = 0;
//partie produits dans le panier


for (let i = 0; i < localStorage.length; i++){//boucle for pour récuperer les produits dans le localStorage
    let key = localStorage.key(i)
    totalArticleChoice = (key, JSON.parse(localStorage.getItem(key)))
}

let templateTeddies = () =>{

    for(let i in totalArticleChoice){//boucle for pour le template des produits choisis
        {
        elementCard.innerHTML += `<div class="mx-auto mb-3" style="width: 80vw;" > 
                                    <div class="card text-white bg-dark">

                                        <div class="card-body">
                                            <h2 class="card-header"> Produit : ${totalArticleChoice[i].name} </h2>
                                            <img class=" my-2 mx-auto float-sm-right "  width='210' height='120'  src="${totalArticleChoice[i].imageUrl}" alt="${totalArticleChoice[i].name}"></img>
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

    if (localStorage.length>=1){//boucle for pour le template du total des produits choisis
        for (let i=0; i < totalArticleChoice.length; i++) {//card contenant le total des prix.
            resultatTotalPrice += (totalArticleChoice[i].price * totalArticleChoice[i].qty);
            resultatTotalQuantité += (totalArticleChoice[i].qty);
            totalBuy.innerHTML =   `<div class="mx-auto mb-3" style="width: 80vw;" > 
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
                    }
            
            let buttonDelete = document.getElementById('delete');// appel de l'id delete pour le bouton supprimer
    
            buttonDelete.addEventListener('click', function(){  //function pour le bouton supprimer
                if(typeof(Storage)) {
                    if(localStorage) {
                        localStorage.clear();//supprimer le localStorage
                        window.location.reload()//rachaichir la page
                    }
                }
            });
    } else {
        elementCard.innerHTML = "<h2 class='text-center'>Votre panier est vide :(</h2>";
    }
}
templateTeddies();

function Send (){
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let email = document.getElementById('email').value;
    let contact = {'firstName': firstName,  'lastName': lastName, 'address': address,  'city': city, 'email': email};
    let products = [];
    let body = {  contact, products };

    totalArticleChoice.forEach( item => {
        products.push(item.id);
        
    })
    orderTeddies(body);
}

function orderTeddies  (body) {
    return new Promise((resolve, reject) =>{
        let request = new XMLHttpRequest();
        if (!request) {
            console.log('Abandon :( Impossible de créer une instance de XMLHTTP');
            elementCard.innerHTML =  codeError;
            return false;
        }
        request.open('POST','http://localhost:3000/api/teddies/order');
        request.setRequestHeader('content-type','application/json');
        request.onreadystatechange =  function () {
            if (request.readyState !== XMLHttpRequest.DONE)  {
                return
            }
            if (request.status == 201){
                return reject(request.statusText)
            }
            let response = JSON.parse(this.responseText);
            console.log(response);
            resolve(response);
            console.log(response);
            let order = response.orderId;
            getLocalStorage = JSON.parse(localStorage.getItem('validate')) || [];
            getLocalStorage.push(order, resultatTotalPrice);
            localStorage.setItem('validate', JSON.stringify(getLocalStorage)) || [];
            window.location.replace("confirmed.html");
        }
        request.send(JSON.stringify(body));
    })
}

let buttonValidate = document.querySelector('#button');
buttonValidate.addEventListener('click', function block(event){
    let forms = document.getElementsByClassName('needs-validation');
    event.preventDefault();
    event.stopPropagation();
    let validation = Array.prototype.filter.call(forms, function(form) {
        if (form.checkValidity() === false) {
            return form.classList.add('was-validated');
        } 
        if (localStorage.length === 0){
            return elementCard.innerHTML = "<h2 class='text-center'>Veuillez choisir au moins un teddy</h2>";
        }
        Send();
        localStorage.clear()
    });
})