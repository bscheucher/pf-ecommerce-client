import React from "react";

function CategoryFilter({ categories, setSelectedCategory }) {
  return (
    <div className="mb-4">
      <select
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border rounded p-2 w-full"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
