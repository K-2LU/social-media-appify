"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export const RegisterForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: true,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    if (!formData.username) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (formData.username.length > 32) {
      newErrors.username = "Username must be 32 characters or less";
      isValid = false;
    }

    if (formData.first_name.length > 32) {
      newErrors.first_name = "First name must be 32 characters or less";
      isValid = false;
    }

    if (formData.last_name.length > 50) {
      newErrors.last_name = "Last name must be 50 characters or less";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!formData.agreed) {
      newErrors.agreed = "You must agree to the terms";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (validateForm()) {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/register`,
          {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            first_name: formData.first_name,
            last_name: formData.last_name,
          }
        );

        // Redirect to login on success
        router.push("/auth/login");
      } catch (err: any) {
        // setApiError(err.response?.data || "Registration failed");
        const responseData = err.response?.data;

        if (typeof responseData === "string") {
          setApiError(responseData);
        } else if (responseData?.message) {
          setApiError(responseData.message);
        } else {
          console.error("Registration Error Details:", responseData);
          setApiError(
            "Registration failed. Please check your inputs or try again."
          );
        }
      }
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for specific field on type
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <form className="_social_registration_form" onSubmit={handleSubmit}>
      {/* Row 1: First Name & Last Name */}
      <div className="row">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
          <Input
            variant="register"
            label="First Name"
            type="text"
            value={formData.first_name}
            onChange={(e) => handleChange("first_name", e.target.value)}
            error={errors.first_name}
          />
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
          <Input
            variant="register"
            label="Last Name"
            type="text"
            value={formData.last_name}
            onChange={(e) => handleChange("last_name", e.target.value)}
            error={errors.last_name}
          />
        </div>
      </div>

      {/* Row 2: Username (Required by DB) */}
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <Input
            variant="register"
            label="Username"
            type="text"
            value={formData.username}
            onChange={(e) => handleChange("username", e.target.value)}
            error={errors.username}
          />
        </div>
      </div>

      {/* Row 3: Email */}
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <Input
            variant="register"
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={errors.email}
          />
        </div>
      </div>

      {/* Row 4: Password */}
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <Input
            variant="register"
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            error={errors.password}
          />
        </div>
      </div>

      {/* Row 5: Repeat Password */}
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <Input
            variant="register"
            label="Repeat Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            error={errors.confirmPassword}
          />
        </div>
      </div>

      {/* API Error Message */}
      {apiError && (
        <div className="alert alert-danger mt-2" role="alert">
          {apiError}
        </div>
      )}

      {/* Terms Checkbox */}
      <div className="row">
        <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
          <div className="form-check _social_registration_form_check">
            <input
              className={`form-check-input _social_registration_form_check_input ${
                errors.agreed ? "is-invalid" : ""
              }`}
              type="checkbox"
              name="terms"
              id="termsCheck"
              checked={formData.agreed}
              onChange={() => handleChange("agreed", !formData.agreed)}
            />
            <label
              className="form-check-label _social_registration_form_check_label"
              htmlFor="termsCheck"
            >
              I agree to terms & conditions
            </label>
            {errors.agreed && (
              <div className="invalid-feedback d-block">{errors.agreed}</div>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
          <div className="_social_registration_form_btn _mar_t40 _mar_b60">
            <Button
              type="submit"
              className="_social_registration_form_btn_link"
            >
              Register now
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
