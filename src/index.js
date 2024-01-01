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
  card.innerHTML = `
  <div class = "c-container">
    <h2 class="name-t">${toyName.name}</h2>
    <img src='${toyName.image}' class="toy-avatar" >
      <p>Likes: <span> ${toyName.likes}</span></p>
      <button class="like-btn" id="${toyName.id}">Like ❤️</button>
  </div>
  `;
  document.querySelector("#toy-collection").appendChild(card)
}

let name = document.querySelector(".input-text");
let image = document.querySelector("#inputText");

let newToy = {
  name: name,
  image: image,
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
