const addBtn = document.querySelector(‘#new-toy-btn’)
const toyForm = document.querySelector(‘.container’)
let addToy = false

function fetchToys(){
 const toyURLs = fetch("http://localhost:3000/toys")
 .then(res => res.json())
 .then(json => {
   const toy = json.forEach(t => {
     const toyContainer = document.querySelector("#toy-collection")
     const makeToy = document.createElement("div")
     makeToy.class = "card"
     const toyName = document.createElement("h2")
     toyName.innerText = `${t.name}`
     makeToy.appendChild(toyName)
     const makeImg = document.createElement("img")
     makeImg.setAttribute('src', `${t.image}`)
     makeToy.appendChild(makeImg)
     const toyLikes = document.createElement("p")
     toyLikes.innerText = `${t.likes}`
     makeToy.appendChild(toyLikes)
     const likeButton = document.createElement("button")
     likeButton.class = "like-btn"
     likeButton.innerText = "Like <3"
     makeToy.appendChild(likeButton)
     toyContainer.appendChild(makeToy)
   })
 })
}
fetchToys();

function createJessie() {
let formData = {
 name: "Jessie",
 image: "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
 likes: 0
};

let configObj = {
 method: "POST",
 headers: {
   "Content-Type": "application/json",
   "Accept": "application/json"
 },
 body: JSON.stringify(formData)
};

 fetch(`http://localhost:3000/toys`, configObj)
   .then(res => res.json())
   .then(function (object) {
     const makeJessie = document.createElement("div")

     const jessieName = document.createElement("h2")
     jessieName.innerText = object.name
     makeJessie.appendChild(jessieName)

     const jessieImage = document.createElement("img")
     jessieImage.setAttribute('src', `${object.image}`)
     makeJessie.appendChild(jessieImage)

     const jessieLikes = document.createElement("p")
     jessieLikes.innerText = object.likes
     makeJessie.appendChild(jessieLikes)

     const toyContainer = document.querySelector(“#toy-collection”)
     toyContainer.appendChild(makeJessie)
   });
}
createJessie();


addBtn.addEventListener(‘click’, () => {
 // hide & seek with the form
 addToy = !addToy
 if (addToy) {
   toyForm.style.display = ‘block’
   // submit listener here
 } else {
   toyForm.style.display = ‘none’
 }
})
