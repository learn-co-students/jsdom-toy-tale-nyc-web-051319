const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
const likeBtn = document.querySelector('.like-btn')
let addToy = false
// YOUR CODE HERE

document.addEventListener("DOMContentLoaded", getEverything)

function getEverything() {
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toyObjects => renderToys(toyObjects))
    .then(addAllEventListeners())
}

function addAllEventListeners() {


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    //add event listener
  } else {
    toyForm.style.display = 'none'
  }
})

toyForm.addEventListener('submit', (event) => {
  event.preventDefault()
  let newName = event.target.name.value
  let newImage = event.target.image.value

  addToyToCollection(newName, newImage)

})

toyCollection.addEventListener('click', (event) => {
  event.preventDefault()
  console.log(event.target);
  if (event.target.innerText === 'Like ❤️'){
    var toyId = event.target.dataset.toyId
    console.log(toyId);
    var toyLikes = document.querySelector(`#toy-${toyId}`)
    console.log("TOY LIKES", toyLikes);
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        "likes": ++toyLikes.innerText
      })
    })
    .then(resp => resp.json())
    .then(toyLikes.innerText = json.likes)
    // pessimistic render
    }
  })
} //end event listeners

function renderToys(toys) {
  toys.forEach(toy => addSingleToyToPage(toy))
}

function addSingleToyToPage(toyObject) {
  toyCollection.innerHTML += `
  <div class="card" data-id=${toyObject.id}>
    <h2>${toyObject.name}</h2>
    <img src=${toyObject.image} class="toy-avatar" />
    <p id=toy-${toyObject.id}>${toyObject.likes}</p>
    <button data-toy-id=${toyObject.id} class="like-btn">Like ❤️</button>
  </div>
  `
}
//   var likeCounter
// document.getElementByTagName('p').innerHTML

function addToyToCollection(name, image){
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      "name": name,
      "image": image,
      "likes": "0"
    })
  })
  .then(resp => resp.json())
  .then(toyObj => {
    addSingleToyToPage(toyObj)})
}



//
//
//
// fetch('http://localhost:3000/toys')
//   .then(resp => resp.json())
//   .then(json => {
//     json.forEach(function(toyElement){
//       ///stopping here below is garbage
//     })
//     `
//   <div class="card">
//     <h2>actualForm.name.value</h2>
//     <img src=actualForm.image.value class="toy-avatar" />
//     <p>4 Likes </p>
//     <button class="like-btn">Like <3</button>
//   </div>
//   `
// })
//
//
// function postData(){
//
//   fetch('http://localhost:3000/toys', {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify({
//       "name": actualForm.name.value,
//       "image": actualForm.image.value
//     })
//     .then(function(response){
//       return response.json();
//     })
//     .then(function(object){
//       toyCollection.innerHTML += `
//       <div class="card">
//         <h2>actualForm.name.value</h2>
//         <img src=actualForm.image.value class="toy-avatar" />
//         <p>4 Likes </p>
//         <button class="like-btn">Like <3</button>
//       </div>
//       `
//     })
//   })
// }
// postData()
//
// addBtn.addEventListener('click', () => {
//   // hide & seek with the form
//   addToy = !addToy
//   if (addToy) {
//     toyForm.style.display = 'block'
//     // submit listener here
//   } else {
//     toyForm.style.display = 'none'
//   }
// })
//
// // OR HERE!
// }) //end DOM
