import { useSelector } from 'react-redux';
import LoginFormPage from '../LoginFormPage';

function Home () {
    const sessionUser = useSelector(state => state.session.user);

    return (
        sessionUser ?
        <div>
            <h1>Welcome to Instaclone</h1>
        </div>
        :
        <LoginFormPage />
    );
}

export default Home;
