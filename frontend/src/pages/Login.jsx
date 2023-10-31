import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/chatpage");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, dispatch, navigate, message]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userdata = {
      email,
      password,
    };
    dispatch(login(userdata));
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <section className="bg-white w-full md:w-[70%] h-full md:h-[420px] mx-auto md:my-12 flex flex-col items-center p-6">
        <h1 className="text-4xl sm:text-5xl font-bold py-3">Login</h1>
        <p className="font-semibold">
          Please Login and countinue your shopping
        </p>
        <form
          onSubmit={onSubmit}
          className="w-full py-6 flex flex-col justify-between"
        >
          <div className="py-2">
            <input
              type="email"
              className="w-full py-3 px-2 outline-1 outline-none shadow-sm shadow-black rounded"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
            />
          </div>
          <div className="py-2">
            <input
              type="password"
              className="w-full py-3 px-2 outline-1 outline-none shadow-sm shadow-black rounded"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
            />
          </div>
          <div className="py-2">
            <button
              className="w-full text-center py-3 bg-black text-white rounded"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        <Link to="/register">
          You don't have an account{" "}
          <span className="text-blue-500">create</span>
        </Link>
      </section>
    </div>
  );
}

export default Login;
