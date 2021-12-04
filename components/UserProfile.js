import Image from "next/image";

const UserProfile = ({ user }) => {
  return (
    <div className="box-center">
      <div>
        <Image
          src={user.photoURL || "/user.jpg"}
          alt={user.username}
          width={150}
          height={150}
          className="card-img-center"
        />
      </div>
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName || "Anonymous User"}</h1>
    </div>
  );
};

export default UserProfile;
