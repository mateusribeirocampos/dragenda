import { COLORS, FONT_SIZE } from "../../constants/theme.js"

export const styles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  banner: {
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 25,
  },
  name: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: FONT_SIZE.md,
    color: COLORS.white,
    marginTop: 5,
  },
  specialty: {
    fontFamily: 'Roboto',
    fontSize: FONT_SIZE.sm,
    color: COLORS.white,
    marginTop: 5,
  },
}