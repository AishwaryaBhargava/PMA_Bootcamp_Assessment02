
# 🌤️ Weather Forecast App (Assessment 2)

A full-stack weather forecast application built with **React**, **Express**, and **MongoDB**. This project allows users to search for weather information using city names, ZIP codes, GPS coordinates, or landmarks, view current and forecasted weather, and save entries for later viewing or editing.

---

## 🚀 Live Demo
- **Frontend:** [https://pma-bootcamp-assessment02.vercel.app](https://pma-bootcamp-assessment02.vercel.app)
- **Backend:** [https://weather-app-backend-1huv.onrender.com/api/weather](https://weather-app-backend-1huv.onrender.com/api/weather)

---

## 🛠️ Tech Stack

### Frontend
- React (Vite + SWC)
- Axios
- CSS (responsive styling)

### Backend
- Node.js + Express
- MongoDB Atlas + Mongoose
- CORS + dotenv

---

## ✨ Features
- Search weather by city, ZIP, landmark, or GPS coordinates
- Use browser geolocation to fetch local weather
- View current, hourly, and 5-day forecast
- Save weather entries to MongoDB
- View, edit, and delete saved entries

---

## 🗂️ Folder Structure
```
weather-app-02
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── server.js
│   └── .env
├── frontend
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── App.jsx
│   │   └── weatherAPI.js
│   └── .env
└── README.md
```

---

## 🌍 Deployment Instructions

### Backend (Render)
1. Create a Render account: https://render.com/
2. Create a new Web Service
   - Connect your GitHub repo
   - Set root as `/backend`
   - Use `server.js` as the entry point
3. Add Environment Variables:
   - `PORT = 5000`
   - `MONGO_URI = <your-mongodb-uri>`
4. Set build command: `npm install`
5. Set start command: `node server.js`
6. Deploy the backend and note the service URL (e.g. `https://weather-app-backend-xxxx.onrender.com`)

### Frontend (Vercel)
1. Create a Vercel account: https://vercel.com/
2. Import your GitHub repository
3. Configure the frontend root directory: `/frontend`
4. Add environment variables:
   - `VITE_BACKEND_BASE_URL = https://weather-app-backend-xxxx.onrender.com/api/weather`
   - `VITE_WEATHER_API_KEY = <your-weatherapi-key>`
5. Set build command: `npm run build`
6. Set output directory: `dist`
7. Deploy and verify live site

---

## 🔒 Environment Variables

### Backend `.env`
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/weatherDB?retryWrites=true&w=majority
```

### Frontend `.env`
```
VITE_BACKEND_BASE_URL=https://weather-app-backend-xxxx.onrender.com/api/weather
VITE_WEATHER_API_KEY=<your-api-key>
```

---

## 👩🏻‍💻 Developed by
**Aishwarya Bhargava**  
Assessment submission for PM Accelerator Bootcamp – Software Engineer Intern (AI/ML Application)

---

Thank you for reviewing this project! 🌟
