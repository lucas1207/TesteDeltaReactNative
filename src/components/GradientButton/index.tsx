import React from 'react';
import {
  Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';

interface ButtonProps extends TouchableOpacityProps{
  text: string
  loading: boolean
}

const ImagePicker: React.FC<ButtonProps> = ({ loading, text, ...rest }) => (
    <>
    {loading ? <ActivityIndicator size='large' color='#0086BB'/>
      : <TouchableOpacity {...rest} style={styles.buttonCreate}>
            <LinearGradient
            end={[0.0, 0.5]}
            start={[1.0, 0.5]}
            colors={['#0086BB', '#011D3A']}
            style={styles.gradientButton}>
                <Text style={styles.textButton}>{text}</Text>
            </LinearGradient>
            </TouchableOpacity>}
    </>
);

export default ImagePicker;
