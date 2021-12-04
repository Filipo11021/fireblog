import Link from "next/link";

const Error = () => {
  return (
    <main>
      <h1>404 - that page does not seen to exist</h1>
      <Link href="/">
        <a>
          <button className="btn-blue">Go home</button>
        </a>
      </Link>
    </main>
  );
};

export default Error;
