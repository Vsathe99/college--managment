import { useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import axios from "../config/axios.js";
import { setStudent } from "../store/studentSlice.js";

export function NewAssignment({ onAssignmentAdded }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const { teacher } = useSelector((state) => state.teacher);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !dueDate) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    const newAssignment = { title, dueDate };
    const subject = teacher?.teacher.subject;

    axios.put("/teacher/addassignment",{
      subject,
      title,
      dueDate
    }) .then(res => {
      console.log(res.data)
      dispatch(setStudent(res.data))
      setLoading(false);
      setTitle("");
      setDueDate("");
    })
    .catch(err => {
      console.log(err.response.data)
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto h-full bg-[#31363F] text-white p-6 rounded-xl shadow-lg border border-gray-200 py-40"
    >
      <h2 className="text-xl font-bold text-white mb-4">
        Upload New Assignment
      </h2>

      {error && <p className="text-red-400 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white">
            Assignment Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter title..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm text-black focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Assignment"}
        </button>
      </form>
    </motion.div>
  );
}
