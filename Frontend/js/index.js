//Page index.js affiche les produit sur la page index et qui renvoie vers la page produit

// constante main, element-card et card //

let elementCard = document.getElementById('element-card');

// Récupération des images //
const accueil = document.querySelector('#accueil');// bouton accueil actualiser la page


var teddies = new XMLHttpRequest();
teddies.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        let totalTeddies = response;

      const updateTeddies = () => {
        for  (let i in totalTeddies) { 
           {
           const divCol = document.createElement('div');// div de la structure .col et .card
           divCol.classList.add('col-12','mb-3');
           const divCard = document.createElement('div');
           divCard.classList.add('card', 'text-white', 'bg-dark');

           const imageUrl = document.createElement('img');//image
           imageUrl.classList.add('card-img-top');
           imageUrl.setAttribute('src', totalTeddies[i].imageUrl);
           imageUrl.setAttribute('alt', totalTeddies[i].description);

           const divCardBody = document.createElement('div');//card
           divCardBody.classList.add('card-body');

           const name = document.createElement('h2');//nom
           name.classList.add('card-header');
           name.innerHTML = 'Produit :  '  + totalTeddies[i].name;

           const price = document.createElement('p');//prix
           price.innerHTML = 'Prix : ' + totalTeddies[i].price / 100 + ',00 euros';
           price.classList.add('mt-2');

           const addCard = document.createElement('a');//button qui renvoie vers la page produit
           addCard.classList.add('btn', 'btn-primary', 'float-right');
           addCard.innerHTML = 'Voir le Produit';
            addCard.setAttribute('href',  "../Frontend/html/product-details.html?id="+totalTeddies[i]._id);

           elementCard.append(divCol);//ajout de la structure
           divCol.append(divCard);
           divCard.append(imageUrl, divCardBody);
           divCardBody.append(name, price , addCard);
           } 
        }
       };
       updateTeddies();

      
    
    }
};
teddies.open("GET", "http://localhost:3000/api/teddies");
teddies.send();
