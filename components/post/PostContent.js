import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

const PostContent = ({ post }) => {
  const createdAt =
    typeof post?.createdAt === "number"
      ? new Date(post?.createdAt)
      : post?.createdAt.toDate();

  const changeImgToImage = {
    p: ({ node, children }) => {
      if (node.children[0].tagName === "img") {
        const image = node.children[0];
        return (
          <Image
            width="150%"
            height="100%"
            layout="responsive"
            objectFit="contain"
            src={image.properties.src}
            alt={image.properties.alt}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNMTUmtBwAEEwGvtT2RTwAAAABJRU5ErkJggg=="
          />
        );
      }
      return <p>{children}</p>;
    },
  };

  return (
    <div className="card">
      <h1>{post?.title}</h1>
      <span className="text-sm">
        Writted by{" "}
        <Link href={`/${post?.username}`}>
          <a className="text-info">@{post?.username}</a>
        </Link>{" "}
        on {createdAt?.toLocaleDateString()}
      </span>
      <ReactMarkdown components={changeImgToImage}>
        {post?.content}
      </ReactMarkdown>
    </div>
  );
};

export default PostContent;
