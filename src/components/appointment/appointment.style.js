import { appointments } from "../../constants/data.js"
import { COLORS, FONT_SIZE } from "../../constants/theme.js"

export const styles = {
  appointment: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.gray4,
  },

  name: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: FONT_SIZE.md,
    color: COLORS.gray1,
    marginBottom: 2,
  },

  specialty: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: FONT_SIZE.md,
    color: COLORS.gray2,
    marginBottom: 4,
  }
}