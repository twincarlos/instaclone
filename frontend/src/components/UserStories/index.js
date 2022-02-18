import StoryWidget from './StoryWidget';

import './UserStories.css'

function UserStories() {
    const ari = ['https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg',
                'https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg',
                'https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg',
                'https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg'];
    return (
        <div id='user-stories'>
            {ari.map((story, idx) => <StoryWidget key={idx.toString()} story={story} />)}
        </div>
    );
}

export default UserStories;
