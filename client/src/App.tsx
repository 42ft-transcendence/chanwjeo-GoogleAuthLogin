import './App.css'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import axios from 'axios';
import { useStore } from './hooks/useStore';
import Profile from './components/Profile';

function App() {
  const setAuthData = useStore((state: any) => state.setAuthData);
  return (
    <>
      <GoogleOAuthProvider clientId='1033836631897-gbpjrcunclvk1fs9pt3nhrtestlh61vi.apps.googleusercontent.com'>
        <div>
          <GoogleLogin
            useOneTap
            onSuccess={async (credentialResponse) => {
              console.log(credentialResponse);
              const response = await axios.post('http://localhost:3001/login', {
                token: credentialResponse.credential,
              });
              const data = response.data;

              localStorage.setItem('authData', JSON.stringify(data));
              setAuthData(data);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>

        <Profile />
      </GoogleOAuthProvider>
    </>
  )
}

export default App
