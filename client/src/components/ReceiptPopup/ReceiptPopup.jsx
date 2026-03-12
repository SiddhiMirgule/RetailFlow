import './ReceiptPopup.css';

const ReceiptPopup = ({ orderDetails, onClose, onPrint }) => {
    return (
        <div className="receipt-popup-overlay text-dark">
            <div className="receipt-popup">
                <div className="text-center mb-4">
                    <i className="bi bi-check-circle-fill text-success fs-1"></i>
                </div>
                <h3 className="text-center mb-4">Order Receipt</h3>
                <p>
                    <strong>Order ID:</strong> {orderDetails.orderId}
                </p>
                <p>
                    <strong>Customer Name:</strong> {orderDetails.customerName}
                </p>
                <p>
                    <strong>Phone:</strong> {orderDetails.phoneNumber}
                </p>
                <hr />
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails.cartItems?.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>&#8377;{(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <hr />
                <p className="d-flex justify-content-between">
                    <strong>Subtotal:</strong>
                    <span>&#8377;{orderDetails.subtotal?.toFixed(2)}</span>
                </p>
                <p className="d-flex justify-content-between">
                    <strong>Tax (1%):</strong>
                    <span>&#8377;{orderDetails.tax?.toFixed(2)}</span>
                </p>
                <p className="d-flex justify-content-between">
                    <strong>Grand Total:</strong>
                    <span>&#8377;{orderDetails.grandTotal?.toFixed(2)}</span>
                </p>
                <p className="d-flex justify-content-between">
                    <strong>Payment Method:</strong>
                    <span>{orderDetails.paymentMethod}</span>
                </p>
                <p className="d-flex justify-content-between">
                    <strong>Payment Status:</strong>
                    <span className={orderDetails.paymentDetails?.status === 'COMPLETED'
                        ? 'text-success' : 'text-warning'}>
                        {orderDetails.paymentDetails?.status}
                    </span>
                </p>
                <div className="d-flex gap-3 mt-4">
                    <button className="btn btn-outline-secondary flex-grow-1" onClick={onClose}>
                        Close
                    </button>
                    <button className="btn btn-warning flex-grow-1" onClick={onPrint}>
                        <i className="bi bi-printer"></i> Print
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReceiptPopup;