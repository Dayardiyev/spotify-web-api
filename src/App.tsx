import Header from "./components/Header/Header.tsx";
import {useEffect, useRef, useState} from "react";
import {Routes, Route} from 'react-router-dom';
import {getAccessToken, getToken, saveToken} from "./utils/auth.ts";
import TopTracks from "./features/TopTracks";
import RecentTracks from "./features/RecentTracks";

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
                            element={user ? <TopTracks /> : 'Sign in to see the data'}
                        />
                        <Route
                            path="/recentTracks"
                            element={user ? <RecentTracks /> : 'Sign in to see the data'}
                        />
                    </Routes>
                </section>
            </div>

        </>
    )
}

export default App;