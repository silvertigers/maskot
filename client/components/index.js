/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user/user-home'
export {default as AdminHome} from './admin/admin-home'
export {default as AdminProducts} from './admin/admin-products'
export {default as AdminMain} from './admin/admin-main'
export {Login, Signup} from './user/auth-form'
export {default as Products} from './products/Products'
export {default as SingleProduct} from './products/SingleProduct'
export {default as SingleReview} from './products/SingleReview'
export {default as Cart} from './cart/Cart'
export {default as AddToCart} from './products/AddToCart'
export {default as UserOrders} from './orders/user-orders'
export {default as SingleOrder} from './orders/SingleOrder'
export {default as Checkout} from './cart/Checkout'
export {default as Confirmation} from './cart/Confirmation'
export {default as ReviewForm} from './reviewForm'

