import config from '../../config.js';

const baseUrl = config.baseUrl;
const apiToken = config.token;

export async function getPosTransactions() {
  try {
    //  console.log('Sending GET request...');
    const response = await fetch(
      `${baseUrl}/api/pos-transactions?populate[transaction_type]=*&populate[withdrawal_type]=*`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    //  console.log('Response received...');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('PosTransactions:', data);
    return data;
  } catch (error) {
    //  console.error('Error fetching PosTransactions:', error);
    return [];
  }
}

export async function createPosTransaction(transactionDetail) {
  try {
    console.log('Sending POST request...');
    const response = await fetch(
      `${baseUrl}/api/pos-transactions?populate[transaction_type]=*&populate[withdrawal_type]=*`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionDetail),
      }
    );

    console.log('Response received...');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Product added successfully:', data);
    return data;
  } catch (error) {
    console.error('Error posting product:', error);
  }
}
