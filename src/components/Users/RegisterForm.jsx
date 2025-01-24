import React from "react";

const RegisterForm = ({ formData, errors, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="form-control"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && (
          <small className="text-danger">{errors.username}</small>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <small className="text-danger">{errors.email}</small>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-control"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && (
          <small className="text-danger">{errors.password}</small>
        )}
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
