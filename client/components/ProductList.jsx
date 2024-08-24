import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import { Link, useNavigate } from 'react-router-dom'
import ProductDetails from "./ProductDetails";
import Navbar from "./Navbar";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [showProduct, setShowProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [error, setError] = useState(null);
    const [fetchProduct, setFetchProduct] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('userToken')) {
            navigate('/login')
        }
    })

    async function afterUpdateHandler() {
        setIsEdit(false)
        setShowProduct(null)
        setFetchProduct(prev => !prev)
    }


    async function handleEdit(product) {
        setSelectedProduct(product)
        setIsEdit(true)
    }

    async function handleDelete(id) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': localStorage.getItem('userToken'),
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                alert('Product Delected Successfully')
                setFetchProduct(prev => !prev)
            } else {
                throw new Error('Some Error Occured')
            }
        } catch (error) {
            setError(error.message);
            setTimeout(() => {
                setError(null)
            }, 2000)
        }
    }

    async function getProducts() {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/products/`, {
                headers: {
                    'Authorization': localStorage.getItem('userToken'),
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setTimeout(() => {
                setError(null)
            }, 2000)
        }
    }

    useEffect(() => {
        getProducts()
    }, [fetchProduct]);

    return (
        <>
            <Navbar />
            <div className="product-list">
                {loading ? (
                    <p className="loading">Loading...</p>
                ) :
                    products.length === 0 ?
                        <p style={{ textAlign: 'center' }}>No Products...</p>
                        :
                        <table className="product-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                setShowProduct(true)
                                                setSelectedProduct(product)
                                            }}
                                        >{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>Rs.{product.price}/-</td>
                                        <td>
                                            <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
                                            <button className="delete-btn" onClick={() => handleDelete(product._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                }
                {error && <p className="error">{error}</p>}
            </div >
            {isEdit &&
                <div className="backdrop"
                    onClick={() => {
                        setIsEdit(false)
                        setSelectedProduct(null)
                    }}
                >
                    <div className="modal"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <ProductForm product={selectedProduct} afterUpdateHandler={afterUpdateHandler} />
                    </div>
                </div>
            }

            {showProduct &&
                <div className="backdrop"
                    onClick={() => {
                        setShowProduct(false)
                        setSelectedProduct(null)
                    }}
                >
                    <div className="modal"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <ProductDetails product={selectedProduct} />
                    </div>
                </div>
            }



            <div className="add-product"
                onClick={() => {
                    setIsEdit(true)
                }}
            >
                <button >+</button>
            </div>

        </>
    );
}

export default ProductList;