// pages/index.js
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    project: "testing", // Default project
  });
  const [error, setError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [requestPayload, setRequestPayload] = useState("");
  const [responsePayload, setResponsePayload] = useState("");
  const [username, setUsername] = useState(""); // This will be used in the UserContext

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setRequestPayload(JSON.stringify(formData, null, 2));
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        formData
      );
      console.log("Login successful:", response.data);
      setResponseMessage(response.data.message); // Assuming the API returns a message
      setResponsePayload(JSON.stringify(response.data, null, 2));
      if (response.data.success === true) {
        setUsername(response.data.username);
        router.push("/Onboarding");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setError("Forbidden request. Please try again.");
      } else {
        setError("Invalid credentials. Please try again.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Log in to your account
          </h2>
          {error && (
            <p className="mt-2 text-center text-sm text-red-600">{error}</p>
          )}
          {responseMessage && (
            <p className="mt-2 text-center text-sm text-green-600">
              {responseMessage}
            </p>
          )}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="project" value={formData.project} />
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log in
            </button>
          </div>
        </form>

        {requestPayload && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900">
              Request Payload:
            </h3>
            <pre className="mt-2 p-2 bg-gray-100 rounded">{requestPayload}</pre>
          </div>
        )}

        {responsePayload && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900">
              Response Payload:
            </h3>
            <pre className="mt-2 p-2 bg-gray-100 rounded">
              {responsePayload}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
