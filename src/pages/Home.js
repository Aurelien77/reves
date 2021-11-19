import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import "bootstrap/dist/css/bootstrap.min.css";
function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  let history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    } else {
      axios
        .get("http://localhost:3001/posts", {
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

  const likeAPost = (postId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            //Map argument de tableau
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );

        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id !== postId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });
  };

  return (
    <div className="containerpost" id="lessonList">
      {listOfPosts.map((value, key) => {
        //Map argument de tableau
        return (
          /*  <div class="row mb-3">
          <div class="col">
             <input class="form-control" id="searchInput" type="text" placeholder="Search..">
          </div>
       </div> */

          <div key={key} className="post">
            <div className="title"> {value.title} </div>
            <div
              className="space"
              onClick={() => {
                history.push(`/post/${value.id}`);
              }}
            >
              {value.postText}
            </div>

            <div className="lien">
              <iframe
                height="500px"
                width="100%"
                src={value.lien}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
              <a target="blank" href={value.lien}>
                {value.lien}
              </a>
            </div>

            <div className="footer">
              <div className="username">
                {" "}
                <Link to={`/profile/${value.UserId}`}>
                  {" "}
                  Créé par <span className="speudo">{value.username} </span> le
                  : {value.createdAt}
                </Link>
              </div>
              <div className="buttons">
                <ThumbUpAltIcon
                  onClick={() => {
                    likeAPost(value.id);
                  }}
                  className={
                    likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                  }
                />
                <label> {value.Likes.length}</label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
