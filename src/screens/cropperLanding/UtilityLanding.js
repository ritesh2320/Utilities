import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Title from '../../components/Title';
import Card from '../../components/Card';
import RootView from '../../components/RootView';
import Header from '../../components/Header';
// import ResizerIcon from '../../assets/images/resizer.svg';

const UtilityLanding = props => {
  const onHandleResizerCardPress = () => {
    //Navigate to image picker
    console.log('\n\n onHandleCardPress: ', props?.navigation);
    props?.navigation?.push('ImageResizer', { isFromLanding: true });
  };

  const onHandlePassManagerCardPress = () => {
    console.log('\n\n onHandlePassManagerCardPress: ', props?.navigation);
    props?.navigation?.navigate('Home', { isFromLanding: true });
  };
  return (
    <RootView>
      <Header title="Utilities" />
      <ScrollView>
        <View style={styles.cardContainer}>
          <Card onPress={onHandleResizerCardPress}>
            {/* <ResizerIcon width={24} height={24} /> */}
            Image Cropper
          </Card>
          <Card onPress={onHandlePassManagerCardPress}>Password manager</Card>
          <Card onPress={() => console.log('Image Resize pressed')}>
            Image Resize
          </Card>
          <Card onPress={() => console.log('Image Resize pressed')}>
            Image Resize
          </Card>
          <Card onPress={() => console.log('Image Resize pressed')}>
            Image Resize
          </Card>
          <Card onPress={() => console.log('Image Resize pressed')}>
            Image Resize
          </Card>
          <Card onPress={() => console.log('Image Resize pressed')}>
            Image Resize
          </Card>
          <Card onPress={() => console.log('Image Resize pressed')}>
            Image Resize
          </Card>
          <Card onPress={() => console.log('Image Resize pressed')}>
            Image Resize
          </Card>
          <Card onPress={() => console.log('Image Resize pressed')}>
            Image Resize
          </Card>
          <Card onPress={() => console.log('Image Resize pressed')}>
            Image Resize
          </Card>
          <Card onPress={() => console.log('Image Resize pressed')}>
            Image Resize
          </Card>
          <Card onPress={() => console.log('Image Resize pressed')}>
            Image Resize
          </Card>
          <Card onPress={() => console.log('Image Resize pressed')}>
            Image Resize
          </Card>
          <Card onPress={() => console.log('Image Resize pressed')}>
            Image Resize
          </Card>
          <Card onPress={() => console.log('Image Resize pressed')}>
            Image Resize
          </Card>
          <Card onPress={() => console.log('Image Resize pressed')}>
            Image Resize
          </Card>
          <Card onPress={() => console.log('Image Resize pressed')}>
            Image Resize
          </Card>
          <Card onPress={() => console.log('Image Resize pressed')}>
            Image Resize
          </Card>
        </View>
      </ScrollView>
    </RootView>
  );
};

export default UtilityLanding;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,

    borderColor: '#954C2E',
    // padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'space-evenly',
    paddingVertical: 20,
  },
});
