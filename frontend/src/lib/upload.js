// upload.js
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const isFirebaseActive = false; // <--- set true if your Firebase Storage is active

const upload = (file) => {
  return new Promise((resolve, reject) => {
    if (isFirebaseActive) {
      // === Firebase Upload ===
      const storage = getStorage();
      const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress.toFixed(2) + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.error(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    } else {
      // === Local Mock Upload ===
      try {
        const fakeProgress = setInterval(() => {
          console.log("Upload is running...");
        }, 500);

        setTimeout(() => {
          clearInterval(fakeProgress);
          const fakeURL = `http://localhost/uploads/${Date.now()}_${file.name}`;
          console.log("Upload complete:", fakeURL);
          resolve(fakeURL);
        }, 1500); // fake 1.5s upload
      } catch (error) {
        reject(error);
      }
    }
  });
};

export default upload;