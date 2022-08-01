import { useContext } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { AuthContext } from './components/context/AuthContext';
import { DarkModeContext } from './components/context/darkModeContext';
import MainProfile from './components/mainProfile/MainProfile';
import { hotelColumns, roomColumns, subcribedEmails, userColumns } from './datatablesource';
import { userInputs } from './formSource';
import HomePage from './pages/homePage/HomePage';
import ListPage from './pages/listPage/ListPage';
import LoginPage from './pages/loginPage/LoginPage';
import NewHotel from './pages/newPages/newHotelPage/NewHotel';
import NewRoom from './pages/newPages/newRoomPage/NewRoom';
import NewUser from './pages/newPages/newUserPage/NewUser';
import SingleHotelPage from './pages/singleHotelPage/SingleHotelPage';
import SingleRoomPage from './pages/singleRoomPage/SingleRoomPage';
import SingleUserPage from './pages/singleUserPage/SingleUserPage';
import SubscribedEmailsPage from './pages/subscribedEmailsPage/SubscribedEmailsPage';
import UpdateUserPage from './pages/updatePages/updateUserPage/UpdateUserPage';
import './scss/darkStyle/dark.scss'

const App = () => {

  const { darkMode } = useContext(DarkModeContext)

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="login" />
    }
    return children;
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route path='/login' element={<LoginPage />} />
            <Route index element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>} />
            <Route path='profile'>
              <Route index element={
                <ProtectedRoute>
                  <MainProfile />
                </ProtectedRoute>
              } />
            </Route>
            <Route path='users'>
              <Route index element={
                <ProtectedRoute>
                  <ListPage columns={userColumns} />
                </ProtectedRoute>
              } />
              <Route path=':userId' element={
                <ProtectedRoute>
                  <SingleUserPage />
                </ProtectedRoute>
              } />
              <Route path=':userId/updateUser' element={
                <ProtectedRoute>
                  <UpdateUserPage />
                </ProtectedRoute>
              } />
              <Route path='new' element={
                <ProtectedRoute>
                  <NewUser inputs={userInputs} title="Add New User" />
                </ProtectedRoute>
              } />
            </Route>
            <Route path='hotels'>
              <Route index element={
                <ProtectedRoute>
                  <ListPage columns={hotelColumns} />
                </ProtectedRoute>
              } />
              <Route path=':hotelId' element={
                <ProtectedRoute>
                  <SingleHotelPage />
                </ProtectedRoute>
              } />
              <Route path='new' element={
                <ProtectedRoute>
                  <NewHotel />
                </ProtectedRoute>
              } />
            </Route>
            <Route path='rooms'>
              <Route index element={
                <ProtectedRoute>
                  <ListPage columns={roomColumns} />
                </ProtectedRoute>
              } />
              <Route path=':roomId' element={
                <ProtectedRoute>
                  <SingleRoomPage />
                </ProtectedRoute>
              } />
              <Route path='new' element={
                <ProtectedRoute>
                  <NewRoom />
                </ProtectedRoute>
              } />
            </Route>
            <Route path='subscribedEmails'>
              <Route index element={
                <ProtectedRoute>
                  <SubscribedEmailsPage columns={subcribedEmails} />
                </ProtectedRoute>
              } />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
