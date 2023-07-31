import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
// import Aside from './components/Aside';
const Aside = lazy(() => import('./components/Aside'));
const Nav = lazy(() => import('./components/Nav'));
const Footer = lazy(() => import('./components/Footer'));
const Home = lazy(() => import('./pages/Home'));
const Researcher = lazy(() => import('./pages/Researcher'));
const Journal = lazy(() => import('./pages/Journal'));
const ResearcherEdit = lazy(() => import('./pages/Researcher/ResearcherEdit'));
const ResearcherList = lazy(() => import('./pages/ResearchersList'));
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const UploadJournal = lazy(() => import('./pages/Researcher/UploadJournal'));
const Profile = lazy(() => import('./pages/Researcher/Profile'));
const JournalView = lazy(() => import('./pages/Journal/JournalView'));
const JournalEdit = lazy(() => import('./pages/Journal/JournalEdit'));

import { useUserContext } from './context/useUserContext';

/**
 * Main App component that handles routing and rendering different pages based on user authentication status.
 * If the user is not authenticated, it displays the SignUp and Login pages. Otherwise, it shows the user-specific content.
 */
function App() {
  const { user } = useUserContext();
  // Check if the user is not authenticated (user name is not present).
  if (!user.name) {
    return (
      <HashRouter>
        <Routes>
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/*" element={<Login />} />
        </Routes>
      </HashRouter>
    );
  } else {
    // If the user is authenticated, display the user-specific content.
    return (
      <>
        <HashRouter>
          <Nav />
          <div id="layoutSidenav">
            <Suspense fallback={<div>Loading...</div>}>
              <Aside />
              <div id="layoutSidenav_content">
                <main>
                  <Routes>
                    <Route path="/researcher" element={<Researcher />}>
                      <Route
                        path="upload-journal"
                        element={<UploadJournal />}
                      />
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
            </Suspense>
          </div>
        </HashRouter>
      </>
    );
  }
}

export default App;
