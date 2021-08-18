import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

const Header: React.FC = () => (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Lista de alunos</Text>
      <Text style={styles.textDetails}>( Clique para mais opções )</Text>
    </View>

);
export default Header;
