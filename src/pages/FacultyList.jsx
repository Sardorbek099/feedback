import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../config";
import { FaUniversity, FaChalkboardTeacher } from "react-icons/fa";
import {
  ChakraProvider,
  Box,
  Heading,
  SimpleGrid,
  Flex,
  Text,
  Icon,
  VStack,
} from "@chakra-ui/react";

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
    <ChakraProvider>
      <Box bg="gray.50" minH="100vh" p={6}>
        <Heading
          as="h2"
          size="2xl"
          textAlign="center"
          mb={10}
          color="gray.800"
        >
          Fakultetlar
        </Heading>

        <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing={8}>
          {faculties.map((f) => (
            <Box
              key={f.id}
              bg="white"
              borderRadius="3xl"
              p={6}
              shadow="lg"
              cursor="pointer"
              _hover={{ shadow: "2xl", transform: "scale(1.05)" }}
              transition="all 0.3s"
              onClick={() => navigate(`/departments/${f.id}`)}
            >
              {/* Fakultet header */}
              <Flex align="center" gap={3} mb={4}>
                <Icon as={FaUniversity} w={8} h={8} color="indigo.500" />
                <Heading as="h3" size="lg" color="gray.800">
                  {f.title}
                </Heading>
              </Flex>

              {/* Cafedralar ro'yxati */}
              <VStack spacing={2} align="stretch">
                {f.cafedras?.map((c) => (
                  <Flex
                    key={c.id}
                    align="center"
                    gap={2}
                    bg="gray.100"
                    borderRadius="xl"
                    p={2}
                    px={3}
                    color="gray.700"
                    cursor="pointer"
                    _hover={{ bg: "indigo.100", color: "indigo.700" }}
                    transition="background-color 0.2s, color 0.2s"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/feedback/${c.id}`);
                    }}
                  >
                    <Icon as={FaChalkboardTeacher} w={5} h={5} />
                    <Text>{c.title}</Text>
                  </Flex>
                ))}
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </ChakraProvider>
  );
}
