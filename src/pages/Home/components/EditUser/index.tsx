import React, { useState, useEffect, useCallback } from 'react';
import {
  Animated,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
import styles from './styles';

import PickerImage from './components/ImagePicker';
import GradientButton from '../../../../components/GradientButton';

const AnimatedKeyboard = Animated.createAnimatedComponent(KeyboardAvoidingView);

const NewUser: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [translateY] = useState(new Animated.Value(1200));
  const [opacity] = useState(new Animated.Value(0));
  const [oldImage, setOldImage] = useState('');
  const [adress, setAdress] = useState('');
  const [name, setName] = useState('');

  const currentUser = useSelector((state) => state.currentUser);

  const dispatch = useDispatch();
  const setRenderEditUser = useCallback(
    (boolean) => dispatch({ type: 'setRenderEditUser', value: boolean }),
    [dispatch],
  );
  const setReloadList = useCallback(
    (boolean) => dispatch({ type: 'setReloadList', value: boolean }),
    [dispatch],
  );

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();
    setAdress(currentUser.adress);
    setName(currentUser.name);
    setImage(currentUser.imageUrl);
    setOldImage(currentUser.imageUrl);
  }, []);

  const handleCloseButton = useCallback(() => {
    Animated.timing(translateY, {
      toValue: 1200,
      duration: 350,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacity, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
    setTimeout(() => { setRenderEditUser(false); }, 300);
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const updateStudent = useCallback((url, timestamp) => {
    firebase.database().ref(`students/${currentUser.id}`).update({
      name,
      imageUrl: url,
      adress,
      imageName: timestamp,
    });

    setLoading(false);
    setReloadList(true);
    handleCloseButton();
  }, [name, adress]);

  const uploadImage = useCallback(async () => {
    setLoading(true);
    const timestamp = Date.now();
    const response = await fetch(image);
    const blob = await response.blob();

    const uploadTask = firebase.storage().ref().child(`images/${timestamp}`).put(blob);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        alert(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          updateStudent(url, timestamp);
        });
      },
    );
  }, [image]);

  const deleteOldImage = useCallback((url) => {
    firebase.storage().refFromURL(url).delete().then(() => { console.log('Image Deleted'); uploadImage(); })
      .catch((err) => { console.log(err); });
  }, [uploadImage]);

  const handleButtonPress = useCallback(() => {
    if (name === '') {
      alert('Campo nome obrigatório');
      setLoading(false);
    } else if (adress === '') {
      alert('Campo endereço obrigatório');
      setLoading(false);
    } else if (image === oldImage) {
      updateStudent(image, currentUser.imageName);
    } else if (image !== oldImage) {
      deleteOldImage(oldImage);
    }
  }, [uploadImage, name, image, adress, oldImage]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <Animated.View style={[styles.background, { opacity }]}>

        <AnimatedKeyboard
        behavior={'height'}
        keyboardVerticalOffset={-200}
        style={[styles.container, {
          transform: [
            { translateY },
          ],
        }]}>
            <TouchableOpacity
            onPress={() => { handleCloseButton(); }}
            style={styles.iconClose}>
                <AntDesign name='close' size={32} color='#121E3A'/>
            </TouchableOpacity>

            <View style={{ alignItems: 'center' }}>
              <Text style={styles.textTitle}>Editar Aluno</Text>
              <Text style={styles.textSubtitle}>( clique na imagem para altera-la )</Text>
            </View>

            <PickerImage image={image} onPress={() => { pickImage(); }}/>

            <TextInput
            onChangeText={(text) => { setName(text); }}
            value={name}
            placeholder='Nome Completo'
            style={styles.input}/>
            <TextInput
             onChangeText={(text) => { setAdress(text); }}
             value={adress}
            placeholder='Endereço'
            style={styles.input}/>

            <GradientButton loading={loading} onPress={() => handleButtonPress()} text='Finalizar' />

        </AnimatedKeyboard>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default NewUser;
