import React, { useState, useEffect, useCallback } from 'react';
import {
  Animated,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
import styles from './styles';

import PickerImage from './components/ImagePicker';
import GradientButton from '../../../../components/GradientButton';

const AnimatedKeyboard = Animated.createAnimatedComponent(KeyboardAvoidingView);

interface newUserProps {
  length: number
}

const NewUser: React.FC<newUserProps> = ({ length }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [translateY] = useState(new Animated.Value(1200));
  const [opacity] = useState(new Animated.Value(0));
  const [adress, setAdress] = useState('');
  const [name, setName] = useState('');

  const dispatch = useDispatch();
  const setRenderNewUser = useCallback(
    (boolean) => dispatch({ type: 'setRenderNewUser', value: boolean }),
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
    setTimeout(() => { setRenderNewUser(false); }, 300);
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

  const uploadStudent = useCallback((url, timestamp, name1, adress1) => {
    firebase.database().ref(`students/${length + 1}`).set({
      name: name1,
      imageUrl: url,
      adress: adress1,
      imageName: timestamp,
      id: length + 1,
    });
    alert('Aluno criado com sucesso');
    setLoading(false);
    setReloadList(true);
    handleCloseButton();
  }, []);

  const uploadImage = useCallback(async (name1, adress1) => {
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
          uploadStudent(url, timestamp, name1, adress1);
        });
      },
    );
  }, [image]);

  const handleButtonPress = useCallback(() => {
    if (name === '') {
      alert('Campo nome obrigatório');
      setLoading(false);
    } else if (adress === '') {
      alert('Campo endereço obrigatório');
      setLoading(false);
    } else
    if (image === null) {
      alert('Selecionar uma imagem');
      setLoading(false);
    } else {
      uploadImage(name, adress);
    }
  }, [uploadImage, name, image, adress]);

  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
    <Animated.View
    style={[styles.background, { opacity }]}>

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

            <Text style={styles.textTitle}>Adicionar Aluno</Text>

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
