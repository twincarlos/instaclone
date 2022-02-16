import './StoryHighlights.css';

function StoryWidget({ url, caption }) {
    return (
        <div className='story-widget'>
            <div>
                <img src={url} alt=''></img>
            </div>
            <p>{caption}</p>
        </div>
    );
}

export default StoryWidget;
