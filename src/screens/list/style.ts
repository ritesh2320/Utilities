import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    titleText: {
        fontSize: 20,
        fontWeight: '900',
        color: colors.text,
        marginVertical: 16,
        marginHorizontal: 20
    },
    listItem: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    authorizedDetails: {
        marginTop: 8
    },
    listView: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        flex: 1
    },
    nameText: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.text
    },
    authNameText: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.text,
        marginBottom: 2
    },
    hintText: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: '400',
        color: colors.text
    },
    copyPasskey: {
        textDecorationLine: 'underline',
        color: colors.secondary
    },
    detailsSec: { flex: 1 },
    editBtn: {
        padding: 6,
        borderRadius: 6,
        overflow: 'hidden'
    },
    deleteBtn: {
        marginTop: 6,
        padding: 6,
        borderRadius: 6,
        overflow: 'hidden'
    },
    passkeyRow: {
        // flex: 1,
        alignItems: 'center',
        flexDirection: 'row'
    },
    copyIcon: {
        marginLeft: 8
    },
    flex1: { flex: 1 }
});

export default styles;
