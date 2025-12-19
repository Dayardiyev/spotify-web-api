import {Link} from 'react-router-dom';

interface HeaderProps {
    user: boolean,
    setUser: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

export default function Header({user, setUser}: HeaderProps) {
    return (
        <header className='my-8 mx-16'>
            {!user ? <button className='bg-green-600 text-white p-3 ' onClick={() => setUser(!user)}>Login with Spotify</button>
                : (
                    <nav>
                        <ul className='flex gap-5'>
                            <li><Link to="/topTracks">Top Tracks</Link></li>
                            <li><Link to="/recentTracks">Recent Tracks</Link></li>
                        </ul>
                    </nav>
                )
            }
        </header>
    )
}