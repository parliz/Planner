<template>
  <div class="calendar-page-content">
    <div class="task-list">
      <calendar-task :taskList="taskList"></calendar-task>
    </div>
    <div class="main-calendar">
      <calendar-header :current-month="currentMonth" :first-day="firstDay" :locale="locale" @change="emitChangeMonth">
        <div slot="header-left">
          <slot name="fc-header-left"> </slot>
        </div>

        <div slot="header-right">
          <slot name="fc-header-right"> </slot>
        </div>
      </calendar-header>

      <div class="full-calendar-body">
        <!-- <div class="weeks">
          <strong class="week" v-for="dayIndex in 7" v-bind:key="dayIndex">{{ (dayIndex - 1) | localeWeekDay(firstDay, locale) }}</strong>
        </div> -->

        <div class="dates" ref="dates">
          <div class="dates-bg">
            <div class="week-row" v-for="week in currentDates" v-bind:key="week">
              <the-day class="day-cell" v-for="day in week" v-bind:key="day.data" v-model="currentDay" :class="{ today: day.isToday, 'not-cur-month': !day.isCurMonth }" :day="day" @selectDay="selectDay"> </the-day>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import moment from "moment";
import CalendarTask from './CalendarTask.vue';
import calendarHeader from "./CalendarHeader.vue";
import TheDay from "./TheDay.vue";
export default {
  name: "MainCalendar",
  props: {
    locale: {
      type: String,
      default: "ru"
    },
    firstDay: {
      /*type : Number | String,*/
      validator(val) {
        let res = parseInt(val);
        return res >= 0 && res <= 6;
      },
      default: 0
    }
  },
  data() {
    return {
      currentMonth: moment().startOf("month"),
      currentDay: null,
      taskList: []
    };
  },
  mounted() {
    this.emitChangeMonth(this.currentMonth);
  },
  components: {
    calendarHeader,
    TheDay,
    CalendarTask
  },
  computed: {
    currentDates() {
      return this.getCalendar();
    }
  },
  methods: {
    emitChangeMonth(firstDayOfMonth) {
      this.currentMonth = firstDayOfMonth;
      let start = this.getMonthViewStartDate(firstDayOfMonth, this.firstDay);
      let end = this.getMonthViewEndDate(firstDayOfMonth, this.firstDay);
      this.$emit("changeMonth", start, end, firstDayOfMonth);
    },
    getCalendar() {
      // calculate 2d-array of each month
      let monthViewStartDate = this.getMonthViewStartDate(this.currentMonth, this.firstDay);
      let calendar = [];
      for (let perWeek = 0; perWeek < 6; perWeek++) {
        let week = [];
        for (let perDay = 0; perDay < 7; perDay++) {
          week.push({
            monthDay: monthViewStartDate.date(),
            isToday: monthViewStartDate.isSame(moment(), "day"),
            isCurMonth: monthViewStartDate.isSame(this.currentMonth, "month"),
            weekDay: perDay,
            date: moment(monthViewStartDate)
            //   events : this.slotEvents(monthViewStartDate)
          });
          monthViewStartDate.add(1, "day");
        }
        calendar.push(week);
      }
      return calendar;
    },
    selectDay(tasks) {
      this.taskList = tasks;
    }
  }
};
</script>
  
<style lang="scss">
.calendar-page-content {
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
.task-list {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.main-calendar {
  margin-right: 0rem;
  width: 50%;
  align-items: flex-end;
  justify-content: flex-end;
}}
.comp-full-calendar {
  // font-family: "elvetica neue", tahoma, "hiragino sans gb";
  padding: 20px;
  background: #fff;
  max-width: 960px;
  margin: 0 auto;
  ul,
  p {
    margin: 0;
    padding: 0;
  }
}
.full-calendar-body {
  margin-top: 20px;
  .weeks {
    display: flex;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    border-left: 1px solid #e0e0e0;
    .week {
      flex: 1;
      text-align: center;
      border-right: 1px solid #e0e0e0;
    }
  }
  .dates {
    position: relative;
    .week-row {
      // width: 100%;
      // position:absolute;
      border-left: 1px solid #e0e0e0;
      display: flex;
      .day-cell {
        flex: 1;
        min-height: 112px;
        padding: 4px;
        border-right: 1px solid #e0e0e0;
        border-bottom: 1px solid #e0e0e0;
        .day-number {
          text-align: right;
        }
        &.today {
          background-color: #fcf8e3;
        }
        &.not-cur-month {
          .day-number {
            color: rgba(0, 0, 0, 0.24);
          }
        }
      }
    }
    .dates-events {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      .events-week {
        display: flex;
        .events-day {
          cursor: pointer;
          flex: 1;
          min-height: 112px;
          overflow: hidden;
          text-overflow: ellipsis;
          .day-number {
            text-align: right;
            padding: 4px 5px 4px 4px;
            opacity: 0;
          }
          &.not-cur-month {
            .day-number {
              color: rgba(0, 0, 0, 0.24);
            }
          }
          .event-box {
            .event-item {
              cursor: pointer;
              font-size: 12px;
              background-color: #c7e6fd;
              margin-bottom: 2px;
              color: rgba(0, 0, 0, 0.87);
              padding: 0 0 0 4px;
              height: 18px;
              line-height: 18px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              &.is-start {
                margin-left: 4px;
                // border-top-left-radius:4px;
                // border-bottom-left-radius:4px;
              }
              &.is-end {
                margin-right: 4px;
                // border-top-right-radius:4px;
                // border-bottom-right-radius:4px;
              }
              &.is-opacity {
                opacity: 0;
              }
            }
            .more-link {
              cursor: pointer;
              // text-align: right;
              padding-left: 8px;
              padding-right: 2px;
              color: rgba(0, 0, 0, 0.38);
              font-size: 14px;
            }
          }
        }
      }
    }
    .more-events {
      position: absolute;
      width: 150px;
      z-index: 2;
      border: 1px solid #eee;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      .more-header {
        background-color: #eee;
        padding: 5px;
        display: flex;
        align-items: center;
        font-size: 14px;
        .title {
          flex: 1;
        }
        .close {
          margin-right: 2px;
          cursor: pointer;
          font-size: 16px;
        }
      }
      .more-body {
        height: 146px;
        overflow: hidden;
        .body-list {
          height: 144px;
          padding: 5px;
          overflow: auto;
          background-color: #fff;
          .body-item {
            cursor: pointer;
            font-size: 12px;
            background-color: #c7e6fd;
            margin-bottom: 2px;
            color: rgba(0, 0, 0, 0.87);
            padding: 0 0 0 4px;
            height: 18px;
            line-height: 18px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>
