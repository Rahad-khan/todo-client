import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import { useCreateUserWithEmailAndPassword , useSignInWithGoogle, useUpdateProfile } from "react-firebase-hooks/auth";
import Loading from "../Loading";

const Register = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [updateProfile, updating, upProError] = useUpdateProfile(auth);
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password, name } = data;
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({displayName:name})
    reset();
  };

  useEffect(() => {
    if (user || gUser) {
      navigate(from, { replace: true });
    }
  }, [from, navigate, user, gUser]);

  let errorMessage;

  if (error || upProError ) {
      errorMessage = <p className="text-red-500">{error?.message || upProError?.message}</p>
  }
  if(loading || updating || gLoading) {
      errorMessage = '';
      return <Loading></Loading>
  }

  
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="card w-96 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Sign Up</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is Required",
                  },
                })}
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
              />
              <label className="label">
                {errors.name?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </label>
            </div>
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
              <label className="label">
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
            {errorMessage}
            <input type="submit" className="btn w-full" value="Sign Up" />
          </form>
          <p>
            <small>
              Already have an account?  
              <Link to="/login" className="ml-1 text-secondary">
                Login
              </Link>
            </small>
          </p>
          <div className="divider m-0 mb-1">OR</div>
          {gError && <p className="text-red-500">{gError?.message}</p>}
          <button onClick={() => signInWithGoogle()} className="btn btn-outline w-full">Continue With Google</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
