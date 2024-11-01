import { storage } from "@/firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";

export const uploadImageToFirebase = async (file: File) => {
  let downloadURL =
    "https://firebasestorage.googleapis.com/v0/b/animenia-ad43b.appspot.com/o/download.png?alt=media&token=4baa1f56-966b-41f5-86e7-bba48ccfbfb1";

  if (!file) return downloadURL;
  const ID = uuid();
  const storageRef = ref(storage, `images/${ID}`);
  await uploadBytesResumable(storageRef, file).then(async (snapshot) => {
    await getDownloadURL(snapshot.ref).then((url) => {
      downloadURL = url;
    });
  });
  return downloadURL;
};
