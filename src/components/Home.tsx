import { useNavigate, Navigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthContext } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('sign out successful')
    }).catch((error) => {
      console.log(error);
    });
    navigate("/login", { replace: true })
  }
  if (!user) {
    return <Navigate to={"/login"} replace />;
  } else {
    return (
      <div>
        <h1>ホームページ</h1>
        <button onClick={handleLogout}>ログアウト</button>
      </div>
    );
  }
};

export default Home;
