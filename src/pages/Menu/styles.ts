import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#005783',
    paddingVertical: '20%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  logoDelta: {
    height: 150,
    width: 350,
  },

  textTeste: {
    fontSize: 16,
    color: '#121E3A',
  },

  buttonList: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 300,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 5 },
    backgroundColor: 'white',
    shadowRadius: 5,
  },

  textButton: {
    fontSize: 18,
    color: '#121E3A',
    fontWeight: '500',
  },
});

export default styles;
