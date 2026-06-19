import ProductGrid from "../product/ProductGrid";

function FeaturedProducts() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8">
        Featured Products
      </h2>

      <ProductGrid />
    </section>
  );
}

export default FeaturedProducts;