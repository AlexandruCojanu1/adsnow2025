import React, { useState } from "react";

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);

  const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessageVisible(true);
      setSuccessMessageVisible(false);
      setTimeout(() => setErrorMessageVisible(false), 3000);
      return;
    }

    setSuccessMessageVisible(true);
    setErrorMessageVisible(false);
    e.target.reset();
    setEmail(""); 
    setTimeout(() => setSuccessMessageVisible(false), 3000);
  };

  return (
    <div className="form-layout-wrapper">
        <div className="card form-layout">
            <h3 className="title-heading">Let's see if we Click</h3>

            {successMessageVisible && (
            <div id="success-message" className="alert success">
                <span className="check-icon">
                    <i className="fa-solid fa-check"></i>
                </span>
                <p className="text-center">Mulțumim! În 24 de ore îți vom răspunde dacă facem click.</p>
            </div>
            )}

            {errorMessageVisible && (
            <div id="error-message" className="alert error">
                <span className="cross-icon">
                <i className="fa-solid fa-xmark"></i>
                </span>
                <p className="text-center">Oops! Please enter a valid email.</p>
            </div>
            )}

            <form
            onSubmit={handleSubmit}
            id="contactForm"
            className="form needs-validation"
            >
                <div className="row row-cols-md-2 row-cols-1 g-3">
                    <div className="col">
                        <input type="text" name="first-name" id="first-name" placeholder="First Name" />
                    </div>
                    <div className="col">
                        <input type="text" name="last-name" id="last-name" placeholder="Last Name" />
                    </div>
                </div>

                <div className="row row-cols-md-2 row-cols-1 g-3">
                        <div className="col">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col">
                            <input type="text" name="subject" id="subject" placeholder="Subject" />
                        </div>
                </div>

                <textarea name="message" id="message" rows="5" placeholder="Message"></textarea>

                <div className="form-button-container">
                        <button type="submit" className="btn btn-accent">
                            <span className="btn-title">
                                <span>Programează o întâlnire</span>
                            </span>
                            <span className="icon-circle">
                                <img src="/assets/images/cursor.webp" alt="arrow" className="cursor-icon" />
                            </span>
                        </button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default ContactForm;
