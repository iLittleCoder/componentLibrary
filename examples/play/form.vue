<template>
    <gj-form ref="form" :model="form" size="small" label-width="80px">
        <gj-form-item label="活动名称">
            <gj-input v-model="form.name"></gj-input>
        </gj-form-item>
        <gj-form-item label="活动区域">
            <gj-select v-model="form.region" placeholder="请选择活动区域">
                <gj-option label="区域一" value="shanghai"></gj-option>
                <gj-option label="区域二" value="beijing"></gj-option>
            </gj-select>
        </gj-form-item>
        <gj-form-item label="活动时间">
            <gj-col :span="11">
                <gj-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></gj-date-picker>
            </gj-col>
            <gj-col class="line" :span="2">-</gj-col>
            <gj-col :span="11">
                <gj-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></gj-time-picker>
            </gj-col>
        </gj-form-item>
        <gj-form-item label="即时配送">
            <gj-switch v-model="form.delivery"></gj-switch>
        </gj-form-item>
        <gj-form-item label="活动性质">
            <gj-checkbox-group v-model="form.type">
                <gj-checkbox label="美食/餐厅线上活动" name="type"></gj-checkbox>
                <gj-checkbox label="地推活动" name="type"></gj-checkbox>
                <gj-checkbox label="线下主题活动" name="type"></gj-checkbox>
                <gj-checkbox label="单纯品牌曝光" name="type"></gj-checkbox>
            </gj-checkbox-group>
        </gj-form-item>
        <gj-form-item label="特殊资源">
            <gj-radio-group v-model="form.resource">
                <gj-radio label="线上品牌商赞助"></gj-radio>
                <gj-radio label="线下场地免费"></gj-radio>
            </gj-radio-group>
        </gj-form-item>
        <gj-form-item label="活动形式">
            <gj-input type="textarea" v-model="form.desc"></gj-input>
        </gj-form-item>
        <gj-form-item>
            <gj-button type="primary" @click="onSubmit">立即创建</gj-button>
            <gj-button>取消</gj-button>
        </gj-form-item>
    </gj-form>

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
