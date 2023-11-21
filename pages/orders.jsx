import React, { useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { data } from "../data/data.js";

const Orders = () => {
  const [orders, setOrders] = useState(data);

  const setOrderStatus = (newStatus, orderId) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      } else {
        return order;
      }
    });
    setOrders(updatedOrders);
  };

  const handleCommentChange = (event, orderId) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, comment: event.target.value };
      } else {
        return order;
      }
    });
    setOrders(updatedOrders);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-between px-4 pt-4">
        <h2>Orders</h2>
        <h2>Welcome Back, Yash</h2>
      </div>
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
            <span>Order</span>
            <span className="sm:text-left text-right">Status</span>
            <span className="hidden md:grid">Last Order</span>
            <span className="hidden sm:grid">Comment</span>
          </div>
          <ul>
            {orders.map((order, id) => (
              <li
                key={id}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid 
              md:grid-cols-4 sm:grid-cols-3 items-center justify-between cursor-pointer"
              >
                <div className="flex">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <FaShoppingBag className="text-purple-800" />
                  </div>
                  <div className="pl-4">
                    <p className="text-gray-800 font-bold">
                      ${order.total.toLocaleString()}
                    </p>
                    <p className="text-gray-800 text-sm">{order.name.first}</p>
                  </div>
                </div>
                <div className="text-gray-600 sm:text-left text-right">
                  <select
                    value={order.selectedStatus}
                    onChange={(e) => {
                      const updatedOrders = orders.map((order) => {
                        if (order.id === e.target.id) {
                          return { ...order, selectedStatus: e.target.value };
                        } else {
                          return order;
                        }
                      });
                      setOrders(updatedOrders);

                      setOrderStatus(e.target.value, e.target.id);
                    }}
                    id={order.id}
                    className={
                      order.selectedStatus === "On Hold"
                        ? "bg-yellow-200 p-2 rounded-lg"
                        : order.selectedStatus === "Processing"
                          ? "bg-blue-200 p-2 rounded-lg"
                          : order.selectedStatus === "Completed"
                            ? "bg-green-200 p-2 rounded-lg"
                            : "bg-white p-2 rounded-lg"
                    }
                  >
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                    <option value="Processing">Processing</option>
                  </select>
                </div>
                
                <p className="hidden md:flex">{order.date}</p>
                <div className="sm:flex hidden justify-between items-center">
                  <div className="sm:text-left text-right">
                   <input
                     type="text"
                     value={order.comment || ""}
                     onChange={(e) => handleCommentChange(e, order.id)}
                     placeholder="Add a comment"
                     className="p-2 rounded-lg w-30"
                   />
                  </div> 
                  <BsThreeDotsVertical />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Orders;