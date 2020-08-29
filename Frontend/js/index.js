// constante main, element-card et card //

let elementCard = document.getElementById('element-card');








// Récupération des images //
const accueil = document.querySelector('#accueil');// bouton accueil actualiser la page


var teddies = new XMLHttpRequest();
teddies.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        let totalTeddies = response;
        console.log(totalTeddies);

        //let firstTeddyColor = response[0].colors;//détails 
        //let secondTeddy = response[1] ;
        //let thirdTeddy = response[2] ;
        //let fourthTeddy = response[3] ;
        //let fifthTeddy = response[4] ;
        //console.log(totalTeddies);
        //    
        // let teddies = response;
        //   console.log(response);
        // const updateColors = () => {
        //  for  (let i in firstTeddyColor) { 
        //      {
        //       const colorOption =  document.createElement('option');
        //      const textColor = document.createElement('p');
        //       textColor.innerHTML =  firstTeddyColor[i];
        //       color.append(colorOption);
        //       colorOption.append(textColor);
        //      } 
        //    
        // }
        //  };
         // updateColors(); 



      const updateTeddies = () => {
        for  (let i in totalTeddies) { 
           {
           const divCol = document.createElement('div');
           divCol.classList.add('col-12');
           const divCard = document.createElement('div');
           divCard.classList.add('card');
           const imageUrl = document.createElement('img');
           imageUrl.classList.add('card-img-top');
           imageUrl.setAttribute('src', response[i].imageUrl);
           imageUrl.setAttribute('alt', response[i].description);
           const divCardBody = document.createElement('div');
           divCardBody.classList.add('card-body');
           const name = document.createElement('p');
           name.innerHTML = 'Produit :  '  + response[i].name;
           const id = document.createElement('p');
           id.innerHTML = 'Ref : ' + response[i]._id;
           const price = document.createElement('p');
           price.innerHTML = 'Prix : ' + response[i].price / 100 + ',00 euros';
           const description = document.createElement('p');
           description.innerHTML = 'Description : ' + response[i].description;
           const select = document.createElement('select');
           select.setAttribute('name', 'color');
           select.setAttribute('id', response[i].name);
           const colorOption1 =  document.createElement('option');
           const colorOption2 =  document.createElement('option');
           const colorOption3 =  document.createElement('option');
           const colorOption4 =  document.createElement('option');
           colorOption1.innerHTML =  response[i].colors[0];
           colorOption2.innerHTML =  response[i].colors[1];
           colorOption3.innerHTML =  response[i].colors[2];
           colorOption4.innerHTML =  response[i].colors[3];
           elementCard.append(divCol);
           divCol.append(divCard);
           divCard.append(imageUrl);
           divCard.append(divCardBody);
           divCardBody.append(name);
           divCardBody.append(id);
           divCardBody.append(price);
           divCardBody.append(description);
           divCardBody.append(select);
           select.append(colorOption1);
           select.append(colorOption2);
           select.append(colorOption3);
           select.append(colorOption4);
        
        

           } 
           }
           
       };
       updateTeddies();

      
    //   let norbert = document.getElementById('Norbert');
    //   let arnold = document.getElementById('Arnold');
    //   let lenny = document.getElementById('Lenny and Carl');
    //   let gustav = document.getElementById('Gustav');
    //   let garfunkel = document.getElementById('Garfunkel');
    //   
    //   const updateColorsNorbert = () => 
    //   {
    //      for  (let i in response[i].colors) 
    //        { 
    //          {
    //           const colorOption =  document.createElement('option');
    //           colorOption.innerHTML =  response[i].colors[i];
    //           norbert.append(colorOption);
    //          } 
    //        }
    //    };
    //updateColorsNorbert();
//
    //const updateColorsArnold = () => {
    //    for  (let i in response[1].colors)
    //    { 
    //        {
    //         const colorOption =  document.createElement('option');
    //         colorOption.innerHTML =  response[1].colors[i];
    //         arnold.append(colorOption);
    //
    //        }   
    //   }
    //};
    //updateColorsArnold();
//
    //const updateColorsLenny = () => {
    //    for  (let i in response[2].colors) 
    //    { 
    //        {
    //        const colorOption =  document.createElement('option');
    //        colorOption.innerHTML =  response[2].colors[i];
    //        lenny.append(colorOption);
    //        } 
    //    }
    //};
    //updateColorsLenny();
//
    //const updateColorsGustav = () => {
    //    for  (let i in response[3].colors) 
    //    { 
    //        {
    //        const colorOption =  document.createElement('option');
    //        colorOption.innerHTML =  response[3].colors[i];
    //        gustav.append(colorOption);
    //        }   
    //    }
    //};
    //updateColorsGustav();
//
    //const updateColorsGarfunkel = () => {
    //    for  (let i in response[4].colors) { 
    //        {
    //        const colorOption =  document.createElement('option');
    //        colorOption.innerHTML =  response[4].colors[i];
    //        garfunkel.append(colorOption);
    //        } 
    //    }
    //};
    //updateColorsGarfunkel();
    }
};
teddies.open("GET", "http://localhost:3000/api/teddies");
teddies.send();

