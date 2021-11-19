import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

import LocalCafeIcon from "@material-ui/icons//LocalCafe";

function Postpriv() {
  let { id } = useParams();
  let history = useHistory();
  const [username, setUsername2] = useState("");
  const [photo_profil, setphoto_profil2] = useState("");
  const [listOfPosts, setListOfPosts2] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`https://reves-de-piano.herokuapp.com/auth/postpriv/${id}`)
      .then((response) => {
        setUsername2(response.data.username);
        setphoto_profil2(response.data.photo_profil);
      });

    axios
      .get(`https://reves-de-piano.herokuapp.com/posts/byuserIdpriv/${id}`)
      .then((response) => {
        setListOfPosts2(response.data);
      });
  }, []);
  const mode2 = () => {
    window.location.reload(false);
  };

  return (
    <div className="flexgobal2">
      <div className="modif">
        {" "}
        <span className="boutonmodif">
          <button onClick={mode2}>📑</button>
        </span>
      </div>
      <div className="app4">
        <div className="">
          <h1> Page de profil de : {username} </h1>
          <div className="profil">
            <img
              src={
                "https://reves-de-piano.herokuapp.com/images/" + photo_profil
              }
              alt="profil"
            />{" "}
          </div>
          <div className="basicinfo4">
            {" "}
            {(authState.username === username || authState.admin === true) && (
              <>
                <button
                  className="mdp"
                  onClick={() => {
                    history.push("/changepassword");
                  }}
                >
                  {" "}
                  Changer mon mots de passe
                </button>

                <form
                  action={"https://reves-de-piano.herokuapp.com/upload/" + id}
                  method="POST"
                  enctype="multipart/form-data"
                >
                  <div class="form-group">
                    <input
                      type="file"
                      name="file"
                      id="input-files"
                      class="form-control-file border"
                    />
                  </div>

                  <button type="submit" class="btn btn-primary">
                    Soumêtre l'image
                  </button>
                </form>
                <button
                  className="supprimer"
                  onClick={() => {
                    history.push("/delete");
                  }}
                >
                  {" "}
                  X Supprimer le compte
                </button>
                {/*    <button
                  onClick={() => {
                    history.push("/Recherche");
                  }}
                >
                  {" "}
                  recherche
                </button> */}
                {/*         <button
                  onClick={() => {
                    history.push("/createpostpriv");
                  }}
                >
                  {" "}
                  créer Publication privées
                </button> */}
              </>
            )}
          </div>{" "}
        </div>
        <div className="containerpost">
          {listOfPosts.map((value, key) => {
            return (
              <div key={key} className="postpriv">
                <div className="title"> {value.title} </div>
                <div
                  className="body"
                  onClick={() => {
                    history.push(`/postrpiv/${value.id}`);
                  }}
                >
                  {value.postText}
                </div>

                <div className="lien">
                  <iframe
                    className="flexifra"
                    width="100%"
                    height="600"
                    src={value.lien}
                    frameborder="0"
                    allow="fullscreen"
                    loading="lazy"
                    margin="auto"

                    /*   sandbox="allow-scripts" */
                    /*  sandbox="allow-downloads" */
                  ></iframe>

                  {/*  <iframe src={value.lien}></iframe> */}
                  <a target="blank" href={value.lien}>
                    {value.lien}
                  </a>
                </div>
                <div className="footer">
                  <div className="username">
                    Créé par <span className="speudo">{value.username} </span>{" "}
                    le : {value.createdAt}{" "}
                  </div>
                  {/* 
                  <div className="buttons">
                    <div className="cofee">
                      {" "}
                      <LocalCafeIcon />
                    </div>

                    {/*     <label> {value.Likes.length}</label> }
                  </div> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>{" "}
    </div>
  );
}

export default Postpriv;
