import { COLORS, FONT_SIZE } from "../../constants/theme.js"

export const styles = {
  btn: {
      width: '100%',
      backgroundColor: COLORS.blue,
      borderRadius: 6,
      padding: 12,
  },
  primary: {
    backgroundColor: COLORS.blue,
  },
  danger: {
    backgroundColor: COLORS.red,
  },
  text: {
    color: COLORS.white,
    fontSize: FONT_SIZE.md,
    textAlign: 'center',
  }
}