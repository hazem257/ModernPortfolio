import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import './contact.css';
import { useForm, ValidationError } from '@formspree/react';
import doneAnimton from "../../../public/animation/done.json";
import contactUsAnimation from "../../../public/animation/contact-us.json";

const Contact = () => {
  const [state, handleSubmit] = useForm("xkgbrqvv");

  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });

  useEffect(() => {
    if (state.succeeded) {
      setFormData({ email: '', message: '' });
    }
  }, [state.succeeded]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="contact-us" id="contact">
      <h1 className="title">
        <span className="icon-envelope"></span>
        Contact Us
      </h1>
      <p className="subtitle">Contact Us for More Information About My Work</p>

      <div className="contact-container">
        <form onSubmit={handleSubmit} className="contact-form">

          <label htmlFor="email">Email Address</label>
          <input
            required
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />

          <label htmlFor="message">Your Message</label>
          <textarea
            required
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
          />
          <ValidationError prefix="Message" field="message" errors={state.errors} />

          <button type="submit" disabled={state.submitting} className="submit">
            {state.submitting ? "Submitting ..." : "Submit"}
          </button>

          {state.succeeded && (
            <p className="success-msg">
              <Lottie loop={false} style={{ height: 55 }} animationData={doneAnimton} />
              Thanks for Your Message 😍😘
            </p>
          )}
        </form>

        <div className="contact-animation">
          <Lottie animationData={contactUsAnimation} />
        </div>
      </div>
    </section>
  );
};

export default Contact;
