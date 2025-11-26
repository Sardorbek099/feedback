import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const API_URL = "https://feedback-2-oayz.onrender.com";

export default function LoginModal({ close }) {
  const { login } = useContext(UserContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    if (!form.username || !form.password) {
      alert("Iltimos, login va parolni kiriting!");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, form);

      if (data.role !== "admin") {
        alert("Siz admin emassiz!");
        return;
      }

      login(data);
      close();
      navigate("/");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "Login xato yoki server ishlamayapti");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed", top:0, left:0, width:"100vw", height:"100vh",
      background:"rgba(0,0,0,0.6)", display:"flex", justifyContent:"center", alignItems:"center", zIndex:1000
    }} onClick={close}>
      <div onClick={(e)=>e.stopPropagation()} style={{
        background:"#1f1f2e", padding:"40px 30px", borderRadius:20,
        width:350, maxWidth:"90%", color:"#fff", display:"flex",
        flexDirection:"column", gap:15, boxShadow:"0 10px 30px rgba(0,0,0,0.5)"
      }}>
        <h2 style={{textAlign:"center"}}>Admin Kirish</h2>

        <input placeholder="Login" value={form.username} onChange={(e)=>setForm({...form, username:e.target.value})} style={{padding:"12px 15px", borderRadius:10, border:"none", outline:"none", background:"#2c2c3d", color:"#fff", fontSize:16}} />
        <input type="password" placeholder="Parol" value={form.password} onChange={(e)=>setForm({...form, password:e.target.value})} style={{padding:"12px 15px", borderRadius:10, border:"none", outline:"none", background:"#2c2c3d", color:"#fff", fontSize:16}} />

        <button onClick={submit} disabled={loading} style={{padding:"12px 0", borderRadius:10, border:"none", background:"linear-gradient(90deg, #ff8a00, #e52e71)", color:"#fff", fontWeight:"bold", fontSize:16, cursor:"pointer"}}>
          {loading ? "Kirish..." : "Kirish"}
        </button>

        <button onClick={close} style={{padding:"10px 0", borderRadius:10, border:"2px solid #fff", background:"transparent", color:"#fff", fontWeight:"bold", fontSize:14, cursor:"pointer"}}>
          Yopish
        </button>
      </div>
    </div>
  );
}
