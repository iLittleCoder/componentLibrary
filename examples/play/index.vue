<template>
  <div class="tree-demo">
    <jy-tree
      ref="jyTree"
      :data="data"
      :default-expanded-keys="[2, 3]"
      :default-checked-keys="[5]"
      node-key="id"
      :props="defaultProps"
    >
    </jy-tree>
    <jy-chart :theme="theme" type="line" :chartOptions="chartOptions"></jy-chart>
  </div>
</template>

<script>
export default {
  data() {
    let list = [
      [10, 5, 6, 6, 7, 8, 9],
      [5, 3, 4, 4, 7, 9, 10],
      [4, 5, 6, 6, 6, 6, 6],
      [8, 5, 6, 5, 4, 6, 7]
    ].map((item, key) => {
      return {
        data: item,
        name: `项目名称${key + 1}`,
        stack: 'one',
        areaStyle: {} // 面积图一定要设置areaStyle属性
      };
    });
    return {
      theme: 'White',
      chartOptions: {
        legend: {
          icon: 'triangle',
          legends: ['项目名称1', '项目名称2', '项目名称3', '项目名称4', '项目名称5']
        },
        xAxis: {
          boundaryGap: false,
          data: ['2016年', '2017年', '2018年', '2019年', '2020年', '2021年', '2022年']
        },
        yAxis: {
          name: '指标单位'
        },
        grid: { bottom: 40, right: 20 },
        series: list
      },
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.jyTree.setCurrentKey(5);
    });
  },
  methods: {
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    handleNodeClick(data) {
      console.log(data);
    }
  }
};
</script>
