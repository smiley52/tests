import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "live_AI1F2Sz4ACw1QeZzeRxyU25AR7FLQd7bvTqWCH9N3p8Weg8syf09EEORLgSHQL5c"; // Replace with your API key from https://thecatapi.com/
const API_URL = "https://api.thecatapi.com/v1";

function App() {
  const [images, setImages] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBreeds = async () => {
    const res = await axios.get(`${API_URL}/breeds`, {
      headers: { "x-api-key": API_KEY }
    });
    setBreeds(res.data);
  };

  const fetchImages = async (breedId = "") => {
    setLoading(true);
    const res = await axios.get(`${API_URL}/images/search`, {
      headers: { "x-api-key": API_KEY },
      params: { limit: 9, breed_id: breedId }
    });
    setImages(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBreeds();
    fetchImages();
  }, []);

  return (
    <div className="App">
      <h1>Cat Gallery</h1>
      <select onChange={(e) => {
        setSelectedBreed(e.target.value);
        fetchImages(e.target.value);
      }}>
        <option value="">All Breeds</option>
        {breeds.map((breed) => (
          <option key={breed.id} value={breed.id}>{breed.name}</option>
        ))}
      </select>

      <button onClick={() => fetchImages(selectedBreed)}>Load More</button>

      {loading ? <p>Loading...</p> :
        <div className="gallery">
          {images.map((img) => (
            <img key={img.id} src={img.url} alt="cat" />
          ))}
        </div>
      }
    </div>
  );
}

export default App;
