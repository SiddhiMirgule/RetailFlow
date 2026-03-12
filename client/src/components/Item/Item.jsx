import './Item.css';

const Item = ({ itemId, name, price, imgUrl, description }) => {
    const{addToCart} = useContext(AppContext);
    const handleAddToCart =() => {
        addToCart({
        name : itemName,
        price: itemPrice,
        quantity:1,
        itemId:itemId
        });
    return (
        <div className="card bg-dark p-3 item-card" style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center gap-3">
                <img
                    src={imgUrl}
                    alt={name}
                    className="item-image"
                />
                <div className="flex-grow-1">
                    <h6 className="text-white mb-1">{name}</h6>
                    <p className="text-white mb-1" style={{ fontSize: '12px' }}>{description}</p>
                    <span className="badge rounded-pill text-bg-warning">
                        &#8377;{price}
                    </span>
                </div>
                <div>
                    <button className="btn btn-warning btn-sm" onClick = {handleAddToCart}>
                        <i className="bi bi-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Item;