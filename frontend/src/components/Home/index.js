import { useSelector } from 'react-redux';
import LoginFormPage from '../LoginFormPage';
import UserStories from '../UserStories';
import HomeContent from '../HomeContent';

import './Home.css';

function Home () {
    const sessionUser = useSelector(state => state.session.user);

    return (
        sessionUser ?
        <div id='home'>
            <UserStories />
            <HomeContent />
        </div>
        :
        <LoginFormPage />
    );
}

export default Home;
