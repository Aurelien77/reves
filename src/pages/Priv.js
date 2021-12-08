import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

import LocalCafeIcon from "@material-ui/icons//LocalCafe";

function Profile() {
  let { id } = useParams();
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [photo_profil, setphoto_profil] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`https://eleves.herokuapp.com/auth/postspriv/${id}`)
      .then((response) => {
        setUsername(response.data.username);
        setphoto_profil(response.data.photo_profil);
      });

    axios
      .get(`https://eleves.herokuapp.com/postspriv/byuserId/${id}`)
      .then((response) => {
        setListOfPosts(response.data);
      });
  }, []);
  const mode = () => {
    window.location.reload(false);
  };

  return (
    <div className="flexgobal">
      <div className="modif">
        {" "}
        <span className="boutonmodif">
          <button onClick={mode}>📑</button>
        </span>
      </div>
      <div className="app3">
        <div className="">
          <div className="basicinfo3">
            {" "}
            <h1> Page de profil de : {username} </h1>
            <div className="profil">
              <img
                src={"https://eleves.herokuapp.com/images/" + photo_profil}
                alt="profil"
              />{" "}
            </div>
            {(authState.username === username || authState.admin === true) && (
              <>
                <button
                  onClick={() => {
                    history.push("/changepassword");
                  }}
                >
                  {" "}
                  Posts Privés
                </button>
                <button
                  onClick={() => {
                    history.push("#");
                  }}
                >
                  {" "}
                  Changer mon mots de passe
                </button>
                <form
                  action={"https://eleves.herokuapp.com/upload/" + id}
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
                  onClick={() => {
                    history.push("/delete");
                  }}
                >
                  {" "}
                  Supprimer le compte
                </button>

                <button
                  onClick={() => {
                    history.push("/Recherche");
                  }}
                >
                  {" "}
                  recherche
                </button>

                <button
                  onClick={() => {
                    history.push("/priv");
                  }}
                >
                  {" "}
                  Voir les posts privés
                </button>
              </>
            )}
          </div>{" "}
        </div>

        <div className="listOfPosts">
          {listOfPosts.map((value, key) => {
            return (
              <div key={key} className="post">
                <div className="title"> {value.title} </div>
                <div
                  className="body"
                  onClick={() => {
                    history.push(`/post/${value.id}`);
                  }}
                >
                  {value.postText}
                </div>
                <div className="lien">
                  <iframe
                    width="100%"
                    height="200"
                    src={value.lien}
                    frameborder="0"
                    allowfullscreen
                  ></iframe>

                  {/*  <iframe src={value.lien}></iframe> */}
                  <a target="blank" href={value.lien}>
                    {value.lien}
                  </a>
                </div>
                <div className="footer">
                  <div className="username">{value.username}</div>

                  <div className="buttons">
                    <div className="cofee">
                      {" "}
                      <LocalCafeIcon />
                    </div>

                    <label> {value.Likes.length}</label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>{" "}
    </div>
  );
}

export default Profile;
