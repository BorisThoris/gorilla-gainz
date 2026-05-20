import React from 'react';
import NavBar from '../components/Navbar.jsx';
import Footer from '../components/footer.jsx';


export default class Update extends React.Component {
    state = {
        
    }

    onChange = (e) => {

       
    }

    onSubmit = () => {
        
        
    }

    render() {
        return (
            <div>
                <NavBar />


                
                <div id="productInfo">
                    <center><label id="productTitle"></label></center>

                    <div id="description">
                        
                    </div>

                    <div id="priceDiv">
                        <h4>Price:  $</h4>
                    </div>

                    

                </div>



                <Footer />
            </div>
        );
    }
}
