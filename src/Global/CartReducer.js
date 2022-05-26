import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export const CartReducer = (state, action) => {

    const { shoppingCart, totalPrice, totalQty } = state;

    let post;
    let index;
    let updatedPrice;
    let updatedQty;

    switch (action.type) {

        case 'ADD_TO_CART':

            const check = shoppingCart.find(post => post.postId === action.id);
            if (check) {
                toast.info('this product is already in your cart', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
                return state;
            }
            else {
                console.log('jusy tpost', post)
                post = action.post;
                post['qty'] = 1;
                post['TotalProductPrice'] = post?.post?.price * post.qty;
                updatedQty = totalQty + 1;
                updatedPrice = Number(totalPrice) + Number(post.post.price);
                return {
                    shoppingCart: [post, ...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
                }
            }
            break;

        case 'INC':
            post = action.cart;
            post.qty = ++post.qty;
            post.TotalpostPrice = post.qty * post.post?.price;
            updatedQty = Number(totalQty) + 1;
            updatedPrice = Number(totalPrice) + Number(post.post?.price);
            index = shoppingCart.findIndex(cart => cart.postId === action.id);
            shoppingCart[index] = post;
            return {
                shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
            }
            break;

        case 'DEC':
            post = action.cart;
            if (post.qty > 1) { 
                post.qty = post.qty - 1;
                post.TotalpostPrice = post.qty * (post.post?.price);
                updatedPrice = totalPrice - post.post.price;
                updatedQty = totalQty - 1;
                index = shoppingCart.findIndex(cart => cart.postId === action.id);
                shoppingCart[index] = post;
                return {
                    shoppingCart: [...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty
                }
            }
            else {
                return state;
            }
            break;

        case 'DELETE':
            const filtered = shoppingCart.filter(post => post.postId !== action.id);
            post = action.cart;
            updatedQty = totalQty - post.qty;
            updatedPrice = totalPrice - post.qty * post.post.price;
            return {
                shoppingCart: [...filtered], totalPrice: updatedPrice, totalQty: updatedQty
            }
            break;

        case 'EMPTY':
            return {
                shoppingCart: [], totalPrice: 0, totalQty: 0
            }

        default:
            return state;

    }

}
