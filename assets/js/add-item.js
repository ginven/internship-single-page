const addItemForm = document.querySelector('.form--add');
const userMessageSection = document.querySelector('.main__user-message');


const showMessage = (message, cssClass) => {
    const htmlMessage = document.createElement('div');
    htmlMessage.innerHTML = `
        <div class="alert alert-sm ${cssClass}" role="alert">
        ${message}
        </div>  
    `
    userMessageSection.appendChild(htmlMessage);
}

// ADD PRODUCT WITH PROMISE .THEN CHAINS
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
                showMessage('<strong>Oh no!</strong> Something went wrong. Try again.', 'alert-danger');
                throw new Error('Network response was not ok');
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
            showMessage('<strong>Well done!</strong> You added product succesfully.', 'alert-success');
            setTimeout(function(){
                window.location = "index.html";
            }, 2000);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// ADD PRODUCT WITH ASYNC/AWAIT

// const addProduct = async (event) => {
//     event.preventDefault();

//     const title = document.querySelector("#title").value;
//     const date = document.querySelector("#date").value;
//     const image = document.querySelector("#imageUrl").value;
//     const content = document.querySelector("#content").value;

//     try {
//         const response = await fetch('http://localhost:3000/items', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 title: title,
//                 image: image,
//                 date: date,
//                 content: content
//             })
//         })
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             } 
//         const data = await response.json();
//         console.log(data)
//         window.location = "index.html";
//     } catch(e) {
//         console.error('Error:', error);
//     } 
// }



addItemForm.addEventListener('submit', addProduct)

