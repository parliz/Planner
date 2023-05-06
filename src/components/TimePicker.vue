<template>
    <div>
      <button class="date-picker-btn" @click="showHourPicker = true">
        {{ formattedStartDate ? `${formattedStartDate} - ${formattedEndDate}` : 'Выбрать время' }}
      </button>
  
      <div v-if="showHourPicker">
        <div class="picker-backdrop" @click="closePickers"></div>
  
        <div class="date-picker-hour-picker">
          <h2>Выберите время начала</h2>
  
          <div class="date-picker-hour-picker-body">
            <div class="date-time-input">
              <input type="number" v-model.number="startHour" min="0" max="23" placeholder="ЧЧ">
              <span>:</span>
              <input type="number" v-model.number="startMinute" min="0" max="59" placeholder="ММ">
            </div>
  
            <button class="date-time-input-submit" @click="showMinutePicker = true">
              Продолжить
            </button>
          </div>
        </div>
  
        <div v-if="showMinutePicker" class="date-picker-minute-picker">
          <h2>Выберите время окончания</h2>
  
          <div class="date-picker-minute-picker-body">
            <div class="date-time-input">
              <input type="number" v-model.number="endHour" min="0" max="23" placeholder="ЧЧ">
              <span>:</span>
              <input type="number" v-model.number="endMinute" min="0" max="59" placeholder="ММ">
            </div>
  
            <button class="date-time-input-submit" @click="submitDates">
              Выбрать
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DateRangePicker',
  
    data() {
      return {
        showHourPicker: false,
        showMinutePicker: false,
        startHour: null,
        startMinute: null,
        endHour: null,
        endMinute: null,
      };
    },
  
    computed: {
      formattedStartDate() {
        if (!this.startHour || !this.startMinute) return null;
  
        const startDate = new Date(this.startDate);
        startDate.setHours(this.startHour);
        startDate.setMinutes(this.startMinute);
  
        return startDate.toLocaleString();
      },
  
      formattedEndDate() {
        if (!this.endHour || !this.endMinute) return null;
  
        const endDate = new Date(this.endDate);
        endDate.setHours(this.endHour);
        endDate.setMinutes(this.endMinute);
  
        return endDate.toLocaleString();
      },
    },
  
    props: {
      startDate: {
        type: String,
        default: new Date().toISOString(),
      },
      endDate: {
        type: String,
        default: new Date().toISOString(),
      }
    },
  
    methods: {
      closePickers() {
        this.showHourPicker = false;
        this.showMinutePicker = false;
  
        this.resetValues();
      },
  
      resetValues() {
        this.startHour = null;
        this.startMinute = null;
        this.endHour = null;
        this.endMinute = null;
      },
  
      submitDates() {
        if (!this.formattedStartDate || !this.formattedEndDate) return;
  
        this.showHourPicker = false;
        this.showMinutePicker = false;
  
        this.$emit('dates-picked', {
          startDate: this.formattedStartDate,
          endDate: this.formattedEndDate,
        });
  
        this.resetValues();
      },
    },
  };
  </script>
  
  <style>
  .date-picker-btn {
    padding: 10px 20px;
    background-color: #000000;
    color: #ed17ed;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .picker-backdrop {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }
  
  .date-picker-hour-picker,
  .date-picker-minute-picker {
    position: fixed;
    z-index: 1000;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -25%);
    background-color: #fff;
    width: 400px;
    padding: 20px;
    border: 1px solid #ccc;
  }
  
  .date-picker-hour-picker h2,
  .date-picker-minute-picker h2 {
    font-size: 24px;
    margin: 0;
    margin-bottom: 20px;}
