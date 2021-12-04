import { deleteDoc } from "@firebase/firestore";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const DeleteBtn = ({ postRef }) => {
  const router = useRouter();

  const deletePost = async () => {
    const check = confirm("are you sure?");
    if (check) {
      try {
        await deleteDoc(postRef);
        router.push("/");
        toast('post deleted')
      } catch (error) {
        console.log(error);
      }
    }
  };
  return postRef ? <button className='btn-red' onClick={deletePost}>delete</button> : <></>;
};

export default DeleteBtn;
