import { useFilterContext } from "../context/filterContext";
import { useProductContext } from "../context/productContext";
import ProductCard from "./ProductCard";
import FeatureSearch from "./FeatureSearch";
const FeatureSection = () => {
  const { isLoading, products } = useProductContext();
  const {
    filterProducts,
    sorting,
    filters: { price, minPrice, maxPrice },
    updateFilterValues,
    clearFilters,
  } = useFilterContext();
  // console.log(price, minPrice, maxPrice);
  // console.log(filterProducts);
  if (isLoading) {
    return <div>...Loading</div>;
  }
  return (
    <div className="container flex-col shadow-none py-10  px-6 rounded-none min-w-full">
      <div className="lg:flex justify-between items-center">
        <div>
          <h3 className="font-medium text-2xl">Most Selling Foods:</h3>
          <p className="text-gray-600 mt-2">
            Most trending meals in the market.
          </p>
        </div>
        <div className="mt-8">
          <FeatureSearch />
        </div>
        <div className="space-x-4 mt-8 lg:mt-0">
          <select name="sort" id="sort" onClick={sorting}>
            <option
              className="text-gray-600 hover:text-secondary px-2"
              value="a-z"
            >
              Alphabetical(A-Z)
            </option>
            <option
              className="text-gray-600 hover:text-secondary px-2"
              value="z-a"
            >
              Alphabetical(Z-A)
            </option>
            <option
              className="text-gray-600 hover:text-secondary px-2"
              value="lowest"
            >
              Price(Lowest)
            </option>
            <option
              className="text-gray-600 hover:text-secondary px-2"
              value="highest"
            >
              Price(Highest)
            </option>
            <option
              className="text-gray-600 hover:text-secondary px-2"
              value="time_lowest"
            >
              Preparation Time(Lowest)
            </option>
          </select>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 pt-8 gap-2">
        <div className="flex lg:flex-col items-center vsm:flex-row md:flex-col">
          <h3 className="text-[1.3rem]">Price:</h3>
          <p className="font-semibold text-[1rem]">Rs.{price}</p>
          <input
            type="range"
            name="price"
            min={minPrice}
            max={maxPrice}
            value={price}
            onChange={updateFilterValues}
          />
          <button
            className="bg-secondary text-lightColor mt-1 p-3"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
          {/* <img
            src="public\images\chefs-kiss-french-chef.gif"
            alt="banner"
            className="w-full h-full object-cover"
          /> */}
        </div>
        {products &&
          filterProducts
            .filter((_, i) => i < 24)
            .map((product) => (
              <ProductCard
                key={product.FoodID}
                id={product.FoodID}
                img={product.imageurl}
                name={product.TranslatedRecipeName}
                price={product.price}
                cuisine={product.Cuisine}
                ingredients={product.CleanedIngredients}
              />
            ))}
      </div>
    </div>
  );
};

export default FeatureSection;
