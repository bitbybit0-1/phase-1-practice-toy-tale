let addToy = false;
const picture=document.getElementById("toy-collection")

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

fetch("http://localhost:3000/toys")
.then((resp)=>resp.json())
.then((toys)=>toys.forEach(renderToys))

function renderToys(toy){
  const div= document.createElement("div")
  div.className="card"
  const toys = document.createElement("img")
  toys.src=toy.image
  toys.className="toy-avatar"
  const h2=document.createElement("h2")
  h2.textContent=toy.name
  const likes=document.createElement("p")
  const btn=document.createElement("button")
  btn.className= "like-btn"
  btn.id=toy.id
  likes.textContent=`${toy.likes}`+' likes'
  btn.textContent= `Like`
  btn.addEventListener('click',(event)=>{
  
  let currentLikes=parseInt(likes.textContent)
  currentLikes++
  likes.textContent=`${currentLikes}`+" likes"
  
  fetch(`http://localhost:3000/toys/${event.target.id}`,{
  method:'PATCH',
  headers:{
    "Content-type":"application/json",
    Accept:"application/json"
  },
  body:JSON.stringify({
    "likes": currentLikes
  })
  
})
.then((resp)=>resp.json())
.then(data=>event.target.previousElementSibling.innerText=`${currentLikes}`+" likes")
})
  console.log(toys)
  div.append(h2,toys,likes,btn)
  picture.append(div)
}
const form=document.querySelector(".add-toy-form")
form.addEventListener('submit',(e)=>{
 e.preventDefault()
 console.log(e.target.children[1].value)
  fetch("http://localhost:3000/toys",{
    method:'POST',
    headers:{
      
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": e.target.children[1].value,
      "image": e.target.children[3].value,
      "likes": 0
  })})
  

})})





