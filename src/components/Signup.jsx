import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    age: "",
    gender: "",
    photoUrl: "",
    about: "",
    skills: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(",").map(s => s.trim())
      };

      await axios.post(`${BASE_URL}/signup`, payload, { withCredentials: true });

      // Redirect to login
      navigate("/login");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Signup</h2>

          {/* First Name */}
          <label className="input validator">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>

          {/* Last Name */}
          <label className="input validator">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </label>

          {/* Email */}
          <label className="input validator">
            <input
              type="email"
              name="emailId"
              placeholder="Email"
              required
              value={formData.emailId}
              onChange={handleChange}
            />
          </label>

          {/* Password */}
          <label className="input validator">
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              minLength="8"
              title="Must be more than 8 characters, include number, lowercase, uppercase"
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          {/* Age */}
          <label className="input validator">
            <input
              type="number"
              name="age"
              placeholder="Age"
              min="18"
              value={formData.age}
              onChange={handleChange}
            />
          </label>

          {/* Gender */}
          <label className="select select-bordered w-full">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </label>

          {/* Photo URL */}
          {/* <label className="input validator">
            <input
              type="text"
              name="photoUrl"
              placeholder="Photo URL"
              value={formData.photoUrl}
              onChange={handleChange}
            />
          </label> */}

          {/* About */}
          {/* <label className="input validator">
            <textarea
              name="about"
              placeholder="About"
              rows="2"
              className="textarea textarea-bordered w-full"
              value={formData.about}
              onChange={handleChange}
            ></textarea>
          </label> */}

          {/* Skills */}
          {/* <label className="input validator">
            <input
              type="text"
              name="skills"
              placeholder="Skills (comma separated)"
              value={formData.skills}
              onChange={handleChange}
            />
          </label> */}

          {/* Error */}
          <p className="text-red-400">{error}</p>

          {/* Button */}
          <div className="card-actions justify-center mt-3">
            <button className="btn" onClick={handleSignup}>
              Signup
            </button>
          </div>

          <p className="text-center mt-2">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
