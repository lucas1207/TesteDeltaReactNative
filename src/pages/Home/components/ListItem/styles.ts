import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#ffffff20',
    backgroundColor: '#ffffff20',
    marginBottom: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },

  textTitle: {
    fontSize: 40,
    color: 'white',
  },

  viewInfo: {
    marginLeft: 15,
    paddingRight: 90,
    height: '100%',
    justifyContent: 'space-evenly',
  },

  iconLeft: {
    position: 'absolute',
    right: 20,
  },

  textName: {
    fontSize: 18,
    color: 'white',
  },

  textAdress: {
    fontSize: 13,
    color: 'white',
  },

  imageAvatar: {
    height: 70,
    width: 70,
    marginLeft: 20,
    borderRadius: 200,
    resizeMode: 'contain',
  },

  viewMenu: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  buttonBack: {
    height: '100%',
    width: 60,
    position: 'absolute',
    left: 0,
    paddingLeft: 10,
    justifyContent: 'center',
  },

  viewIcon: {
    height: '100%',
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
