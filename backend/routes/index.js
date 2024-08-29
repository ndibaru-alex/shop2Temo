
const express = require('express');

const router = express.Router()

const userSignUpController = require('../controller/User/userSignUp')
const userSignInController = require('../controller/User/userSignIn')
const userDetailController = require('../controller/User/userDetails')
const authToken = require('../middleware/authToken')
const UserLogout =require('../controller/User/userLogout');
const allUsers = require('../controller/User/allUsers');
const updateUser = require('../controller/User/updateUser')
const uploadProduct = require('../controller/product/uploadProduct')
const getProductContrller = require('../controller/product/getProduct')
const  updateProductController = require('../controller/product/updateProduct')
const getProductCategory = require('../controller/product/getProductCategory')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const GetProductDetails = require('../controller/product/getProductDetails');
const addToCartController = require('../controller/User/adToCartController');
const cartCount= require('../controller/User/addedToCartCount')
const  ViewCartProducts = require('../controller/User/ViewCartProducts')
const updateCartQuantity = require('../controller/User/updartCartQuantity')
const deleteCartItem = require('../controller/User/deleteCartProduct')
const searchProduct = require('../controller/product/searchProduct')


router.post('/signup' , userSignUpController)
router.post('/signin', userSignInController)
router.get('/user-details',authToken,userDetailController)
router.get('/userLogout',UserLogout)

//admin panel 
router.get('/all-users',authToken,allUsers)
router.post('/update-user',authToken,updateUser)

router.post('/upload-product',authToken,uploadProduct)
router.get('/get-products',getProductContrller)
router.post('/update-product',authToken,updateProductController)
router.get('/get-productCategory',getProductCategory)
router.post('/categoryWise-product',getCategoryWiseProduct)
router.post('/product-details',GetProductDetails)
router.get('/search',searchProduct)

// user add to cart
router.post('/add-to-cart', authToken ,addToCartController)
router.get('/cartCount',authToken,cartCount)
router.get('/cartItems',authToken,ViewCartProducts)
router.post('/updateCartQuantity',authToken,updateCartQuantity)
router.post('/deleteCartProduct',authToken,deleteCartItem)





module.exports = router 