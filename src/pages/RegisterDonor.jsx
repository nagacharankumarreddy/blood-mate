import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BLOOD_GROUPS } from "../api";

const EMPTY = { name: "", bloodGroup: "", location: "", mobile: "" };

const validate = ({ name, bloodGroup, location, mobile }) => {
  const errors = {};
  if (!name.trim()) errors.name = "Enter your full name.";
  else if (name.trim().length < 2) errors.name = "Name must be at least 2 characters.";
  if (!bloodGroup) errors.bloodGroup = "Select your blood group.";
  if (!location.trim()) errors.location = "Enter your city or area.";
  if (!mobile) errors.mobile = "Enter your mobile number.";
  else if (!/^\d{10}$/.test(mobile)) errors.mobile = "Mobile number must be exactly 10 digits.";
  return errors;
};

const Field = ({ id, label, error, hint, children }) => (
  <div className="field">
    <label htmlFor={id}>{label}</label>
    {children}
    {error ? (
      <p className="field-error" id={`${id}-error`}>
        {error}
      </p>
    ) : (
      hint && <p className="field-hint">{hint}</p>
    )}
  </div>
);

const RegisterDonor = ({ registerDonor }) => {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name } = e.target;
    // Mobile accepts digits only, capped at 10.
    const value = name === "mobile" ? e.target.value.replace(/\D/g, "").slice(0, 10) : e.target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    setSubmitting(true);
    try {
      await registerDonor({ ...form, name: form.name.trim(), location: form.location.trim() });
      navigate(`/donors?group=${encodeURIComponent(form.bloodGroup)}`);
    } catch (err) {
      setErrors(err.fields || {});
      setFormError(err.message);
      setSubmitting(false);
    }
  };

  const invalid = (name) => (errors[name] ? { "aria-invalid": true, "aria-describedby": `${name}-error` } : {});

  return (
    <section className="section page page-narrow">
      <header className="page-head">
        <h1>Become a donor</h1>
        <p>Your details appear in the donor list so people who need your blood group can call you.</p>
      </header>

      <form onSubmit={handleSubmit} className="form-card" noValidate>
        {formError && (
          <p className="form-error" role="alert">
            {formError}
          </p>
        )}

        <Field id="name" label="Full name" error={errors.name}>
          <input id="name" name="name" className="input" autoComplete="name" value={form.name} onChange={handleChange} {...invalid("name")} />
        </Field>

        <Field id="bloodGroup" label="Blood group" error={errors.bloodGroup}>
          <select id="bloodGroup" name="bloodGroup" className="input" value={form.bloodGroup} onChange={handleChange} {...invalid("bloodGroup")}>
            <option value="">Select blood group</option>
            {BLOOD_GROUPS.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </Field>

        <Field id="location" label="City or area" error={errors.location}>
          <input
            id="location"
            name="location"
            className="input"
            autoComplete="address-level2"
            value={form.location}
            onChange={handleChange}
            {...invalid("location")}
          />
        </Field>

        <Field id="mobile" label="Mobile number" error={errors.mobile} hint="10 digits. Shown publicly so people can call you.">
          <input
            id="mobile"
            name="mobile"
            type="tel"
            inputMode="numeric"
            className="input"
            autoComplete="tel-national"
            value={form.mobile}
            onChange={handleChange}
            {...invalid("mobile")}
          />
        </Field>

        <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
          {submitting ? "Registering…" : "Register as donor"}
        </button>
      </form>
    </section>
  );
};

export default RegisterDonor;
