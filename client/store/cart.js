const EDIT_CART = 'EDIT_CART'
const GOT_CART_FROM_STORAGE = 'GOT_CART_FROM_STORAGE'
const EMPTY_CART = 'EMPTY_CART'

export const editCart = products => ({type: EDIT_CART, products})
export const emptyCart = () => ({type: EMPTY_CART})
const gotCartFromStorage = products => ({type: GOT_CART_FROM_STORAGE, products})

export const setCartToStorage = ({user, cart}) => {
  if (user && user.id) {
    persistUserCart()
  } else {
    persistGuestCart()
  }

  function persistUserCart() {
    const [...userCarts] =
      JSON.parse(window.localStorage.getItem('userCarts')) || []
    const prevCart = userCarts.find(cart => cart.userId === user.id) || {}
    if (prevCart) {
      prevCart.cart = cart
      window.localStorage.setItem('userCarts', JSON.stringify(userCarts))
    } else {
      window.localStorage.setItem(
        'userCarts',
        JSON.stringify([...userCarts, {userId: user.id, cart}])
      )
    }
  }
  function persistGuestCart() {
    window.localStorage.setItem('guestCart', JSON.stringify(cart))
  }
}

export const getCartFromStorage = ({user, cart}) => {
  return dispatch => {
    const [...userCarts] =
      JSON.parse(window.localStorage.getItem('userCarts')) || []
    let prevUserCart =
      userCarts.find(userCart => userCart.userId === user.id) || {}

    if (user && user.id) {
      if (cart[0]) {
        mergeToUserCart(dispatch)
      } else {
        const products = prevUserCart.cart || []
        dispatch(gotCartFromStorage(products))
      }
    } else {
      const [...guestCart] =
        JSON.parse(window.localStorage.getItem('guestCart')) || []
      dispatch(gotCartFromStorage(guestCart))
    }

    function mergeToUserCart(dispatch) {
      const mergedCart = []
      const newCartIdQty = cart.reduce((pairs, item) => {
        pairs[item.product.id] = {quantity: item.quantity}
        return pairs
      }, {})

      for (let i = 0; i < prevUserCart.cart.length; i++) {
        const currentItem = prevUserCart.cart[i]
        const duplicate = newCartIdQty[currentItem.product.id]
        if (duplicate) {
          currentItem.quantity = currentItem.quantity + duplicate.quantity
        }
        mergedCart.push(currentItem)
      }
      dispatch(gotCartFromStorage(mergedCart))
    }
  }
}

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case EDIT_CART:
      return action.products
    case GOT_CART_FROM_STORAGE:
      return action.products
    case EMPTY_CART:
      return initialState
    default:
      return state
  }
}
