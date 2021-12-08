import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
function Recherche() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  const [datas, setDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
    } else {
      axios
        .get("https://eleves.herokuapp.com/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfPosts(response.data.listOfPosts);
          setLikedPosts(
            response.data.likedPosts.map((like) => {
              //Map argument de tableau
              return like.PostId;
            })
          );
        });
    }
  }, []);

  const handleSearchTerm = (e) => {
    let value = e.target.value;
    value.length > 2 && setSearchTerm(value);
  };
  /* console.log(searchTerm); */
  return (
    <>
      <div className="recherche">
        <input
          type="text"
          name="barrecherche"
          id="barrecherche"
          placeholder="Rechercher"
          onChange={handleSearchTerm}
        />
      </div>
      <div className="recherche_resultats">
        {datas
          .filter((val) => {
            return val.title
              .toLowerCase()
              .includes(searchTerm.toLocaleLowerCase());
          })
          .map((val) => {
            return (
              <div className="recherche_resultat" key={val.id}>
                {val.titre}
              </div>
            );
          })}{" "}
      </div>
    </>
  );
}

export default Recherche;
