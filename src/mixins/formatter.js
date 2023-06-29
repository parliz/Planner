import moment from "moment";
export default {
  data() {
    return {
      accessToken: ""
    };
  },
  methods: {
    changeLocale(sLocale) {
      this.$i18n.locale = sLocale;
      this.$moment.locale(sLocale);
    },
    getMonthViewStartDate(date, firstDay) {
      firstDay = parseInt(firstDay);
      let start = moment(date);
      let startOfMonth = moment(start.startOf("month"));

      start.subtract(startOfMonth.day(), "days");

      if (startOfMonth.day() < firstDay) {
        start.subtract(7, "days");
      }
      start.add(firstDay, "days");
      return start;
    },
    getMonthViewEndDate(date) {
      return this.getMonthViewStartDate().add(6, "weeks");
    },
    formatTimeField(sText) {
      let oDate = this.$moment(sText);
      return sText && oDate.isValid() ? oDate.fromNow() : "—";
    },
    formatTextField(sText) {
      return sText ? sText : "—";
    },
    formatterDate(sText) {
      return sText ? this.$moment(sText).format("HH:MM DD/MM/YYYY") : "—";
    }
  }
};
