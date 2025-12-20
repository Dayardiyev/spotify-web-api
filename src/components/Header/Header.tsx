import {NavLink} from 'react-router-dom';
import {getAuthUrl} from "../../utils/auth.ts";

interface HeaderProps {
    user: boolean
}

export default function Header({user}: HeaderProps) {
    return (
        <header className='my-8 mx-16'>
            {!user ? <a className='bg-green-600 text-white p-3 ' href={getAuthUrl()}>Login with Spotify</a>
                : (
                    <nav>
                        <ul className='flex gap-5'>
                            <li>
                                <NavLink
                                    to="/topTracks"
                                    className={({isActive}) => isActive ? "underline" : ""}
                                >
                                    Top Tracks
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/recentTracks"
                                    className={({isActive}) => isActive ? "underline" : ""}
                                >
                                    Recent Tracks
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                )
            }
        </header>
    )
}