import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Card } from "../component/Card";

export default function Share() {
  const { hash } = useParams();
  const [username, setUsername] = useState("");
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchShared() {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/brain/${hash}`);
        setUsername(res.data.username);
        setContent(res.data.content);
      } catch (e) {
        setError("Could not load shared content. The link may be invalid or expired.");
      } finally {
        setLoading(false);
      }
    }
    fetchShared();
  }, [hash]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center py-10">
      <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-8 max-w-2xl w-full">
        {loading ? (
          <div className="text-center text-lg text-gray-500">Loading shared content...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-purple-700 mb-2">{username}'s Shared Brain</h2>
            <div className="flex flex-wrap gap-4 mt-4">
              {content.length === 0 ? (
                <div className="text-gray-400">No content shared yet.</div>
              ) : (
                content.map(({ _id, type, link, title }) => (
                  <Card key={_id} id={_id} type={type} link={link} title={title} />
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
} 