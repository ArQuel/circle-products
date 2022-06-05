# Circle Project

## Testing project for GoWeb

### Pre-requires:

#### Home :

- Intégration complète de la maquette (n'oubliez pas le responsive)
- Récupération de la liste des produits via un appel à fakestoreapi
- Mise en place d'une classe produit permettant de gérer la modification du prix d'un produit ainsi que
le calcul de la TVA (20%)
- Lorsqu'on clique sur la ligne d'un produit, on navigue vers la page de détails où on affichera
l'ensemble des informations du produit
#### Page produit :

- Intégration complète de la maquette (n'oubliez pas le responsive)
- Permettre de mettre à jour le prix d'un produit et de l'envoyer via un appel API lors du clic sur le
bouton "Update product" (le bouton ne doit être cliquable que si le prix a été modifié)
- Mettre à jour l'affichage du prix TTC lorsqu'on modifie localement le prix du produit
- Permettre de rafraichir la page produit sans perdre les données

### Elements provided:

 - Technical constraints
 - [FakeStoreAPI](https://fakestoreapi.com/docs)
 - [Model](https://xd.adobe.com/view/3e2909d1-79c4-4337-b504-37b1742fcffc-6b7a/grid/)
 - Font-Family : `Roboto`

### Technologies used:

- react v 18.1.0
- react-dom v 18.1.0
- react-router v 6.3.0
- react-router-dom v 6.3.0
- prop-types v 15.8.1
### Set up:
#### Front-end:

- Open `circle` directory :

- Then, install dependencies : `npm install`

- You can run the App server with `npm start` command (port 3000)