"use client";
import "./Comments.css";
import "./CompteCreateur.css";
import Footer from "../_components/Footer";

const Comments = ({ comments, storyTitle, user}) => {
  console.log("COMMENTS PROPS DANS COMMENTS COMPONENT :", comments);
  return (
    <div>
      <div className="pfp-bg">
        <div className="pfp-name-flex">
          <img className="pfp-createur" src="/png/pfp_placeholder.png" />
          <h2 className="compte-nom">{user.name}</h2>
        </div>
      </div>
      <div className="comments-container-flex">
        <h1 className="titre-page-comment">
          Ce que les utilisateurs pensent...
        </h1>
        <article className="comments-container">
          <h2 className="histoire-titre-comment">
            {storyTitle}
          </h2>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div className="comment-content" key={comment.id}>
                <h2 className="nom-utilisateur">{comment.auteurName}</h2>
                <p className="commentaire">{comment.text}</p>
                <img
                  className="comment-icon"
                  src="/png/comment.png"
                  alt="Icône commentaire"
                />
              </div>
            ))
          ) : (
            <p className="commentaire">
              Pas de commentaire pour l’instant
            </p>
          )}
        </article>
      </div>
      <Footer />
    </div>
  );
};

export default Comments;
