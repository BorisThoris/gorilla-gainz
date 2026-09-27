import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink, withRouter } from 'react-router-dom';
import productsService from '../services/productsService';
import auth from '../services/authService';
import bag from './bag';
import { details, money } from './gear';
import gorillaPic from '../gorillaPic.jpg';
import './store.css';

const Arrow = () => <span aria-hidden="true">↗</span>;
const sessionValue = key => { try { return sessionStorage.getItem(key); } catch (_) { return null; } };
const Brand = () => <span className="brand"><img src={gorillaPic} alt=""/><span>Gorilla Gainz</span></span>;
class GearImage extends React.Component {
  state = { failed: false };
  componentDidUpdate(previous) { if (previous.src !== this.props.src && this.state.failed) this.setState({ failed: false }); }
  render() { return <img className={this.props.className || ''} src={this.state.failed || !this.props.src ? '/gear/dumbbell.svg' : this.props.src} alt={this.props.alt} onError={() => { if (!this.state.failed) this.setState({ failed: true }); }} />; }
}
function ProductCard({ item, add }) {
  const product = details(item);
  return <article className="gear-card">
    <h3><Link to={'/product-view/' + product._id}>{product.productName}</Link></h3>
    <Link className="gear-art" to={'/product-view/' + product._id} aria-label={'View ' + product.productName}><GearImage src={product.imgUrl} alt={product.productName}/></Link>
    <p className="card-description">{product.productDesc}</p>
    <div className="gear-meta"><strong>{money(product.price)}</strong><Link className="button primary" to={'/product-view/' + product._id}>More Information</Link></div>
    <button className="quick-add" onClick={() => add(product)}>Add to bag <span aria-hidden="true">+</span></button>
  </article>;
}
class Home extends React.Component {
  state = { playing: false };
  render() {
    return <section className="store-section media-page"><div className="section-head"><div><h1>Gorilla Gainz</h1><p>Training, motivation and fitness gear.</p></div><Link className="button primary" to="/catalogue">Browse products</Link></div>
      <div className="training-video">{this.state.playing
        ? <iframe src="https://www.youtube-nocookie.com/embed/zvlKjTQJqHk?autoplay=1" title="Original Gorilla Gainz training video" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen/>
        : <div className="video-cover"><img src={gorillaPic} alt="Gorilla Gainz original gorilla artwork"/><div><h2>Training motivation</h2><p>The original Gorilla Gainz video.</p><button className="button primary" onClick={() => this.setState({playing:true})}>Play video on YouTube</button><p className="quiet-note">Loads YouTube when you press play.</p></div></div>}</div>
    </section>;
  }
}
class Catalogue extends React.Component {
  state = { search: '', category: new URLSearchParams(this.props.location.search).get('category') || 'All gear', sort: 'featured', maximum: '' };
  render() {
    let items = this.props.products.map(details).filter(item => (this.state.category === 'All gear' || item.category === this.state.category) && (item.productName + ' ' + item.productDesc).toLowerCase().includes(this.state.search.trim().toLowerCase()) && (!this.state.maximum || Number(item.price) <= Number(this.state.maximum)));
    if (this.state.sort === 'low') items.sort((a,b) => Number(a.price)-Number(b.price));
    if (this.state.sort === 'high') items.sort((a,b) => Number(b.price)-Number(a.price));
    return <section className="store-section catalogue"><div className="section-head"><div><h1>Gorilla Gainz catalogue</h1><p>Find your training gear. Product edits and your bag are saved on this device.</p></div>{this.props.admin && <Link className="button outline" to="/manage/new">Create product +</Link>}</div><div className="catalogue-layout"><aside className="catalogue-sidebar"><div className="category-tabs" aria-label="Product categories">{['All gear','Strength','Mobility','Accessories'].map(category => <button key={category} aria-pressed={this.state.category === category} onClick={() => this.setState({ category })}>{category}</button>)}</div><div className="catalogue-controls"><label className="search-label">Search gear<input type="search" placeholder="Find your next essential…" value={this.state.search} onChange={event => this.setState({ search:event.target.value })}/></label><label>Maximum price<input type="number" min="0" placeholder="Any price" value={this.state.maximum} onChange={event => this.setState({ maximum:event.target.value })}/></label><label>Sort by<select value={this.state.sort} onChange={event => this.setState({ sort:event.target.value })}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div><p className="result-count" role="status">{items.length} {items.length === 1 ? 'product' : 'products'}</p></aside><div className="catalogue-results">{items.length ? <div className="gear-grid">{items.map(item => <ProductCard key={item._id} item={item} add={this.props.add}/>)}</div> : <div className="empty-state"><span aria-hidden="true">↺</span><h2>No gear in this corner.</h2><p>Try another search or bring back the full collection.</p><button className="button primary" onClick={() => this.setState({search:'',category:'All gear',maximum:''})}>Reset filters</button></div>}</div></div></section>;
  }
}
class Product extends React.Component {
  state = { quantity: 1 };
  render() {
    const found = this.props.products.find(item => item._id === this.props.match.params.id);
    if (!found) return <Missing/>;
    const item = details(found);
    return <section className="store-section product-page"><Link className="back-link" to="/catalogue">← Back to all gear</Link><div className="product-layout"><div className="product-art"><span className="gear-tag">{item.tag}</span><GearImage src={item.imgUrl} alt={item.productName}/></div><div className="product-copy"><p className="eyebrow">{item.category} / THE GORILLA COLLECTION</p><h1>{item.productName}</h1><p className="product-price">{money(item.price)}</p><p className="product-description">{item.productDesc}</p><ul className="product-specs">{item.specs.map(spec => <li key={spec}>{spec}</li>)}</ul><div className="buy-row"><label>Quantity<select value={this.state.quantity} onChange={event => this.setState({quantity:Number(event.target.value)})}>{[1,2,3,4,5].map(n => <option key={n}>{n}</option>)}</select></label><button className="button primary" onClick={() => this.props.add(item,this.state.quantity)}>Add to bag <span>+</span></button></div><p className="quiet-note">Portfolio demo · no payment or delivery is processed.</p>{this.props.admin && <Link className="text-link admin-link" to={'/manage/' + item._id}>Edit this product <Arrow/></Link>}<details className="product-disclosure"><summary>About this collection</summary><p>An independent fitness-store concept. Product illustrations are original local assets; the catalogue and your bag work without a backend.</p></details></div></div></section>;
  }
}
class BagPage extends React.Component {
  state = { receipt: null, error: '' };
  change = (id, quantity) => { try { bag.update(id,quantity); this.setState({error:''}); } catch (error) { this.setState({error:'Your change could not be saved. Allow browser storage and try again.'}); } };
  checkout = () => {
    const lines=this.props.bagItems.map(line => ({...line, product:this.props.products.find(item=>item._id===line.id)})).filter(line=>line.product);
    if (!lines.length) return;
    const receipt={id:'GG-'+Date.now().toString(36).toUpperCase(),lines,total:lines.reduce((sum,line)=>sum+Number(line.product.price)*line.quantity,0)};
    try { bag.clear(); this.setState({receipt,error:''}); } catch (_) { this.setState({error:'Your bag could not be saved. Please allow browser storage and try again.'}); }
  };
  render() {
    if (this.state.receipt) return <section className="store-section receipt"><p className="eyebrow">DEMO ORDER / {this.state.receipt.id}</p><span className="receipt-mark" aria-hidden="true">✓</span><h1>Your setup is ready.</h1><p>This was a practice checkout. No order was sent, no money was charged, and no personal details were collected.</p><ul>{this.state.receipt.lines.map(line=><li key={line.id}><span>{line.quantity} × {line.product.productName}</span><strong>{money(line.product.price*line.quantity)}</strong></li>)}</ul><div className="receipt-total"><span>Demo total</span><b>{money(this.state.receipt.total)}</b></div><Link className="button primary" to="/catalogue">Back to the collection <Arrow/></Link></section>;
    const lines=this.props.bagItems.map(line=>({...line,product:this.props.products.find(item=>item._id===line.id)}));
    const subtotal=lines.reduce((sum,line)=>sum+(line.product?Number(line.product.price)*line.quantity:0),0);
    return <section className="store-section"><p className="eyebrow">MAKE ROOM FOR YOUR NEXT REP</p><h1>Your bag.</h1>{this.state.error && <p role="alert" className="form-error">{this.state.error}</p>}{!lines.length ? <div className="empty-state"><span aria-hidden="true">↗</span><h2>Your next routine starts here.</h2><p>Find a few essentials to make it your own.</p><Link className="button primary" to="/catalogue">Explore the gear <Arrow/></Link></div> : <div className="bag-layout"><div>{lines.map(line=>line.product?<article className="bag-line" key={line.id}><Link to={'/product-view/'+line.id}><GearImage src={details(line.product).imgUrl} alt={line.product.productName}/></Link><div><p className="eyebrow">{details(line.product).category}</p><h2><Link to={'/product-view/'+line.id}>{line.product.productName}</Link></h2><label>Quantity<select aria-label={'Quantity for '+line.product.productName} value={line.quantity} onChange={event=>this.change(line.id,Number(event.target.value))}>{Array.from({length:20},(_,i)=><option key={i+1}>{i+1}</option>)}</select></label><button className="remove-link" onClick={()=>this.change(line.id,0)}>Remove <span className="sr-only">{line.product.productName}</span></button></div><strong>{money(line.product.price*line.quantity)}</strong></article>:<article className="bag-line" key={line.id}><p>A product in your bag has been removed from the catalogue.</p><button onClick={()=>this.change(line.id,0)}>Remove unavailable item</button></article>)}</div><aside className="order-summary"><p className="eyebrow">YOUR TRAINING KIT</p><h2>The round-up.</h2><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div><span>Delivery</span><span>Not applicable</span></div><div className="summary-total"><span>Demo total</span><strong>{money(subtotal)}</strong></div><button disabled={!subtotal} className="button primary" onClick={this.checkout}>Complete demo order <Arrow/></button><p>No payment. No shipping. A complete practice checkout, saved only for this visit.</p><Link to="/catalogue" className="text-link">Keep exploring</Link></aside></div>}</section>;
  }
}
class Account extends React.Component {
  state = { name: sessionValue('username') || '', role:'shopper', error:'' };
  submit = event => {
    event.preventDefault();
    if (!this.state.name.trim()) { this.setState({error:'Enter a display name to start your demo session.'}); return; }
    auth.register(this.state.name.trim(),'',this.state.role==='editor','/gear/kettlebell.svg').then(user=>{auth.saveSession(user);this.props.refreshAuth();this.props.history.push('/catalogue');}).catch(()=>this.setState({error:'This session could not be saved. Check browser storage and try again.'}));
  };
  render() { return <section className="store-section account-page"><div><p className="eyebrow">WELCOME TO THE CLUB</p><h1>Your pace.<br/>Your space.</h1><p>Explore as a shopper, or try the original store-management workflow in editor mode.</p><p className="quiet-note">This is a local demo session, not a real account. No password or email is needed.</p></div><form className="account-form" onSubmit={this.submit}><h2>{this.props.loggedIn?'Switch your demo session':'Make yourself at home.'}</h2><label>Display name<input required maxLength="40" autoComplete="nickname" value={this.state.name} onChange={e=>this.setState({name:e.target.value})} placeholder="What should we call you?"/></label><fieldset><legend>Explore the store as</legend><label><input type="radio" name="role" value="shopper" checked={this.state.role==='shopper'} onChange={()=>this.setState({role:'shopper'})}/> Shopper <small>Browse and build a training kit</small></label><label><input type="radio" name="role" value="editor" checked={this.state.role==='editor'} onChange={()=>this.setState({role:'editor'})}/> Store editor <small>Create, update and remove local products</small></label></fieldset>{this.state.error&&<p role="alert">{this.state.error}</p>}<button className="button primary">Enter the store <Arrow/></button></form></section>; }
}
class ProductForm extends React.Component {
  constructor(props) { super(props); const item=props.products.find(p=>p._id===props.match.params.id); this.state={name:item?item.productName:'',price:item?item.price:'',description:item?item.productDesc:'',image:item?item.imgUrl:'/gear/dumbbell.svg',error:'',busy:false,confirm:false}; }
  save = event => { event.preventDefault();this.setState({busy:true,error:''});const values=[this.state.price,this.state.image,this.state.description,this.state.name];const operation=this.props.match.params.id==='new'?productsService.createProduct(...values):productsService.editProduct(...values,this.props.match.params.id);operation.then(()=>this.props.reload()).then(()=>{this.props.notice('Product saved.');this.props.history.push('/catalogue');}).catch(error=>this.setState({error:error.message,busy:false})); };
  remove = () => { this.setState({busy:true,error:''});productsService.deleteProduct(this.props.match.params.id).then(()=>this.props.reload()).then(()=>{this.props.notice('Product removed.');this.props.history.push('/catalogue');}).catch(error=>this.setState({error:error.message,busy:false})); };
  render() { const isNew=this.props.match.params.id==='new';if(!this.props.admin)return <section className="store-section empty-state"><h1>Store editor access</h1><p>Choose a local editor session to manage the demo catalogue.</p><Link className="button primary" to="/account">Choose a session</Link></section>;if(!isNew&&!this.props.products.some(p=>p._id===this.props.match.params.id))return <Missing/>;return <section className="store-section editor-page"><Link className="back-link" to="/catalogue">← Back to catalogue</Link><p className="eyebrow">LOCAL STORE EDITOR</p><h1>{isNew?'Make room for new gear.':'Refine the essentials.'}</h1><div className="editor-layout"><form onSubmit={this.save}><label>Product name<input required maxLength="80" value={this.state.name} onChange={e=>this.setState({name:e.target.value})}/></label><label>Price ($)<input required type="number" min=".01" max="100000" step=".01" value={this.state.price} onChange={e=>this.setState({price:e.target.value})}/></label><label>Description<textarea required maxLength="1200" rows="5" value={this.state.description} onChange={e=>this.setState({description:e.target.value})}/></label><label>Image path or URL<input required value={this.state.image} onChange={e=>this.setState({image:e.target.value})}/></label><p className="quiet-note">Try /gear/barbell.svg, /gear/kettlebell.svg or your own HTTPS image.</p>{this.state.error&&<p className="form-error" role="alert">{this.state.error} Your draft is still here.</p>}<div className="form-actions"><button disabled={this.state.busy} className="button primary">{this.state.busy?'Saving…':'Save product'}</button><Link className="button outline" to="/catalogue">Cancel</Link></div>{!isNew&&<div className="delete-zone">{this.state.confirm?<div><p>Remove this product from your local catalogue?</p><button type="button" disabled={this.state.busy} onClick={this.remove}>Yes, remove product</button><button type="button" onClick={()=>this.setState({confirm:false})}>Keep product</button></div>:<button type="button" onClick={()=>this.setState({confirm:true})}>Remove this product</button>}</div>}</form><div className="editor-preview"><p className="eyebrow">PRODUCT PREVIEW</p><GearImage src={this.state.image} alt="Product image preview"/><h2>{this.state.name||'Your next essential'}</h2><p>{money(this.state.price||0)}</p></div></div></section>; }
}
function Missing() { return <section className="store-section empty-state"><p className="eyebrow">OFF THE SHELF</p><h1>Nothing here just yet.</h1><p>This page or product is no longer available. The rest of the collection is waiting.</p><Link className="button primary" to="/catalogue">Explore all gear <Arrow/></Link></section>; }
class Shell extends React.Component {
  state = { products:[],loaded:false,bagItems:bag.read(),loggedIn:!!sessionValue('authtoken'),admin:sessionValue('isAdmin')==='true',message:'' };
  componentDidMount() { this.reload();window.addEventListener('gg-bag-change',this.updateBag);window.addEventListener('storage',this.updateBag); }
  componentWillUnmount() {window.removeEventListener('gg-bag-change',this.updateBag);window.removeEventListener('storage',this.updateBag);clearTimeout(this.messageTimer);}
  componentDidUpdate(previous) { if(previous.location.pathname!==this.props.location.pathname){window.scrollTo(0,0);document.title=(this.props.location.pathname==='/catalogue'?'Training gear':this.props.location.pathname==='/bag'?'Your bag':'Gorilla Gainz')+' · Everyday strength';const main=document.getElementById('store-content');if(main)main.focus();} }
  reload = () => productsService.getAllProducts().then(products=>this.setState({products,loaded:true}));
  updateBag = () => this.setState({bagItems:bag.read()});
  refreshAuth = () => this.setState({loggedIn:!!sessionValue('authtoken'),admin:sessionValue('isAdmin')==='true'});
  notice = message => {clearTimeout(this.messageTimer);this.setState({message});this.messageTimer=setTimeout(()=>this.setState({message:''}),5000);};
  add = (item,quantity=1) => { try {bag.add(item._id,quantity);this.notice(item.productName+' added to your bag.');}catch(error){this.notice(error.message.includes('20')?error.message:'Your bag could not be saved. Allow browser storage and try again.');} };
  logout = () => {auth.logout().then(()=>{this.refreshAuth();this.notice('Demo session ended. Your bag is kept.');this.props.history.push('/');});};
  render() {
    const count=this.state.bagItems.reduce((sum,item)=>sum+item.quantity,0);const shared={...this.state,add:this.add,reload:this.reload,notice:this.notice,refreshAuth:this.refreshAuth};
    return <div className="gg-store"><a className="skip-link" href="#store-content">Skip to content</a><div className="demo-strip"><span>GORILLA GAINZ</span><span>DEMO STORE · NO REAL PURCHASES</span></div><header className="store-header"><Link className="brand-link" to="/" aria-label="Gorilla Gainz home"><Brand/></Link><nav aria-label="Main navigation"><NavLink to="/home">Media</NavLink><NavLink to="/catalogue">Products</NavLink><NavLink to="/account">{this.state.loggedIn?'Profile':'Login'}</NavLink>{this.state.loggedIn&&<button className="sign-out" onClick={this.logout}>Sign out</button>}</nav><Link className="bag-link" to="/bag" aria-label={'Shopping bag, '+count+' items'}><span>Bag</span><b>{count}</b></Link></header><main id="store-content" tabIndex="-1">{!this.state.loaded?<p className="store-section">Getting your gear ready…</p>:<Switch><Route exact path={['/','/home']} render={props=><Home {...props} {...shared}/>}/><Route exact path="/catalogue" render={props=><Catalogue {...props} {...shared}/>}/><Route exact path="/product-view/:id" render={props=><Product key={props.match.params.id} {...props} {...shared}/>}/><Route exact path="/bag" render={props=><BagPage {...props} {...shared}/>}/><Route exact path={['/account','/login','/register','/user-profile']} render={props=><Account {...props} {...shared}/>}/><Route exact path="/manage/:id" render={props=><ProductForm key={props.match.params.id} {...props} {...shared}/>}/><Route component={Missing}/></Switch>}</main><footer className="store-footer"><Brand/><p>Train. Eat. Repeat.</p><Link to="/catalogue">Explore the collection <Arrow/></Link><small>A local portfolio store. No payments, orders or deliveries are processed.</small></footer><div className={'store-toast'+(this.state.message?' visible':'')} role="status" aria-live="polite">{this.state.message}{this.state.message&&<Link to="/bag">View bag →</Link>}</div></div>;
  }
}
const RoutedShell=withRouter(Shell);
export default function Store(){return <BrowserRouter><RoutedShell/></BrowserRouter>;}
