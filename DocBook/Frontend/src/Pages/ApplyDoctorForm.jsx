import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ApplyDoctorForm = () => {
  const [formData, setFormData] = useState({
    gmail: "",
    name: "",
    hospitalName: "",
    description: "",
    experience: "",
   
    status: "",
    category: "",
    images: [],
  });

  const [doctorId, setDoctorId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:9191/api/v1/doctors/doctor/next-id")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data) {
          setDoctorId(data.data);
          window.doctorId = data.data;
        } else {
          setDoctorId(1);
          window.doctorId = 1;
        }
      })
      .catch((error) => {
        setDoctorId(1);
        window.doctorId = 1;
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

    const updatedFormData = { ...formData, consultationFee: window.doctorId };

    fetch("http://localhost:9191/api/v1/doctors/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFormData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Doctor application submitted successfully!");
        if (formData.images.length > 0) {
          const formDataImages = new FormData();
          formData.images.forEach((file) =>
            formDataImages.append("files", file)
          );

          fetch(
            `http://localhost:9191/api/v1/images/upload?doctorId=${window.doctorId}`,
            {
              method: "POST",
              body: formDataImages,
            }
          )
            .then((response) => response.json())
            .then((data) => {
              alert("Images uploaded successfully!");
            })
            .catch((error) => {
              console.error("Error uploading images:", error);
              alert("Failed to upload images.");
            });
        }
      })
      .catch((error) => {
        alert("Failed to submit doctor.");
      });
  };

  return (
    <div className="bg-gradient-to-r from-teal-50 via-teal-50 to-teal-100 min-h-screen flex items-center justify-center p-4">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg max-w-4xl">
        <h1 className="text-2xl font-semibold text-center text-teal-600 mb-6">
          Apply for Doctor Position
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Left Side */}
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter doctor's name"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Hospital Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Hospital Name
              </label>
              <input
                type="text"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleChange}
                placeholder="Enter hospital name"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Gmail */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Gmail
              </label>
              <input
                type="email"
                name="gmail"
                value={formData.gmail}
                onChange={handleChange}
                placeholder="Enter doctor's Gmail"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Experience
              </label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Enter experience in years"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Rating */}
            {/* <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Rating
              </label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                placeholder="Enter doctor's rating"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div> */}
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter a brief description"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-500 h-24"
              ></textarea>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Status
              </label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
                placeholder="Enter status (e.g., Available or InActive)"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Specialist
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter Specialist (e.g., Cardiologist)"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Upload Images
              </label>
              <input
                type="file"
                name="images"
                onChange={handleImageChange}
                accept="image/*"
                multiple
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
              />
            </div>

            {/* Display Selected Images */}
            {formData.images.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Selected Images
                </label>
                <div className="flex flex-wrap gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`selected-img-${index}`}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 text-red-500 text-xs"
                        onClick={() => handleImageRemove(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="px-8 py-2 bg-[#00A9E0] text-white text-lg font-medium rounded-lg hover:bg-teal-700"
            >
              Apply
            </button>
          </div>
        </form>
        <div>
          {/* <Link to="/doctorProfile">
            <button className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 shadow transition">
              Back
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default ApplyDoctorForm;