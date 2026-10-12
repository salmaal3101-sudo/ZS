# Zakariae & Salma — invitation de mariage

Site d'invitation bilingue français / arabe, conçu pour être publié gratuitement avec GitHub Pages.

## Fichiers
- `index.html` : contenu, noms, date, lieu et lien de localisation.
- `styles.css` : couleurs, mise en page et animation du portail.
- `script.js` : ouverture du portail, changement de langue, pétales, compte à rebours et musique générée dans le navigateur.

## Publier gratuitement avec GitHub Pages
1. Connectez-vous à https://github.com/ ou créez un compte gratuit.
2. Cliquez sur `+` puis `New repository`.
3. Nommez le dépôt `zakariae-salma` et choisissez `Public`.
4. Cochez `Add a README file`, puis `Create repository`.
5. Dans le dépôt, choisissez `Add file` → `Upload files`.
6. Décompressez l'archive téléchargée sur votre ordinateur, puis glissez les fichiers `index.html`, `styles.css` et `script.js` (et ce README) dans la zone d'envoi. **Il faut que `index.html` soit à la racine du dépôt, pas dans un sous-dossier.**
7. Cliquez sur `Commit changes`.
8. Allez dans `Settings` → `Pages`.
9. Dans `Build and deployment`, sélectionnez `Deploy from a branch`, puis la branche `main` et le dossier `/(root)`, puis cliquez sur `Save`.
10. Après quelques minutes, le lien apparaîtra dans la section Pages. Il ressemblera à `https://VOTRE-PSEUDO.github.io/zakariae-salma/`.

## Modifier le contenu
- Textes, date, lieu, liens : éditez `index.html`.
- Couleurs et apparence : éditez `styles.css`.
- Animation, musique, compte à rebours : éditez `script.js`.
Sur GitHub, ouvrez un fichier et cliquez sur le crayon (Edit). Après vos modifications, cliquez sur `Commit changes`. Attendez quelques minutes pour voir le site actualisé.

## Musique
Le bouton Musique produit une petite mélodie d'ambiance originale grâce à l'audio du navigateur. Elle démarre seulement après un clic (les navigateurs bloquent généralement la lecture automatique). Aucun fichier audio externe n'est nécessaire.

## Personnalisation à vérifier
- L'heure du compte à rebours est actuellement fixée à 18 h (heure du Maroc) uniquement pour le calcul du compte à rebours. Vous pouvez modifier l'heure dans `script.js` si nécessaire.
- Le nom « Palais Hiba », Fès et le lien Google Maps sont renseignés selon les informations fournies.
- Le site utilise Google Fonts pour les polices si une connexion Internet est disponible ; les polices système prennent le relais si nécessaire.


## Image du jardin
Le fichier `jardin-royal.jpg` est l'image de fond du grand jardin. Gardez-le à la racine du dépôt GitHub avec `index.html`, `styles.css` et `script.js`.


## Animations du jardin royal
La version conserve le jardin et le portail d’origine, et ajoute le mouvement doux des arbres, des fleurs au premier plan et des roses dans les coins du cadre. Des pétales tombent aussi à l’ouverture du portail.
