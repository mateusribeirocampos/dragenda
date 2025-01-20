import { COLORS, FONT_SIZE } from "../../constants/theme.js"

export const styles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'Space-between',
  },
  theme: {
    todayTextColor: COLORS.red,
    selectedDayBackgroundColor: COLORS.blue,
    selectedDayTextColor: COLORS.white,
    arrowColor: COLORS.blue,
  },
  textHour: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
    color: COLORS.gray2,
    height: 18,
    marginTop: 10,
    marginBottom: 0,  
  }
}