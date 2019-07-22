const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector("#toy-collection")
const toyInputs = document.querySelector(".add-toy-form")
let addToy = false

// YOUR CODE HERE
fetch("http://localhost:3000/toys")
.then(function (response) {
  return response.json()
})
.then(function (json) {
  json.forEach(function (toy) {
    createToyCard(toy)
  })
})

function createToyCard(toy) {
  const newToy = document.createElement("div")
  newToy.className = "card"
  newToy.innerHTML = `<h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar">
  <p>${toy.likes} Likes</p>
  <button class="like-btn">Like <3</button>`
  toyCollection.appendChild(newToy)
  newToy.querySelector(".like-btn").addEventListener('click', function (e) {
    fetch(`http://localhost:3000/toys/${toy.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({"likes": toy.likes++})
    })
    newToy.querySelector("p").innerText = `${toy.likes} Likes`
  })
}

toyInputs.addEventListener('submit', () => {
  fetch('http://localhost:3000/toys',{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": document.getElementsByName("name")[0].value,
      "image": document.getElementsByName("image")[0].value,
      "likes": 0
    })
  })
})


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


