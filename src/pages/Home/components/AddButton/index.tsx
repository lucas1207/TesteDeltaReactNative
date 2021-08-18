import React, { useCallback } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import styles from './styles';

const AddButton: React.FC = () => {
  const dispatch = useDispatch();
  const setRenderNewUser = useCallback(
    (boolean) => dispatch({ type: 'setRenderNewUser', value: boolean }),
    [dispatch],
  );
  return (
    <TouchableOpacity
     onPress={() => { setRenderNewUser(true); }}
     style={styles.container}
     >
    <FontAwesome5 name='user-plus' size={24} color='white' />
  </TouchableOpacity>
  );
};

export default AddButton;
