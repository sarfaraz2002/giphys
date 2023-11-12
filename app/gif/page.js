"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchBox from "../components/SearchBox.js";
import GifCard from "../components/GiftCard.js";
import Pagination from "../components/Pagination";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";

const Home = () => {
  const [query, setQuery] = useState("");
  const [gifs, setGifs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGifs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.giphy.com/v1/gifs/search`,
          {
            params: {
              api_key: "GlVGYHkr3WSBnllca54iNt0yFbjz7L65",
              q: query,
              offset: (currentPage - 1) * 10,
            },
          }
        );
        setGifs(response.data.data);
        setTotalPages(
          Math.min(Math.ceil(response.data.pagination.total_count / 10), 15)
        );
      } catch (error) {
        console.error("Error fetching gifs:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchGifs();
    }
  }, [query, currentPage]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ marginBottom: "1em" }}>
        <SearchBox onSearch={handleSearch} />
      </div>

      {loading && (
        <div>
          <p>Searching...</p>
          <BeatLoader
            css={override}
            size={15}
            color={"#007bff"}
            loading={loading}
          />
        </div>
      )}

      {!loading && gifs.length === 0 && <p>No GIFs found.</p>}
      {!loading && gifs.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {gifs.map((gif) => (
            <GifCard
              key={gif.id}
              gif={gif}
              style={{ flexBasis: "25%", margin: "0.5em" }}
            />
          ))}
        </div>
      )}
      {!loading && gifs.length > 0 && (
        <div style={{ marginTop: "1em" }}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
