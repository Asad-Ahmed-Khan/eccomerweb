import React, { useContext } from 'react'
import { ProductsContext } from '../Global/ProductsContext'
import { CartContext } from '../Global/CartContext'
import { toast } from "react-toastify";
import { postDel } from "../../redux/actionCreators/postsActionCreator";
import  StarRating from "../../Components/StarRating"


export const Products = () => {

    const history = useHistory();
    const postDelete = () => {
      dispatch(postDel(post.postId));
      toast.success("Post deleted successfully!");
    };

    const { products } = useContext(ProductsContext);

    const { dispatch } = useContext(CartContext);
  

    return (
        <>
         <div className="card col-md-5 px-0 m-2" key={id}>
            {products.length !== 0 && <h1>Products</h1>}
            <div className='products-container'>
                {products.length === 0 && <div>slow internet...no products to display</div>}
                {products.map(product => (
                    <div className='product-card' key={product.ProductID}>
                        <div className='product-img'>
                            <img src={product.ProductImg} alt="not found" />
                        </div>
                        <div className='product-name'>
                            {product.ProductName}
                        </div>
                        <div className='product-price'>
                            Rs {product.ProductPrice}.00
                    </div>
                    <div style={{margin:'auto'}} >
                    <StarRating product={product}  /></div>
                    <p style={{margin:'auto'}}>{Number(product?.rating).toFixed(2) || 0}</p>
                        <button className='addcart-btn' onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}>ADD TO CART</button>
                        <div className="">
  //         <button
            className="btn btn-primary  my-2 btn-block"
            onClick={() => history.push(`/admin/dashboard/post/${post.postId}`)}
          >
            <i className="fa fa-eye"></i> See Post
          </button>
          <div className="text-right">
            <button
              type="button"
              onClick={() =>
                history.push(`/admin/dashboard/post/${post.postId}/edit`)
              }
              className="btn btn-outline-primary  my-2  mx-1"
            >
              <i className="fa fa-pencil"></i> Edit Post
            </button>
            <button
              type="button"
              onClick={postDelete}
              className="btn btn-danger my-2ss"
            >
              <i className="fa fa-trash-o"></i> Delete Post
            </button>
          </div>
        </div>
                     
                    </div>
                ))}
            </div>
            </div>
        </>
    )
}
