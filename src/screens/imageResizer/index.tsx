// import { useEffect, useState } from 'react';
// import { Alert, Image, StyleSheet, View } from 'react-native';
// import {
//   launchCamera,
//   launchImageLibrary,
//   Asset,
// } from 'react-native-image-picker';
// import PrimaryButton from '../../components/PrimaryButton';
// import styles from './style';
// import RootView from '../../components/RootView';
// import Header from '../../components/Header';
// import ImageEditor from '@react-native-community/image-editor';

// // import ImageResizer from 'react-native-image-resizer';

// const ImageResize = (props: any) => {
//   const [photo, setPhoto] = useState<Asset | null>(null);

//   useEffect(() => {
//     console.log('\n\n PROPS: ', props);
//   }, []);
//   const handleCameraLaunch = () => {
//     console.log('Launching camera...');

//     launchCamera({
//       mediaType: 'photo',
//       cameraType: 'back',
//       saveToPhotos: true,
//     })
//       .then(response => {
//         console.log(response);
//         if (response.didCancel) {
//           console.log('User cancelled camera');
//         } else if (response.errorCode) {
//           console.log('Camera Error: ', response.errorMessage);
//           // Alert.alert('Error', response.errorMessage);
//         } else if (response.assets && response.assets.length > 0) {
//           const asset = response.assets[0];
//           // setPhoto(response.assets[0]);
//           // if (asset?.uri) {
//           //   ImageEditor.cropImage(asset.uri, {
//           //     size: { height: 320, width: 320 },
//           //     offset: { x: 100, y: 100 },
//           //   }).then(result => {
//           //     console.log('Cropped image uri:', result.uri);
//           //   });
//           // }
//         }
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   };

//   const handleGalleryPick = () => {
//     launchImageLibrary(
//       {
//         mediaType: 'photo',
//       },
//       response => {
//         if (response.didCancel) {
//           console.log('User cancelled image picker');
//         } else if (response.errorCode) {
//           Alert.alert('Error', response.errorMessage);
//         } else if (response.assets && response.assets.length > 0) {
//           setPhoto(response.assets[0]);
//         }
//       },
//     );
//   };

//   return (
//     <RootView>
//       <Header title="Image Resizer" />
//       <View style={styles.rootContainer}>
//         <View style={styles.imageContainer}>
//           {photo && (
//             <Image
//               source={{ uri: photo.uri }}
//               style={{ width: '100%', height: '100%' }}
//             />
//           )}
//         </View>
//         <View style={styles.buttonsContainer}>
//           <PrimaryButton onPress={handleCameraLaunch}>Take Photo</PrimaryButton>
//           <PrimaryButton onPress={handleGalleryPick}>
//             Pick from Gallery
//           </PrimaryButton>
//         </View>
//       </View>
//     </RootView>
//   );
// };

// export default ImageResize;

import React, { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, StyleSheet, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import PrimaryButton from '../../components/PrimaryButton';
import styles from './style';
import RootView from '../../components/RootView';
import Header from '../../components/Header';

const ImageResize = (props: any) => {
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  // useEffect(() => {
  //   console.log('\n\n PROPS: ', props);
  // }, []);

  const handleCameraLaunch = async () => {
    console.log('\n\n Launching');

    try {
      const image = await ImagePicker.openCamera({
        cropping: true,
        width: 300,
        height: 400,
        includeBase64: false,
      });
      setPhotoUri(image.path);
    } catch (error) {
      console.log('Camera error or cancelled', error);
    }
  };

  const handleGalleryPick = async () => {
    try {
      const image = await ImagePicker.openPicker({
        cropping: true,
        width: 300,
        height: 400,
        includeBase64: false,
        quality: 1,
      });
      setPhotoUri(image.path);
      console.log(image.path);
      await CameraRoll.saveAsset(image.path);
    } catch (error) {
      console.log('Picker error or cancelled', error);
    }
  };

  return (
    // <RootView>
    <RootView>
      <Header title="Image Cropper" />
      <View style={styles.rootContainer}>
        <View style={styles.imageContainer}>
          {photoUri && (
            <Image
              source={{ uri: photoUri }}
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </View>
        <View style={styles.buttonsContainer}>
          <PrimaryButton onPress={handleCameraLaunch}>Take Photo</PrimaryButton>
          <PrimaryButton onPress={handleGalleryPick}>
            Pick from Gallery
          </PrimaryButton>
        </View>
      </View>
    </RootView>
    // </RootView>
  );
};

export default ImageResize;
