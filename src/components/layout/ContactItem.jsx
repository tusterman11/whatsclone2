import { Link } from "react-router-dom";

export default function ContactItem({ contact }) {
  const name = contact.display_name || contact.phone;

  return (
    <Link
      className="contact-item"
      to={`/chat/${encodeURIComponent(contact.phone)}`}
    >
      <span className="contact-avatar">{name.charAt(0).toUpperCase()}</span>
      <span className="contact-info">
        <strong>{name}</strong>
        <small>{contact.phone}</small>
      </span>
    </Link>
  );
}
