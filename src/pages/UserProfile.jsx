import React, { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../services/AuthContext";
import { getUserById, updateUser } from "../services/userService";
import {
  getUserAddresses,
  addAddress,
  deleteAddress,
} from "../services/adressService";
import { getUserOrders } from "../services/orderService";
import { formatDate } from "../services/dateService";
import LoadingIndicator from "../components/Shared/LoadingIndicator";
import ScrollToTopButton from "../components/Shared/ScrollTopButton";

const UserProfile = () => {
  const { userId } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
  });

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!userId) return;
      const response = await getUserById(userId);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const fetchAddresses = useCallback(async () => {
    setIsLoading(true);
    const response = await getUserAddresses(userId);
    console.log("Addresses in fetchAdresses", response.data);
    setAddresses(response.data.addresses);
    setIsLoading(false);
  }, [userId]);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    const response = await getUserOrders(userId);
    setOrders(response.data);
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUser();
      fetchAddresses();
      fetchOrders();
    }
  }, [userId, fetchUser, fetchAddresses, fetchOrders]);

  const handleUpdateUser = async () => {
    await updateUser(userId, user);
    alert("Profile updated successfully");
  };

  const handleAddAddress = async () => {
    if (
      !newAddress.fullName.trim() ||
      !newAddress.streetAddress.trim() ||
      !newAddress.city.trim() ||
      !newAddress.postalCode.trim() ||
      !newAddress.country.trim()
    ) {
      alert("All required fields must be filled!");
      return;
    }

    try {
      await addAddress({ ...newAddress });
      setNewAddress({
        fullName: "",
        streetAddress: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        phoneNumber: "",
      });
      await fetchAddresses();
    } catch (error) {
      console.error("Error adding address:", error);
      alert("Failed to add address. Please try again.");
    }
  };

  const handleDeleteAddress = async (addressId) => {
    await deleteAddress(addressId);
    fetchAddresses();
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">User Profile</h2>
      <div className="card p-4 shadow">
        <h4>Account Details</h4>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          type="email"
          className="form-control my-2"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          className="form-control my-2"
          placeholder="New Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button className="btn btn-primary" onClick={handleUpdateUser}>
          Update Profile
        </button>
      </div>

      <div className="card p-4 shadow mt-4">
        <h4>Addresses</h4>

        {isLoading ? (
          <LoadingIndicator />
        ) : addresses.length > 0 ? (
          addresses.map((address) => (
            <div key={address.id} className="border p-3 my-2">
              <p>
                {address.full_name}, {address.street_address}, {address.city},{" "}
                {address.postal_code}, {address.state}, {address.country},{" "}
                {address.phone_number}
              </p>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteAddress(address.id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>There are no adresses for this user.</p>
        )}
        <h5 className="mt-3">Add New Address</h5>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Full Name"
          value={newAddress.fullName}
          onChange={(e) =>
            setNewAddress({ ...newAddress, fullName: e.target.value })
          }
        />
        <input
          type="text"
          className="form-control my-2"
          placeholder="Street Address"
          value={newAddress.streetAddress}
          onChange={(e) =>
            setNewAddress({ ...newAddress, streetAddress: e.target.value })
          }
        />
        <input
          type="text"
          name="city"
          className="form-control mb-2"
          placeholder="City"
          value={newAddress.city}
          required
          onChange={(e) =>
            setNewAddress({ ...newAddress, city: e.target.value })
          }
        />
        <input
          type="text"
          name="state"
          className="form-control mb-2"
          placeholder="State"
          value={newAddress.state}
          onChange={(e) =>
            setNewAddress({ ...newAddress, state: e.target.value })
          }
        />
        <input
          type="text"
          name="postalCode"
          className="form-control mb-2"
          placeholder="Postal Code"
          value={newAddress.postalCode}
          onChange={(e) =>
            setNewAddress({ ...newAddress, postalCode: e.target.value })
          }
        />
        <input
          type="text"
          name="country"
          className="form-control mb-2"
          placeholder="Country"
          value={newAddress.country}
          onChange={(e) =>
            setNewAddress({ ...newAddress, country: e.target.value })
          }
          required
        />
        <input
          type="text"
          name="phoneNumber"
          className="form-control mb-2"
          placeholder="Phone Number"
          value={newAddress.phoneNumber}
          onChange={(e) =>
            setNewAddress({ ...newAddress, phoneNumber: e.target.value })
          }
        />
        <button className="btn btn-success" onClick={handleAddAddress}>
          Add Address
        </button>
      </div>

      <div className="card p-4 shadow mt-4">
        <h4>My Orders</h4>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          orders.map((order) => (
            <div key={order.id} className="border p-3 my-2">
              <p>
                Order Date: {formatDate(order.created_at)} <br />
                Price: €{order.total_amount} -
                <br />
                Status: {order.status}
              </p>
            </div>
          ))
        )}
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default UserProfile;
