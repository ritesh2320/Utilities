import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    headingText: {
        color: colors.text
    },
    scannedImage: { width: '100%', height: '100%' }
});

export default styles;
