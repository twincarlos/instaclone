import StoryWidget from './StoryWidget';

import './StoryHighlights.css';

function StoryHighlights ({ stories }) {
    return (
        <div id='stories-container'>
            {stories.map((story, idx) => <StoryWidget key={idx.toString()} url={story} caption='hi'/>)}
        </div>
    );
}

export default StoryHighlights;
