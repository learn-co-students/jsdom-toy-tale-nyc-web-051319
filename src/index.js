const addBtn = document.querySelector('#new-toy-btn')
const toyFormContainer = document.querySelector('.container')

let addToy = false

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyFormContainer.style.display = 'block'
    // submit listener here
  } else {
    toyFormContainer.style.display = 'none'
  }
})


// MY CODE
const toyCollection = document.querySelector('#toy-collection')
const toyForm = document.querySelector('.add-toy-form')

fetch('http://localhost:3000/toys')
.then(function (response) {
  return response.json()
})
.then(function(json){
  json.forEach(function(toy){
    const toyTag = document.createElement('div')
    toyTag.className = 'card'
    toyTag.innerHTML =
    `
    <h2>${toy.name}</h2>
    <img src= ${toy.image} class="toy-avatar">
    <p>${toy.likes} Likes</p>
    <button class="like-btn">Like <3</button>
    `
    toyCollection.appendChild(toyTag)
    const likeBtn = toyTag.querySelector('.like-btn')
    console.log(likeBtn)
    likeBtn.addEventListener('click', function(e){
      fetch(`http://localhost:3000/toys/${toy.id}`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": `${toy.likes++}`
        })
      })
      toyTag.querySelector("p").innerText = `${toy.likes} Likes`
    })
  })
})

toyForm.addEventListener('submit', function(){
  fetch('http://localhost:3000/toys',{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": document.getElementsByName("name")[0].value,
      "image": document.getElementsByName("image")[0].value,
      "likes": 0
    })
  })
})
