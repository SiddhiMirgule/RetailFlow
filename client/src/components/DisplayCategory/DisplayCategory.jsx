import Category from "../Category/Category.jsx";

const DisplayCategory = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
        <div className="d-flex flex-wrap gap-2 p-2">
            {categories?.map((category) => (
                <div
                    key={category.categoryId}
                    onClick={() => setSelectedCategory(category.categoryId)}>
                    <Category
                        categoryName={category.name}
                        imgUrl={category.imgUrl}
                        numberOfItems={category.items}
                        bgColor={selectedCategory === category.categoryId ? category.bgColor : "#444"}
                        isSelected ={selectedCategory ===category.categoryId}
                        onClick = { () => setSelectedCategory(Category.categoryId)}
                    />
                </div>
            ))}
        </div>
    );
};

export default DisplayCategory;