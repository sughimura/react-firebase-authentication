import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('sign out successful')
    }).catch((error) => {
      console.log(error);
    });
    navigate("/login", { replace: true })
  }
  return (
    <div>
      <h1>ホームページ</h1>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};

export default Home;
