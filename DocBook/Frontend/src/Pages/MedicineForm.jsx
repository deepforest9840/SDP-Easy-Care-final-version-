import React, { useState, useEffect } from "react";

const MedicineForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    inventory: "",
    description: "",
    category: "",
    images: [],
  });

  const [productId, setProductId] = useState(null);

  useEffect(() => {
    // Fetch the next product ID for reference
    fetch("http://localhost:9191/api/v1/products/product/next-id")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          setProductId(data.data);
          window.productId = data.data;
        } else {
          setProductId(1);
          window.productId = 1;
        }
      })
      .catch(() => {
        setProductId(1);
        window.productId = 1;
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      setFormData({
        ...formData,
        images: [...formData.images, ...Array.from(files)],
      });
    }
  };

  const handleImageRemove = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Submit medicine details
    fetch("http://localhost:9191/api/v1/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Medicine added successfully!");

        // Upload images if any
        if (formData.images.length > 0) {
          const formDataImages = new FormData();
          formData.images.forEach((file) => formDataImages.append("files", file));

          fetch(
            `http://localhost:9191/api/v1/medicine_images/medicine_upload?productId=${window.productId}`,
            {
              method: "POST",
              body: formDataImages,
            }
          )
            .then((response) => response.json())
            .then(() => {
              alert("Images uploaded successfully!");
            })
            .catch((error) => {
              console.error("Error uploading images:", error);
              alert("Failed to upload images.");
            });
        }
      })
      .catch((error) => {
        console.error("Error adding medicine:", error);
        alert("Failed to add medicine.");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Add New Medicine</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Medicine Name:
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Brand:</label>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Inventory:
        </label>
        <input
          type="number"
          name="inventory"
          value={formData.inventory}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description:
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Category:</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Images:
        </label>
        <input
          type="file"
          name="images"
          onChange={handleImageChange}
          accept="image/*"
          multiple
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {formData.images.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selected Images:
          </label>
          <div className="flex flex-wrap gap-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`selected-img-${index}`}
                  className="w-16 h-16 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs p-1 rounded-full focus:outline-none"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring focus:ring-blue-200 focus:outline-none"
      >
        Submit
      </button>
    </form>
  );
};

export default MedicineForm;
