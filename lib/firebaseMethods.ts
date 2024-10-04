import { storage } from "@/firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid"

export const uploadImageToFirebase = async (file : any) => {
    let downloadURL = "https://firebasestorage.googleapis.com/v0/b/animenia-ad43b.appspot.com/o/download.png?alt=media&token=4baa1f56-966b-41f5-86e7-bba48ccfbfb1"
    if(!file) return downloadURL
    const ID = uuid()
    const storageRef = ref(storage, `images/${ID}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    if(uploadTask.snapshot.ref){
        await getDownloadURL(uploadTask.snapshot.ref).then((download) => {
            console.log(download) 
            downloadURL = download

        })
    }
    return downloadURL
};