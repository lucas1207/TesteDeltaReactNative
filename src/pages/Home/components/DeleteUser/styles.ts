import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    backgroundColor: '#000000cc',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    height: 150,
    borderRadius: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#f2f2f2',
  },

  textConfirm: {
    fontSize: 18,
  },

  viewButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },

  buttonYes: {
    height: 50,
    width: '30%',
    borderRadius: 5,
    backgroundColor: '#0083C0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textButton: {
    fontSize: 18,
    color: 'white',
  },

});

export default styles;
