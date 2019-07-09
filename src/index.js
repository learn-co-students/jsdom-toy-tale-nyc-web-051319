const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyCollection = document.querySelector('#toy-collection')
const nameInput = document.querySelector('#name-input')
const imageInput = document.querySelector('#image-input')
const submitBtn = document.querySelector('#submit-button')

//add event listener to document, if user clicks 'like' button patch that toy's likes
toyCollection.addEventListener('click', function(e) {
  // console.log(e.target.dataset.id)
  if(e.target.id === "like-button") {
      // console.log("Like!")
      //INCREMENT LIKES
      let bepis = e.target.dataset.id
    let likeList = document.querySelector(`#likes-${bepis}`)
    fetch(`http://localhost:3000/toys/${bepis}`, {
      method: 'PATCH',
      headers:{
          "Content-Type": "application/json",
          Accept: "application/json"},
      body: JSON.stringify({likes: 1})

    })//fetch end
    .then(res => res.json())
    .then(toy =>
        likeList.innerHTML = `${toy.likes}`
      // likeList.innerHTML = `${toy.likes}`
    )//second then
  }//if end
})//toyCollection event listener
// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
      let toyData = {name: nameInput.value, image: imageInput.value, likes: 0 }
        fetch('http://localhost:3000/toys', {
        	method: "POST",
        	headers:{
        		"Content-Type": "application/json",
        		"Accept": "application/json"
        	},
        	body: JSON.stringify(toyData)
        }).then(res => res.json())
        	.then(toyData =>
            toyCollection.innerHTML +=
              `
              	 <div id="${toyData.id}" class="card">
                  <h2>${toyData.name}</h2>
                  <img src="${toyData.image}" class="toy-avatar" />
                  <p id="likes-${toyData.id}">${toyData.likes}</p>
                  <button class="like-btn" data-id="${toyData.id}" id="like-button">Like <3</button>
                </div>
              `

              //add event listener to like button
          )//second then end, post toy to page and fetch complete
})//end of submit button event listener

  } else {
    toyForm.style.display = 'none'
  }
})



// OR HERE!
