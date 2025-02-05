import { useState, useEffect } from "react";
import { listCategories } from "../../services/categoryService";
import MultipleCategoryFilter from "../Categories/MultipleCategoryFilter";

function AddProductForm({ onSubmit }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
    category: "",
  });
  console.log("Product in ProductForm:", product);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  console.log("Selected Category:", selectedCategories);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await listCategories();
        console.log("Categories fetched:", data);
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formattedProduct = {
      ...product,
      image_url: product.imageUrl,
    };
    
    delete formattedProduct.imageUrl;
    
    // Passing both the product and selected categories as separate properties
    onSubmit({
      newProduct: formattedProduct,
      productCategories: selectedCategories,  // Be sure to use the correct state name: selectedCategories
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg">
      <input
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        required
        className="p-2 border"
      />
      <input
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        className="p-2 border"
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        required
        className="p-2 border"
      />
      <input
        name="stock"
        type="number"
        placeholder="Stock"
        value={product.stock}
        onChange={handleChange}
        required
        className="p-2 border"
      />
      <input
        name="imageUrl"
        type="text"
        placeholder="Image URL"
        value={product.imageUrl}
        onChange={handleChange}
        className="p-2 border"
      />
      <MultipleCategoryFilter
        categories={categories}
        setSelectedCategories={setSelectedCategories}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Add Product
      </button>
    </form>
  );
}
export default AddProductForm;
