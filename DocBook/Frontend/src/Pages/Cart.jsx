// import React, { useState, useEffect } from "react";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";

// const Cart = () => {
//     const [cartId, setCartId] = useState(null);
//     const [cartItems, setCartItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [totalPrice, setTotalPrice] = useState(0);

//     // Fetch the next cart ID using userId
//     const fetchNextCartId = async () => {
//         try {
//             console.log("Fetching next cart ID...");
//             const response = await fetch("http://localhost:9191/api/v1/medicine_cart/next-cart-id/2");
//             const data = await response.json();
//             console.log("Next cart ID fetched:", data);
//             setCartId(data);
//         } catch (error) {
//             console.error("Error fetching cart ID:", error);
//         }
//     };

//     // Fetch cart items using userId and cartId
//     const fetchCartItems = async () => {
//         if (!cartId) return;
//         try {
//             console.log(`Fetching cart items for cart ID: ${cartId}`);
//             const response = await fetch(`http://localhost:9191/api/v1/medicine_cartItems/2/${cartId}`);
//             const data = await response.json();
//             console.log("Raw cart items data fetched:", data);

//             const enrichedItems = await Promise.all(
//                 data.map(async (item) => {
//                     console.log(`Fetching product details for product ID: ${item.productId}`);
//                     const productResponse = await fetch(
//                         `http://localhost:9191/api/v1/products/product/${item.productId}/product`
//                     );
//                     const productData = await productResponse.json();
//                     console.log("Product details fetched:", productData);

//                     return {
//                         ...item,
//                         productName: productData.data.name,
//                         productImage: productData.data.medicine_images[0]?.downloadUrl || null,
//                     };
//                 })
//             );
//             console.log("Enriched cart items:", enrichedItems);
//             setCartItems(enrichedItems);
//         } catch (error) {
//             console.error("Error fetching cart items:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Fetch the total price using userId and cartId
//     const fetchTotalPrice = async () => {
//         if (!cartId) return;
//         try {
//             console.log(`Fetching total price for cart ID: ${cartId}`);
//             const response = await fetch(`http://localhost:9191/api/v1/medicine_cartItems/total-price/2/${cartId}`);
//             const data = await response.json();
//             console.log("Total price fetched:", data);
//             setTotalPrice(data);
//         } catch (error) {
//             console.error("Error fetching total price:", error);
//         }
//     };

//     // Fetch cart ID on component mount
//     useEffect(() => {
//         fetchNextCartId();
//     }, []);

//     // Fetch cart items and total price when cartId changes
//     useEffect(() => {
//         if (cartId) {
//             fetchCartItems();
//             fetchTotalPrice();
//         }
//     }, [cartId]);

//     // Handle the "Buy Now" button
//     const handleBuyNow = async () => {
//         try {
//             console.log(`Initiating purchase for cart ID: ${cartId}`);
//             const response = await fetch("http://localhost:9191/api/v1/medicine_cart/add", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ userId: 2, cartId }),
//             });

//             if (response.ok) {
//                 console.log("Purchase successful.");
//                 alert("Purchase successful! Downloading invoice...");
//                 generatePDF(); // Generate the PDF after a successful purchase
//             } else {
//                 console.error("Failed to complete purchase. Response status:", response.status);
//                 throw new Error("Failed to complete purchase.");
//             }
//         } catch (error) {
//             console.error("Error completing purchase:", error);
//         }
//     };

//     // Generate the PDF invoice
//     const generatePDF = () => {
//         try {
//             console.log("Generating PDF...");
//             const doc = new jsPDF();
//             const currentDate = new Date().toLocaleString(); // Get current date and time in local format
    
//             // Header
//             doc.text("Cart Invoice", 14, 10);
    
//             // Table Data
//             const tableData = cartItems.map((item) => [
//                 item.productName,
//                 item.quantity,
//                 `BDT ${item.unitPrice.toFixed(2)}`, // Correct currency symbol
//                 `BDT ${item.totalPrice.toFixed(2)}`, // Correct currency symbol
//             ]);
//             console.log("Table data for PDF:", tableData);
    
//             // Add table
//             doc.autoTable({
//                 head: [["Product Name", "Quantity", "Unit Price", "Total Price"]],
//                 body: tableData,
//             });
    
//             // Add date and total price at the bottom
//             const yOffset = doc.lastAutoTable.finalY + 10; // Space below the table for total info
//             doc.text(`Date: ${currentDate}`, 14, yOffset);
//             doc.text(`Total Price: BDT ${totalPrice.toFixed(2)}`, 14, yOffset + 10); // Correct currency symbol
    
//             // Save PDF
//             doc.save("cart_invoice.pdf");
//             console.log("PDF generated and saved as cart_invoice.pdf.");
//         } catch (error) {
//             console.error("Error generating PDF:", error);
//         }
//     };
    
//     if (loading) return <div>Loading cart items...</div>;

//     return (
//         <div className="min-h-screen bg-gray-50 p-6">
//             <h1 className="text-2xl font-bold text-center mb-6">Your Cart</h1>
//             <table className="w-full border-collapse bg-white shadow-lg">
//                 <thead className="bg-blue-500 text-white">
//                     <tr>
//                         <th className="p-3">Image</th>
//                         <th className="p-3">Product Name</th>
//                         <th className="p-3">Quantity</th>
//                         <th className="p-3">Unit Price</th>
//                         <th className="p-3">Total Price</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {cartItems.map((item) => (
//                         <tr key={item.id} className="text-center border-b">
//                             <td className="p-3">
//                                 <img
//                                     src={`http://localhost:9191${item.productImage}`}
//                                     alt={item.productName}
//                                     className="w-10 h-10 rounded-full mx-auto"
//                                 />
//                             </td>
//                             <td className="p-3">{item.productName}</td>
//                             <td className="p-3">{item.quantity}</td>
//                             <td className="p-3">{item.unitPrice.toFixed(2)}  BDT</td>
//                             <td className="p-3">{item.totalPrice.toFixed(2)}  BDT</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <div className="mt-6">
//                 <p className="text-xl font-bold text-right mb-4">Total Price:  {totalPrice.toFixed(2)} BDT</p>
//                 <div className="flex justify-end">
//                     <button
//                         onClick={handleBuyNow}
//                         className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
//                     >
//                         Buy Now
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Cart;


