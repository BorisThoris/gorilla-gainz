import { gear } from '../store/gear';
const key = 'gorilla-gainz-products-v1';
let catalogue = gear.map(item => ({ ...item }));
try {
  const saved = JSON.parse(localStorage.getItem(key));
  if (Array.isArray(saved) && saved.every(item => item && typeof item._id === 'string' && typeof item.productName === 'string' && Number.isFinite(Number(item.price)) && Number(item.price) > 0)) catalogue = saved;
} catch (_) { /* A damaged local draft cannot prevent the sample store opening. */ }
function persist(next) { localStorage.setItem(key, JSON.stringify(next)); catalogue = next; }
function validated(price, imgUrl, productDesc, productName) {
  if (!Number.isFinite(Number(price)) || Number(price) <= 0 || Number(price) > 100000) throw Error('Enter a price between $0.01 and $100,000.');
  if (!productName.trim() || productName.trim().length > 80) throw Error('Give the product a name of up to 80 characters.');
  if (!productDesc.trim() || productDesc.trim().length > 1200) throw Error('Add a description of up to 1,200 characters.');
  if (!/^(https?:\/\/|\/[^/])/.test(imgUrl)) throw Error('Use an image URL starting with https:// or a local /gear/ path.');
  return { price: Math.round(Number(price) * 100) / 100, imgUrl, productDesc: productDesc.trim(), productName: productName.trim() };
}
export default {
  getAllProducts: () => Promise.resolve(catalogue.map(item => ({ ...item }))),
  getProductById: id => Promise.resolve(catalogue.find(item => item._id === id) || null),
  createProduct: (price, imgUrl, productDesc, productName) => Promise.resolve().then(() => {
    const item = { ...validated(price, imgUrl, productDesc, productName), _id: 'product-' + Date.now() + '-' + Math.random().toString(36).slice(2,7) };
    persist([item, ...catalogue]); return item;
  }),
  editProduct: (price, imgUrl, productDesc, productName, id) => Promise.resolve().then(() => {
    const existing = catalogue.find(item => item._id === id);
    if (!existing) throw Error('This product has been removed.');
    const item = { ...existing, ...validated(price, imgUrl, productDesc, productName) };
    persist(catalogue.map(old => old._id === id ? item : old)); return item;
  }),
  deleteProduct: id => Promise.resolve().then(() => { persist(catalogue.filter(item => item._id !== id)); return { _id: id }; })
};
