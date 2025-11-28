**********Poll Charts — Système de sondages interactifs avec Chart.js**********
Ce projet est une application web qui affiche des sondages interactifs accompagnés de graphiques générés automatiquement avec Chart.js.
L’objectif est de proposer une interface simple où chaque sondage affiche ses options, ses votes en pourcentage, ainsi qu’un graphique placé à droite du bloc.
Technologies utilisées : HTML / CSS / JavaScript / Chart.js / DOM API / GitHub Pages
Fonctionnalités principales :
✔️ Sondages interactifs (sélection des options)

✔️ Calcul automatique des pourcentages

✔️ Génération automatique de graphiques en barres avec Chart.js

✔️ Graphiques déplacés à droite, hors du cadre du sondage

✔️ Code propre, réindenté avec tabulations

✔️ Script chargé dynamiquement via DOMContentLoaded

✔️ Mise en page responsive

✔️ Style préservé entièrement selon le design d’origine
Link to GitHub Pages page (final rendering) : https://ilyestrabelsi.github.io/Test_Github/

*****Nouveautés explorées / Ce que j’ai appris::

Pendant la réalisation du projet, j’ai découvert ou approfondi :

Intégration de Chart.js via CDN

Placement précis d’un canvas en dehors d’un conteneur HTML

Gestion des événements avec DOMContentLoaded

Manipulation du DOM pour :

parcourir les sondages

lire les options

calculer les pourcentages

générer dynamiquement les graphiques

Débogage d’une “white screen” due à une erreur de script bloquant le chargement


Difficultés rencontrées:

❗ Le graphique Chart.js apparaissait écrasé ou invisible

❗ Le graphique restait à l’intérieur du bloc du sondage

❗ Problème de “white screen” (page blanche) dû à une erreur JS bloquante

❗ Script exécuté avant le chargement du DOM

❗ Certains éléments HTML n’étaient pas reconnus au moment de la génération des graphiques

❗ Code contenant des commentaires et des espaces non conformes au formatage HTML/JS
**les solutions trouvées:

✔️ Utilisation de DOMContentLoaded pour garantir que le DOM est prêt

✔️ Chargement de Chart.js par un <script> injecté dynamiquement

✔️ Déplacement du <canvas> en dehors du conteneur .poll-area grâce à un wrapper dédié

✔️ Nettoyage complet du code :

Suppression des commentaires

Remplacement des double-espaces par des tabulations

Correction des balises mal fermées

✔️ Résolution du white screen via inspection console et correction des erreurs JS

✔️ Tests répétés pour ajuster la position du graphique

✔️ Recherche via documentation Chart.js + MDN
Importance de l’ordre de chargement des scripts externes

Nettoyage et réindentation complète du code pour assurer la lisibilité