import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Cart = () => {
    const [cartId, setCartId] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);

    // Fetch the next cart ID using userId
    const fetchNextCartId = async () => {
        try {
            console.log("Fetching next cart ID...");
            const response = await fetch("http://localhost:9191/api/v1/medicine_cart/next-cart-id/2");
            const data = await response.json();
            console.log("Next cart ID fetched:", data);
            setCartId(data);
        } catch (error) {
            console.error("Error fetching cart ID:", error);
        }
    };

    // Fetch cart items using userId and cartId
    const fetchCartItems = async () => {
        if (!cartId) return;
        try {
            console.log(`Fetching cart items for cart ID: ${cartId}`);
            const response = await fetch(`http://localhost:9191/api/v1/medicine_cartItems/2/${cartId}`);
            const data = await response.json();
            console.log("Raw cart items data fetched:", data);

            const enrichedItems = await Promise.all(
                data.map(async (item) => {
                    console.log(`Fetching product details for product ID: ${item.productId}`);
                    const productResponse = await fetch(
                        `http://localhost:9191/api/v1/products/product/${item.productId}/product`
                    );
                    const productData = await productResponse.json();
                    console.log("Product details fetched:", productData);

                    return {
                        ...item,
                        productName: productData.data.name,
                        productImage: productData.data.medicine_images[0]?.downloadUrl || null,
                    };
                })
            );
            console.log("Enriched cart items:", enrichedItems);
            setCartItems(enrichedItems);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch the total price using userId and cartId
    const fetchTotalPrice = async () => {
        if (!cartId) return;
        try {
            console.log(`Fetching total price for cart ID: ${cartId}`);
            const response = await fetch(`http://localhost:9191/api/v1/medicine_cartItems/total-price/2/${cartId}`);
            const data = await response.json();
            console.log("Total price fetched:", data);
            setTotalPrice(data);
        } catch (error) {
            console.error("Error fetching total price:", error);
        }
    };

    // Fetch cart ID on component mount
    useEffect(() => {
        fetchNextCartId();
    }, []);

    // Fetch cart items and total price when cartId changes
    useEffect(() => {
        if (cartId) {
            fetchCartItems();
            fetchTotalPrice();
        }
    }, [cartId]);

    // Handle the "Buy Now" button
    const handleBuyNow = async () => {
        try {
            console.log(`Initiating purchase for cart ID: ${cartId}`);
            const response = await fetch("http://localhost:9191/api/v1/medicine_cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: 2, cartId }),
            });

            if (response.ok) {
                console.log("Purchase successful.");
                alert("Purchase successful! Downloading invoice...");
                generatePDF(); // Generate the PDF after a successful purchase
            } else {
                console.error("Failed to complete purchase. Response status:", response.status);
                throw new Error("Failed to complete purchase.");
            }
        } catch (error) {
            console.error("Error completing purchase:", error);
        }
    };

    // Generate the PDF invoice
    const generatePDF = () => {
        try {
            console.log("Generating PDF...");
            const doc = new jsPDF();
            const currentDate = new Date().toLocaleString(); // Get current date and time in local format

            // Header
            doc.text("Cart Invoice", 14, 10);

            // Table Data
            const tableData = cartItems.map((item) => [
                item.productName,
                item.quantity,
                `BDT ${item.unitPrice.toFixed(2)}`,
                `BDT ${item.totalPrice.toFixed(2)}`,
            ]);
            console.log("Table data for PDF:", tableData);

            // Add table
            doc.autoTable({
                head: [["Product Name", "Quantity", "Unit Price", "Total Price"]],
                body: tableData,
            });

            // Add date and total price at the bottom
            const yOffset = doc.lastAutoTable.finalY + 10; // Space below the table for total info
            doc.text(`Date: ${currentDate}`, 14, yOffset);
            doc.text(`Total Price: BDT ${totalPrice.toFixed(2)}`, 14, yOffset + 10);

            // Save PDF
            doc.save("cart_invoice.pdf");
            console.log("PDF generated and saved as cart_invoice.pdf.");
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    if (loading) return <div>Loading cart items...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Your Cart</h1>
            <table className="w-full border-collapse bg-white shadow-lg">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="p-3">Image</th>
                        <th className="p-3">Product Name</th>
                        <th className="p-3">Quantity</th>
                        <th className="p-3">Unit Price</th>
                        <th className="p-3">Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.id} className="text-center border-b">
                            <td className="p-3">
                                <img
                                    src={`http://localhost:9191${item.productImage}`}
                                    alt={item.productName}
                                    className="w-10 h-10 rounded-full mx-auto"
                                />
                            </td>
                            <td className="p-3">{item.productName}</td>
                            <td className="p-3">{item.quantity}</td>
                            <td className="p-3">BDT {item.unitPrice.toFixed(2)}</td>
                            <td className="p-3">BDT{item.totalPrice.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-6">
                <p className="text-xl font-bold text-right mb-4">Total Price: BDT{totalPrice.toFixed(2)}</p>
                <div className="flex justify-end">
                    <button
                        onClick={handleBuyNow}
                        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;