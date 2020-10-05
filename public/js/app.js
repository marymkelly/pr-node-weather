console.log("Client side javascript file is loaded");

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('m-1');
const messageTwo = document.getElementById('m-2');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const location = search.value;

	messageOne.textContent = 'Loading...';
	messageTwo.textContent = '';

	fetch('/weather?address=' + location).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageOne.textContent = data.error;
			} else {
				messageOne.textContent = data.location;
				messageTwo.textContent = data.dataString;
			}
		})
	}).catch((error) => {
		console.log('Error: ' + error);
	})
})