function generationLogin() {
    // Récupération des éléments HTML à manipuler
    const navigation = document.querySelector("nav ul") // Liste de navigation dans le header
    const modif = document.querySelector("section[id=portfolio] h2") // Le titre de la section "Mes projets"
    const divEdition = document.querySelector(".divHeader") // Barre noire "Mode édition" en haut
    const divContent = document.querySelector(".contentFiltrers") // Section des filtres (boutons de tri)

    // Affiche la barre "mode édition"
    divEdition.style.display = "flex"

    // Vide la navigation actuelle (supprime "login" par exemple)
    navigation.innerHTML = ""

    // Crée les nouveaux éléments de navigation
    const projets = document.createElement("li")
    const linkProjet = document.createElement("a")
    linkProjet.href = "#portfolio"
    linkProjet.innerText = "projets"

    const contact = document.createElement("li")
    const linkcontact = document.createElement("a")
    linkcontact.href = "#contact"
    linkcontact.innerText = "contact"

    const logout = document.createElement("li")
    logout.innerText = "logout"
    logout.className = "logout" // Sert à ajouter un eventListener logout ailleurs dans le code

    const insta = document.createElement("li")
    const image = document.createElement("img")
    image.src = "./assets/icons/instagram.png"
    image.alt = "Instagram"

    // Construit la nouvelle structure du menu
    navigation.appendChild(projets)
    projets.appendChild(linkProjet)

    navigation.appendChild(contact)
    contact.appendChild(linkcontact)

    navigation.appendChild(logout)
    navigation.appendChild(insta)
    insta.appendChild(image)

    // Supprime les filtres de tri car inutile en mode édition
    divContent.innerHTML = ""
    divContent.style.display = "none"

    // Création du bouton "modifier" avec l’icône
    const divElement = document.createElement("div")
    divElement.className = "divModif" // Cette div sera positionnée à droite du h2

    const logoEdit = document.createElement("i")
    logoEdit.className = "fa-regular fa-pen-to-square" // Icône FontAwesome du stylo

    const edit = document.createElement("p")
    edit.innerText = "modifier"

    // Insertion du bouton "modifier" dans le h2 "Mes projets"
    modif.appendChild(divElement)
    divElement.appendChild(logoEdit)
    divElement.appendChild(edit)
}
