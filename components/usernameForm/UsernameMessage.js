export default function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">that username is taken</p>;
  } else {
    return <p></p>;
  }
}
