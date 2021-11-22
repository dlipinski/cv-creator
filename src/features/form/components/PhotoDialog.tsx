import { Dialog, Pane } from "evergreen-ui";
import { useEffect, useState } from "react";
import firebase from "firebase";

interface PhotoDialogProps {
  isShown: boolean;
}

const PhotoDialog = ({ isShown }: PhotoDialogProps) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (images.length !== 0) return;
    const currentUser: any = firebase.auth().currentUser;
    console.log(currentUser);
    if (!currentUser) return;
    const storageRef = firebase.storage().ref(currentUser.uid);
    storageRef
      .listAll()
      .then((result) => {
        console.log(result);

        result.items.forEach(function (imageRef) {
          displayImage(imageRef);
        });
      })
      .catch(function (error) {});

    function displayImage(imageRef: any) {
      imageRef
        .getDownloadURL()
        .then(function (url: any) {
          setImages((old) => old.concat(url));
        })
        .catch(function (error: any) {});
    }
  }, [images]);

  return (
    <Dialog isShown={isShown}>
      {images.map((image) => {
        <Pane width={75} height={75} backgroundImage={`url(${image})`} />;
      })}
    </Dialog>
  );
};

export default PhotoDialog;
