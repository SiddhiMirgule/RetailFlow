import Category from "../Category/Category.jsx";

const DisplayCategory = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
        <div className="d-flex flex-wrap gap-2 p-2">
            {categories?.map((category) => (
                <Category
                    key={category.categoryId}
                    categoryName={category.name}
                    imgUrl={category.imgUrl}
                    numberOfItems={category.items}
                    bgColor={category.bgColor}
                    isSelected={selectedCategory === category.categoryId} // ✅ Pass isSelected
                    onClick={() => setSelectedCategory(category.categoryId)} // ✅ Pass onClick
                />
            ))}
        </div>
    );
};

export default DisplayCategory;