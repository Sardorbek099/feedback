import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { API } from "../../config";

export default function DepartmentsPage() {
  const { fid } = useParams();
  const [faculty, setFaculty] = useState(null);

  useEffect(() => {
    fetch(`${API}/faculties`)
      .then(res => res.json())
      .then(data => {
        const f = data.find(f => f.id.toString() === fid);
        setFaculty(f || null);
      });
  }, [fid]);

  if (!faculty) return <p>Fakultet topilmadi</p>;

  return (
    <div>
      <h2>{faculty.title} kafedralari</h2>
      <div style={{ display: "flex", gap: 10 }}>
        {faculty.cafedras.map(dep => (
          <Card key={dep.id}>{dep.title}</Card>
        ))}
      </div>
    </div>
  );
}
