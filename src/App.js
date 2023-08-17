import { useEffect, useState } from "react";
import "./App.css";
//APi-key
const yourApiKey = "5adc0ef7be763da42ce94e17d0a3b3cf";
//page numbers limiting to 10;
const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function App() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  //next page
  const clickLeft = () => {
    setCurrentPage(currentPage + 1);
  };
  //previous page
  const clickRight = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  // creating url parameters for image search
  const data = {
    method: "flickr.photos.search",
    api_key: yourApiKey,
    text: search || "cat",
    sort: "interestingness-desc",
    per_page: 24,
    page: currentPage,
    license: "4",
    extras: "owner_name,license",
    format: "json",
    nojsoncallback: 1,
  };
  // coverting data to url param
  const parameters = new URLSearchParams(data);

  //making new url with url param
  const url = `https://api.flickr.com/services/rest/?${parameters}`;

  //creating image urls from the fetched data of flicker
  const getImageURL = (photo, size) => {
    let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`;
    if (size) {
      // Configure image size
      url += `_${size}`;
    }
    url += ".jpg";
    return url;
  };

  // featching data on search and page changes
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) =>
        setImages(
          data.photos.photo.map((photo) => {
            return getImageURL(photo, "m");
          })
        )
      );
  }, [search, currentPage]);

  return (
    <div className="App">
      <h1>Snap-Shot</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="search here....."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="img-container">
        {images.map((image) => (
          <img src={image} key={image} alt="image1" />
        ))}
      </div>
      <div className="pagination">
        <button onClick={clickRight} className="arrow">
          ⬅️
        </button>
        {pages.map((page) => (
          <button
            style={{
              backgroundColor: currentPage === page ? "palevioletred" : "",
            }}
            className="page"
            key={page.toString()}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button onClick={clickLeft} className="arrow">
          ➡️
        </button>
      </div>
    </div>
  );
}

export default App;
