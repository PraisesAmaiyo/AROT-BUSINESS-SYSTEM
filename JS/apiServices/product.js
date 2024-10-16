import { baseUrl, token as apiToken } from '../../config';

export async function getProducts() {
  try {
    //  console.log('Sending GET request...');
    const response = await fetch(`${baseUrl}/api/products`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
    });

    //  console.log('Response received...');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    //  console.log('Products:', data);
    return data;
  } catch (error) {
    //  console.error('Error fetching products:', error);
    return [];
  }
}

getProducts();

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
