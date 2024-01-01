let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch("http://localhost:3000/toys")
.then(res => res.json())
.then(data => data.forEach(element => displayAllToy(element)))
.catch(error=> console.log(error))

const displayAllToy = toyName => {
  let card = document.createElement("li");
  card.setAttribute("data-toy-id", toyName.id);
  card.id = "toy";
  toyId = toyName.id;
  currentLikes = toyName.likes;
  card.innerHTML = `
  <div class = "c-container">
    <h2 class="name-t">${toyName.name}</h2>
    <img src='${toyName.image}' class="toy-avatar" >
      <p id='likes'>Likes: <span> ${toyName.likes}</span></p>
      <button class="like-btn" id="${toyName.id}">Like ❤️</button>
  </div>
  `;
  document.querySelector("#toy-collection").appendChild(card)
}

let newName = document.querySelector(".input-text");
let newImage = document.querySelector("#inputText");

let newToy = {
  name: newName,
  image: newImage,
  likes: 0
}
const addNewToy = () => {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newToy),
  })
  .then(res => res.json())
  .then(data => displayAllToy(data))
  .catch(err => console.log(err))
}
document.querySelector(".submit").addEventListener('click', event => {event.preventDefault();addNewToy()})

const updateLikes = () =>{
  document.querySelector(".like-btn").addEventListener('click', e =>{
    e.preventDefault()
    currentLikes += 1;

    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({likes:currentLikes})
    })
    .then(res => res.json())
    .then(() => document.querySelector("#likes").textContent = `Likes: ${currentLikes}`)
    .catch(err => console.log(err))
  })
}