import { useState } from "react";
import axios from "axios";
import { Button, Input, Logo } from './index.js'; // Ensure these components are defined
import { useNavigate } from "react-router-dom";

const MenuForm = () => {
  const navigate = useNavigate();
  const [menuItem, setMenuItem] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    discount: "",
    availability: "",
    preparationTime: "",
    image: null,
    tags: [],
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuItem({
      ...menuItem,
      [name]: value,
    });
  };

  const handleTagsChange = (e) => {
    const options = Array.from(e.target.options);
    const selectedTags = options.filter((option) => option.selected).map((option) => option.value);
    setMenuItem({
      ...menuItem,
      tags: selectedTags,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMenuItem({
      ...menuItem,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(menuItem).forEach(([key, value]) => {
      if (key === "tags") {
        value.forEach(tag => formData.append("tags[]", tag));
      } else {
        formData.append(key, value);
      }
    });

    try {
      const response = await axios.post("http://localhost:8000/api/menu", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Menu item saved successfully", response.data);
      navigate('/'); // Navigate to the desired page after successful submission
    } catch (error) {
      setError("There was an error saving the menu item!");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="mx-auto w-full max-w-lg bg-white rounded-lg p-8 shadow-lg border border-gray-200">
        <div className="mb-6 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-3xl font-bold leading-tight text-gray-900">
          Add a New Menu Item
        </h2>
        
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6 mt-6" encType="multipart/form-data">
          <Input
            label="Name"
            placeholder="Enter menu item name"
            name="name"
            value={menuItem.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Description"
            as="textarea"
            placeholder="Enter a brief description"
            name="description"
            value={menuItem.description}
            onChange={handleChange}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={menuItem.category}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700"
              required
            >
              <option value="">Select Category</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Main Course">Main Course</option>
              <option value="Dessert">Dessert</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>
          <Input
            label="Price"
            type="number"
            placeholder="Enter price"
            name="price"
            value={menuItem.price}
            onChange={handleChange}
            required
          />
          <Input
            label="Discount"
            type="number"
            placeholder="Enter discount (optional)"
            name="discount"
            value={menuItem.discount}
            onChange={handleChange}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">Availability</label>
            <select
              name="availability"
              value={menuItem.availability}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700"
              required
            >
              <option value="">Select</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Preparation Time</label>
            <select
              name="preparationTime"
              value={menuItem.preparationTime}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700"
              required
            >
              <option value="">Select Preparation Time</option>
              <option value="10-15 min">10-15 min</option>
              <option value="15-30 min">15-30 min</option>
              <option value="30-45 min">30-45 min</option>
              <option value="45+ min">45+ min</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              required
              className="mt-1 block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tags</label>
            <select
              multiple
              name="tags"
              value={menuItem.tags}
              onChange={handleTagsChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg text-gray-700"
            >
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Gluten-free">Gluten-free</option>
              <option value="Halal">Halal</option>
            </select>
          </div>
          <Button type="submit" className="w-full bg-blue-600 text-white">
            Save Menu Item
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MenuForm;
