const categories = [
  "Shoes",
  "Electronics",
  "Clothing",
  "Books",
];

function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8">
        Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category}
            className="
              border
              rounded-lg
              p-6
              text-center
              shadow
              hover:shadow-lg
              cursor-pointer
            "
          >
            <h3 className="font-semibold text-lg">
              {category}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;