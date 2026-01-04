🛒 Next.js E-commerce App
-----------------------
This is a e-commerce web application built with **Next.js 15** and **Tailwind CSS**. The app supports product browsing, shopping cart, checkout, order management, user authentication, and an admin panel for managing products and orders.


Technologies Used:
-------------------
- Framework: Next.js 15 (App Router)
- Styling: Tailwind CSS
- Authentication: JWT and cookies
- Storage: localStorage for cart, in-memory DB
- Testing: Vitest and Testing Library
- Routing: File-based routing (App directory)
- State Management: React Context API (`AuthContext`, `CartContext`)


user Features:
--------------
- Register, login, logout, and manage profile
- View and filter products with search, category, and price range
- Add/remove items from cart (persists using localStorage)
- Checkout with shipping/billing info
- Order success page and order history
- Leave product reviews and view average ratings

Admin Features:
----------------
- Secure admin login
- Manage products: Add, edit, delete, and upload images
- Manage orders: View all orders, update status (pending, shipped, delivered, cancelled)


How to Run Locally:
--------------------
1. Make sure you have Node.js installed (version 16 or higher)
2. Clone this repository or download the code
3. Open a terminal in the project folder

4. Install dependencies by running:
-- npm install

5. Start the development server by running:
-- npm run dev

6. Open your browser and visit:
-- http://localhost:3000


Available Scripts:
-------------------
• npm run dev - Starts the development server
• npm run build - Builds the app for production
• npm run test - To run tests
• npm run test:coverage - For test coverage