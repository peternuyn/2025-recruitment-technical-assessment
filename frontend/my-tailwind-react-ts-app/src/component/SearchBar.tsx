const SearchBar = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-10 w-full">
      {/* Filter button on the left, visible on everything bigger than small screens */}
      <button className="hidden sm:block btn btn-outline ml-6 w-20 text-orange-500 hover:bg-orange-500 hover:text-white">
        Filter
      </button>

      {/* Centered search input */}
      <div className="flex justify-center w-full mb-4 sm:mb-0">
        <input
          className="w-full sm:w-1/2 h-10 px-3 text-base placeholder-gray-300 border rounded-lg focus:shadow-outline"
          type="text"
          placeholder="Search for a building..."
        />
      </div>

      {/* Filter button on the left, visible only on small screens */}
      <button className="btn btn-outline w-full sm:hidden text-orange-500 sm:ml-6 mb-4 sm:mb-0 hover:bg-orange-500 hover:text-white">
        Filter
      </button>

      {/* Sort button on the right */}
      <button className="btn btn-outline w-full sm:w-20 text-orange-500 sm:mr-6 hover:bg-orange-500 hover:text-white">
        Sort
      </button>
    </div>
  );
};

export default SearchBar;
