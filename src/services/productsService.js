import $ from "jquery";
import React from 'react';
import notify from "../services/notify.js";
import remote from "../services/remote.js";
import auth from "../services/authService.js";

let products = (() => {
    let demoProducts = [
        {
            _id: "demo-barbell-kit",
            price: 149,
            imgUrl: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?auto=format&fit=crop&w=900&q=80",
            productDesc: "Starter barbell and plate bundle for the archived Gorilla Gainz store demo.",
            productName: "Barbell Kit"
        },
        {
            _id: "demo-training-gloves",
            price: 29,
            imgUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80",
            productDesc: "Grip gloves with wrist support, included as mock catalogue data for local demos.",
            productName: "Training Gloves"
        },
        {
            _id: "demo-shaker-pack",
            price: 18,
            imgUrl: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=900&q=80",
            productDesc: "Reusable shaker pack used to keep the product detail and catalogue flows runnable without Kinvey.",
            productName: "Shaker Pack"
        }
    ];

    function getAllProducts() {
        return Promise.resolve(demoProducts);
    }
    
    function createProduct(price, imgUrl, productDesc, productName) {
        let data = { _id: `demo-product-${Date.now()}`, price, imgUrl, productDesc, productName};

        demoProducts = [data].concat(demoProducts);
        return Promise.resolve(data);
    }

    function editProduct(price, imgUrl, productDesc, productName, productId) {
        let data = { _id: productId, price, imgUrl, productDesc, productName};

        demoProducts = demoProducts.map(product =>
            product._id === productId ? data : product
        );
        return Promise.resolve(data);
    }
    
    function deleteProduct(postId) {
        demoProducts = demoProducts.filter(product => product._id !== postId);
        return Promise.resolve({ _id: postId });
    }

   

    function getProductById(postId) {
        return Promise.resolve(
            demoProducts.find(product => product._id === postId) || demoProducts[0]
        );
    }

    return {
        getAllProducts,
        createProduct,
        editProduct,
        deleteProduct,
        getProductById,
        
        
    }
})();
export default products;
