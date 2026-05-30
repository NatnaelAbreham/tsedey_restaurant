# 🍽️ Tsedey Restaurant App

A modern restaurant ordering web application built with **React + Tailwind CSS**.  
Users can browse menu items, add food to cart, manage quantity, and place orders with a smooth UI experience.

---

## ✨ Features

- 🎨 Modern restaurant UI design
- 🛒 Add to cart functionality
- ➕ Increase / decrease item quantity
- 💰 Live total price calculation
- ✅ Order success modal popup
- 📱 Fully responsive design (mobile + desktop)
- 🍕 Food & Drinks menu system
- 🎨 Clean Tailwind CSS styling

---

## 🛠️ Tech Stack

- React.js 
- Tailwind CSS 
- JavaScript (ES6+)
- Vite 

---

## 📁 Project Structure
src/
│
├── components/
│ ├── Navbar.jsx
│ ├── Menu.jsx
│ ├── MenuCard.jsx
│ ├── CartSidebar.jsx
│ ├── OrderSuccess.jsx
│ ├── Offers.jsx
│ ├── Contact.jsx
│ └── Footer.jsx
│
├── assets/
│ └── logo/
│ └── internal.png
│
├── App.jsx
├── main.jsx
└── index.css

text

---

## ⚙️ Installation & Setup

Clone the repository:

```bash
git clone https://github.com/your-username/tsedey-restaurant.git
cd tsedey-restaurant
npm install
npm run dev
Build for Production
bash
npm run build
📌 Important Note
The admin panel and backend are developed and deployed separately.

Backend: .NET Core API with SQL Server

Technologies used: Serilog, Entity Framework

Authentication: One-time OTP system

🔐 Banking Integration
When the user adds an account number, the system:

Directly sends a one-time OTP to the customer's phone number

OTP expires within 60 seconds

Upon successful verification, the system:

Deducts from customer account

Credits the restaurant account

📱 Order Notifications
Customers receive SMS notifications for:

Successful order placement - Includes total price and list of food/drinks ordered

Food ready notification - Second SMS when the food is ready for pickup

🖨️ Additional Features
Print orders directly from the system

Contact page integrated directly with the restaurant's Outlook account
