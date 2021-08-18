import React, { useState, useEffect, useCallback } from 'react';
import {
  Animated, Text, TouchableOpacity, View, ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';
import styles from './styles';

const NewUser: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [opacity] = useState(new Animated.Value(0));

  const currentUser = useSelector((state) => state.currentUser);

  const dispatch = useDispatch();
  const setRenderDeleteUser = useCallback(
    (boolean) => dispatch({ type: 'setRenderDeleteUser', value: boolean }),
    [dispatch],
  );
  const setReloadList = useCallback(
    (boolean) => dispatch({ type: 'setReloadList', value: boolean }),
    [dispatch],
  );

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleCloseButton = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
    setTimeout(() => { setRenderDeleteUser(false); }, 300);
  }, []);

  const deleteUser = useCallback(() => {
    firebase.database().ref(`students/${currentUser.id}`).remove()
      .then(() => { setLoading(false); setRenderDeleteUser(false); setReloadList(true); })
      .catch((err) => { console.log(err); });
  }, []);

  const handleDeleteButon = useCallback(() => {
    setLoading(true);
    firebase.storage().refFromURL(currentUser.imageUrl).delete()
      .then(() => { console.log('Image Deleted'); deleteUser(); })
      .catch((err) => { console.log(err); });
  }, []);

  return (
    <Animated.View style={[styles.background, { opacity }]}>
      <View style={styles.container}>
        <Text style={styles.textConfirm}>Deseja mesmo excluir o item?</Text>
        <View style={styles.viewButtons}>
         {loading ? <ActivityIndicator size={'large'} color={'#0083C0'}/>
           : <>
         <TouchableOpacity onPress={() => { handleDeleteButon(); }} style={styles.buttonYes}>
            <Text style={styles.textButton}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { handleCloseButton(); }} style={styles.buttonYes}>
            <Text style={styles.textButton}>Não</Text>
          </TouchableOpacity>
          </>
          }
        </View>
      </View>
    </Animated.View>
  );
};

export default NewUser;
