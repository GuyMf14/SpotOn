import api from "../services/api";
import "../styles/global.css";


function Register() {
  const register = async () => {
    await api.post("/auth/register", {
      username: "test",
      email: "test@test.com",
      password: "123456"
    });
  };

  return (
    <div>
      <h2>Register</h2>
      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;
