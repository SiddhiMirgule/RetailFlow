import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Item from "../Item/Item.jsx";
import SearchBox from "../SearchBox/SearchBox.jsx";

const DisplayItems = ({ selectedCategory }) => {
    const { itemsData } = useContext(AppContext);
    const [searchText, setSearchText] = useState("");

    const filteredItems = itemsData?.filter(item => {
        if (!selectedCategory) return true;              // ✅ If no category selected show all
        return item.categoryId === selectedCategory;     // ✅ Filter by category
    }).filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) // ✅ Filter by search
    );

    return (
        <div className="p-3">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div></div>
                <div>
                    <SearchBox onSearch={setSearchText} />
                </div>
            </div>
            <div className="row g-3">
                {filteredItems?.map((item, index) => (
                    <div key={index} className="col-md-4 col-sm-6">
                        <Item
                            itemId={item.itemId}
                            name={item.name}
                            price={item.price}
                            imgUrl={item.imgUrl}
                            description={item.description}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DisplayItems;