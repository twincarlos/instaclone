import StoryWidget from './StoryWidget';

import './StoryHighlights.css';

function StoryHighlights () {
    const ari = ['https://assets.teenvogue.com/photos/613b5fd248eda7f19679403c/4:3/w_1999,h_1499,c_limit/1235152164',
                'https://i.scdn.co/image/ab6761610000e5ebcdce7620dc940db079bf4952',
                'https://www.refinery29.com/images/10556884.jpg?format=pjpg&auto=webp&resize-filter=lanczos2&quality=65&sharpen=a3%2Cr3%2Ct0&optimize=low&width=1200&height=1200&crop=1%3A1%2Csmart&enable=upscale',
                'https://data.whicdn.com/images/325491319/original.jpg'];
    return (
        <div id='stories-container'>
            {ari.map((story, idx) => <StoryWidget key={idx.toString()} url={story} caption='hi'/>)}
        </div>
    );
}

export default StoryHighlights;
