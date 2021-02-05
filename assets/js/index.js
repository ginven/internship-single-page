
// FETCH PRODUCTS WITH ASYNC/AWAIT 
// async function fetchProducts() {
//     const response = await fetch('http://localhost:3000/items', {
//         method: 'GET', 
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//     const data = await response.json()
//     console.log('Success:', data);
//     let productsSection = document.querySelector('.products');
//     for(i = 0; i < data.length; i++) {
//       let oneProduct  = document.createElement("article");
//       oneProduct.classList.add('product');
//       oneProduct.innerHTML = listProductsTemplate(data[i], i);
//       productsSection.append(oneProduct)
//     }
// }

// FETCH PRODUCTS WITH PROMISE .THEN CHAINS
const fetchProducts = () => {
  fetch('http://localhost:3000/items', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json()
    })
    .then(data => {
      console.log('Success:', data);
      let productsSection = document.querySelector('.products');
      for (i = 0; i < data.length; i++) {
        let oneProduct = document.createElement("article");
        oneProduct.classList.add('product');
        oneProduct.innerHTML = listProductsTemplate(data[i], i);
        productsSection.append(oneProduct)
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

const listProductsTemplate = (item) => {
  return `
      <a href="edit-item.html?productId=${item.id}">
          <figure>
              <img src="${item.image}"
                  alt="${item.title}">
          </figure>
          <h2>${item.title}</h2>
          <p class="price">${item.content} €</p>
      </a>
  `
}

window.onload = (event) => {
  fetchProducts()
};




