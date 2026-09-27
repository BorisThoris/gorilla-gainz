export const gear = [
  { _id: 'demo-barbell-kit', productName: 'Foundation Barbell', price: 149, category: 'Strength', art: 'barbell', tag: 'THE ESSENTIAL', productDesc: 'A balanced steel bar and rubber-coated plates for your first rep and your next personal best.', specs: ['20 kg training set', 'Knurled steel grip', 'Rubber-coated plates'] },
  { _id: 'demo-training-gloves', productName: 'Grip Training Gloves', price: 29, category: 'Accessories', art: 'gloves', tag: 'GET A GRIP', productDesc: 'Lightweight palm protection with a flexible wrist wrap. Made for hanging on through the last set.', specs: ['Breathable mesh back', 'Padded palm', 'Adjustable wrist wrap'] },
  { _id: 'demo-shaker-pack', productName: 'Daily Shaker', price: 18, category: 'Accessories', art: 'shaker', tag: 'EVERYDAY CARRY', productDesc: 'Your pre-workout, post-workout, all-day bottle. A wide opening makes mixing and cleaning simple.', specs: ['700 ml capacity', 'Mixing ball included', 'Secure screw-top lid'] },
  { _id: 'gg-kettlebell', productName: 'Cast Kettlebell', price: 64, category: 'Strength', art: 'kettlebell', tag: 'BUILT TO SWING', productDesc: 'One weight, endless ways to move. A wide handle and grounded base for swings, carries and presses.', specs: ['16 kg cast iron', 'Powder-coated finish', 'Flat, stable base'] },
  { _id: 'gg-bands', productName: 'Resistance Trio', price: 24, category: 'Mobility', art: 'bands', tag: 'MOVE BETTER', productDesc: 'Warm up, add resistance or take your training outside. Three levels in a kit that goes anywhere.', specs: ['Light / medium / heavy', 'Three closed-loop bands', 'Storage pouch included'] },
  { _id: 'gg-dumbbell', productName: 'Hex Dumbbell Pair', price: 89, category: 'Strength', art: 'dumbbell', tag: 'YOUR NEXT SET', productDesc: 'Reliable daily drivers for a home strength routine. Hex heads stay where you put them between sets.', specs: ['2 × 10 kg dumbbells', 'Textured steel handles', 'Non-rolling rubber heads'] }
].map(item => ({ ...item, imgUrl: '/gear/' + item.art + '.svg' }));

export const money = value => '$' + Number(value).toFixed(2);
export function details(product) {
  const original = gear.find(item => item._id === product._id);
  return { category: 'Accessories', tag: 'TRAINING GEAR', specs: ['Independent demo catalogue', 'Locally saved product'], ...original, ...product,
    imgUrl: original && /images\.unsplash\.com/.test(product.imgUrl) ? original.imgUrl : product.imgUrl };
}
