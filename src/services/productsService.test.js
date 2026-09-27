import products from './productsService';
const values = {};
global.localStorage = { getItem: key => values[key] || null, setItem: (key, value) => { values[key] = String(value); } };
test('created and edited products survive a fresh module load; deletion persists', async () => {
  const created = await products.createProduct(25, '/demo.svg', 'Demo gear', 'Demo product');
  expect(JSON.parse(localStorage.getItem('gorilla-gainz-products-v1')).some(p => p._id === created._id)).toBe(true);
  await products.editProduct(30, '/demo.svg', 'Updated gear', 'Updated product', created._id);
  jest.resetModules();
  const restored = require('./productsService').default;
  expect((await restored.getProductById(created._id)).productName).toBe('Updated product');
  await restored.deleteProduct(created._id);
  expect(await restored.getProductById(created._id)).toBe(null);
  expect(JSON.parse(localStorage.getItem('gorilla-gainz-products-v1')).some(p => p._id === created._id)).toBe(false);
});
