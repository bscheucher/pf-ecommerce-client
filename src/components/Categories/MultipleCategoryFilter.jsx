function MultiCategoryFilter({ categories, setSelectedCategories }) {
  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedCategories(selectedOptions);
  };

  return (
    <div className="mb-4">
      <select
        multiple
        onChange={handleCategoryChange}
        className="border rounded p-1 h-8 w-full"
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
export default MultiCategoryFilter;
