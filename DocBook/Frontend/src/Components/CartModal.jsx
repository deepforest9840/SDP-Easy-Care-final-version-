// import React, { useState, useEffect } from "react";

// const CartModal = ({ product, onClose, onSubmit }) => {
//     const [quantity, setQuantity] = useState(1); // Initial quantity
//     const [cartId, setCartId] = useState(null);

//     // Fetch next cart ID for user ID 1
//     useEffect(() => {
//         const fetchNextCartId = async () => {
//             try {
//                 const response = await fetch("http://localhost:9191/api/v1/medicine_cart/next-cart-id/2");
//                 const data = await response.json();
//                 setCartId(data);
//             } catch (err) {
//                 console.error("Error fetching cart ID:", err);
//             }
//         };
//         fetchNextCartId();
//     }, []);

//     const handleQuantityIncrease = () => {
//         setQuantity((prev) => prev + 1); // Increment quantity
//     };

//     const handleQuantityDecrease = () => {
//         if (quantity > 1) {
//             setQuantity((prev) => prev - 1); // Decrement quantity, minimum is 1
//         }
//     };

//     const handleSubmit = async () => {
//         const cartItem = {
//             userId: 2, // Fixed user ID
//             cartId,
//             productId: product.id,
//             quantity,
//             unitPrice: product.price,
//         };

//         try {
//             const response = await fetch("http://localhost:9191/api/v1/medicine_cartItems/add", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(cartItem),
//             });
//             if (response.ok) {
//                 alert("Item added to cart successfully!");
//                 onSubmit();
//             } else {
//                 throw new Error("Failed to add item to cart.");
//             }
//         } catch (err) {
//             console.error("Error adding to cart:", err);
//             alert("Failed to add item to cart.");
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//                 <h2 className="text-lg font-bold mb-4">Add to Cart</h2>
//                 <p><strong>Product:</strong> {product.name}</p>
//                 <p><strong>Unit Price:</strong> ${product.price}</p>

//                 {/* Quantity Controls */}
//                 <div className="mt-4">
//                     <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity:</label>
//                     <div className="flex items-center space-x-2 mt-2">
//                         <button
//                             onClick={handleQuantityDecrease}
//                             className="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                         >
//                             -
//                         </button>
//                         <span className="text-lg font-semibold">{quantity}</span>
//                         <button
//                             onClick={handleQuantityIncrease}
//                             className="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                         >
//                             +
//                         </button>
//                     </div>
//                 </div>

//                 {/* Buttons */}
//                 <div className="mt-6 flex justify-end space-x-4">
//                     <button
//                         onClick={onClose}
//                         className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         onClick={handleSubmit}
//                         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                     >
//                         Submit
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CartModal;


import React, { useState, useEffect } from "react";

const CartModal = ({ product, onClose, onSubmit }) => {
    const [quantity, setQuantity] = useState(1); // Initial quantity
    const [cartId, setCartId] = useState(null);

    // Fetch next cart ID for user ID 1
    useEffect(() => {
        const fetchNextCartId = async () => {
            try {
                const response = await fetch("http://localhost:9191/api/v1/medicine_cart/next-cart-id/2");
                const data = await response.json();
                setCartId(data);
            } catch (err) {
                console.error("Error fetching cart ID:", err);
            }
        };
        fetchNextCartId();
    }, []);

    const handleQuantityIncrease = () => {
        setQuantity((prev) => prev + 1); // Increment quantity
    };

    const handleQuantityDecrease = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1); // Decrement quantity, minimum is 1
        }
    };

    const handleSubmit = async () => {
        const cartItem = {
            userId: 2, // Fixed user ID
            cartId,
            productId: product.id,
            quantity,
            unitPrice: product.price,
        };

        try {
            const response = await fetch("http://localhost:9191/api/v1/medicine_cartItems/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cartItem),
            });
            if (response.ok) {
                alert("Item added to cart successfully!");
                onSubmit();
            } else {
                throw new Error("Failed to add item to cart.");
            }
        } catch (err) {
            console.error("Error adding to cart:", err);
            alert("Failed to add item to cart.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-bold mb-4">Add to Cart</h2>
                <p><strong>Product:</strong> {product.name}</p>
                <p><strong>Unit Price:</strong> ${product.price}</p>

                {/* Quantity Controls */}
                <div className="mt-4">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity:</label>
                    <div className="flex items-center space-x-2 mt-2">
                        <button
                            onClick={handleQuantityDecrease}
                            className="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            -
                        </button>
                        <span className="text-lg font-semibold">{quantity}</span>
                        <button
                            onClick={handleQuantityIncrease}
                            className="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartModal;