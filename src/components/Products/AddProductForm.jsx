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

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await listCategories();
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

    onSubmit({
      newProduct: formattedProduct,
      productCategories: selectedCategories,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded bg-light shadow"
    >
      <h4 className="mb-4 text-center">Add New Product</h4>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Product Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter product name"
            value={product.name}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Price</label>
          <input
            name="price"
            type="number"
            placeholder="Enter price"
            value={product.price}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Stock</label>
          <input
            name="stock"
            type="number"
            placeholder="Enter stock quantity"
            value={product.stock}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Image URL</label>
          <input
            name="imageUrl"
            type="text"
            placeholder="Enter image URL"
            value={product.imageUrl}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          placeholder="Enter product description"
          value={product.description}
          onChange={handleChange}
          className="form-control"
          rows="3"
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Categories</label>
        <MultipleCategoryFilter
          categories={categories}
          setSelectedCategories={setSelectedCategories}
        />
      </div>

      <div className="text-center">
        <button type="submit" className="btn btn-primary w-100">
          Add Product
        </button>
      </div>
    </form>
  );
}

export default AddProductForm;
