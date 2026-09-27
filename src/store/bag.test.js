import bag from './bag';
let values = {};
global.localStorage = { getItem: key => values[key] || null, setItem: (key,value) => { values[key]=String(value); }, clear: () => { values={}; } };
global.Event = function Event(type) { this.type=type; };
global.window = { dispatchEvent: jest.fn() };
beforeEach(() => { localStorage.clear(); window.dispatchEvent.mockClear(); });
test('merges quantities, persists them, and removes a line at zero', () => {
  bag.add('barbell', 2); bag.add('barbell', 3); bag.add('shaker', 1);
  expect(bag.count()).toBe(6);
  expect(bag.read()).toEqual([{id:'barbell',quantity:5},{id:'shaker',quantity:1}]);
  bag.update('barbell', 0);
  expect(bag.read()).toEqual([{id:'shaker',quantity:1}]);
  expect(window.dispatchEvent).toHaveBeenCalledTimes(4);
});
test('rejects excess or invalid quantities without changing the existing bag', () => {
  bag.add('barbell',20);
  expect(() => bag.add('barbell')).toThrow();
  expect(() => bag.add('shaker',-1)).toThrow();
  expect(() => bag.update('barbell',1.5)).toThrow();
  expect(bag.read()).toEqual([{id:'barbell',quantity:20}]);
});
test('malformed storage recovers and invalid stored lines cannot affect totals', () => {
  localStorage.setItem('gorilla-gainz-bag-v1','{broken'); expect(bag.read()).toEqual([]);
  localStorage.setItem('gorilla-gainz-bag-v1',JSON.stringify([{id:'good',quantity:2},{id:'bad',quantity:-3},{id:'huge',quantity:100000}]));
  expect(bag.count()).toBe(2);
});
test('a failed storage write leaves the saved bag intact', () => {
  bag.add('barbell',1);
  const original=localStorage.setItem;
  localStorage.setItem=()=>{throw Error('Storage full');};
  try { expect(()=>bag.add('barbell',1)).toThrow();expect(bag.read()).toEqual([{id:'barbell',quantity:1}]); }
  finally { localStorage.setItem=original; }
  expect(window.dispatchEvent).toHaveBeenCalledTimes(1);
});
