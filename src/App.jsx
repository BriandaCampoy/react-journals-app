import { HashRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import Aside from './components/Aside';
import Nav from './components/Nav';
import Footer from './components/Footer';
import AuthContext from './context/AuthContext ';
import Home from './pages/Home';
import Researcher from './pages/Researcher';
import Journal from './pages/Journal';
import ResearcherEdit from './pages/Researcher/Researcher-edit';
import ResearcherList from './pages/Researchers-list';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import UploadJournal from './pages/Researcher/UploadJournal';
import Profile from './pages/Researcher/Profile';
import JournalView from './pages/Journal/JournalView';
import JournalEdit from './pages/Journal/JournalEdit';

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  if (!isLoggedIn) {
    return (
      <HashRouter>
        <Routes>
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/*" element={<Login />} />
        </Routes>
      </HashRouter>
    );
  } else {
    return (
      <>
        <HashRouter>
          <Nav />
          <div id="layoutSidenav">
            <Aside />
            <div id="layoutSidenav_content">
              <main>
                <Routes>
                  <Route path="/researcher" element={<Researcher />}>
                    <Route path="upload-journal" element={<UploadJournal />} />
                    <Route path="edit" element={<ResearcherEdit />} />
                    <Route path="profile/:id" element={<Profile />} />
                  </Route>
                  <Route path="/journal" element={<Journal />}>
                    <Route path="view/:id" element={<JournalView />} />
                    <Route path="edit/:id" element={<JournalEdit />} />
                  </Route>
                  <Route
                    path="/researchers-list"
                    element={<ResearcherList />}
                  />
                  <Route path="/" element={<Home />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </div>
        </HashRouter>
      </>
    );
  }
}

export default App;
