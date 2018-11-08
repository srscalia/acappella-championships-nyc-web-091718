// ******************** variables ********************************
let tableBody;
let winner;
let lastEvent = false;

// ******************** event listeners **************************

document.addEventListener('DOMContentLoaded', (event)=>{
  tableBody = document.querySelector('#table-body')
  winner = document.querySelector('#winner')

  fetchColleges()

  tableBody.addEventListener('click', (event)=>{
    if (event.target.id === "trophy") {
      trophyHandler(event)
    }
    if (event.target.id === "delete"){
      deleteHandler(event)
    }
  })
})


// ******************** helper functions *************************

function fetchColleges(){
  fetch('http://localhost:3000/a_cappella_groups')
  .then(response=>response.json())
  .then((json)=>{
    addCollegesToDom(json)
  })
}

function addCollegesToDom(json){
  json.forEach((college)=>{
    addSingleCollegeToDom(college)
  })
}

function addSingleCollegeToDom(college){
  tableBody.innerHTML+=`
  <tr data-id='${college.id}'/></>
    <td class="college">${college.college.name}
      <div><input id = 'delete' type="button" value = 'delete' name="button"></input></div>
    </td>
    <td class="group-name">${college.name}</td>
    <td>${college.membership}</td>
    <td>${college.college.division}</td>
    <td><input id = "trophy" type=image src='./assets/trophy.png' data-id='${college.id}'/></td>
  </tr>`
}

function trophyHandler(event){
  if (lastEvent) {
    lastEvent.style = ''
  }
  // lastEvent.style.display=''
  // unhide what previously in the header as the winner
  let college = event.target.parentElement.parentElement.querySelector('.college').innerText
  let group = event.target.parentElement.parentElement.querySelector('.group-name').innerText
  //add winner to header
  winner.innerText = ''
  winner.innerText += ` ${college} ${group}`
  // hide the twinner row
  hideRow(event)
}

function hideRow(event){
  lastEvent = event.target.parentElement.parentElement
  event.target.parentElement.parentElement.style.display='none'
}

function deleteHandler(event){
  let id = event.target.parentElement.parentElement.parentElement.dataset.id
  fetch(`http://localhost:3000/a_cappella_groups/${id}`, {
    method: 'delete'
  }).then((response)=> {
    if (response.ok) {
      event.target.parentElement.parentElement.parentElement.remove()
      
    }
  })
}
