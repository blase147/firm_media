import react from 'react';
import './contact.scss';

const Contact = () => (
  <div>
    <div id="contact">
      <div className="contact_text">
        <h1>Contact Us</h1>
        <p>Feel free to contact us for any queries or feedback.</p>
      </div>
      <form>
        <input className="input" type="text" placeholder="Name" />
        <input className="input" type="email" placeholder="Email" />
        <textarea className="input" placeholder="Message" />
        <button className="button" type="submit">
          Send
        </button>
      </form>
    </div>
  </div>
);

export default Contact;
