import React, { useEffect } from "react";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../Loading";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

  const [sendPasswordResetEmail, sending, PassError] =
    useSendPasswordResetEmail(auth);

    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  

  const onSubmit = async (data) => {
    const { email, password } = data;
    await signInWithEmailAndPassword(email, password);
    reset();
  };
  const handleResetPassword = async () => {
    const email = getValues("email");
    if (email) {
      await sendPasswordResetEmail(email);
      toast.success("Password Reset Email Sent Successfully");
      reset();
    } else {
      toast.info("Please Provide Email First");
    }
  };

  useEffect(() => {
    if (user || gUser) {
      navigate('/todo');
    }
  }, [from, navigate, user, gUser]);


  let errorMessage;

  if (error || PassError) {
    errorMessage = <p className="text-red-500">{error?.message}</p>;
  }
  if (loading || gLoading || sending) {
    errorMessage = "";
    return <Loading></Loading>;
  }
  
 

  
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-3xl mb-4">For Use My ToDo App Login First</h1>
      <div className="card w-96 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Login</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Provide a valid email",
                  },
                })}
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full"
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Password should be at least 6 charecter",
                  },
                })}
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
              />
              <label className="label p-0">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>
            <div className="flex justify-start items-center mb-3">
              <small>
                <button onClick={handleResetPassword} type="button">
                  Forgot Password ?
                </button>
              </small>
            </div>

            {errorMessage}
            <input type="submit" className="btn w-full" value="Login" />
          </form>
          <p>
            <small>
              New to Doctors Portal?{" "}
              <Link to="/register" className="text-secondary">
                Create new account
              </Link>
            </small>
          </p>
          <div className="divider m-0 mb-1">OR</div>
          {gError && <p className="text-red-500">{gError?.message}</p>}
          <button
            onClick={() => signInWithGoogle()}
            className="btn btn-outline w-full"
          >
            Continue With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
