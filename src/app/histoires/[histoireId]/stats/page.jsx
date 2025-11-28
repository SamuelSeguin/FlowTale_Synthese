import NavBar from "../../../_components/NavBar";
import Comments from "../../../_components/Comments";

const CommentairesPage = async ({ params }) => {
  const { histoireId } = await params;
  console.log("HISTOIRE ID DANS PAGE COMMENTAIRES :", histoireId);
  return (
    <div>
      <NavBar />
      <Comments />
    </div>
  );
};

export default CommentairesPage;
