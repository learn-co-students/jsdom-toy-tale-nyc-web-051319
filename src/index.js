document.addEventListener("DOMContentLoaded", function() {
  const collectionOfToys = document.querySelector("#toy-collection")

  console.log("Load that DOM")
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(function(json) {
      console.log(json)
      json.forEach(function(toyElement) {
        const toyCard = document.createElement('div')
        toyCard.class = "card"
        toyCard.innerHTML = `
        <h2>${toyElement.name}</h2>
        <img src=${toyElement.image} class="toy-avatar" />
        <p>${toyElement.likes} Likes</p>
        <button class="like-btn">Like ❤️</button>
        `
        toyCard.id = `${toyElement.id}`
        collectionOfToys.appendChild(toyCard)

        toyCard.addEventListener('click', (e) => {
          // if e.target = documen
          // toyElement.likes++
          if (e.target.className === "like-btn") {
            toyElement.likes++
            fetch(`http://localhost:3000/toys/${toyElement.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },

              body: JSON.stringify({
                "likes": toyElement.likes
              })
            }) //end fetch
            .then(resp => resp.json())
            .then(json => {
              const likesView = e.target.previousElementSibling
              console.log(likesView)
              likesView.innerText = `${toyElement.likes} Likes`;


            })
            console.log(toyElement.likes)
          }

        })


    }) // closes ForEach
    //
    // const likeBtns = document.getElementsByClassName('like-btn')
    // console.log(likeBtn)
    //
    // likeBtn.addEventListener('click', (e) => {
    //   const toyId = likeBtn.parentNode.id
    //   console.log(likeBtn.parentNode.id)
    // }) // closes likeBtn

  }) // Closes .then



const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    toyForm.addEventListener('submit', (event) => {
      event.preventDefault();
      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },

        body: JSON.stringify({
          "name": document.querySelector("#name-input").value,
          "image": document.querySelector("#image-input").value,
          "likes": "0"
        }) // close body


      }) // close fetch
      .then(function(response) {
        return response.json();
      })
      .then(function(json){
        const toyCard = document.createElement('div')
        toyCard.class = "card"
        toyCard.innerHTML = `
        <h2>${json.name}</h2>
        <img src=${json.image} class="toy-avatar" />
        <p>${json.likes} Likes</p>
        <button class="like-btn">Like ❤️</button>
        `
        collectionOfToys.appendChild(toyCard)

        toyCard.addEventListener('click', (e) => {
          // if e.target = documen
          // toyElement.likes++
          if (e.target.className === "like-btn") {
            json.likes++
            console.log(json.likes)
          }
        })

      }) //end pessimistic
    })
  } else {
    toyForm.style.display = 'none'
  }
})

}) //closing DOM

// OR HERE!
