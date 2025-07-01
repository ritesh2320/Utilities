import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
  },
  buttonsContainer: {
    // flex: 1,
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    paddingBottom: 20
  },
  imageContainer: {
    flex: 1,
    // height: 400,
    backgroundColor: 'red',
    marginVertical: 20,
    // width: 400,
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 20,
   
  },
});

export default styles;