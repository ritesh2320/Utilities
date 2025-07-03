import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

let rnBiometrics: ReactNativeBiometrics;
export function initializeBiometrics() {
    if (!rnBiometrics) {
        rnBiometrics = new ReactNativeBiometrics({
            allowDeviceCredentials: true
        });
    }
    return rnBiometrics;
}

export async function propmtForAuth() {
    return rnBiometrics.simplePrompt({
        promptMessage: 'Confirm fingerprint'
    });
}

export const askForAuthentication = async () => {
    const rnBioMetrics = initializeBiometrics();
    const { biometryType } = await rnBioMetrics.isSensorAvailable();
    console.log('\n\n biometryType: ', biometryType);

    if (biometryType === BiometryTypes.Biometrics) {
        const { success, error } = await rnBioMetrics.simplePrompt({
            promptMessage: 'Confirm fingerprint'
        });
        if (error) {
            console.log('\n\n Auth Error: ', error);
        }
        return success;
    }
};
