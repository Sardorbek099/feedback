import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../config";
import { FaUniversity, FaChalkboardTeacher } from "react-icons/fa";

export default function FacultyList() {
  const [faculties, setFaculties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Faculties bilan birga cafedralarni olish
    fetch(`${API}/faculties?_embed=cafedras`)
      .then((res) => res.json())
      .then(setFaculties)
      .catch(() => setFaculties([]));
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Fakultetlar
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {faculties.map((f) => (
          <div
            key={f.id}
            onClick={() => navigate(`/departments/${f.id}`)}
            className="
              bg-white 
              rounded-3xl 
              p-6 
              shadow-lg 
              cursor-pointer 
              hover:shadow-2xl 
              hover:scale-105 
              transform 
              transition-all 
              duration-300
              flex flex-col
            "
          >
            {/* Fakultet header */}
            <div className="flex items-center gap-3 mb-4">
              <FaUniversity className="text-indigo-500 text-2xl" />
              <h3 className="text-2xl font-semibold text-gray-800">{f.title}</h3>
            </div>

            {/* Cafedralar ro'yxati */}
            <div className="flex flex-col gap-2">
              {f.cafedras?.map((c) => (
                <div
                  key={c.id}
                  onClick={(e) => {
                    e.stopPropagation(); // card click event’ini to‘xtatish
                    navigate(`/feedback/${c.id}`);
                  }}
                  className="
                    flex items-center gap-2 
                    bg-gray-100 
                    rounded-xl 
                    p-2 px-3 
                    text-gray-700 
                    cursor-pointer 
                    hover:bg-indigo-100 
                    hover:text-indigo-700 
                    transition-colors
                  "
                >
                  <FaChalkboardTeacher className="text-lg" />
                  <span>{c.title}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
