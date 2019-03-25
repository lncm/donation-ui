import { baseUrl, donationTo } from './config';

export async function newInvoice(amount, description) {
  const url = `${baseUrl}/payment`;
  const data = { amount: parseInt(amount, 10), desc: `${description} ${donationTo}` };

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());

  // TODO handle error
  // .then(response => console.log('Success:', JSON.stringify(response)))
  // .catch(error => console.error('Error:', error));
}

export async function awaitStatus(hash, address) {
  let path = `address=${address}`;

  if (hash) {
    path += `&hash=${hash}`;
  }
  return (await fetch(`${baseUrl}/payment?${path}`)).json();
}
