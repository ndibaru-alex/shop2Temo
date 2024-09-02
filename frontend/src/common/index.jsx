
const backendDomain = ''
const SummaryApi = {

     signUp : {
        url : `${backendDomain}/api/signup`,
        method : 'post'
     },
     signIn:{
      url : `${backendDomain}/api/signin`,
      method : 'post'
     },
     current_user : {
      url : `${backendDomain}/api/user-details`,
      method : 'get'
     },
     logout_user : {
      url : `${backendDomain}/api/userLogout`,
      method : 'get'
     },
     allUser : {
      url : `${backendDomain}/api/all-users`,
      method : 'get'
     },
     updateUser :{
      url : `${backendDomain}/api/update-user`,
      method : "post"
     },
     uploadProduct: {
      url : `${backendDomain}/api/upload-product`,
      method : 'post'
     },
     getProduct : {
      url :`${backendDomain}/api/get-products`,
      method : 'get'
     },
     updateProduct : {
      url : `${backendDomain}/api/update-product`,
      method : 'post'
     },
     categoryProduct : {
      url : `${backendDomain}/api/get-productCategory`,
      method : 'get'
     },
     getCategoryWiseProduct : {
      url : `${backendDomain}/api/categoryWise-product`,
      method : 'post'
     },
     productDetails : {
      url :  `${backendDomain}/api/product-details`,
      method : 'post'
     },
     addToCart : {
      url : `${backendDomain}/api/add-to-cart`,
      method : 'post'
     },
     cartCount : {
     url : `${backendDomain}/api/cartCount`, 
     method : 'get'
     },
     viewCart : {
      url : `${backendDomain}/api/cartItems`, 
      method : 'get'
     },
     updateCartQuantity : {
      url : `${backendDomain}/api/updateCartQuantity`,
      method : 'post'
     },
     deleteCartItem :{
      url :`${backendDomain}/api/deleteCartProduct`,
      method : 'post'
     },
     searchProduct : {
       url :`${backendDomain}/api/search`,
      method : 'get'
     }

    

}

export default SummaryApi
