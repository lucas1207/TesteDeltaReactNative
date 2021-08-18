import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, ActivityIndicator, LogBox,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import firebase from 'firebase';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles';

import EditUser from './components/EditUser';
import Header from './components/Header';
import AddButton from './components/AddButton';
import ListItem from './components/ListItem';
import NewUser from './components/NewUser';
import DeleteUser from './components/DeleteUser';

const Home: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const renderEditUser = useSelector((state) => state.renderEditUser);
  const renderNewUser = useSelector((state) => state.renderNewUser);
  const renderDeleteUser = useSelector((state) => state.renderDeleteUser);
  const reloadList = useSelector((state) => state.reloadList);
  const dispatch = useDispatch();
  const setReloadList = useCallback(
    (boolean) => dispatch({ type: 'setReloadList', value: boolean }),
    [dispatch],
  );

  useEffect(() => {
    setLoading(true);
    firebase.database().ref('students').once('value').then((snapshot) => {
      const firebaseData = []; snapshot.forEach((child) => {
        firebaseData.push({
          name: child.val().name,
          adress: child.val().adress,
          imageName: child.val().imageName,
          imageUrl: child.val().imageUrl,
          id: child.val().id,
        });
      });
      setStudents(firebaseData);
      setLoading(false);
      if (reloadList) {
        setReloadList(false);
      }
    });
  }, [reloadList]);

  LogBox.ignoreLogs(['Setting a timer']);

  return (
    <>

    <LinearGradient
    end={[0.5, 1.0]}
    start={[0.5, 0.0]}
    colors={['#0086BB', '#011D3A']}
    style={[styles.container, { paddingTop: insets.top }]}
    >

    <Header/>

    {loading
      ? <View style={styles.viewIndicator}>
        <ActivityIndicator size='large' color='white'/>
      </View>
      : <>
     {students.length > 0
       ? <ScrollView style={styles.viewScroll}>
      {students.map((item) => (
        <ListItem
        key={item.id}
        item={item}
        />
      ))}
      </ScrollView>
       : <View style={styles.viewEmpty}>
      <Text style={styles.textEmpty}>
        Sua lista está vazia
        {'\n'}{'\n'} Adicione um aluno
        {'\n'} clicando no botão abaixo
      </Text>
      </View>
    }
    </>
    }

    <AddButton/>

    </LinearGradient>

    {renderNewUser && <NewUser length={students.length}/>}
    {renderEditUser && <EditUser />}
    {renderDeleteUser && <DeleteUser />}
    </>

  );
};
export default Home;
