import { COLORS, FONT_SIZE } from "../../constants/theme.js"

export const styles = {
  service: {
    flex: 1,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.gray4,
  },
  containerText: {
    flex: 1,
  },
  containerButton: {
    marginTop: 5,
  },

  description: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: FONT_SIZE.md,
    color: COLORS.gray3,
    marginTop: 5,
  },
  price: {
    fontFamily: 'Roboto',
    fontSize: FONT_SIZE.sm,
    color: COLORS.blue,
    margin: 5,
  },
}