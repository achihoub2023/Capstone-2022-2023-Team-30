import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import LandingPage from 'pages/LandingPage';
import Layout from 'components/general/Layout';
import 'App.css';
import Tutorial from 'pages/Tutorial';

// export default function App() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path='/' element={<LandingPage/>}/>
//                 <Route path='/pages/*' element={<Layout/>}> 
//                     <Route path='tutorial' element={<Tutorial/>} />
//                 </Route>
//             </Routes>
//         </Router>
//     );
// }

class App extends Component {
    render(): React.ReactNode {
        return (
            <Router>
                <Routes>
                    <Route path='/' element={<LandingPage />} />
                    <Route path='/pages/*' element={<Layout />}>
                        <Route path='tutorial' element={<Tutorial />} />
                    </Route>
                </Routes>
            </Router>
        )
    }

    // Connect to python backend
    componentDidMount(): void {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://127.0.0.1:5001/hello_route', true);

        xhr.onload = function () {
            console.log(xhr.response);
        };

        xhr.send();
    }

}

export default App;