// import React from "react";

// const FarmacyCard = ({ pid,name, brand, price, description, category, inventory, image, onAddToCart }) => {
//     const handleImageError = (e) => {
//         e.target.src = "https://via.placeholder.com/150?text=N/A"; // Fallback placeholder if image fails to load
//         e.target.onError = null; // Prevent infinite loop
//     };

//     return (
//         <div className="w-64 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
//             {/* Medicine Image */}
//             <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
//                 <img
//                     className="object-cover w-full h-full"
//                     src={image || "https://via.placeholder.com/150?text=N/A"} // Fallback image if no URL is passed
//                     alt={`${name} Image`}
//                     onError={handleImageError} // Fallback handler
//                 />
//             </div>

//             <div className="p-4">
//                 {/* Medicine Name */}
//                 <h2 className="text-lg font-bold text-gray-800 truncate mb-2">{name}</h2>

//                 {/* Brand */}
//                 <p className="text-xs text-blue-500 mb-1">
//                     <strong>Brand:</strong> {brand}
//                 </p>

//                 {/* Category */}
//                 <p className="text-xs text-gray-600 mb-1">
//                     <strong>Category:</strong> {category || "N/A"}
//                 </p>

//                 {/* Price */}
//                 <p className="text-sm text-green-600 font-semibold mb-1">
//                     <strong>Price:</strong> ${price}
//                 </p>

//                 {/* Inventory */}
//                 <p className="text-xs text-gray-600 mb-1">
//                     <strong>Inventory:</strong> {inventory} units
//                 </p>

//                 {/* Description */}
//                 <p className="text-xs text-gray-600 mb-3">
//                     <strong>Description:</strong> {description}
//                 </p>

//                 {/* Add to Cart Button */}
//                 <button
//                     className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//                     onClick={() => onAddToCart({ name, price, id: pid })}
//                 >
//                     Add to Cart
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default FarmacyCard;


import React from "react";

const FarmacyCard = ({ pid, name, brand, price, description, category, inventory, image, onAddToCart }) => {
    const handleImageError = (e) => {
        e.target.src = "https://via.placeholder.com/150?text=N/A"; // Fallback placeholder if image fails to load
        e.target.onError = null; // Prevent infinite loop
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 p-4 flex flex-col justify-between">
            {/* Medicine Image */}
            <div className="relative w-full h-56 overflow-hidden rounded-t-lg mb-3">
                <img
                    className="object-cover w-full h-full"
                    src={image || "https://via.placeholder.com/150?text=N/A"}
                    alt={`${name} Image`}
                    onError={handleImageError}
                />
            </div>

            <div className="flex flex-col flex-grow">
                {/* Medicine Name */}
                <h2 className="text-lg font-semibold text-gray-800 truncate mb-2">{name}</h2>

                {/* Brand */}
                <p className="text-sm text-blue-500 mb-1">
                    <strong>Brand:</strong> {brand}
                </p>

                {/* Category */}
                <p className="text-sm text-gray-600 mb-1">
                    <strong>Category:</strong> {category || "N/A"}
                </p>

                {/* Price */}
                <p className="text-lg text-green-600 font-bold mb-1">
                    BDT {price}
                </p>

                {/* Inventory */}
                <p className="text-sm text-gray-600 mb-3">
                    <strong>In Stock:</strong> {inventory} units
                </p>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {description}
                </p>
            </div>

            {/* Add to Cart Button */}
            <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => onAddToCart({ name, price, id: pid })}
            >
                Add to Cart
            </button>
        </div>
    );
};

export default FarmacyCard;