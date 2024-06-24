const ArtisanPortfolioItem = ({ image, description, date, client }) => {
  return (
    <div className="flex flex-col items-center w-full overflow-hidden rounded-lg shadow-md min-h-96 md:flex-row">
      <img className="w-full md:h-full md:w-1/3" srcSet={image} alt="Project" />
      <div className="flex flex-col p-4">
        <h5 className="text-xl font-bold tracking-tight text-gray-900">{description}</h5>
        <p className="mt-1 text-sm text-gray-600">
          <span className="font-medium">For:</span> {client}
        </p>
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default ArtisanPortfolioItem;
