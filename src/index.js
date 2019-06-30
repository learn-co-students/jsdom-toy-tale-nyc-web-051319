const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const actualForm = document.querySelector(".add-toy-form")
const toyCollection = document.querySelector('#toy-collection')
const toys = []
let addToy = false

function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => {
    json.forEach(element => {
      toys.push(element)
      toyCollection.innerHTML += `
        <div class="card">
          <h2>${element.name}</h2>
          <img src=${element.image} class="toy-avatar" />
          <p>${element.likes} Likes</p>
          <button class="like-btn">Like <3</button>
        </div>`
    })
  })
}

fetchToys()

actualForm.addEventListener('submit', function(e) {
  
  fetch(`http://localhost:3000/toys`, {
    method: "POST",
    headers: {
      "Content-Type": 'application/json',
      "Accept": 'application/json'
    },
    body: JSON.stringify({
      "name": e.target.name.value,
      "image": e.target.image.value,
      "likes": 0
    })
  })
  .then(resp => resp.json())
  .then(json => {
    toys.push(json)
    toyCollection.innerHTML += `
        <div class="card">
          <h2>${json.name}</h2>
          <img src=${json.image} class="toy-avatar" />
          <p>0 Likes</p>
          <button class="like-btn">Like <3</button>
        </div>`
  })  
})

  toyCollection.addEventListener('click', function(e) {
    if (e.target.matches('.like-btn')) {
      toys.forEach(element => {
        if (element.name === e.target.parentElement.childNodes[1].innerText) {
          element.likes ++
          fetch(`http://localhost:3000/toys/${element.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              "likes": element.likes
            })
          })
            .then(resp => resp.json())
            .then(json => {
              e.target.previousElementSibling.innerText = `${json.likes} Likes`
            })
        }
      })
    }
  })

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

