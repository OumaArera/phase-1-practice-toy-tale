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
// Displays all the toy in the server
const displayAllToy = toyName => {
  // Create a list card
  let card = document.createElement("li");
  card.setAttribute("data-toy-id", toyName.id);
  card.id = "toy";
  // Global variable that assigns a variable to toy id
  toyId = toyName.id;
  // Global variable that assign currentLikes to the likes in the server at a particular id
  currentLikes = toyName.likes;
  // Create an HTML card
  card.innerHTML = `
    <h2 class="name-t">${toyName.name}</h2>
    <img src='${toyName.image}' class="toy-avatar" >
      <p id='likes'>Likes: <span> ${toyName.likes}</span></p>
      <button class="like-btn" id="${toyName.id}">Like ❤️</button>
  `;
  // Append card as a child
  document.querySelector("#toy-collection").appendChild(card)
}
// Creating new name and image
let newName = document.querySelector(".input-text");
let newImage = document.querySelector("#inputText");
// New toy
let newToy = {
  name: newName,
  image: newImage,
  likes: 0
}
// Function posts new toys to the server
const addNewToy = () => {
  // Fetches the data in the server and POST a new toy
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
// Listens to click then calls addNewToy() after preventing default page behavior
document.querySelector(".submit").addEventListener('click', event => {event.preventDefault();addNewToy()})
// Add event listener to execute updateLikes()
document.querySelector(".like-btn").addEventListener('click', e =>{e.preventDefault();updateLikes()})
// Function updates likes by updating the server.
const updateLikes = () =>{
    // Current likes plus 1 like
    currentLikes += 1;
    // Fetches the current data in the server at the given id
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
}
