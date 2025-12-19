import Header from "./components/Header/Header.tsx";
import {useState} from "react";
import TracksList from "./components/TracksList/TracksList.tsx";
import {Routes, Route} from 'react-router-dom';
import {recentTracks, topTracks} from "./utils/mockData.ts";

function App() {
    const [user, setUser] = useState<boolean>(true);

    return (

        <>
            <div className='w-[80%] border m-auto grid'>
                <Header user={user} setUser={setUser}/>
                <section className='mb-8 mx-16'>
                    <Routes>
                        <Route
                            path="/topTracks"
                            element={user ? <TracksList key="top" tracks={topTracks} /> : 'Sign in to see the data'}
                        />
                        <Route
                            path="/recentTracks"
                            element={user ? <TracksList key="recent" tracks={recentTracks} showPlayedAt /> : 'Sign in to see the data'}
                        />
                    </Routes>
                </section>
            </div>

        </>
    )
}

export default App;