import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import { translate } from '../../assets';
import Header from '../../components/Header';
import RootView from '../../components/RootView';
import styles from './style';
/* import { ComponentProps } from '../../utils/types'; */

const DocScanner = (/* props: ComponentProps */) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [scannedImage, setScannedImage] = useState<string>();

  const scanDocument = async () => {
    // start the document scanner
    const { scannedImages } = await DocumentScanner.scanDocument();

    // get back an array with scanned image file paths
    if (scannedImages && scannedImages?.length > 0) {
      // set the img src, so we can view the first scanned image
      setScannedImage(scannedImages[0]);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      scanDocument();
    }, 2000);
  }, []);

  return (
    <RootView>
      <Header title={translate('doc_scanner')} />
      <View style={styles.container}>
        {scannedImage && (
          <Image
            resizeMode="contain"
            style={styles.scannedImage}
            source={{ uri: scannedImage }}
          />
        )}
        {/* <Image
                    resizeMode="contain"
                    style={styles.scannedImage}
                    source={{ uri: scannedImage }}
                /> */}
      </View>
    </RootView>
  );
};

export default DocScanner;
