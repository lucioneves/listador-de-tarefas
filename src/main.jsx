import "./index.css"

import React from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"

import App from "./App.jsx"
import TaskDetailsPage from "./pages/task-details.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/task/:taskId",
    element: <TaskDetailsPage />,
  },
])

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster
      toastOptions={{
        style: { color: "#35383E" },
      }}
    />
    <RouterProvider router={router} />
  </React.StrictMode>
)
