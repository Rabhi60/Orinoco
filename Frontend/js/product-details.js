// page produit

//recherche de la partie id de l'url
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');



// requete get pour recuperer un seul objet
var teddy = new XMLHttpRequest();
teddy.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response);
        const teddyChoise = response;
        
        let elementCard = document.getElementById('element-card');

        updateTeddyChoise = () => {
            const divCol = document.createElement('div');
            divCol.classList.add('col-12', 'mb-3');
            const divCard = document.createElement('div');
            divCard.classList.add('card', 'text-white', 'bg-dark');
        
            // creation de l'image
            const imageUrl = document.createElement('img');
            imageUrl.classList.add('card-img-top');
            imageUrl.setAttribute('src', response.imageUrl);
            imageUrl.setAttribute('alt', response.description);
        
            // creation de la card
            const divCardBody = document.createElement('div');
            divCardBody.classList.add('card-body');
        
            const name = document.createElement('h2'); //name
            name.classList.add('card-header');
            name.innerHTML = 'Produit :  '  + teddyChoise.name;
        
            const price = document.createElement('p');// price
            price.innerHTML = 'Prix : ' + teddyChoise.price / 100 + ',00 euros';
        
            const addCard = document.createElement('a');// button
            addCard.classList.add('btn', 'btn-success', 'float-right');
            addCard.innerHTML = 'Voir le Produit';
            addCard.setAttribute('href',  "../Frontend/html/cart.html?id="+teddyChoise._id);
        
            const id = document.createElement('p');//id ref
            id.innerHTML = 'Ref : ' + teddyChoise._id;
        
            const description = document.createElement('h3');// description
            description.innerHTML = 'Description : ' + teddyChoise.description;
        
            const select = document.createElement('select');//select pour les couleurs
            select.setAttribute('name', 'color');
            select.setAttribute('id', teddyChoise.name);
            for (let i in teddyChoise.colors){//boucle for pour les couleurs
                {
                    colorOption =  document.createElement('option');
                    colorOption.setAttribute('value', 'color ' + teddyChoise.colors[i])
                    colorOption.innerHTML =  teddyChoise.colors[i];
                    select.append(colorOption);
                }
            }
        
            //ajout de la structure
            elementCard.append(divCol);
            divCol.append(divCard);
            divCard.append(imageUrl, divCardBody);
            divCardBody.append(name, price, addCard, id, description, select);

        };
        updateTeddyChoise();
       

        
    } 
};

teddy.open("GET", "http://localhost:3000/api/teddies/"+id);
teddy.send();



