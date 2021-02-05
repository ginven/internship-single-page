const addItemForm = document.querySelector('.form-add-item');

const addProduct = (event) => {
	event.preventDefault();
    
    // OTHER WAYS TO GET FORM DATA??
    // const data = new FormData(addItemForm).entries();
    const title = document.querySelector("#title").value;
    const date = document.querySelector("#date").value;
    const image = document.querySelector("#imageUrl").value;
    const content = document.querySelector("#content").value;


    fetch('http://localhost:3000/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        title: title,
        image: image,
        date: date,
        content: content
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json()
    })
    .then(data => {
        console.log(data)
        window.location = "index.html";
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }


 addItemForm.addEventListener('submit', addProduct)

  