import Header from "./components/Header/Header.tsx";
import {useEffect, useRef, useState} from "react";
import {Routes, Route} from 'react-router-dom';
import {getAccessToken, getToken, saveToken} from "./utils/auth.ts";
import TracksPage from "./components/TracksPage/TracksPage.tsx";
import {GET_RECENT_TRACKS, GET_TOP_TRACKS} from "./config.ts";


function App() {
    const [user, setUser] = useState<boolean>(() => {
        return !!getAccessToken();
    });
    const authCalled = useRef(false);

    useEffect(() => {
        const hash = window.location.search;
        const code = new URLSearchParams(hash).get("code");

        if (code && !authCalled.current) {
            authCalled.current = true;

            getToken(code).then(data => {
                saveToken(data);
                setUser(true);
                window.history.pushState({}, "", "/");
            }).catch(e => {
                console.error("Auth error", e);
                authCalled.current = false;
            });
        }
    }, []);

    return (

        <>
            <div className='w-[80%] border m-auto grid'>
                <Header user={user}/>
                <section className='mb-8 mx-16'>
                    <Routes>
                        <Route
                            path="/topTracks"
                            element={user ? <TracksPage endpoint={GET_TOP_TRACKS}/> : 'Sign in to see the data'}
                        />
                        <Route
                            path="/recentTracks"
                            element={user ? <TracksPage endpoint={GET_RECENT_TRACKS} showPlayedAt/> : 'Sign in to see the data'}
                        />
                    </Routes>
                </section>
            </div>

        </>
    )
}

export default App;