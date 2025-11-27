import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../config";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Grid
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export default function FacultyList() {
  const [faculties, setFaculties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/faculties?_embed=cafedras`)
      .then((res) => res.json())
      .then(setFaculties)
      .catch(() => setFaculties([]));
  }, []);

  return (
    <Box
      sx={{
        p: 4,
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f5f7, #e0e0e0)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Typography
        variant="h3"
        align="center"
        fontWeight="bold"
        mb={4}
        sx={{
          color: "#ff6600ff",
          textShadow: "0 0 15px rgba(0,122,255,0.5)"
        }}
      >
        Fakultetlar
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {faculties.map((f) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={f.id}>
            <Card
              onClick={() => navigate(`/departments/${f.id}`)}
              sx={{
                minHeight: 220,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: 2,
                borderRadius: 3,
                cursor: "pointer",
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(0,122,255,0.2)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.15), 0 0 15px rgba(0,122,255,0.2)",
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.25), 0 0 30px rgba(0,122,255,0.5)"
                },
                position: "relative"
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <SchoolIcon sx={{ color: "#ff6600ff" }} fontSize="large" />
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    sx={{ color: "#0a0a0a" }}
                  >
                    {f.title}
                  </Typography>
                </Box>

                <Box display="flex" flexWrap="wrap" gap={1}>
                  {f.cafedras?.map((c) => (
                    <Chip
                      key={c.id}
                      icon={<MenuBookIcon sx={{ color: "#ff6600ff" }} />}
                      label={c.title}
                      onClick={(e) => {
                        e.stopPropagation();
                        // FeedbackPage ga yuborish: faculty id + cafedra id
                        navigate(`/feedback/${f.id}/${c.id}`);
                      }}
                      sx={{
                        bgcolor: "rgba(255,255,255,0.15)",
                        color: "#0a0a0a",
                        fontWeight: 500,
                        "&:hover": {
                          bgcolor: "#ff6600ff",
                          color: "#fff",
                          boxShadow: "0 0 10px #ff6600ff"
                        }
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
