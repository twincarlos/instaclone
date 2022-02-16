import './UserPage.css';

function UserPage () {
    return (
        <div id='user-header'>
            <img src='https://routenote.com/blog/wp-content/uploads/2022/01/243283253_580988179688935_8877892167513690479_n.jpg' alt=''></img>
            <div>
                <div id='user-header-top'>
                    <h1>arianagrande</h1>
                    <button type='submit'>Edit Profile</button>
                    <i className="fas fa-cog"></i>
                </div>
                <div id='user-header-middle'>
                    <p><b>4,936</b> posts</p>
                    <p><b>294m</b> followers</p>
                    <p><b>958</b> following</p>
                </div>
                <div id='user-header-bottom'>
                    <p><b>Ariana Grande</b></p>
                    <a target="_blank" rel="noreferrer" href='https://rembeauty.com/'>rembauty.com</a>
                    <p id='followed-by'>Followed by <b>username</b> <b>username</b> <b>username</b> +158 more</p>
                </div>
            </div>
        </div>
    );
}

export default UserPage;
