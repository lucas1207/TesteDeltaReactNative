import React from 'react';
import {
  Text, TouchableOpacity, TouchableOpacityProps, Image,
} from 'react-native';
import styles from './styles';

interface PickerProps extends TouchableOpacityProps{
  image: string
}

const ImagePicker: React.FC<PickerProps> = ({ image, ...rest }) => (
    <>
    {image === null
      ? <TouchableOpacity {...rest} style={styles.buttonPickImage}>
        <Text style={styles.textImage}>Escolher{'\n'}Imagem</Text>
    </TouchableOpacity>
      : <Image source={{ uri: image }} style={styles.imageAvatar}/>
    }
    </>
);

export default ImagePicker;
