const EDIT_CART = 'EDIT_CART'
export const editCart = products => ({type: EDIT_CART, products})

export default function(state = [], action) {
  switch (action.type) {
    case EDIT_CART:
      return action.products
    default:
      return state
  }
}
