import { COLORS, FONT_SIZE } from "../../constants/theme.js"

export const styles = {
  doctor: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 8,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.gray4,
    margin: 3,
    borderRadius: 6,
  },
  name: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: FONT_SIZE.md,
    color: COLORS.gray1,
    marginTop: 3,
  },
  specialty: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray2,
  }, 
  icon: {
    width: 50,
    height: 50,
    marginRight: 8,
  }
}