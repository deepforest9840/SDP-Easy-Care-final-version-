// import React, { useState, useEffect } from "react";
// import FarmacyCard from "../Components/FarmacyCard";
// import CartModal from "../Components/CartModal";

// const Farmacy = () => {
//     const [medicines, setMedicines] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [selectedProduct, setSelectedProduct] = useState(null);

//     const fetchMedicines = async () => {
//         try {
//             const response = await fetch("http://localhost:9191/api/v1/products/all");
//             if (!response.ok) {
//                 throw new Error("Failed to fetch medicines.");
//             }
//             const data = await response.json();
//             setMedicines(data.data || []);
//         } catch (err) {
//             console.error("Error fetching medicines:", err);
//             setError("Unable to load medicines.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchMedicines();
//     }, []);

//     const handleAddToCart = (product) => {
//         setSelectedProduct(product); // Open the modal with product details
//     };

//     const handleCloseModal = () => {
//         setSelectedProduct(null); // Close the modal
//     };

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div className="bg-gradient-to-r from-teal-50 via-teal-50 to-teal-100 min-h-screen p-6">
//             <h1 className="text-2xl font-bold mb-6 text-center">Farmacy Page</h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {medicines.map((medicine) => {
//                     const imageUrl = medicine.medicine_images?.[0]?.downloadUrl
//                         ? `http://localhost:9191${medicine.medicine_images[0].downloadUrl}`
//                         : "https://via.placeholder.com/150?text=No+Image";
//                     return (
//                         <FarmacyCard
//                             key={medicine.id}
//                             pid={medicine.id}
//                             name={medicine.name}
//                             brand={medicine.brand}
//                             price={medicine.price}
//                             description={medicine.description}
//                             category={medicine.category?.name}
//                             inventory={medicine.inventory}
//                             image={imageUrl}
//                             onAddToCart={handleAddToCart}
//                         />
//                     );
//                 })}
//             </div>

//             {/* Render modal if a product is selected */}
//             {selectedProduct && (
//                 <CartModal
//                     product={selectedProduct}
//                     onClose={handleCloseModal}
//                     onSubmit={handleCloseModal}
//                 />
//             )}
//         </div>
//     );
// };

// export default Farmacy;


import React, { useState, useEffect } from "react";
import FarmacyCard from "../Components/FarmacyCard";
import CartModal from "../Components/CartModal";
import SearchBar from "../Components/SearchBar"; // Import the SearchBar component

const Farmacy = () => {
    const [medicines, setMedicines] = useState([]);
    const [filteredMedicines, setFilteredMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [nameSearch, setNameSearch] = useState("");
    const [categorySearch, setCategorySearch] = useState("");

    const fetchMedicines = async () => {
        try {
            const response = await fetch("http://localhost:9191/api/v1/products/all");
            if (!response.ok) {
                throw new Error("Failed to fetch medicines.");
            }
            const data = await response.json();
            setMedicines(data.data || []);
            setFilteredMedicines(data.data || []);
        } catch (err) {
            console.error("Error fetching medicines:", err);
            setError("Unable to load medicines.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMedicines();
    }, []);

    // Dynamically filter medicines based on name and category searches
    useEffect(() => {
        const lowerName = nameSearch.toLowerCase();
        const lowerCategory = categorySearch.toLowerCase();

        const filtered = medicines.filter((medicine) =>
            medicine.name.toLowerCase().includes(lowerName) &&
            (medicine.category?.name || "").toLowerCase().includes(lowerCategory)
        );

        setFilteredMedicines(filtered);
    }, [nameSearch, categorySearch, medicines]);

    const handleAddToCart = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="bg-gradient-to-r from-teal-50 via-teal-50 to-teal-100 min-h-screen p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Farmacy Page</h1>
            
            {/* Two SearchBars */}
            <div className="mb-4">
                <SearchBar
                    placeholder="Search by medicine name..."
                    onSearch={(term) => setNameSearch(term)}
                />
                <SearchBar
                    placeholder="Search by category..."
                    onSearch={(term) => setCategorySearch(term)}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {filteredMedicines.map((medicine) => {
        const imageUrl = medicine.medicine_images?.[0]?.downloadUrl
            ? `http://localhost:9191${medicine.medicine_images[0].downloadUrl}`
            : "https://via.placeholder.com/150?text=No+Image";

        return (
            <FarmacyCard
                key={medicine.id}
                pid={medicine.id}
                name={medicine.name}
                brand={medicine.brand}
                price={medicine.price}
                description={medicine.description}
                category={medicine.category?.name}
                inventory={medicine.inventory}
                image={imageUrl}
                onAddToCart={handleAddToCart}
            />
        );
    })}
</div>


            {selectedProduct && (
                <CartModal
                    product={selectedProduct}
                    onClose={handleCloseModal}
                    onSubmit={handleCloseModal}
                />
            )}
        </div>
    );
};

export default Farmacy;