import React from 'react';
import {
  Image, Text, TouchableOpacity, View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';

import LogoDelta from '../../assets/LogoDelta.png';

const Status: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <LinearGradient
    start={[0.5, 0]}
    end={[0.5, 1.0]}
    colors={['#0093CD', '#011D3A']}
    style={[styles.container, { paddingTop: insets.top }]}
    >
      <View style={{ alignItems: 'center' }}>
        <Image
        resizeMode={'contain'}
        source={LogoDelta}
        style={styles.logoDelta}
        />
        <Text style={styles.textTeste}>Teste React-Native</Text>
      </View>

      <TouchableOpacity onPress={() => { navigation.navigate('Home'); }} style={styles.buttonList}>
        <Text style={styles.textButton}>Acessar Lista</Text>
      </TouchableOpacity>

    </LinearGradient>
  );
};
export default Status;
