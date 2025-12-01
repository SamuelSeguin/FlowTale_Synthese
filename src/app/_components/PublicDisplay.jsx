import { UpdatePublicStoryByIdAction } from "../_actions/storyAction";
import "./PublicDisplay.css";

const PublicDisplay = ({ isPublic, storyId, userId }) => {

    const togglePublic = async () => {
        {isPublic === 0 ? 
            await UpdatePublicStoryByIdAction(storyId, userId, 1) 
        : 
            await UpdatePublicStoryByIdAction(storyId, userId, 0)}
    }

    return (
        <div>
            {isPublic === 0 ? (
                <button onClick={togglePublic} className="???">
                    Mettre Publique ?
                </button>
            ) : (
                <button onClick={togglePublic} className="???">
                    Mettre Privé ?
                </button>
            )}
        </div>
    );
}

export default PublicDisplay;