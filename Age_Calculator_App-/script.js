document.addEventListener("DOMContentLoaded", function () {// Ce code s'exécute une fois que le DOM (Document Object Model) est complètement chargé, garantissant que tous les éléments HTML sont disponibles pour être manipulés par le scrip
    let userInput = document.getElementById("date");
    let result = document.getElementById("result");

    userInput.max = new Date().toISOString().split('T')[0]; // Fixe la date max à aujourd'hui

    function calculateAge() {//Cette fonction est appelée pour calculer l'âge de l'utilisateur en fonction de la date entrée.
        if (!userInput.value) {// Vérifie si le champ userInput est vide. Si oui, affiche un message d'erreur et arrête l'exécution de la fonction avec return
            result.innerHTML = "Veuillez entrer une date de naissance.";
            return;
        }

        let birthDate = new Date(userInput.value);//userInput.value est transformé en objet Date

        if (birthDate > new Date()) {//Si cette date est dans le futur (supérieure à aujourd'hui), affiche un message d'erreur.
            result.innerHTML = "La date de naissance ne peut pas être dans le futur.";
            return;
        }

        let today = new Date();
        let d1 = birthDate.getDate();//Jour de la date de naissance.
        let m1 = birthDate.getMonth() + 1;// Mois de la date de naissance (ajout de 1, car getMonth() retourne 0 pour janvier)
        let y1 = birthDate.getFullYear();//Année de la date de naissance

        let d2 = today.getDate();//De manière similaire, récupère le jour, le mois et l'année d'aujourd'hui.
        let m2 = today.getMonth() + 1;
        let y2 = today.getFullYear();

        let d3, m3, y3;

        y3 = y2 - y1;
        if (m2 >= m1) {//La différence en années.Si le mois actuel (m2) est inférieur au mois de naissance (m1), on décrémente les années (y3--) et ajuste les mois.
            m3 = m2 - m1;
        } else {
            y3--;
            m3 = 12 + m2 - m1;
        }

        if (d2 >= d1) {
            d3 = d2 - d1;
        } else {//Si le jour actuel (d2) est inférieur au jour de naissance (d1), décrémente les mois (m3--) et ajuste les jours en ajoutant le nombre total de jours du mois précédent, calculé avec getDaysInMonth
            m3--;
            d3 = getDaysInMonth(y2, m2 - 1) + d2 - d1;
        }

        if (m3 < 0) {
            m3 = 11;// Si m3 devient négatif (par exemple, après décrémentation dans les étapes précédentes), on ajuste les mois à 11 et on décrémente les années.
            y3--;
        }

        result.innerHTML = `Vous avez ${y3} ans, ${m3} mois et ${d3} jours.`;//Affiche l'âge de l'utilisateur sous forme d'années, mois et jours.
    }

    function getDaysInMonth(year, month) {//Crée une date correspondant au dernier jour du mois précédent.
        return new Date(year, month, 0).getDate();//Extrait le numéro de ce jour
    }

    // Associe la fonction au bouton
    document.querySelector("button").addEventListener("click", calculateAge);// Quand le bouton est cliqué, la fonction calculateAge est appelée pour effectuer le calcul et afficher l'âge.
});
