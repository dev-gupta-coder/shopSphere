import { Link } from "react-router-dom";
import Button from "../ui/Button";

function Hero() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Shop Smarter with ShopSphere
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Discover thousands of quality products at amazing prices.
        </p>

        <div className="flex justify-center gap-4">
          <Link to="/products">
            <Button>Shop Now Hero</Button>
          </Link>

          <Link to="/products">
            <Button className="bg-gray-700">
              Explore 
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;