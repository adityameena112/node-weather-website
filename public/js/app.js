console.log('Client site javascript file is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
	response.json().then((data) => {
		console.log(data)
	})
})



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
	e.preventDefault()

	// document.getElementById('spn').classList.add('spinner-border');

	messageOne.textContent = 'Loading'
    messageTwo.textContent = ''

	const location = search.value

	fetch('/weather?address=' + location).then((response) => {
	
	response.json().then((data) => {
		if (data.error) {
			// document.getElementById('spn').classList.remove('spinner-border');
			messageOne.textContent = data.error
		}
		else {
			// document.getElementById('spn').classList.remove('spinner-border');
			messageOne.textContent = data.location
			messageTwo.textContent = data.forecast
		}
	})
})
})



