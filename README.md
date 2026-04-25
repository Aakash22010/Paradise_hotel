# 🏨 Paradise Hotel

A full-stack hotel booking web application that allows users to explore rooms, view details, and make reservations seamlessly.

---

## 🌐 Live Demo

🔗 https://paradise-hotel-peach.vercel.app/

---

## 📌 Features

* 🛏️ Browse available hotel rooms
* 📄 View detailed room information (images, pricing, amenities)
* 📅 Book rooms with selected dates
* ⚡ Fast and responsive UI
* 🔄 Dynamic data rendering from backend

---

## 🧑‍💻 Tech Stack

### Frontend

* React.js
* CSS (custom styling)

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Deployment

* Frontend: Vercel
* Backend: Node server (Render / local)

---

## 🏗️ Project Structure

```
paradise-hotel/
│
├── client/        # React frontend
│   ├── src/
│   └── public/
│
├── server/        # Express backend
│   ├── routes/
│   ├── controllers/
│   └── models/
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/paradise-hotel.git
cd paradise-hotel
```

---

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside `/server`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Run backend:

```bash
npm start
```

---

### 3. Setup Frontend

```bash
cd client
npm install
npm start
```

---

## 🔌 API Endpoints (Sample)

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| GET    | /api/rooms     | Fetch all rooms   |
| GET    | /api/rooms/:id | Fetch single room |
| POST   | /api/bookings  | Create booking    |

---

## 📸 Screenshots (Optional)

*Add screenshots of your UI here*

---

## 🚀 Future Improvements

* 🔐 User authentication (JWT)
* 💳 Payment integration (Razorpay)
* ⭐ Reviews & ratings system
* 📊 Admin dashboard
* 📅 Real-time room availability

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a PR.

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Aakash**

* GitHub: https://github.com/your-username

---
