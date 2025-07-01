import { StyleSheet } from 'react-native';
// import colors from '../../utils/colors';

const styles = StyleSheet.create({
    container: {
        height: 48,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderBottomColor: colors.border,
        borderBottomWidth: 1
    },
    backBtnStyle: {
        color: 'white'
    },
    backBtn: {
        paddingHorizontal: 8,
        height: 48,
        justifyContent: 'center'
    },
    appControls: {
        paddingHorizontal: 8,
        height: 48,
        justifyContent: 'center'
    },
    headerTitle: {
        // color: colors.text,
        fontSize: 16,
        fontWeight: '600'
    },
    placeholderView: {
        flexDirection: 'row',
        minWidth: 48
    }
});

export default styles;
