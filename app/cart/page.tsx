"use client";

import { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Margherita Pizza', price: 1200, quantity: 1, image: '🍕' },
    { id: 2, name: 'Chicken Burger', price: 800, quantity: 2, image: '🍔' },
    { id: 3, name: 'Caesar Salad', price: 600, quantity: 1, image: '🥗' },
  ]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
            <p className="text-gray-500">Add some delicious items to get started!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{item.image}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-600">Ksh {item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 hover:bg-red-100 text-red-600 rounded-full ml-4"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-xl font-bold">
                    Ksh {(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold">Total:</span>
                <span className="text-3xl font-bold text-orange-600">
                  Ksh {total.toLocaleString()}
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-6">
                Free delivery on orders over Ksh 1,000
              </div>
              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}