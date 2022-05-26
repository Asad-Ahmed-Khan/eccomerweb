import React, { useContext, useState } from "react";
import { Rate } from "antd";
import { db } from "../Config/config";
import { ProductsContext } from "../Global/ProductsContext";



const StarRating = ({ product }) => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const { products } = useContext(ProductsContext);

    const addRating = (val) => {
        try {
            db.runTransaction(transaction => {
                let productRef = db.collection('posts').doc(product?.postId)//.where('id', '==', product?.ProductID);
                // console.log('productRef', productRef);
                let totalRate = (Number(product?.totalRate) || 0) + Number(val);
                let users = product?.users || 0;
                let updatedUser = users + 1;
                let updatedRating = totalRate / updatedUser;
                transaction.update(productRef, { users: updatedUser, rating: updatedRating, totalRate });
                return Promise.resolve();
            })
                .then(data => {
                    window.location.reload();
                    return Promise.resolve('success');
                })
        } catch (err) {
            console.log('error', err);
            return Promise.reject(new Error(err));
        }
    }

    return (
        <div>
            {/* {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label>
                        <input type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                          
                        />
                        <StarOutlined
                            className="star"
                            color={ratingValue <= rating ? "#FF9529" : "#e4e5e9"}
                            size={100}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}

                        />

                    </label>
                );
            })} */}
            <Rate defaultValue={0} value={rating} onChange={addRating}
             className='rateStar' />
        </div>
    )
}

export default StarRating;