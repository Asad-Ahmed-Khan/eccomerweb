import React, { useContext, useEffect } from 'react'
import { CartContext } from '../Global/CartContext'
import Navbar from './Navbar';
import { Icon } from 'react-icons-kit'
import { ic_add } from 'react-icons-kit/md/ic_add'
import { ic_remove } from 'react-icons-kit/md/ic_remove'
import { iosTrashOutline } from 'react-icons-kit/ionicons/iosTrashOutline'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { auth } from '../Config/config'
import { Login } from '../Components/Login';

export const Cart = ({ user }) => {
    console.log('lskhdfoksdfjidshf')
    
    const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);

    const history = useHistory();

    // useEffect(() => {
    //     auth.onAuthStateChanged(user => {
    //         if (user.length !== 0) {
    //             history.push('/login');
    //         }
    //     })
    // })
    useEffect(() => {
        auth.onAuthStateChanged(user =>   {
        if(user.length !== 0 ){
    alert('login your account')
}
})
    }) 

console.log('cart data', shoppingCart)
    return (
        <>
            <Navbar user={user} />
            <>

                {shoppingCart.length !== 0 && <h1>Cart</h1>}
                <div className='cart-container'>
                    {
                        shoppingCart.length === 0 && <>
                            <div>no items in your cart or slow internet causing trouble (Refresh the page) or you are not logged in</div>
                            <div><Link to="/">Return to Home page</Link></div>
                        </>
                    }
                    {shoppingCart && shoppingCart.map(cart => (
                      
                        <div className='cart-card' key={cart.postId}>
                            
                            <div className='cart-img'>
                                <img src={cart.post.image} alt="not found" />
                               { console.log('dfghjk' ,cart.postId)}
                            </div>

                            <div className='cart-name'>{cart.post.title}</div>

                            <div className='cart-price-orignal'>Rs {cart.post.price}.00</div>

                            <div className='inc' onClick={() => dispatch({ type: 'INC', id: cart.postId, cart })}>
                                <Icon icon={ic_add} size={24} />
                            </div>

                            <div className='quantity'>{cart.qty}</div>

                            <div className='dec' onClick={() => dispatch({ type: 'DEC', id: cart.postId, cart })}>
                                <Icon icon={ic_remove} size={24} />
                            </div>

                            <div className='cart-price'>
                                Rs {cart.TotalProductPrice}.00
                            </div>

                            <button className='delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cart.postId, cart })}>
                                <Icon icon={iosTrashOutline} size={24} />
                            </button>
                        </div>
                    ))
                    }
                    {shoppingCart.length > 0 && <div className='cart-summary' >
                        <div className='cart-summary-heading'>
                            Cart-Summary
                        </div>
                        <div className='cart-summary-price'>
                            <span>Total Price</span>
                            <span>{totalPrice}</span>
                        </div>
                        <div className='cart-summary-price'>
                            <span>Total Qty</span>
                            <span>{totalQty}</span>
                        </div>
                        <Link to='cashout' className='cashout-link'>
                            <button type="submit" className='btn btn-success btn-md' style={{ marginTop: 5 + 'px' }}>
                                Cash on delivery
                            </button>
                        </Link>
                    </div>}
                </div>
            </>
        </>
    )
}
