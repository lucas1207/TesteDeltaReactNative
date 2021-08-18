import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    backgroundColor: '#000000cc',
    position: 'absolute',
  },

  container: {
    height: '85%',
    width: '100%',
    position: 'absolute',
    backgroundColor: '#f2f2f2',
    bottom: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
    paddingTop: 35,
  },

  iconClose: {
    position: 'absolute',
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    left: 5,
    top: 5,
  },

  textTitle: {
    fontSize: 25,
    color: '#121E3A',
    marginBottom: 20,
  },

  input: {
    height: 50,
    marginVertical: 20,
    width: '80%',
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#121E3A',
    borderRadius: 10,
    fontSize: 16,
    color: '#121E3A',
  },
});

export default styles;
