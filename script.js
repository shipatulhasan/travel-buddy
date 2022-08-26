const container = document.getElementById('service-container')



const display = (vehicles)=>{

    const stringifiedObj = JSON.stringify(vehicles);

    const div = document.createElement('div')
    div.className = 'col'
    div.innerHTML = `
            <div class="card h-100">
              <div class="row gx-2 gx-lg-1 ">
                <div class="col-md-4 col-lg-5 ">
                  <img src="${vehicles.image}" class="w-100 h-100 img-fluid rounded-start objct-fit-contain" alt="...">
                </div>
                <div class="col-md-8 col-lg-7">
                  <div class="card-body">
                    <h5 class="card-title lh-base fw-bold text-dark ">${vehicles.title}</h5>
                    <small class="text-dark fw-bold">${vehicles.type}</small>
                    <p class="card-text text-truncate pt-2"> <small>${vehicles.details}</small> </p>
                    
                    <div class="d-flex pb-3">
                       <small class="card-text text-muted pe-3">Fare per kilo: $${vehicles.fare}</small>
                       <small class="card-text text-muted"> Capacity: ${vehicles.capacity}</small>
                   </div>
                   <button type="button" class="btn btn-primary text-white px-3 py-1" data-bs-toggle="modal"
                       data-bs-target="#vehicles-modal" onclick='handleBooking(${stringifiedObj})'>
                       view details
                   </button>
                    </div>
                </div>
                </div>
              </div>
            </div>
        
          `

    container.appendChild(div)
}
// Showing all the card

const serviceArray = [car, rv, bike,gari]
const displayServices = (arr)=>{
  for(element of arr){
    display(element)
  }
}
displayServices(serviceArray)

/** */

function handleBooking(details){
    const stringifiedObj = JSON.stringify(details);

    const modalContainer = document.getElementById('vehicles-details')
   
    
    modalContainer.innerHTML = `
            <div class="modal-header">
                <h5 class="modal-title fw-bold" id="mymodalLabel">${details.title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                 <img src="${details.image}" class="img-fluid rounded" alt="...">
              <div class="px-3">
                 <p class="card-text text-dark fs-4 fw-bold pt-2">${details.type}</p>
                 <p> <small>${details.details}</small> </p>
      
                 <div class="d-flex py-3">
                       <small class="card-text text-muted pe-3">Fare per kilo: $${details.fare}</small>
                       <small class="card-text text-muted"> Capacity: ${details.capacity}</small>
                   </div>
                <div>
                <p class="text-dark fw-semibold">Total Fare: $<span id="display-fare" class="text-dark">00</span></p>
                <p class="text-dark fw-semibold">Tex: $<span id="display-tex" class="text-dark">10%</span></p>
                <p class="text-dark fw-semibold">Total Cost: $<span id="display-total" class="text-dark">00</span></p>

                </div>
                <div class="mb-3 d-flex gap-2">
                <input type="number" class="form-control" id="fare-field" placeholder="input distance">
                <input type="number" class="form-control" id="capacity-field" placeholder="quantity of vehicles">
                </div>
                <div class="col-12">
                <button type="submit" onclick='calculate(${stringifiedObj})' id class="btn btn-primary">calculate</button>
                </div>
              </div>
                 
            </div>
    `
}

const getInputValue = (id)=>{
    const inputField =  document.getElementById(id)
    const inputValue = inputField.value
    inputField.value = ''
    return inputValue

}
const setVlue = (id,value)=>{
    const getElement = document.getElementById(id)
    getElement.innerText = value
}

const calculate = (obj)=>{
    const totalKilo = getInputValue('fare-field')
    const quantity =getInputValue('capacity-field')

    const subtotal = obj.fare * totalKilo * quantity 
    const texTotal = subtotal  * .1
    const totalCost = subtotal + texTotal

    setVlue('display-fare',subtotal)
    setVlue('display-tex',texTotal)
    setVlue('display-total',totalCost)
     
}


// search quries

document.getElementById('search-btn').addEventListener('click',function(event){
  event.preventDefault()
  const searchValue = getInputValue('search-field')
  const search = serviceArray.filter(element => {
  
    const searchElements = element.type.toLowerCase() === searchValue.toLowerCase()
    container.innerHTML = ''
    if(searchValue == ''){
      return container
    }
    return searchElements
  
  })  
  const newArr = search
  console.log(newArr)
  for(const element of newArr){
    display(element)
  }
  if(newArr.length ===0){
    alert('nothing is found')
    displayServices(serviceArray)
  }

})