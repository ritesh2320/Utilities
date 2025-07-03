import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    formContainer: {
        paddingHorizontal: 20
    },
    TextInput: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        elevation: 1,
        height: 50,
        paddingHorizontal: 8,
        marginBottom: 8,
        color: colors.text
    },
    submitBtn: {
        height: 50,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginHorizontal: 40,
        marginVertical: 20
    },
    submitBtnText: {
        color: colors.text
    },
    scrollViewContainer: {
        flexGrow: 1,
        marginBottom: 20,
        paddingVertical: 20
    }
});

export default styles;
