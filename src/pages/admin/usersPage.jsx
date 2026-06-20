import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/users/all",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load users");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) fetchUsers();
  }, [isLoading]);

  const toggleBlock = async (userId, isBlocked) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/block/${userId}`,
        { isBlocked: !isBlocked },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`User ${isBlocked ? "unblocked" : "blocked"} successfully`);
      setIsLoading(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("User deleted successfully");
      setIsLoading(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="relative w-full h-full p-4 font-[var(--font-main)] bg-pink-50/10 dark:bg-[var(--color-dark-bg)] transition-colors duration-300">
      {/* Loader */}
      {isLoading ? (
        <div className="w-full h-[70vh] flex justify-center items-center">
          <div className="w-14 h-14 border-4 border-gray-300 border-t-accent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-2xl bg-white dark:bg-[var(--color-dark-surface)] border border-pink-100/50 dark:border-[var(--color-dark-border)]">
          <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
            <thead className="bg-accent text-white text-base">
              <tr>
                <th className="py-4 px-4 text-center">Profile</th>
                <th className="py-4 px-4 text-left">Name</th>
                <th className="py-4 px-4 text-left">Email</th>
                <th className="py-4 px-4 text-left">Role</th>
                <th className="py-4 px-4 text-left">Status</th>
                <th className="py-4 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50 dark:divide-[var(--color-dark-border)]">
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50/30 dark:bg-gray-900/10" : "bg-white dark:bg-[var(--color-dark-surface)]"
                  } hover:bg-pink-50/20 dark:hover:bg-gray-800/40 transition`}
                >
                  <td className="py-3 px-4 flex justify-center">
                    <img
                      src={user.img || "/placeholder.png"}
                      alt="Profile"
                      className="w-10 h-10 object-cover rounded-full shadow-sm border dark:border-gray-800"
                    />
                  </td>
                  <td className="py-3 px-4 font-semibold text-secondary dark:text-[var(--color-dark-text)]">{user.firstName} {user.lastName}</td>
                  <td className="py-3 px-4 text-xs font-mono text-gray-500 dark:text-gray-400">{user.email}</td>
                  <td className="py-3 px-4 capitalize font-medium">{user.role}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${user.isBlocked ? "bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400" : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"}`}>
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => toggleBlock(user._id, user.isBlocked)}
                        className={`w-20 px-2.5 py-1.5 rounded-xl text-xs font-bold text-white transition cursor-pointer ${
                          user.isBlocked
                            ? "bg-emerald-500 hover:bg-emerald-600"
                            : "bg-amber-500 hover:bg-amber-600"
                        }`}
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="p-2 rounded-xl bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/45 text-red-600 dark:text-red-400 transition cursor-pointer"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Floating Add Admin Button */}
      <Link
        to="/admin/add-admin"
        className="fixed bottom-6 right-6 bg-accent hover:bg-accent-hover text-white font-bold py-3.5 px-6 rounded-full shadow-lg transition duration-300 z-10 cursor-pointer"
      >
        + Add Admin Account
      </Link>
    </div>
  );
}
