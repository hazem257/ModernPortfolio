import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import './contact.css';
import { useForm, ValidationError } from '@formspree/react';
import doneAnimton from "../../../public/animation/done.json";
import contactUsAnimation from "../../../public/animation/contact-us.json";

const Contact = () => {
    const [state, handleSubmit] = useForm("xkgbrqvv");

    // الحالة بتاعة الحقول
    const [formData, setFormData] = useState({
        email: '',
        message: ''
    });

    // لما يحصل إرسال ناجح، نفرّغ الحقول
    useEffect(() => {
        if (state.succeeded) {
            setFormData({
                email: '',
                message: ''
            });
        }
    }, [state.succeeded]);

    // التغيرات على الحقول
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section className="contact-us" id="contact">
            <h1 className="title">
                <span className="icon-envelope"></span>
                Contact Us
            </h1>
            <p className="subtitle">Contact Us for More Information About My work</p>

            <div style={{ justifyContent: "space-between" }} className="flex">
                <form onSubmit={handleSubmit} className="" action="">

                    <div className="flex">
                        <label htmlFor="email">Email Address</label>
                        <input
                            required
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <ValidationError
                            prefix="Email"
                            field="email"
                            errors={state.errors}
                        />
                    </div>

                    <div className="flex" style={{ marginTop: "24px" }}>
                        <label htmlFor="Message">Your Message</label>
                        <textarea
                            required
                            name="message"
                            id="Message"
                            value={formData.message}
                            onChange={handleChange}
                        />
                        <ValidationError
                            prefix="Message"
                            field="message"
                            errors={state.errors}
                        />
                    </div>

                    <button type="submit" disabled={state.submitting} className="submit">
                        {state.submitting ? "Submitting ..." : "Submit"}
                    </button>

                    {state.succeeded && (
                        <p className="flex" style={{ marginTop: "20px" }}>
                            <Lottie loop={false} style={{ height: 55 }} animationData={doneAnimton} />
                            Thanks for Your Message 😍😘
                        </p>
                    )}
                </form>

                <div className="animation">
                    <Lottie className="contact-anim" style={{ height: 355, transition: "3" }} animationData={contactUsAnimation} />
                </div>
            </div>
        </section>
    );
};

export default Contact;
