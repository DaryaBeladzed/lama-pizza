import { useRef, useState } from "react";
import axios from "axios";
import classes from "./Login.module.scss";
import { useRouter } from "next/router";

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(false);
  const router = useRouter();

  const loginHandler = async () => {
    try {
      const res = await axios.post(`${window.location.protocol}//${window.location.host}/api/login`, {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      setError(false);
      // console.log(router);
      // router.back();
      router.push(`/admin/${router.query.referer}`);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };

  return (
    <section className={classes.login}>
      <div>
        <h1>Admin Pages</h1>
        <input type="text" placeholder="username" ref={usernameRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        {error && <span>Invalid credentials</span>}
        <button type="button" onClick={loginHandler}>
          Log In
        </button>
      </div>
    </section>
  );
};

export default Login;
