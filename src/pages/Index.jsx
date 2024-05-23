import React, { useEffect, useState } from "react";
import { Container, SimpleGrid, Image, Spinner, Box, Modal, ModalOverlay, ModalContent, ModalBody, useDisclosure } from "@chakra-ui/react";
import { FaInstagram } from "react-icons/fa";

const Index = () => {
  const [photos, setPhotos] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstagramPhotos = async () => {
      try {
        // Replace this URL with the actual scraping logic to fetch photos from the Instagram page
        const response = await fetch("https://www.instagram.com/mizahi_kurd/");
        const data = await response.json();
        // Assuming data is an array of photo URLs
        setPhotos(data);
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
            <Image
              key={index}
              src={photo.url}
              alt={`Instagram photo ${index + 1}`}
              onClick={() => {
                setSelectedPhoto(photo.url);
                onOpen();
              }}
            />
          ))}
        </SimpleGrid>
      )}
      {selectedPhoto && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <Image src={selectedPhoto} alt="Selected Instagram photo" />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default Index;
