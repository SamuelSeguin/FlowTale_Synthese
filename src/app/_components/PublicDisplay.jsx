
import { UpdatePublicStoryByIdAction } from "../_actions/storyAction";
import "./PublicDisplay.css";
const PublicDisplay = ({ isPublic, storyId, userId }) => {
    const togglePublic = async () => {
        {
            isPublic === 0 ?
            await UpdatePublicStoryByIdAction(storyId, userId, 1)
            :
            await UpdatePublicStoryByIdAction(storyId, userId, 0)
        }
    }
    return (
        <div className="toggle-wrapper brouillon">
            <span className="toggle-text">
                {isPublic === 1 ? "Publié" : "Brouillon"}
            </span>
            <label className="switch">
                <input
                    type="checkbox"
                    checked={isPublic === 1}
                    onChange={togglePublic}
                />
                <span className="slider round"></span>
            </label>
        </div>
    );
}
export default PublicDisplay;
