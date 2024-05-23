import React, { useEffect, useState } from "react";
import { Container, SimpleGrid, Image, Spinner, Box } from "@chakra-ui/react";
import { FaInstagram } from "react-icons/fa";

const Index = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstagramPhotos = async () => {
      try {
        // Replace this URL with the actual API endpoint or scraping logic to fetch photos from the Instagram page
        const response = await fetch("https://api.example.com/instagram/mizahi_kurd/photos");
        const data = await response.json();
        setPhotos(data.filter((item) => item.type === "photo"));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Instagram photos:", error);
        setLoading(false);
      }
    };

    fetchInstagramPhotos();
  }, []);

  return (
    <Container maxW="container.xl" py={10}>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Spinner size="xl" />
        </Box>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={10}>
          {photos.map((photo, index) => (
            <Image key={index} src={photo.url} alt={`Instagram photo ${index + 1}`} />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default Index;
