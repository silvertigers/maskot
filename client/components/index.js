/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as AdminHome} from './admin/admin-home'
export {default as AdminProducts} from './admin/admin-products'
export {default as AdminMain} from './admin/admin-main'
export {Login, Signup} from './auth-form'
export {default as Products} from './products'
export {default as SingleProduct} from './SingleProduct'
export {default as SingleReview} from './SingleReview'
export {default as Cart} from './Cart'
export {default as AddToCart} from './AddToCart'
export {default as UserOrders} from './user-orders'
export {default as SingleOrder} from './singleOrder'
export {default as Checkout} from './Checkout'
export {default as Confirmation} from './Confirmation'
