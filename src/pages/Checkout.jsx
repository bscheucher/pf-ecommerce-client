import React, { useState, useEffect, useContext } from "react";
import { useCart } from "../services/CartContext";
import { addOrder } from "../services/orderService";
import { addPayment } from "../services/paymentService";
import { getUserAddresses } from "../services/adressService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../services/AuthContext";
import AddressSelector from "../components/Addresses/AddressSelector";
import AddressForm from "../components/Addresses/AddressForm";
import PaymentMethodSelector from "../components/Payments/PaymentMethodSelector";
import OrderSummary from "../components/Orders/OrderSummary";

function Checkout() {
  const { cart, dispatch } = useCart();
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userAddresses, setUserAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("new");
  const [formData, setFormData] = useState({
    fullName: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
    paymentMethod: "Credit Card",
  });

  useEffect(() => {
    if (userId) {
      const fetchAddressesOfUser = async () => {
        try {
          const response = await getUserAddresses(userId);
          setUserAddresses(response.data.data || []);
        } catch (error) {
          console.error("Error fetching user addresses:", error);
        }
      };
      fetchAddressesOfUser();
    }
  }, [userId]);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleAddressChange = (e) => {
    const selectedId = e.target.value;
    setSelectedAddressId(selectedId);

    if (selectedId === "new") {
      setFormData((prev) => ({
        ...prev,
        fullName: "",
        streetAddress: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        phoneNumber: "",
      }));
    } else {
      const selectedAddress = userAddresses.find(
        (addr) => addr.id === parseInt(selectedId)
      );
      if (selectedAddress) {
        setFormData((prev) => ({
          ...prev,
          fullName: selectedAddress.full_name,
          streetAddress: selectedAddress.street_address,
          city: selectedAddress.city,
          state: selectedAddress.state || "",
          postalCode: selectedAddress.postal_code || "",
          country: selectedAddress.country,
          phoneNumber: selectedAddress.phone_number || "",
        }));
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    try {
      // Prepare order data
      const orderData = {
        userId,
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        addressId: selectedAddressId !== "new" ? selectedAddressId : null,
        address: selectedAddressId === "new" ? formData : null,
        paymentMethod: formData.paymentMethod,
      };

      // Place the order
      const response = await addOrder(orderData);

      if (response.status === 201) {
        alert("Order placed successfully!");
        dispatch({ type: "CLEAR_CART" }); // Clear cart after successful order
        navigate("/order-confirmation");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center">Checkout</h2>
      <div className="row">
        <div className="col-md-6">
          <h4>Shipping Details</h4>
          <AddressSelector
            userAddresses={userAddresses}
            selectedAddressId={selectedAddressId}
            onAddressChange={handleAddressChange}
          />
          <AddressForm
            formData={formData}
            onChange={handleChange}
            disabled={selectedAddressId !== "new"}
          />
        </div>
        <div className="col-md-6">
          <PaymentMethodSelector
            paymentMethod={formData.paymentMethod}
            onChange={handleChange}
          />
          <OrderSummary cart={cart} totalAmount={totalAmount} />
          <button
            className="btn btn-primary w-100 mt-3"
            onClick={handleCheckout}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
