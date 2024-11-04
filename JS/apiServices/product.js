import config from '../../config.js';

const baseUrl = config.baseUrl;
const apiToken = config.token;

// export async function getProducts() {
//   try {
//     //  console.log('Sending GET request...');
//     const response = await fetch(`${baseUrl}/api/products`, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${apiToken}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     //  console.log('Response received...');

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     //  console.log('Products:', data);
//     return data;
//   } catch (error) {
//     //  console.error('Error fetching products:', error);
//     return [];
//   }
// }

export async function getProducts(page = 1, pageSize = 25) {
  try {
    const response = await fetch(
      `${baseUrl}/api/products?pagination[page]=${page}&pagination[pageSize]=${pageSize}&pagination[withCount]=true`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Returns both product data and pagination meta
  } catch (error) {
    console.error('Error fetching products:', error);
    return { data: [], meta: { pagination: { pageCount: 1 } } };
  }
}

export async function addProduct(productData) {
  try {
    //  console.log('Sending POST request...');
    const response = await fetch(`${baseUrl}/api/products`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    //  console.log('Response received...');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    //  console.log('Product added successfully:', data);
    return data;
  } catch (error) {
    //  console.error('Error posting product:', error);
  }
}

export async function updateProduct(documentId, productData) {
  try {
    //  console.log('Sending PUT request...');
    const response = await fetch(`${baseUrl}/api/products/${documentId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    //  console.log('Response received...');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    //  console.log('Product updated successfully:', data);
    return data;
  } catch (error) {
    console.error('Error updating product:', error);
  }
}
