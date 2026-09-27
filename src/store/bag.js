const key = 'gorilla-gainz-bag-v1';
function read() {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    if (!Array.isArray(value)) return [];
    return value.filter(item => item && typeof item.id === 'string' && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 20);
  } catch (_) { return []; }
}
function write(items) {
  localStorage.setItem(key, JSON.stringify(items));
  window.dispatchEvent(new Event('gg-bag-change'));
  return items;
}
export default {
  read,
  count: () => read().reduce((sum, item) => sum + item.quantity, 0),
  add(id, quantity = 1) {
    if (typeof id !== 'string' || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) throw Error('Choose a quantity between 1 and 20.');
    const items = read(); const found = items.find(item => item.id === id);
    if (found && found.quantity + quantity > 20) throw Error('Your bag can hold up to 20 of each item.');
    if (found) found.quantity += quantity;
    else items.push({ id, quantity });
    return write(items);
  },
  update(id, quantity) {
    if (!Number.isInteger(quantity) || quantity < 0 || quantity > 20) throw Error('Choose a quantity between 1 and 20.');
    return write(read().map(item => item.id === id ? { ...item, quantity } : item).filter(item => item.quantity > 0));
  },
  clear: () => write([])
};
