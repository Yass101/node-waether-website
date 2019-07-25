console.log("Client side Javascript file is loaded")

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})


const weatherForm = document.querySelector('form')
const searched = document.querySelector('input')
const msg1 = document.getElementById('msg1')
const msg2 = document.getElementById('msg2')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const value = searched.value;
    fetch(`http://localhost:3000/weather?city=${value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return msg1.innerText = `error has occured >> ${data.error}`;
            }
            msg1.innerText = data.forecast;
            msg2.innerText = data.location;
        })
    })
})