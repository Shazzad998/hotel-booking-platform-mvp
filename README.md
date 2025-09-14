# Hotel Booking Platform MVP

A modern **Hotel Booking Platform** built with **Laravel 12 (PHP 8.2)**, **React**, and **Inertia.js**.

---

## 🚀 Project Link

GitHub Repository: [hotel-booking-platform-mvp](https://github.com/Shazzad998/hotel-booking-platform-mvp)

---

## ⚙️ System Requirements

- PHP **8.3+**
- Composer **2.x**
- Node.js **22+**
- NPM **10+**
- SQLite (default database)

---

## 📥 Installation Guide

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Shazzad998/hotel-booking-platform-mvp.git
   cd hotel-booking-platform-mvp
   ```

2. **Copy Environment File**
   ```bash
   cp .env.example .env
   ```
   The project is configured to use **SQLite** by default.  
   Ensure you have a `database/database.sqlite` file created:
   ```bash
   touch database/database.sqlite
   ```

3. **Install PHP Dependencies**
   ```bash
   composer install
   ```

4. **Install JavaScript Dependencies**
   ```bash
   npm install
   ```

5. **Generate Application Key**
   ```bash
   php artisan key:generate
   ```

6. **Run Database Migrations & Seed Data**
   ```bash
   php artisan migrate --seed
   ```

7. **Start the Development Servers**
   ```bash
   composer run dev
   ```

---

## 🌐 Access the Application

Once the servers are running, visit:

👉 [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

---

## 🛠 Useful Commands

- Run Laravel server only:
  ```bash
  php artisan serve
  ```

- Run Vite (frontend dev server):
  ```bash
  npm run dev
  ```

- Build assets for production:
  ```bash
  npm run build
  ```

- Clear cache:
  ```bash
  php artisan optimize:clear
  ```

---

## 📂 Tech Stack

- **Backend**: Laravel 12, PHP 8.4  
- **Frontend**: React, Inertia.js, Vite  
- **Database**: SQLite (default)  

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).
