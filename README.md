# 🗂️ Task Manager - Project Documentation

## 🔗 Live Demo

https://your-vercel-link.vercel.app

## 📌 Project Overview

This is a **Task Manager Application** built using React.js that helps users efficiently organize and manage their daily tasks. The application implements full **CRUD (Create, Read, Update, Delete)** functionality.

## 🚀 Features

* Add new tasks (**Create**)
* View all tasks (**Read**)
* Edit existing tasks (**Update**)
* Delete tasks (**Delete**)
* Mark tasks as completed
* Filter tasks (All, Active, Completed)
* Clear completed tasks
* Data persistence using LocalStorage

## 🛠 Tech Stack

* React.js
* JavaScript (ES6)
* CSS
* UUID (for unique IDs)
* LocalStorage

## 💾 Data Storage

All task data is stored in the browser using **LocalStorage**.

* Tasks are saved locally in the user's browser
* Data persists even after page reload or browser restart
* No backend or external database is used in this version

## ⚙️ How It Works

* State is managed using React hooks (`useState`)
* Side effects handled using `useEffect`
* Tasks are stored and retrieved from LocalStorage
* CRUD operations are performed dynamically on the task list
* Filtering logic is applied based on task completion status

## 📂 Project Structure

* App.js → Main logic and state management
* Components → UI components (if used)
* CSS → Styling

## 📸 Future Improvements

* Add user authentication
* Integrate backend (Node.js + MongoDB)
* Store data in database instead of LocalStorage
* Add drag-and-drop functionality
* Implement dark mode

## 👨‍💻 Author

Gopal Verma
