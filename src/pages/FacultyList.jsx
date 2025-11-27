import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../config";
import { Box, Grid, Heading, Text, VStack, HStack } from "@chakra-ui/react";
import { FaUniversity, FaChalkboardTeacher } from "react-icons/fa";

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
    <Box p={6} bg="gray.50" minH="100vh">
      <Heading textAlign="center" mb={10} size="2xl">
        Fakultetlar
      </Heading>

      <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={8}>
        {faculties.map((f) => (
          <Box
            key={f.id}
            p={6}
            bg="white"
            borderRadius="3xl"
            boxShadow="lg"
            cursor="pointer"
            _hover={{ boxShadow: "2xl", transform: "scale(1.05)" }}
            transition="all 0.3s"
            onClick={() => navigate(`/departments/${f.id}`)}
          >
            <HStack mb={4} spacing={3}>
              <FaUniversity className="text-indigo-500" />
              <Heading size="md">{f.title}</Heading>
            </HStack>

            <VStack spacing={2} align="stretch">
              {f.cafedras?.map((c) => (
                <HStack
                  key={c.id}
                  p={2}
                  bg="gray.100"
                  borderRadius="xl"
                  cursor="pointer"
                  _hover={{ bg: "blue.100", color: "blue.700" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/feedback/${c.id}`);
                  }}
                >
                  <FaChalkboardTeacher />
                  <Text>{c.title}</Text>
                </HStack>
              ))}
            </VStack>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
