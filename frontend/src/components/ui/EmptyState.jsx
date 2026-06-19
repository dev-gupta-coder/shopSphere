function EmptyState({
  title = "No Data Found",
}) {
  return (
    <div className="text-center py-12">
      <h2 className="text-xl font-semibold">
        {title}
      </h2>
    </div>
  );
}

export default EmptyState;