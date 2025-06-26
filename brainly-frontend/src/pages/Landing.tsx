import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-10 max-w-lg w-full flex flex-col items-center">
        <h1 className="text-4xl font-bold text-purple-700 mb-4">Welcome to Brainlyy</h1>
        <p className="text-lg text-gray-600 mb-6 text-center">
            Collect, organize, and share your favorite YouTube videos and Twitter posts in one place. Effortlessly manage your content and share your curated brain with others!
        </p>
        <div className="flex gap-4 mb-6">
          <Link to="/signin" className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold shadow hover:bg-purple-700 transition">Sign In</Link>
          <Link to="/signup" className="px-6 py-2 bg-white border border-purple-600 text-purple-700 rounded-lg font-semibold shadow hover:bg-purple-50 transition">Sign Up</Link>
        </div>
      </div>
    </div>
  );
} 