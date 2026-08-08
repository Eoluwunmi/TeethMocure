/**
 * Order Tracking Page
 * Customers can track their orders
 */

import { Link } from "react-router-dom";
import { Package, Check, Truck } from "lucide-react";
import { STATUS_COLORS, ORDER_STATUSES } from "@/config/constants";
import React from "react";

export default function OrderTracking() {
  const [orderCode, setOrderCode] = React.useState("");
  const [order, setOrder] = React.useState<any>(null);
  const [searching, setSearching] = React.useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearching(true);

    // TODO: Search for order by code in Base44
    // const result = await orderService.getOrder(orderCode);
    // setOrder(result);

    // Mock order for demo
    setTimeout(() => {
      setOrder({
        code: orderCode,
        customer_name: "Chioma Okafor",
        phone: "08012345678",
        package: "2bottles",
        price: "N4,900",
        status: "confirmed",
        order_date: "Aug 5, 2024",
        expected_delivery: "Aug 7, 2024",
        items: [{ name: "Teethmocure (2 Bottles)", quantity: 1, price: "N4,900" }],
      });
      setSearching(false);
    }, 1000);
  };

  return (
    <div className="bg-white" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-5 py-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#1B4332] rounded-lg flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white rounded-full" />
            </div>
            <span className="font-bold text-[#1B4332] text-lg">Teethmocure</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-600 hover:text-[#1B4332] text-sm font-medium">
              Home
            </Link>
            <Link to="/#order-form" className="bg-[#1B4332] text-white text-sm font-bold px-6 py-2 rounded-lg hover:bg-[#16382a] transition-colors">
              Order Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1B4332] to-[#2d6a4f] text-white px-5 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Track Your Order</h1>
          <p className="text-white/80 text-lg">Enter your order code to see your delivery status</p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 md:py-24 px-5">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Order Code</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={orderCode}
                  onChange={(e) => setOrderCode(e.target.value.toUpperCase())}
                  placeholder="e.g., TMCURE-2024-0001"
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332]"
                />
                <button
                  type="submit"
                  disabled={!orderCode || searching}
                  className="bg-[#1B4332] hover:bg-[#16382a] text-white font-bold px-8 py-3 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {searching ? "Searching..." : "Track"}
                </button>
              </div>
              <p className="text-gray-500 text-xs mt-2">You received this code in your order confirmation SMS/email</p>
            </div>
          </form>

          {/* Order Details */}
          {order && (
            <div className="mt-16 space-y-8">
              {/* Status Timeline */}
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h2 className="font-bold text-2xl text-gray-900 mb-8">Order Status</h2>

                <div className="space-y-6">
                  {[
                    { status: "pending", label: "Order Received" },
                    { status: "confirmed", label: "Order Confirmed" },
                    { status: "delivered", label: "Delivered" },
                  ].map((step, index) => {
                    const isCompleted = ["pending", "confirmed", "delivered"].indexOf(order.status) >= index;
                    const isCurrent = order.status === step.status;

                    return (
                      <div key={step.status} className="flex gap-6">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                              isCompleted ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {isCompleted ? <Check size={20} /> : index + 1}
                          </div>
                          {index < 2 && (
                            <div
                              className={`w-1 h-12 mt-2 ${
                                isCompleted ? "bg-green-600" : "bg-gray-200"
                              }`}
                            />
                          )}
                        </div>
                        <div className="pb-6">
                          <p className={`font-bold text-lg ${isCurrent ? "text-[#1B4332]" : "text-gray-700"}`}>
                            {step.label}
                          </p>
                          {isCurrent && (
                            <p className="text-green-600 text-sm font-semibold mt-1">
                              ✓ Your order is currently in this stage
                            </p>
                          )}
                          {step.status === "confirmed" && order.expected_delivery && (
                            <p className="text-gray-600 text-sm mt-1">
                              Expected delivery: <strong>{order.expected_delivery}</strong>
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Information */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white border border-gray-200 rounded-xl p-8">
                  <h3 className="font-bold text-lg text-gray-900 mb-4">Order Details</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-600">Order Code</p>
                      <p className="font-semibold text-gray-900">{order.code}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Order Date</p>
                      <p className="font-semibold text-gray-900">{order.order_date}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Amount</p>
                      <p className="font-bold text-lg text-[#1B4332]">{order.price}</p>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-gray-600 mb-2">Status</p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          STATUS_COLORS[order.status]
                        }`}
                      >
                        {ORDER_STATUSES[order.status].label}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-8">
                  <h3 className="font-bold text-lg text-gray-900 mb-4">Delivery Address</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-600">Recipient Name</p>
                      <p className="font-semibold text-gray-900">{order.customer_name}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Phone Number</p>
                      <p className="font-semibold text-gray-900">{order.phone}</p>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-gray-600 mb-2">Need Help?</p>
                      <a
                        href={`tel:${order.phone}`}
                        className="text-[#1B4332] font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        <Truck size={16} /> Contact Driver
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h3 className="font-bold text-lg text-gray-900 mb-6">Order Items</h3>
                <div className="space-y-4">
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between py-4 border-b last:border-b-0">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#1B4332]/10 rounded-lg flex items-center justify-center">
                          <Package size={24} className="text-[#1B4332]" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-bold text-lg text-[#1B4332]">{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* No Order Found */}
          {!order && orderCode && !searching && (
            <div className="mt-16 bg-red-50 border border-red-200 rounded-xl p-8 text-center">
              <p className="text-red-900 font-bold mb-2">Order Not Found</p>
              <p className="text-red-700 text-sm mb-4">
                We couldn't find an order with code "<strong>{orderCode}</strong>". Please check and try again.
              </p>
              <p className="text-red-700 text-sm">
                Still having issues? <a href="/contact" className="underline font-semibold">Contact support</a>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 px-5 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">Delivery FAQs</h2>

          <div className="space-y-4">
            {[
              {
                q: "How long does delivery take?",
                a: "Delivery to Lagos and Ogun takes 24-48 hours from confirmation. We deliver nationwide with longer timelines.",
              },
              {
                q: "Can I change my delivery address?",
                a: "Yes, within 2 hours of placing your order. Contact our WhatsApp team immediately with your new address.",
              },
              {
                q: "What if my order doesn't arrive?",
                a: "Contact us immediately with your order code. We'll either redeliver or issue a full refund within 3 days.",
              },
              {
                q: "Do you have a tracking number?",
                a: "Not yet, but we send SMS updates at each stage. You can also use this page to track by order code.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="bg-white border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow"
              >
                <summary className="font-bold text-gray-900 flex items-center justify-between">
                  <span>{faq.q}</span>
                  <span className="text-[#1B4332]">+</span>
                </summary>
                <p className="text-gray-600 mt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 px-5">
        <div className="max-w-6xl mx-auto text-center text-sm">
          <p>© 2024 Teethmocure · Lydfem Group · All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}
