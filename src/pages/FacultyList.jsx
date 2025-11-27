import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../config";

export default function FacultyList() {
  const [faculties, setFaculties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/faculties`)
      .then(res => res.json())
      .then(setFaculties)
      .catch(() => setFaculties([]));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Fakultetlar
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {faculties.map((f) => (
          <div
            key={f.id}
            onClick={() => navigate(`/departments/${f.id}`)}
            className="
              bg-white 
              rounded-2xl 
              p-6 
              text-center 
              font-medium 
              text-xl
              cursor-pointer 
              shadow-md 
              hover:shadow-xl 
              hover:-translate-y-2 
              transform 
              transition-all 
              duration-300
              hover:bg-indigo-50
            "
          >
            {f.title}
          </div>
        ))}
      </div>
    </div>
  );
}
