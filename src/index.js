const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyContainer = document.querySelector('#toy-collection')
let toyCard;
let toyLikes;
const toyInput = document.querySelectorAll('.input-text')

let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here

    toyForm.addEventListener('submit', (e) => {
      e.preventDefault()
      fetch('http://localhost:3000/toys', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: toyInput[0].value,
          image: toyInput[1].value
        })
      })
      .then(response => response.json())
      .then(json => renderToy(json))
    })
  } else {
    toyForm.style.display = 'none'
  }
})

fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(json => renderToys(json))

let i = 1;
function renderToy(toy) {
  const card = document.createElement('div')
  card.className = "card"
  card.innerHTML = `<h2> ${toy.name}</h2>`
  card.innerHTML += `<img src="${toy.image}" class="toy-avatar" />`
  card.innerHTML += `<p> ${toy.likes} </p>`
  card.innerHTML += `<button id="${i}" class="like-btn">Like <3</button>`
  toyContainer.appendChild(card)
  i++
}

function renderToys(toys) {
  console.log("lol");

  toys.forEach(function(toy){
    renderToy(toy)
  })
  toyCard = document.querySelectorAll('.card > h2')
}

toyContainer.addEventListener('click', function(e) {
  if (e.target.className === "like-btn") {
    toyLikes = document.getElementById(`${e.target.id}`).parentNode.childNodes[2]
    let integer = parseInt(toyLikes.innerText)
    let incrementInteger = integer += 1
    fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: incrementInteger
      })
    })
    .then(response => response.json())
    .then(json => renderLike(json))
  }
})

function renderLike(json) {
  toyLikes.innerText = json.likes.toString()
}
