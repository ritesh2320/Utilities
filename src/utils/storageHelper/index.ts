import {
    MMKVInstance,
    MMKVLoader,
    ProcessingModes
} from 'react-native-mmkv-storage';
import { listItem } from '../types';
import { Linking, Platform } from 'react-native';
import { check, request, RESULTS, openSettings } from 'react-native-permissions';
import {
    PERMISSIONS,
    requestMultiple,
    RESULTS as PermissionResult
} from 'react-native-permissions';
import { FileSystem, Dirs } from 'react-native-file-access';
import { TKUTILS_DOWNLOAD_FOLDER_NAME } from '../constants';

let MMKV: MMKVInstance;

export function initializeMMKV() {
    if (!MMKV) {
        MMKV = new MMKVLoader()
            .setProcessingMode(ProcessingModes.SINGLE_PROCESS)
            .withEncryption()
            .initialize();
    }
}

export async function fetchList(): Promise<listItem[] | null | undefined> {
    return await MMKV.getArrayAsync('itemList');
}
export async function saveList(list: listItem[]) {
    return await MMKV.setArrayAsync('itemList', list);
}
// export const requestStoragePermission = async (
//     isStoragePermissionBlocked: boolean
// ) => {
//     if (isStoragePermissionBlocked) {
//         Linking.openSettings();
//     } else {
//         let permsArray: any[] = [
//             PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
//             PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
//         ];
//         const result = await requestMultiple(permsArray);
//         if (
//             result[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] ===
//                 PermissionResult.BLOCKED ||
//             result[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] ===
//                 PermissionResult.BLOCKED
//         ) {
//             Linking.openSettings();
//         }
//     }
// };

export const requestStoragePermission = async (isStoragePermissionBlocked: boolean) => {
    if (isStoragePermissionBlocked) {
        openSettings();
        return;
    }

    if (Platform.OS === 'android') {
        if (Platform.Version >= 30) {
            const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
            if (result === RESULTS.BLOCKED) {
                openSettings();
            }
        } else {
            const writePermission = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
            const readPermission = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

            if (writePermission === RESULTS.BLOCKED || readPermission === RESULTS.BLOCKED) {
                openSettings();
            }
        }
    }
};

export const checkStoragePermission = async () => {
    const result = await requestMultiple([
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
    ]);
    let isPermissionGranted = isAndroidVersion13OrHigher()
        ? true
        : Platform.OS === 'ios' ||
          (result[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] ===
              PermissionResult.GRANTED &&
              result[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] ===
                  PermissionResult.GRANTED);

    let isPermissionBlocked = isAndroidVersion13OrHigher()
        ? false
        : result[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] ===
              PermissionResult.BLOCKED &&
          result[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] ===
              PermissionResult.BLOCKED;
    return {
        result,
        isPermissionGranted,
        isPermissionBlocked
    };
};

export const isPermissionGrantedForStorage = async () => {
    return (await checkStoragePermission()).isPermissionGranted;
};

export const isAndroidVersion13OrHigher = () => {
    return Platform.OS === 'android' && Platform.Version >= 33;
};

export const isPermissionBlockedForStorage = async () => {
    return (await checkStoragePermission()).isPermissionBlocked;
};

export async function makeDirectory(fileName: string) {
    const dirPath = `${
        Platform.OS === 'android' ? Dirs.SDCardDir : Dirs.DocumentDir
    }`;
    const folderPath = `${dirPath}/${TKUTILS_DOWNLOAD_FOLDER_NAME}`;
    const isExists = await FileSystem.exists(folderPath);

    if (isExists) {
        return `${folderPath}/${fileName}`;
    }

    try {
        const path = await FileSystem.mkdir(folderPath);
        return `${folderPath}/${fileName}`;
    } catch (error) {
        console.log('\n\n error: ', error);

        return undefined;
    }
}

export async function writeFileContent(path: string, content: string) {
    try {
        await FileSystem.writeFile(path, content);
        return true;
    } catch (error) {
        return error;
    }
}
export async function readFileContent(path: string) {
    try {
        return await FileSystem.readFile(path);
    } catch (error) {
        return undefined;
    }
}
