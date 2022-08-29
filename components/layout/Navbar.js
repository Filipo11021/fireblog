import { signOut } from "@firebase/auth";
import Link from "next/link";
import { useContext } from "react";
import { UserCtx } from "../../lib/ctx";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/router";
import Image from "next/image";

const Navbar = () => {
  const { user, username } = useContext(UserCtx);
  const router = useRouter();

  const logout = () => {
    signOut(auth);
    router.reload();
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <a>
              <button className="btn-logo m-end-1">HALO</button>
            </a>
          </Link>
        </li>

        {username && user && (
          <>
            <li className="push-left">
              <button onClick={logout} className="m-end-1">
                sign out
              </button>
            </li>

            <li className="write-posts-btn">
              <Link href="/admin">
                <a>
                  <button className="btn-blue m-end-1">Write Posts</button>
                </a>
              </Link>
            </li>

            <li>
              <Link href={`/${username}`}>
                <a className="nav-avatar">
                  <Image
                    height={50}
                    width={50}
                    src={user.photoURL || "/user.jpg"}
                    alt={username}
                  />
                </a>
              </Link>
            </li>
          </>
        )}

        {(!username || !user) && (
          <li>
            <Link href="/enter">
              <a>
                <button className="btn-blue">log in</button>
              </a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
