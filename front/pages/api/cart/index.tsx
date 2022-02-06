const API_URL = 'http://localhost:4000/api/cart';

export async function createCart() {
  const reponse = await fetch(API_URL, {
    method: 'POST'
  });
  const data = await reponse.json();
  return data;
}

export async function getCartItems(cartId) {
  const response = await fetch(`${API_URL}/${cartId}`, {
    method: 'GET',
  });
  const data = response.json();
  return data;
}

export async function addItemToCart(id,item) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'POST',
    body: JSON.stringify(item)
  });
  const data = response.json();
  return data;
}

export async function removeItemFromCart(cartId,item) {
  await fetch(`${API_URL}/${cartId}/${item.id}`, {
    method: 'DELETE',
  });
}

export default function handler(req, res) {
  req.setHeader('Content-Type', 'application/json');
  req.setHeader('Access-Control-Allow-Origin', '*')
}
