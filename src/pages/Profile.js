import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
/* import LocalCafeIcon from "@material-ui/icons//LocalCafe"; */

function Profile() {
  let { id } = useParams();
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [photo_profil, setphoto_profil] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`https://eleves.herokuapp.com/auth/basicinfo/${id}`)
      .then((response) => {
        setUsername(response.data.username);
        setphoto_profil(response.data.photo_profil);
      });

    axios
      .get(`https://eleves.herokuapp.com/posts/byuserId/${id}`)
      .then((response) => {
        setListOfPosts(response.data);
      });
  }, []);
  const mode = () => {
    window.location.reload(false);
  };

  return (
    <div className="app margin col-xs-6  col-sm-6 col-md-6   col-lg-6 ">
      <h1> Page de profil public de : {username} </h1>{" "}
      <div className="profil">
        <img
          src={"https://eleves.herokuapp.com/images/" + photo_profil}
          alt="profil"
        />{" "}
      </div>
      <div className="boutonpriv">
        <button
          onClick={() => {
            history.push("/postpriv/" + id);
          }}
        >
          {" "}
          Voir la fiche du professeur
        </button>{" "}
      </div>
      {/*    <button
        onClick={() => {
          history.push("/createpostpriv");
        }}
      >
        {" "}
        créer Publication privées
      </button> */}
      <div className="basicinfo3 ">
        {" "}
        {(authState.username === username || authState.admin === true) && (
          <>
            <button
              onClick={() => {
                history.push("#");
              }}
            >
              {" "}
              Changer mon mots de passe
            </button>

            {/*       <form
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
              </form> */}

            {/*  <button
                onClick={() => {
                  history.push("/delete");
                }}
              >
                {" "}
                Supprimer le compte
              </button> */}
          </>
        )}
      </div>
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="post3 ">
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
              {value.createdAT}
              <div className="buttons">
                <div className="cofee ">
                  {" "}
                  <ThumbUpAltIcon />
                  <label className="labelcof"> {value.Likes.length}</label>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Profile;
