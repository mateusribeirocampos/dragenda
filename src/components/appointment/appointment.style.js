import { appointments } from "../../constants/data.js"
import icon from "../../constants/icon.js"
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
  }, 
  icon: {
    width: 25, 
    height: 25,
    marginRight: 5,
  },
  bookingDate: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray2,
    marginTop:3,
  }, 
  bookingHour: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray2,
    marginTop:3,
  }, 
  booking: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerBooking: {
    flex: 1,
  },
  containerButton: {
    marginTop: 5,
  },
  container: {
    flexDirection: 'row',
    
  }
}