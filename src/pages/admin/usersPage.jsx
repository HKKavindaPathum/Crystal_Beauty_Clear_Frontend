import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Search, Plus } from "lucide-react";
import { FaTrash } from "react-icons/fa";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
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

    if (isLoading) fetchUsers();
  }, [isLoading, token]);

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

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    const fullName = `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase();
    return (
      fullName.includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.role?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6 font-[var(--font-main)]">
      {/* Top Panel Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-secondary dark:text-[var(--color-dark-text)]">
            User Accounts
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Manage user authorization, block suspicious accounts, and register admins.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0 w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-xl border border-pink-100 dark:border-[var(--color-dark-border)] bg-white dark:bg-[var(--color-dark-surface)] text-sm text-secondary dark:text-[var(--color-dark-text)] focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition duration-300"
            />
          </div>
          <Link
            to="/admin/add-admin"
            className="bg-accent hover:bg-accent-hover text-white font-bold py-2 px-4 rounded-xl shadow-sm transition duration-300 text-sm flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <Plus size={16} />
            Add Admin
          </Link>
        </div>
      </div>

      {/* Loader */}
      {isLoading ? (
        <div className="w-full h-[50vh] flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-accent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white dark:bg-[var(--color-dark-surface)] rounded-3xl border border-pink-100/40 dark:border-[var(--color-dark-border)] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-pink-50/50 dark:border-[var(--color-dark-border)] text-gray-400 font-heading text-xs uppercase tracking-wider">
                  <th className="py-4 px-6">Profile</th>
                  <th className="py-4 px-4">Name</th>
                  <th className="py-4 px-4">Email Address</th>
                  <th className="py-4 px-4">Role</th>
                  <th className="py-4 px-4 text-center">Status</th>
                  <th className="py-4 px-4 text-center">Toggle Access</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-50/20 dark:divide-[var(--color-dark-border)] text-secondary dark:text-[var(--color-dark-text)]">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-500 dark:text-gray-400">
                      No users found matching "{searchQuery}"
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => {
                    const initials = `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`.toUpperCase() || "?";
                    const hasProfileImg = user.img && user.img !== "/placeholder.png";

                    return (
                      <tr
                        key={user._id}
                        className="hover:bg-pink-50/10 dark:hover:bg-gray-800/20 transition-colors duration-200"
                      >
                        <td className="py-4 px-6">
                          <div className="flex justify-start">
                            {hasProfileImg ? (
                              <img
                                src={user.img}
                                alt="Profile"
                                className="w-10 h-10 object-cover rounded-full shadow-sm border border-pink-100/50 dark:border-gray-800"
                              />
                            ) : (
                              <div className="flex items-center justify-center w-10 h-10 rounded-full font-bold text-xs bg-gradient-to-tr from-accent/20 to-accent/40 text-accent dark:from-accent/10 dark:to-accent/30 dark:text-accent-rose shadow-sm border border-accent/20">
                                {initials}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4 font-bold">
                          {user.firstName} {user.lastName}
                        </td>
                        <td className="py-4 px-4 font-mono text-xs text-gray-500 dark:text-gray-400">
                          {user.email}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            user.role === "admin"
                              ? "bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400"
                              : "bg-gray-50 dark:bg-gray-800 text-gray-500"
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            user.isBlocked
                              ? "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400"
                              : "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400"
                          }`}>
                            {user.isBlocked ? "Blocked" : "Active"}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => toggleBlock(user._id, user.isBlocked)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none cursor-pointer ${
                              user.isBlocked ? "bg-red-500/20 border border-red-500/30" : "bg-emerald-500/20 border border-emerald-500/30"
                            }`}
                            title={user.isBlocked ? "Unblock User" : "Block User"}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full transition-transform duration-300 ${
                                user.isBlocked ? "translate-x-6 bg-red-500" : "translate-x-1 bg-emerald-500"
                              }`}
                            />
                          </button>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex justify-center">
                            {user.role === "admin" ? (
                              <span className="text-[10px] text-gray-400 dark:text-gray-500 italic">Protected</span>
                            ) : (
                              <button
                                onClick={() => handleDeleteUser(user._id)}
                                className="p-2 rounded-xl bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 transition-colors duration-200 cursor-pointer"
                                title="Delete User"
                              >
                                <FaTrash size={12} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

