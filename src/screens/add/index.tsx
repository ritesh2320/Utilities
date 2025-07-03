import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
} from 'react-native';
import RootView from '../../components/RootView';
import Pressable from '../../components/pressable';
import colors from '../../utils/colors';
import { randomString } from '../../utils/commonHelper';
import { saveList } from '../../utils/storageHelper';
import {
  AddDetailsScreenProps,
  formStateType,
  listItem,
} from '../../utils/types';
import styles from './style';
import { translate } from '../../assets';
import Header from '../../components/Header';

const Add = (props: AddDetailsScreenProps) => {
  const [formState, setFormState] = useState<formStateType>({
    name: '',
    hint: '',
    myKey: '',
    myValue: '',
    confirmMyValue: '',
    accountNumber: '',
    ifsc: '',
  });
  const isEdit = props?.route?.params?.isEdit ?? false;
  useEffect(() => {
    const { itemDetails } = props?.route?.params ?? {};
    if (itemDetails) {
      setFormState({
        name: itemDetails?.name,
        hint: itemDetails?.hint,
        myKey: itemDetails?.myKey,
        myValue: itemDetails?.myValue,
        confirmMyValue: itemDetails?.myValue,
        accountNumber: itemDetails?.accountNumber,
        ifsc: itemDetails?.ifsc,
      });
    }
  }, []);

  const handleSuccessOkay = () => {
    props?.navigation?.goBack();
  };
  const showError = (
    message: string,
    title: string = translate('validation_err_title'),
  ) => {
    Alert.alert(title, message);
  };
  const showSuccess = (message: string) => {
    Alert.alert(translate('success_title'), message, [
      { text: translate('okay'), onPress: handleSuccessOkay },
    ]);
  };

  const onSubmit = () => {
    const { itemDetails, list, itemListIndex } = props?.route?.params ?? {};
    if (!formState.name.length) {
      showError(translate('err_empty_name'));
    } else if (!formState.myKey.length) {
      showError(translate('err_empty_user_name'));
    } else if (!formState.myValue.length) {
      showError(translate('err_empty_pwd'));
    } else if (!formState.confirmMyValue.length) {
      showError(translate('err_empty_confirm_pwd'));
    } else if (formState.myValue !== formState.confirmMyValue) {
      showError(translate('err_empty_pwd_not_match'));
    } else {
      try {
        const currentTime = new Date().getTime();
        const dataReq: listItem = {
          ...formState,
          updatedOn: currentTime,
          id: isEdit ? itemDetails?.id : randomString(),
          addedOn: isEdit ? itemDetails?.addedOn : currentTime,
          previousValues: isEdit
            ? [...itemDetails?.previousValues, itemDetails]
            : [],
          isActive: isEdit ? itemDetails?.isActive : true,
        };
        const finalList = list?.length ? list : [];
        if (isEdit) {
          finalList[itemListIndex] = dataReq;
        } else {
          finalList.push(dataReq);
        }

        saveList(finalList);

        //
        showSuccess(
          isEdit
            ? translate('success_update_message')
            : translate('success_add_message'),
        );
      } catch (error) {
        showError(translate('error_message'), translate('error_title'));
      }
    }
  };

  const onChangeTextHandler = (keyValue: { [key: string]: string }) => {
    setFormState({ ...formState, ...keyValue });
  };

  return (
    <RootView style={styles.container}>
      <Header
        title={isEdit ? translate('update_details') : translate('add_details')}
      />
      <ScrollView
        style={styles.formContainer}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <KeyboardAvoidingView behavior="padding">
          <TextInput
            value={formState.name}
            style={styles.TextInput}
            placeholder="Enter name *"
            placeholderTextColor={colors.placeholder}
            onChangeText={text => onChangeTextHandler({ name: text })}
          />
          <TextInput
            numberOfLines={3}
            value={formState.hint}
            style={styles.TextInput}
            placeholder="Enter hint text"
            placeholderTextColor={colors.placeholder}
            onChangeText={text => onChangeTextHandler({ hint: text })}
          />
          <TextInput
            value={formState.myKey}
            style={styles.TextInput}
            placeholder="Enter useId *"
            placeholderTextColor={colors.placeholder}
            onChangeText={text => onChangeTextHandler({ myKey: text })}
          />
          <TextInput
            value={formState.myValue}
            style={styles.TextInput}
            placeholder="Enter passcode *"
            secureTextEntry
            placeholderTextColor={colors.placeholder}
            onChangeText={text => onChangeTextHandler({ myValue: text })}
          />
          <TextInput
            value={formState.confirmMyValue}
            style={styles.TextInput}
            placeholder="Confirm passcode *"
            placeholderTextColor={colors.placeholder}
            onChangeText={text => onChangeTextHandler({ confirmMyValue: text })}
          />
          <TextInput
            value={formState.accountNumber}
            style={styles.TextInput}
            placeholder="Enter account no"
            placeholderTextColor={colors.placeholder}
            onChangeText={text => onChangeTextHandler({ accountNumber: text })}
          />
          <TextInput
            value={formState.ifsc}
            style={styles.TextInput}
            placeholder="Enter ifsc"
            placeholderTextColor={colors.placeholder}
            onChangeText={text => onChangeTextHandler({ ifsc: text })}
          />
        </KeyboardAvoidingView>
      </ScrollView>
      <Pressable onPress={onSubmit} style={styles.submitBtn}>
        <Text style={styles.submitBtnText}>Submit</Text>
      </Pressable>
    </RootView>
  );
};

export default Add;
