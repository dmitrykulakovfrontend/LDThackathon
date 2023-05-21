import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const [form, setForm] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const navigate = useNavigate();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch("http://localhost:8088/api/auth/signin", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      navigate("/");
    } else if (res.status === 400) {
      console.log("Incorrect form");
    }
  }

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <>
      <div className="relative bg-white lg:py-20">
        <div className="flex flex-col items-center justify-between pt-0 pb-0 pl-10 pr-10 mt-0 mb-0 ml-auto mr-auto max-w-7xl xl:px-5 lg:flex-row">
          <div className="flex flex-col items-center w-full pt-5 pb-20 pl-10 pr-10 lg:pt-20 lg:flex-row">
            <div className="relative w-full max-w-md bg-cover lg:max-w-2xl lg:w-7/12">
              <div className="relative flex flex-col items-center justify-center w-full h-full lg:pr-10">
                <img
                  src="https://res.cloudinary.com/macxenon/image/upload/v1631570592/Run_-_Health_qcghbu.png"
                  className="btn-"
                />
              </div>
            </div>
            <div className="relative z-10 w-full max-w-2xl mt-20 mb-0 ml-0 mr-0 lg:mt-0 lg:w-5/12">
              <form
                onSubmit={handleSubmit}
                className="relative z-10 flex flex-col items-start justify-start pt-10 pb-10 pl-10 pr-10 bg-white shadow-2xl rounded-xl"
              >
                <p className="w-full font-serif text-4xl font-medium leading-snug text-center">
                  Sign in to see data
                </p>
                <p className="w-full text-center text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to={"../signup"}
                    className="px-4 py-2 text-blue-600 border shadow-inner hover:text-blue-700 rounded-xl"
                  >
                    Sign Up
                  </Link>
                </p>
                <div className="relative w-full mt-6 mb-0 ml-0 mr-0 space-y-8">
                  <div className="relative">
                    <div className="absolute pt-0 pb-0 pl-2 pr-2 mb-0 ml-2 mr-0 -mt-3 bg-white">
                      <p className="font-medium text-gray-600">
                        Username or Email
                      </p>
                    </div>
                    <input
                      value={form.usernameOrEmail}
                      name="usernameOrEmail"
                      onChange={handleFormChange}
                      placeholder="Johny736"
                      type="text"
                      className="block w-full pt-4 pb-4 pl-4 pr-4 mt-2 mb-0 ml-0 mr-0 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                    />
                  </div>
                  <div className="relative">
                    <p className="absolute pt-0 pb-0 pl-2 pr-2 mb-0 ml-2 mr-0 -mt-3 font-medium text-gray-600 bg-white">
                      Password
                    </p>
                    <input
                      value={form.password}
                      name="password"
                      onChange={handleFormChange}
                      placeholder="Password"
                      type="password"
                      className="block w-full pt-4 pb-4 pl-4 pr-4 mt-2 mb-0 ml-0 mr-0 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-black"
                    />
                  </div>
                  <div className="relative">
                    <button
                      type="submit"
                      className="inline-block w-full pt-4 pb-4 pl-5 pr-5 text-xl font-medium text-center text-white transition duration-200 bg-indigo-500 rounded-lg hover:bg-indigo-600 ease"
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </form>
              <svg
                viewBox="0 0 91 91"
                className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-yellow-300 fill-current"
              >
                <g stroke="none" strokeWidth="1" fillRule="evenodd">
                  <g fillRule="nonzero">
                    <g>
                      <g>
                        <circle cx="3.261" cy="3.445" r="2.72" />
                        <circle cx="15.296" cy="3.445" r="2.719" />
                        <circle cx="27.333" cy="3.445" r="2.72" />
                        <circle cx="39.369" cy="3.445" r="2.72" />
                        <circle cx="51.405" cy="3.445" r="2.72" />
                        <circle cx="63.441" cy="3.445" r="2.72" />
                        <circle cx="75.479" cy="3.445" r="2.72" />
                        <circle cx="87.514" cy="3.445" r="2.719" />
                      </g>
                      <g transform="translate(0 12)">
                        <circle cx="3.261" cy="3.525" r="2.72" />
                        <circle cx="15.296" cy="3.525" r="2.719" />
                        <circle cx="27.333" cy="3.525" r="2.72" />
                        <circle cx="39.369" cy="3.525" r="2.72" />
                        <circle cx="51.405" cy="3.525" r="2.72" />
                        <circle cx="63.441" cy="3.525" r="2.72" />
                        <circle cx="75.479" cy="3.525" r="2.72" />
                        <circle cx="87.514" cy="3.525" r="2.719" />
                      </g>
                      <g transform="translate(0 24)">
                        <circle cx="3.261" cy="3.605" r="2.72" />
                        <circle cx="15.296" cy="3.605" r="2.719" />
                        <circle cx="27.333" cy="3.605" r="2.72" />
                        <circle cx="39.369" cy="3.605" r="2.72" />
                        <circle cx="51.405" cy="3.605" r="2.72" />
                        <circle cx="63.441" cy="3.605" r="2.72" />
                        <circle cx="75.479" cy="3.605" r="2.72" />
                        <circle cx="87.514" cy="3.605" r="2.719" />
                      </g>
                      <g transform="translate(0 36)">
                        <circle cx="3.261" cy="3.686" r="2.72" />
                        <circle cx="15.296" cy="3.686" r="2.719" />
                        <circle cx="27.333" cy="3.686" r="2.72" />
                        <circle cx="39.369" cy="3.686" r="2.72" />
                        <circle cx="51.405" cy="3.686" r="2.72" />
                        <circle cx="63.441" cy="3.686" r="2.72" />
                        <circle cx="75.479" cy="3.686" r="2.72" />
                        <circle cx="87.514" cy="3.686" r="2.719" />
                      </g>
                      <g transform="translate(0 49)">
                        <circle cx="3.261" cy="2.767" r="2.72" />
                        <circle cx="15.296" cy="2.767" r="2.719" />
                        <circle cx="27.333" cy="2.767" r="2.72" />
                        <circle cx="39.369" cy="2.767" r="2.72" />
                        <circle cx="51.405" cy="2.767" r="2.72" />
                        <circle cx="63.441" cy="2.767" r="2.72" />
                        <circle cx="75.479" cy="2.767" r="2.72" />
                        <circle cx="87.514" cy="2.767" r="2.719" />
                      </g>
                      <g transform="translate(0 61)">
                        <circle cx="3.261" cy="2.846" r="2.72" />
                        <circle cx="15.296" cy="2.846" r="2.719" />
                        <circle cx="27.333" cy="2.846" r="2.72" />
                        <circle cx="39.369" cy="2.846" r="2.72" />
                        <circle cx="51.405" cy="2.846" r="2.72" />
                        <circle cx="63.441" cy="2.846" r="2.72" />
                        <circle cx="75.479" cy="2.846" r="2.72" />
                        <circle cx="87.514" cy="2.846" r="2.719" />
                      </g>
                      <g transform="translate(0 73)">
                        <circle cx="3.261" cy="2.926" r="2.72" />
                        <circle cx="15.296" cy="2.926" r="2.719" />
                        <circle cx="27.333" cy="2.926" r="2.72" />
                        <circle cx="39.369" cy="2.926" r="2.72" />
                        <circle cx="51.405" cy="2.926" r="2.72" />
                        <circle cx="63.441" cy="2.926" r="2.72" />
                        <circle cx="75.479" cy="2.926" r="2.72" />
                        <circle cx="87.514" cy="2.926" r="2.719" />
                      </g>
                      <g transform="translate(0 85)">
                        <circle cx="3.261" cy="3.006" r="2.72" />
                        <circle cx="15.296" cy="3.006" r="2.719" />
                        <circle cx="27.333" cy="3.006" r="2.72" />
                        <circle cx="39.369" cy="3.006" r="2.72" />
                        <circle cx="51.405" cy="3.006" r="2.72" />
                        <circle cx="63.441" cy="3.006" r="2.72" />
                        <circle cx="75.479" cy="3.006" r="2.72" />
                        <circle cx="87.514" cy="3.006" r="2.719" />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <svg
                viewBox="0 0 91 91"
                className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-indigo-500 fill-current"
              >
                <g stroke="none" strokeWidth="1" fillRule="evenodd">
                  <g fillRule="nonzero">
                    <g>
                      <g>
                        <circle cx="3.261" cy="3.445" r="2.72" />
                        <circle cx="15.296" cy="3.445" r="2.719" />
                        <circle cx="27.333" cy="3.445" r="2.72" />
                        <circle cx="39.369" cy="3.445" r="2.72" />
                        <circle cx="51.405" cy="3.445" r="2.72" />
                        <circle cx="63.441" cy="3.445" r="2.72" />
                        <circle cx="75.479" cy="3.445" r="2.72" />
                        <circle cx="87.514" cy="3.445" r="2.719" />
                      </g>
                      <g transform="translate(0 12)">
                        <circle cx="3.261" cy="3.525" r="2.72" />
                        <circle cx="15.296" cy="3.525" r="2.719" />
                        <circle cx="27.333" cy="3.525" r="2.72" />
                        <circle cx="39.369" cy="3.525" r="2.72" />
                        <circle cx="51.405" cy="3.525" r="2.72" />
                        <circle cx="63.441" cy="3.525" r="2.72" />
                        <circle cx="75.479" cy="3.525" r="2.72" />
                        <circle cx="87.514" cy="3.525" r="2.719" />
                      </g>
                      <g transform="translate(0 24)">
                        <circle cx="3.261" cy="3.605" r="2.72" />
                        <circle cx="15.296" cy="3.605" r="2.719" />
                        <circle cx="27.333" cy="3.605" r="2.72" />
                        <circle cx="39.369" cy="3.605" r="2.72" />
                        <circle cx="51.405" cy="3.605" r="2.72" />
                        <circle cx="63.441" cy="3.605" r="2.72" />
                        <circle cx="75.479" cy="3.605" r="2.72" />
                        <circle cx="87.514" cy="3.605" r="2.719" />
                      </g>
                      <g transform="translate(0 36)">
                        <circle cx="3.261" cy="3.686" r="2.72" />
                        <circle cx="15.296" cy="3.686" r="2.719" />
                        <circle cx="27.333" cy="3.686" r="2.72" />
                        <circle cx="39.369" cy="3.686" r="2.72" />
                        <circle cx="51.405" cy="3.686" r="2.72" />
                        <circle cx="63.441" cy="3.686" r="2.72" />
                        <circle cx="75.479" cy="3.686" r="2.72" />
                        <circle cx="87.514" cy="3.686" r="2.719" />
                      </g>
                      <g transform="translate(0 49)">
                        <circle cx="3.261" cy="2.767" r="2.72" />
                        <circle cx="15.296" cy="2.767" r="2.719" />
                        <circle cx="27.333" cy="2.767" r="2.72" />
                        <circle cx="39.369" cy="2.767" r="2.72" />
                        <circle cx="51.405" cy="2.767" r="2.72" />
                        <circle cx="63.441" cy="2.767" r="2.72" />
                        <circle cx="75.479" cy="2.767" r="2.72" />
                        <circle cx="87.514" cy="2.767" r="2.719" />
                      </g>
                      <g transform="translate(0 61)">
                        <circle cx="3.261" cy="2.846" r="2.72" />
                        <circle cx="15.296" cy="2.846" r="2.719" />
                        <circle cx="27.333" cy="2.846" r="2.72" />
                        <circle cx="39.369" cy="2.846" r="2.72" />
                        <circle cx="51.405" cy="2.846" r="2.72" />
                        <circle cx="63.441" cy="2.846" r="2.72" />
                        <circle cx="75.479" cy="2.846" r="2.72" />
                        <circle cx="87.514" cy="2.846" r="2.719" />
                      </g>
                      <g transform="translate(0 73)">
                        <circle cx="3.261" cy="2.926" r="2.72" />
                        <circle cx="15.296" cy="2.926" r="2.719" />
                        <circle cx="27.333" cy="2.926" r="2.72" />
                        <circle cx="39.369" cy="2.926" r="2.72" />
                        <circle cx="51.405" cy="2.926" r="2.72" />
                        <circle cx="63.441" cy="2.926" r="2.72" />
                        <circle cx="75.479" cy="2.926" r="2.72" />
                        <circle cx="87.514" cy="2.926" r="2.719" />
                      </g>
                      <g transform="translate(0 85)">
                        <circle cx="3.261" cy="3.006" r="2.72" />
                        <circle cx="15.296" cy="3.006" r="2.719" />
                        <circle cx="27.333" cy="3.006" r="2.72" />
                        <circle cx="39.369" cy="3.006" r="2.72" />
                        <circle cx="51.405" cy="3.006" r="2.72" />
                        <circle cx="63.441" cy="3.006" r="2.72" />
                        <circle cx="75.479" cy="3.006" r="2.72" />
                        <circle cx="87.514" cy="3.006" r="2.719" />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
