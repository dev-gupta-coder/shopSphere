function WhyChooseUs() {
  const features = [
    {
      title: "Fast Delivery",
      description: "Get products delivered quickly.",
    },
    {
      title: "Secure Payments",
      description: "100% secure payment system.",
    },
    {
      title: "Quality Products",
      description: "Best quality products guaranteed.",
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-lg shadow"
            >
              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;