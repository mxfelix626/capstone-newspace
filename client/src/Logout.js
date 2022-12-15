import { Navigate } from 'react-router'

const Logout = ({ setUser }) => {
  localStorage.clear();
  setUser('');
  return <Navigate push to="/" />
}
export default Logout;