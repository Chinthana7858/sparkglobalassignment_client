# 💻 eCommerce Product Listing App (Frontend - React + TypeScript + Tailwind CSS)

This is the simple **frontend** of a simple eCommerce product listing web application. It is built with **React**, **TypeScript**, and **Tailwind CSS**, and interacts with a backend API for managing products.

---

## 🚀 Features

- Display all products in a responsive grid layout
- Add new products with image upload
- View product details in a modal
- Edit or delete products
- Search products by name

---

## 🧰 Technologies Used

- React + TypeScript
- Tailwind CSS
- Axios (API requests)
- React Icons
- Vite (development/build tool)

---

## 🔧 Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/your-username/your-repo-name.git
cd client
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure API Endpoint**

Update the API base URL in `src/api/endpoints.ts`:

```ts
export const API = {
  GET_PRODUCTS: "https://your-backend-url.com/products",
  GET_PRODUCT_BY_ID: (id: string) => `https://your-backend-url.com/products/${id}`,
  ADD_PRODUCT: "https://your-backend-url.com/products",
  UPDATE_PRODUCT_BY_ID: (id: string) => `https://your-backend-url.com/products/${id}`,
  DELETE_PRODUCT_BY_ID: (id: string) => `https://your-backend-url.com/products/${id}`,
};
```

> Replace `https://your-backend-url.com` with your actual deployed backend URL.

4. **Run the development server**

```bash
npm run dev
```

Your app will be available at `http://localhost:5173` (or as specified in Vite output).


---

## 🌐 Deployment

You can deploy this frontend app using:

- [Vercel](https://vercel.com) 



---

## 📄 License

This project is licensed under the MIT License.
