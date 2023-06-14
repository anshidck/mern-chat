import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

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
    if (password !== password2) {
      toast.error("password do not match");
    } else {
      const userdata = {
        name,
        email,
        password,
      };
      dispatch(register(userdata));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <section className="bg-white w-[70%] h-[530px] mx-auto my-12 flex flex-col items-center p-6">
        <h1 className="text-4xl sm:text-5xl font-bold py-3">Register Form</h1>
        <p className="font-semibold">Please create a Account</p>
        <form
          onSubmit={onSubmit}
          className="w-full py-6 flex flex-col justify-between"
        >
          <div className="py-2">
            <input
              type="text"
              className="w-full py-3 px-2 outline-1 outline-none shadow-sm shadow-black rounded"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Name"
            />
          </div>
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
            <input
              type="password"
              className="w-full py-3 px-2 outline-1 outline-none shadow-sm shadow-black rounded"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm Password"
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
        <Link to="/">already have account? login</Link>
      </section>
    </div>
  );
}

export default Register;
