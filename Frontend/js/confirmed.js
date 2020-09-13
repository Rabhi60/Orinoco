// confirmation
const numeroCommande = document.getElementById('numeroCommande');//recheche #numeroCommande dans le DOM
const prixTotal = document.getElementById('prixTotal');//recheche #prixTotal dans le DOM

let numero = JSON.parse(localStorage.getItem('validate'))// permet de récuperer le localStorage qui contient le prix total et le numero de commande

numeroCommande.innerHTML = `Numero de commande : <span class='text-warning'>${numero[0]}€<span>`;//contenu du premier objet injecté dans notre DOM
prixTotal.innerHTML = `prix total de votre commande : <span class='text-success'>${numero[1]}€<span>`;//contenu du deuxième objet injecté dans notre DOM

//efface notre localStorage pour supprimer les données client après les avoir récupéré
localStorage.clear();

// au bout de 30 secondes l'utilisateur sera redirigé vers la page d'acceuil
setTimeout(function() {
    window.location.replace('/index.html');
}, 30000);

// bloquer le retour sur la page précédente
history.forward()