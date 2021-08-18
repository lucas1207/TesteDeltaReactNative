import React from 'react';
import {
  TouchableOpacity, TouchableOpacityProps, Image,
} from 'react-native';
import styles from './styles';

interface PickerProps extends TouchableOpacityProps{
  image: string
}

const ImagePicker: React.FC<PickerProps> = ({ image, ...rest }) => (
  <TouchableOpacity {...rest} style={styles.buttonPickImage}>
    <Image source={{ uri: image }} style={styles.imageAvatar}/>
  </TouchableOpacity>
);

export default ImagePicker;
