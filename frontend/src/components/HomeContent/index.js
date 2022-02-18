import MediaWidget from './MediaWidget'

import './HomeContent.css'

const POSTS = ['https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg',
                'https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg',
                'https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg'];

function HomeContent() {
    return (
        <div>
            { POSTS.map((post, idx) => <MediaWidget key={idx.toString()} media={post} />) }
        </div>
    );
}

export default HomeContent;
