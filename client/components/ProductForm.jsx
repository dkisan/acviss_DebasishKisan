import { useEffect, useRef } from "react";

const ProductForm = ({ product, afterUpdateHandler }) => {
    const productNameRef = useRef('');
    const categoryRef = useRef('');
    const priceRef = useRef(0);

    useEffect(() => {
        if (product) {
            productNameRef.current.value = product.name
            categoryRef.current.value = product.category
            priceRef.current.value = product.price
        }
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newProduct = {
            name: productNameRef.current.value,
            category: categoryRef.current.value,
            price: priceRef.current.value,
        };
        if (!product) {

            if (!newProduct.name) {
                alert("Product name is required");
                productNameRef.focus()
                return
            }

            if (!newProduct.category) {
                alert("Category is required");
                categoryRef.focus()
                return
            }

            if (!newProduct.price || isNaN(newProduct.price)) {
                alert("Price is required and must be a number");
                priceRef.focus()
                return
            }


            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/products/`, {
                    method: 'POST',
                    headers: {
                        'Authorization': localStorage.getItem('userToken'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newProduct)
                });
                if(response.ok){
                    const data = await response.json();
                    alert(data.message)
                    afterUpdateHandler()
                }else{
                    alert('Some error occured')
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/products/${product._id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': localStorage.getItem('userToken'),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newProduct)
                });
                const data = await response.json();
                alert(data.message)
                afterUpdateHandler()
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Product Name:
                <input
                    type="text"
                    ref={productNameRef}
                />
            </label>
            <label>
                Category:
                <select
                    ref={categoryRef}
                >
                    <option value="">Select a category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home Goods">Home Goods</option>
                </select>
            </label>
            <label>
                Price:
                <input
                    type="number"
                    ref={priceRef}
                />
            </label>
            <button type="submit">
                {product ?
                    "Update" :
                    "Add New Product"
                }
            </button>
        </form>
    );
}

export default ProductForm;