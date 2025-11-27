import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
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
    <div>
      <h2>Fakultetlar</h2>
      <div style={{ display: "flex", gap: 10 }}>
        {faculties.map(f => (
          <Card key={f.id} onClick={() => navigate(`/departments/${f.id}`)}>
            {f.title}
          </Card>
        ))}
      </div>
    </div>
  );
}
