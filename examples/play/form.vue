<template>
    <jy-form ref="form" :model="form" size="small" label-width="80px">
        <jy-form-item label="活动名称">
            <jy-input v-model="form.name"></jy-input>
        </jy-form-item>
        <jy-form-item label="活动区域">
            <jy-select v-model="form.region" placeholder="请选择活动区域">
                <jy-option label="区域一" value="shanghai"></jy-option>
                <jy-option label="区域二" value="beijing"></jy-option>
            </jy-select>
        </jy-form-item>
        <jy-form-item label="活动时间">
            <jy-col :span="11">
                <jy-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></jy-date-picker>
            </jy-col>
            <jy-col class="line" :span="2">-</jy-col>
            <jy-col :span="11">
                <jy-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></jy-time-picker>
            </jy-col>
        </jy-form-item>
        <jy-form-item label="即时配送">
            <jy-switch v-model="form.delivery"></jy-switch>
        </jy-form-item>
        <jy-form-item label="活动性质">
            <jy-checkbox-group v-model="form.type">
                <jy-checkbox label="美食/餐厅线上活动" name="type"></jy-checkbox>
                <jy-checkbox label="地推活动" name="type"></jy-checkbox>
                <jy-checkbox label="线下主题活动" name="type"></jy-checkbox>
                <jy-checkbox label="单纯品牌曝光" name="type"></jy-checkbox>
            </jy-checkbox-group>
        </jy-form-item>
        <jy-form-item label="特殊资源">
            <jy-radio-group v-model="form.resource">
                <jy-radio label="线上品牌商赞助"></jy-radio>
                <jy-radio label="线下场地免费"></jy-radio>
            </jy-radio-group>
        </jy-form-item>
        <jy-form-item label="活动形式">
            <jy-input type="textarea" v-model="form.desc"></jy-input>
        </jy-form-item>
        <jy-form-item>
            <jy-button type="primary" @click="onSubmit">立即创建</jy-button>
            <jy-button>取消</jy-button>
        </jy-form-item>
    </jy-form>

</template>
<script>

  export default {

    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
