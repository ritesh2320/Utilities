import Clipboard from '@react-native-clipboard/clipboard';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Platform, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { translate } from '../../assets';
import AddIcon from '../../assets/images/ic_add.svg';
import ExportIcon from '../../assets/images/ic_export.svg';
import DeleteIcon from '../../assets/images/ic_delete.svg';
import EditIcon from '../../assets/images/ic_edit.svg';
import ImportIcon from '../../assets/images/ic_import.svg';
import Header from '../../components/Header';
import Pressable from '../../components/pressable';
import RootView from '../../components/RootView';
import { askForAuthentication } from '../../utils/biometricsHelper';
import colors from '../../utils/colors';
import { CREDS_JSON } from '../../utils/constants';
import Routes from '../../utils/constants/routes';
import {
  checkStoragePermission,
  fetchList,
  makeDirectory,
  readFileContent,
  requestStoragePermission,
  saveList,
  writeFileContent,
} from '../../utils/storageHelper';
import DocumentPicker from '@react-native-documents/picker';
import { ComponentProps, listItem } from '../../utils/types';
import styles from './style';
import { AppControlInterface } from '../../components/confirmationToast';

const List = (props: ComponentProps) => {
  const [list, setList] = useState<listItem[]>([]);
  const [authForIndex, setAuthForIndex] = useState<number>(-1);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadList();
    }
  }, [isFocused]);

  const loadList = async () => {
    let fetchedItems = await fetchList();
    fetchedItems =
      fetchedItems && Array.isArray(fetchedItems) ? fetchedItems : [];
    setList(fetchedItems);
  };

  const checkForAndroidBioMetrics = async (index: number) => {
    try {
      const isSuccess = await askForAuthentication();
      if (isSuccess) {
        setAuthForIndex(index);
      }
    } catch (err) {
      Alert.alert(
        'Whooaaa!!!',
        'Congratulations, you have been successfully pranked!!!',
      );
    }
  };

  const deleteDetails = (itemListIndex: number) => {
    list.splice(itemListIndex, 1);
    saveList(list);
    loadList();
  };

  const handleDelete = (itemListIndex: number) => {
    Alert.alert(translate('delete_title'), translate('delete_message'), [
      {
        text: translate('yes'),
        onPress: () => deleteDetails(itemListIndex),
        style: 'destructive',
      },
      {
        text: translate('no'),
        style: 'cancel',
        // onPress: () => deleteDetails(itemListIndex)
      },
    ]);
  };
  const editDetails = (itemDetails: listItem, itemListIndex: number) => {
    props?.navigation?.navigate(Routes.Add, {
      isEdit: true,
      itemDetails,
      itemListIndex,
      list,
    });
  };
  const handleAddNewDetails = () => {
    props?.navigation?.navigate(Routes.Add, {
      list,
    });
  };
  const importCredsList = async () => {
    const { isPermissionGranted } = await checkStoragePermission();

    if (isPermissionGranted) {
      try {
        const result = await DocumentPicker.pickSingle({
          mode: 'import',
          copyTo: 'cachesDirectory',
        });

        if (result?.fileCopyUri?.length) {
          const jsonString = await readFileContent(result.fileCopyUri!);
          if (jsonString?.length) {
            const importedListJson = JSON.parse(jsonString);
            const finalList =
              list && Array.isArray(list) && list?.length
                ? list.concat(importedListJson)
                : importedListJson;
            const isSaved = await saveList(finalList);

            if (isSaved) {
              Toast.show({
                text1: translate('import_success'),
              });
              loadList();
            } else {
              Toast.show({
                type: 'error',
                text1: translate('import_failed'),
              });
            }
          }
        } else {
          Toast.show({
            type: 'error',
            text1: translate('read_failed'),
          });
        }
      } catch (error) {
        Toast.show({ type: 'error', text1: error?.toString() });
      }
    }
  };
  const exportCredsList = async () => {
    const { isPermissionGranted } = await checkStoragePermission();

    if (isPermissionGranted) {
      const currentTime = new Date().getTime().toString();
      const filename = `${currentTime}-${CREDS_JSON}`;
      const filepath = await makeDirectory(filename);
      if (filepath) {
        const jsonString = JSON.stringify(list, null, 2);
        const result = await writeFileContent(filepath, jsonString);
        if (result === true) {
          Toast.show({
            text1: translate('export_success', {
              filepath: filepath,
            }),
          });
        } else {
          Toast.show({
            type: 'error',
            text1: translate('export_failed'),
          });
        }
      }
    } else {
      await requestStoragePermission(false);
    }
  };
  const copyPasskey = (passkey: string) => {
    Clipboard.setString(passkey);
    if (Platform.OS === 'ios') {
      Toast.show({
        text1: translate('copied'),
      });
      /* Toast.show({
                autoHide: false,
                type: 'confirmationToast',
                text1: translate('copied'),
                bottomOffset: 0,
                swipeable: false
            }); */
    }
  };

  const getRHSAppControl = (): AppControlInterface[] => {
    let appControl: AppControlInterface[] = [
      {
        title: 'AddDetails',
        icon: <AddIcon width={32} height={32} color={colors.text} />,
        onPress: handleAddNewDetails,
      },
    ];

    if (list?.length) {
      appControl.push({
        title: 'Export',
        icon: <ExportIcon width={26} height={26} color={colors.text} />,
        onPress: exportCredsList,
      });
    }
    appControl.push({
      title: 'Import',
      icon: <ImportIcon width={26} height={26} color={colors.text} />,
      onPress: importCredsList,
    });

    return appControl;
  };

  const renderAuthorizedDetails = (item: listItem, index: number) => {
    return (
      <View key={index} style={styles.authorizedDetails}>
        <Text style={styles.authNameText}>
          {translate('user_id')}
          <Text style={styles.hintText}>{item?.myKey}</Text>
        </Text>
        <Text style={[styles.authNameText]}>
          {translate('passkey')}
          <Text
            style={[styles.hintText, styles.copyPasskey]}
            onLongPress={() => copyPasskey(item?.myValue ?? '')}
          >
            {item?.myValue}
          </Text>
        </Text>
        {item?.accountNumber ? (
          <Text style={styles.authNameText}>
            {translate('acc_no')}
            <Text style={styles.hintText}>{item?.accountNumber}</Text>
          </Text>
        ) : null}
        {item?.ifsc ? (
          <Text style={styles.authNameText}>
            {translate('ifsc')}
            <Text style={styles.hintText}>{item?.ifsc}</Text>
          </Text>
        ) : null}
      </View>
    );
  };
  const renderListItem = ({
    item,
    index,
  }: {
    item: listItem;
    index: number;
  }) => {
    return (
      <Pressable
        onLongPress={() => checkForAndroidBioMetrics(index)}
        style={styles.listItem}
      >
        <View style={styles.detailsSec}>
          <Text style={styles.nameText}>{item?.name}</Text>
          {item?.hint?.length ? (
            <Text style={styles.hintText}>{item?.hint}</Text>
          ) : null}

          {authForIndex === index ? renderAuthorizedDetails(item, index) : null}
        </View>
        {authForIndex === index ? (
          <View>
            <Pressable
              style={styles.editBtn}
              onPress={() => editDetails(item, index)}
            >
              <EditIcon color={colors.text} width={20} height={20} />
            </Pressable>
            <Pressable
              style={styles.editBtn}
              onPress={() => handleDelete(index)}
            >
              <DeleteIcon color={colors.text} width={20} height={20} />
            </Pressable>
          </View>
        ) : null}
      </Pressable>
    );
  };

  const renderList = () => {
    return (
      <FlatList
        data={list}
        renderItem={renderListItem}
        keyExtractor={(item, index) => item.id + index.toString()}
        contentContainerStyle={styles.listView}
      />
    );
  };

  return (
    <RootView>
      <Header
        title={translate('my_creds')}
        rightSideButtons={getRHSAppControl()}
      />
      <View style={styles.container}>{renderList()}</View>
    </RootView>
  );
};

export default List;
