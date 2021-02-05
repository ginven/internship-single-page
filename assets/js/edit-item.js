const editItemForm = document.querySelector('.form-edit-item');
const userMessageSection = document.querySelector('.user-message');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('productId');

let title = document.querySelector("#title");
let date = document.querySelector("#date");
let image = document.querySelector("#imageUrl");
let content = document.querySelector("#content");

const deleteBtn = document.querySelector('.btn-delete');

const showMessage = (message, cssClass) => {
    const htmlMessage = document.createElement('div');
    htmlMessage.innerHTML = `
        <div class="alert alert-sm ${cssClass}" role="alert">
        ${message}
        </div>  
    `
    userMessageSection.appendChild(htmlMessage);
}

const fetchProduct = () => {
    fetch('http://localhost:3000/items/' + productId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => {
      if (!response.ok) {
        showMessage('<strong>Something went wrong!</strong> Check if this product exists.', 'alert-danger');
        throw new Error('Network response was not ok');
      }
      return response.json()
    })
    .then(data => {
      console.log('Success:', data);
      title.value = data.title;
      date.value = data.date;
      image.value = data.image;
      content.value = data.content;    
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

const editProduct = (event) => {
	event.preventDefault();
    
    // OTHER WAYS TO GET FORM DATA??
    // const data = new FormData(addItemForm).entries();
    title = document.querySelector("#title").value;
    date = document.querySelector("#date").value;
    image = document.querySelector("#imageUrl").value;
    content = document.querySelector("#content").value;


    fetch('http://localhost:3000/items/' + productId, {
    method: 'PUT',
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
        showMessage('<strong>Oh no!</strong> Something went wrong. Try again.', 'alert-danger');
        throw new Error('Network response was not ok');
      }
      return response.json()
    })
    .then(data => {
        showMessage('<strong>Well done!</strong> You updated product succesfully.', 'alert-success');
        // WHAT TO DO NEXT? REDIRECT? 
        console.log(data)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const deleteProduct = (event) => {

    fetch('http://localhost:3000/items/' + productId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => {
      if (!response.ok) {
        showMessage('<strong>Something went wrong</strong> Check if this product exists.', 'alert-danger')  
        throw new Error('Network response was not ok');
      }
      return response.json()
    })
    .then(data => {

        // showMessage('<strong>Well done!</strong> You updated product succesfully.', 'alert-success');
        window.location = "index.html";
        console.log(data)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const confirmDelete = () => {
    if (confirm('Are you sure you want to delete this item?')) {
        deleteProduct()
      } else {
        // Do nothing!
      }
  }

  window.onload = (event) => {
    fetchProduct() 
  };
  
editItemForm.addEventListener('submit', editProduct)
deleteBtn.addEventListener('click', confirmDelete)