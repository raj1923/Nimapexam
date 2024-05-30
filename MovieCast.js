import React, { useEffect, useState } from "react";

const Poster = ({ movienum }) => {
  const [posterPath, setPosterPath] = useState(null);
  const [castData, setCastData] = useState([]);
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movienum}?api_key=065f9f2475fe8cdca69e17321f16b588`
        );
        const movieData = await movieResponse.json();
        setOverview(movieData);

        const posterResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movienum}/images?api_key=065f9f2475fe8cdca69e17321f16b588`
        );
        const posterData = await posterResponse.json();
        if (posterData.posters && posterData.posters.length > 0) {
          setPosterPath(posterData.posters[0].file_path);
        } else {
          console.log("No poster found");
        }

        const castResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movienum}/credits?api_key=065f9f2475fe8cdca69e17321f16b588&language=en-US`
        );
        const castData = await castResponse.json();
        setCastData(castData.cast);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, [movienum]);

  console.log(castData, "castdata");
  return (
    <div className="container">
      <div className="posterpath">
        {posterPath && (
          <div className="poster-container">
            <div
              id="poster-background"
              style={{
                background: `url(https://image.tmdb.org/t/p/original/${posterPath})`,
                WebkitBackgroundSize: "cover",
                MozBackgroundSize: "cover",
                OBackgroundSize: "cover",
                backgroundSize: "cover",
                height: "400px",
              }}
            ></div>
          </div>
        )}
      </div>
      <div>
        {overview && (
          <div id="parent1">
            <div id="c1">
              {overview.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${overview.poster_path}`}
                  alt={overview.original_title}
                />
              )}
            </div>
            <h1 id="titledata"> {overview.original_title}</h1>

            <h3>
              Rating:{" "}
              <span>
                <b>{overview.vote_average}</b>
              </span>
            </h3>

            <h4>
              {" "}
              Release Date: <span> {overview.release_date} </span>{" "}
            </h4>
            <div id="c2">
              <h2>Overview </h2>
              <p> {overview.overview}</p>
            </div>
          </div>
        )}
      </div>
      <div>
        <h3>Cast</h3>
        {castData && (
          <div className="cast">
            <ul className="castdata">
              {castData.map((actor) => (
                <li key={actor.id}>
                  <div>
                    <img
                      src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
                      alt={actor.name}
                    />
                  </div>
                  <div>
                    <h3>{actor.name}</h3>
                    <p>Character: {actor.character}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Poster;
