import React, { useState, useEffect } from 'react';
import Header from "../../components/header";

function Gallery() {
    const [images, setImages] = useState([]); // Initialize as an empty array
    const [file, setFile] = useState(null); // State to store the selected file

    // Fetch all images from the database on component mount
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch("http://localhost:8000/get_images.php", {
                    credentials: 'include',
                });
                const data = await response.json();
                if (data.success && Array.isArray(data.images)) {
                    setImages(data.images); // Ensure data.images is an array
                } else {
                    alert('Failed to fetch images.');
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    // Handle file selection
    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Store the selected file in state
    };

    // Handle file upload
    const handleUpload = async () => {
    if (!file) {
        alert('Please select an image to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch("http://localhost:8000/image_upload.php", {
            method: 'POST',
            body: formData,
            credentials: 'include',
        });

        const data = await response.json();

        if (data.success) {
            setFile(null); // Reset the file input
            alert('Image uploaded successfully!');

            // Refetch images to ensure the gallery is up-to-date
            const fetchImages = async () => {
                try {
                    const response = await fetch("http://localhost:8000/get_images.php", {
                        credentials: 'include',
                    });
                    const data = await response.json();
                    if (data.success && Array.isArray(data.images)) {
                        setImages(data.images); // Update the gallery with the latest images
                    } else {
                        alert('Failed to fetch images.');
                    }
                } catch (error) {
                    console.error('Error fetching images:', error);
                }
            };

            fetchImages();
            } else {
                alert('Failed to upload image.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('An error occurred while uploading the image.');
        }
    };

    return (
        <div>
            <Header/>
            {/* Upload Section */}
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <button onClick={handleUpload}>Upload</button>
            </div>

            {/* Gallery Section */}
            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
                {Array.isArray(images) && images.map((image, index) => ( // Add a check for images
                    <div
                        key={index}
                        style={{ margin: '10px', textAlign: 'center', cursor: 'pointer' }}
                        onClick={() => window.open(image.image, '_blank')} // Open full image on click
                    >
                        <img
                            src={image.thumbnail}
                            alt="Thumbnail"
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Gallery;