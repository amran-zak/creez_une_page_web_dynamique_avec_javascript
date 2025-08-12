function generationLogout(){

    const navigation = document.querySelector("nav ul")
    const portfolio = document.querySelector("section[id=portfolio] h2")
    const divEdition = document.querySelector(".divHeader")

    divEdition.style.display = "none"

    navigation.innerHTML = ""

    const projets = document.createElement("li")
    const linkProjet = document.createElement("a")
    linkProjet.href = "#portfolio"
    linkProjet.innerText = "projets"
    const contact = document.createElement("li")
    const linkcontact = document.createElement("a")
    linkcontact.href = "#contact"
    linkcontact.innerText = "contact"
    const login = document.createElement("li")
    const loginPage = document.createElement("a")
    loginPage.innerText = "login"
    loginPage.className = "login"
    loginPage.href = "login.html"
    const insta = document.createElement("li")
    const image = document.createElement("img")
    image.src = "./assets/icons/instagram.png"
    image.alt = "Instagram"

    navigation.appendChild(projets)
    projets.appendChild(linkProjet)
    navigation.appendChild(contact)
    contact.appendChild(linkcontact)
    navigation.appendChild(login)
    login.appendChild(loginPage)
    navigation.appendChild(insta)
    insta.appendChild(image)

    portfolio.innerHTML = ""
    portfolio.innerText = "Mes Projets"

}