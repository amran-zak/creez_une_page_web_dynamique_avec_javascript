// Récupération des éléments du DOM (inputs et bouton)
const emailLogin = document.getElementById("emailLogin")
const passWordLogin = document.getElementById("passWord")
const btnConnection = document.getElementById("connection")
const divMessage = document.querySelector(".message")

// Ajout d’un événement au clic sur le bouton de connexion
btnConnection.addEventListener("click", (event) => {
    event.preventDefault() // Empêche le rechargement du formulaire

    // Création de l’objet contenant les identifiants utilisateur
    const identifiant = {
        email: emailLogin.value,
        password: passWordLogin.value,
    }

    // Transformation de l’objet en JSON
    const chargeUtile = JSON.stringify(identifiant);

    // Requête POST vers l’API pour se connecter
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json;charset=utf-8",
        },
        body: chargeUtile,
    })
        .then(response => response.json()) // Conversion de la réponse en JSON
        .then(data => {

            // Fonction de vérification du format d’email
            function verifierEmail(balise) {
                let emailRegExp = new RegExp("[a-zA-Z._-]+@[a-zA-Z._-]+\\.[a-z]+")

                if (emailRegExp.test(balise.value)) {
                    // Email valide : style par défaut
                    balise.style.boxShadow = "0px 4px 14px rgba(0, 0, 0, 0.09)"
                } else {
                    // Email invalide : bordure rouge
                    balise.style.boxShadow = "0px 4px 14px rgba(255, 0, 0, 0.5)"
                }
            }

            // Fonction de vérification du champ mot de passe
            function verifierPassWord(balise) {
                if (balise.value === "") {
                    // Mot de passe vide : bordure rouge
                    balise.style.boxShadow = "0px 4px 14px rgba(255, 0, 0, 0.5)"
                } else {
                    // Champ rempli : style par défaut
                    balise.style.boxShadow = "0px 4px 14px rgba(0, 0, 0, 0.09)"
                }
            }

            // Exécution des vérifications
            verifierEmail(emailLogin)
            verifierPassWord(passWordLogin)

            // Si un token est retourné, la connexion est réussie
            if (data.token) {
                const token = data.token
                const valeurToken = JSON.stringify(token)

                // Stockage du token dans le localStorage
                window.localStorage.setItem("token", valeurToken)

                // Redirection vers la page d'accueil
                document.location.href = "index.html"

            } else {
                // Si pas de token, affichage d’un message d’erreur
                if (divMessage.style.display === "flex") {
                    divMessage.innerHTML = "" // Réinitialise le contenu s’il existe
                }

                divMessage.style.display = "flex"
                const textElement = document.createElement("p")
                textElement.innerText = "Erreur dans l'identifiant ou le mot de passe"
                divMessage.appendChild(textElement)
            }
        })
        .catch(error => {
            // Gestion des erreurs réseau ou autres
            console.error('Erreur:', error);
        });
})
