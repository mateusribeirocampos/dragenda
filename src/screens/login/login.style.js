import { COLORS, FONT_SIZE } from "../../constants/theme.js"

export const styles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 50,
    justifyContent: 'space-between',
  },

  containerLogo: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 100,
    height: 23,
  }, 

  containerInput: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: COLORS.gray5,
    padding: 10,
    borderRadius: 6,
  }, 
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  footerLink: {
    color: COLORS.blue,
  }
}