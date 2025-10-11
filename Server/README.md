# Dr. Clean Facility Management Service

## 📌 Project Overview

Dr. Clean Facility Management System is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

The project helps manage and showcase the services offered by Dr. Clean Facility Management, including:

Water tank cleaning

House and office cleaning

Roof and board cleaning

Glass cleaning

Staffing solutions

The application provides an admin dashboard for managing services and work posts, while the frontend allows customers to explore available services in a user-friendly interface.
This repository contains the **backend (server)** implementation for managing services, users, and admin operations.

---

## 🚀 Features

- ✅ Admin can add, update, and delete services.
- ✅ Users can view available services.
- ✅ Image upload support with Cloudinary.
- ✅ Authentication & Authorization system.
- ✅ Organized API structure (v1 routes).

---

## 🛠️ Tech Stack

- **Backend Framework:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **File Uploads:** Multer + Cloudinary
- **Version Control:** Git & GitHub

---

## 📂 Folder Structure

```
Project
│── Server
│   ├── Controllers    # Handles business logic
│   ├── Models         # Database schemas
│   ├── Routes         # API routes (v1)
│   ├── Utilities      # Helper functions (e.g., Cloudinary upload)
│   ├── server.js      # Entry point
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Abh1xxx/Dr.Clean.git
cd Dr.Clean/Project/Server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Run the server

```bash
npm start
```

Server will run at: `http://localhost:5000`

---

## 📡 API Endpoints

### **Admin Routes**

- `POST /api/v1/work` → Add new service
- `PUT /api/v1/work/:id` → Update service
- `DELETE /api/v1/work/:id` → Delete service

### **User Routes**

- `GET /api/v1/work` → Get all services
- `GET /api/v1/work/:id` → Get service by ID

---

## 📸 Screenshots

(Add screenshots of your project here once UI is ready)

---

## 📌 Future Enhancements

- [ ] Add booking system for users.
- [ ] Implement payment gateway.
- [ ] Build frontend with React.js.
- [ ] Add admin dashboard.

---

## 🤝 Contributing

Contributions are welcome! Please fork this repo and submit a pull request.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👤 Author

**Abhiram**
🚀 Passionate about building scalable web applications and innovative solutions.
