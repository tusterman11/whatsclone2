import { Link } from "react-router-dom";

export default function ContactItem({ contact }) {
  const name = contact.display_name || contact.phone;

  return (
    <Link
      to={`/chat/${encodeURIComponent(contact.phone)}`}
      className="flex items-center gap-3 rounded-lg bg-white p-3 hover:bg-gray-100"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700 text-white">
        {name.charAt(0).toUpperCase()}
      </span>
      <span className="flex flex-col text-left">
        <strong>{name}</strong>
        <small className="text-gray-500">{contact.phone}</small>
      </span>
    </Link>
  );
}
