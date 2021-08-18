import React, { useState, useCallback } from 'react';
import {
  TouchableOpacity, Text, View, Animated, Image,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import styles from './styles';

interface ListItemProps {
  item: object,
}

const ListItem: React.FC<ListItemProps> = ({ item }) => {
  const [renderMenu, setRenderMenu] = useState(false);
  const [opacity, setOpacity] = useState(new Animated.Value(0));

  const dispatch = useDispatch();
  const setRenderEditUser = useCallback(
    (boolean) => dispatch({ type: 'setRenderEditUser', value: boolean }),
    [dispatch],
  );
  const setRenderDeleteUser = useCallback(
    (boolean) => dispatch({ type: 'setRenderDeleteUser', value: boolean }),
    [dispatch],
  );
  const setCurrentUser = useCallback(
    (boolean) => dispatch({ type: 'setCurrentUser', value: boolean }),
    [dispatch],
  );

  const handleButtonPress = useCallback(() => {
    setRenderMenu(true);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  const handleBackButton = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();

    setTimeout(() => { setRenderMenu(false); }, 400);
  }, [opacity]);

  const handleEditPress = useCallback(() => {
    setCurrentUser(item);
    setRenderEditUser(true);
  }, [item]);

  const handleDeletePress = useCallback(() => {
    setCurrentUser(item);
    setRenderDeleteUser(true);
  }, [item]);

  return (
    <TouchableOpacity
    activeOpacity={1}
    onPress={() => { handleButtonPress(); }}
    style={styles.container}
    >

      <Image source={{ uri: item.imageUrl }} style={styles.imageAvatar}/>
      <View style={styles.viewInfo}>
        <Text style={styles.textName}>{item.name}</Text>
        <Text style={styles.textAdress}>{item.adress}</Text>
      </View>
      {renderMenu
      && <Animated.View style={[styles.viewMenu, { opacity }]}>
          <TouchableOpacity
          onPress={() => { handleBackButton(); }}
          style={styles.buttonBack}
          >
            <FontAwesome5 name='angle-left' size={32} color='#121E3A'/>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleEditPress()} style={styles.viewIcon}>
            <FontAwesome5 name='user-edit' size={32} color='#121E3A'/>
            <Text style={styles.textEdit}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleDeletePress()} style={styles.viewIcon}>
            <FontAwesome5 name='user-minus' size={32} color='#121E3A'/>
            <Text style={styles.textDelete}>Deletar</Text>
          </TouchableOpacity>

      </Animated.View>
      }
    </TouchableOpacity>
  );
};
export default ListItem;
