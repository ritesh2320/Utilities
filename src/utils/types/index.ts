import {
    NavigationProp,
    ParamListBase,
    RouteProp
} from '@react-navigation/native';
import {
    NativeStackNavigationProp,
    NativeStackScreenProps
} from '@react-navigation/native-stack';

export type listItem = {
    id: string;
    name: string;
    hint?: string;
    myKey: string;
    myValue: string;
    updatedOn: number;
    addedOn: number;
    previousValues: Array<listItem>;
    isActive: boolean;
    accountNumber?: string;
    ifsc?: string;
};
export type formStateType = {
    name: string;
    hint?: string;
    myKey: string;
    myValue: string;
    confirmMyValue: string;
    accountNumber?: string;
    ifsc?: string;
};

//Common Screen container props
export interface ComponentProps {
    navigation?: NavigationProp<ParamListBase>;
    route?: RouteProp<ParamListBase>;
}

export type AddDetailsScreenRouteProps = {
    isEdit: boolean;
    itemDetails: listItem;
    list: listItem[];
    itemListIndex: number;
};

export type RootStackParamList = {
    Home: undefined;
    Add: AddDetailsScreenRouteProps;
    List: { sort: 'latest' | 'top' } | undefined;
};

export type AddDetailsScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'Add'
>;
