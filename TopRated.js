import React, { useEffect, useState } from "react";
import Pagenation from "./Pagenation";
import Poster from "./MovieCast";
import { useMemo } from "react";
const Toprated = ({ searchdata }) => {
  const [data, setData] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [totalpages, settotalpages] = useState(0);
  const [movieid, getmovieid] = useState(0);

  const [castdata, setcast] = useState([]);
  const [posterdata, setposter] = useState([]);

  useEffect(() => {
    if (movieid === 0) {
      if (!searchdata) {
        moviedata(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=065f9f2475fe8cdca69e17321f16b588&language=en-US&page=${currentpage}`
        );
      } else {
        moviedata(
          `https://api.themoviedb.org/3/search/movie?api_key=065f9f2475fe8cdca69e17321f16b588&language=en-US&query=${searchdata}&page=${currentpage}`
        );
      }
    }
  }, [currentpage, searchdata, movieid]);

  const moviedata = async (URL) => {
    try {
      const response = await fetch(URL);
      const responseData = await response.json();
      setData(responseData.results);
      settotalpages(responseData.total_pages);
      console.log(responseData, "page");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(data, "dsds");

  const previousclick = useMemo(() => {
    return () => {
      setcurrentpage(currentpage - 1);
    };
  }, [currentpage]);

  const nextclick = useMemo(() => {
    return () => {
      setcurrentpage(currentpage + 1);
    };
  }, [currentpage]);

  const moviedetail = useMemo(() => {
    return (id) => {
      getmovieid(id);
    };
  }, [getmovieid]);

  return (
    <div>
      {movieid === 0 && (
        <div>
          <div className="row">
            <ul className="movie">
              {data.map((eachdata) => {
                const { poster_path, original_title, vote_average } = eachdata;
                return (
                  <li key={eachdata.id}>
                    <div>
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                        alt={original_title}
                        onClick={() => moviedetail(eachdata.id)}
                      />
                    </div>
                    <div>
                      <h3 id="ttext">{original_title} </h3>
                    </div>
                    <div>
                      <h4>Rating: {vote_average} </h4>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <Pagenation
              previousclick={previousclick}
              nextclick={nextclick}
              pagedata={currentpage}
              totalpage={totalpages}
            />
          </div>
        </div>
      )}
      {movieid !== 0 && <Poster movienum={movieid} />}
    </div>
  );
};

export default Toprated;
