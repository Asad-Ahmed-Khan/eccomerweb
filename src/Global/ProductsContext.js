import React, { createContext } from 'react'
import { auth, db } from '../Config/config'

export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component {

    state = {
        post: []
    }

    componentDidMount() {

        let userId = '';

        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('SignedUpUsersData').doc(user.uid).get().then(user => {
                    // userId = snapshot?.id
                    const prevpost = []//this.state.products;
                    db.collection('post').orderBy('rating', 'desc').onSnapshot(snapshot => {
                        let changes = snapshot.docChanges();
                        changes.forEach(change => {
                            if (change.type === 'added' && change.doc.data().userId !== user?.id) {
                                prevpost.push({
                                    postID: change.doc.id,
                                    postName: change.doc.data().postName,
                                    postPrice: change.doc.data().postPrice,
                                    postImg: change.doc.data().postImg,
                                    rating: change.doc.data().rating,
                                    users: change.doc.data().users,
                                    totalRate: change.doc.data().totalRate,
                                })
                            }
                            this.setState({
                                post: prevpost
                            })
                        })
                    })
                })
            }
        })

    }
    render() {
        return (
            <ProductsContext.Provider value={{ post: [...this.state.post] }}>
                {this.props.children}
            </ProductsContext.Provider>
        )
    }
}

