<template>
  <div class="container">
    <b-table
      :data="experimentDataList"
      paginated
      per-page="30"
      detail-key="id"
    >
      <template slot-scope="props">
        <b-table-column field="id" label="数据id" width="120" numeric sortable>
          {{ props.row.id }}
        </b-table-column>
        <b-table-column label="姓名" >
          {{ props.row.user_name }}
        </b-table-column>
        <b-table-column field="age" label="年龄" >
          {{ props.row.user_age }}
        </b-table-column>
        <b-table-column field="gender" label="性别">
          {{ props.row.user_gender }}
        </b-table-column>
        <b-table-column field="colorId" label="色值id"  numeric sortable>
          {{ props.row.dataset_id }}
        </b-table-column>
        <b-table-column label="用户评价">
          <span v-bind:class="['tag',styleTypeOfComment(props.row.result)]">
            {{typeOfComment(props.row.result)}}
          </span>
        </b-table-column>
        <!-- <b-table-column label="用户评价">
          {{ props.row.result }}
        </b-table-column> -->
      </template>
    </b-table>
    <div class="downloadData">
      <a class="button is-link" @click="downExcel">
        下载实验数据
      </a>
      <a class="button is-danger" @click="deleteData">
        删除实验数据
      </a>
    </div>
  </div>
</template>
<script>
import { toExcel } from '../helper/util'
import { getExperimentData, clearExperimentData } from '../api'

const buttonTextList = [
    '1.no',
    '2.just noticeable',
    '3.small',
    '4.acceptable',
    '5.large',
    '6.extremely large'
]

export default {
  data () {
    return {
      experimentDataList: []
    }
  },
  mounted () {
    getExperimentData().then(res => {
        this.experimentDataList = res.data
    })
  },
  methods: {
    // 获取后台数据
    // // 评价转换
    typeOfComment (result) {
        return buttonTextList[result-1]
    },
    styleTypeOfComment (response) {
      if (response == 1 || response == 2) {
        return 'is-success'
      } else if (response == 3 || response == 4) {
        return 'is-warning'
      } else if (response == 5 || response == 6) {
        return 'is-danger'
      }
    },
    // 将数据导为excel
    downExcel () {
      const th = ['数据ID', '姓名', '年龄', '性别','色值id', '用户评价']
      const filterVal = ['id', 'user_name', 'user_age', 'user_gender', 'dataset_id', 'result']
      const data = this.experimentDataList.map(v => filterVal.map(k => v[k]))
      console.log(data)
      const [fileName, fileType, sheetName] = ['测试数据', 'xlsx', '测试页']
      toExcel({th, data, fileName, fileType, sheetName})
    },
    // 删除全部数据
    deleteData() {
      this.$buefy.dialog.confirm({
          title: '删除实验数据',
          message: '确定要<b>删除</b>所有实验数据？删除前请确保实验数据已经下载，删除操作不可恢复',
          confirmText: '确认删除',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => {
            clearExperimentData().then(() => {
                getExperimentData()
            }).catch(error => {
            console.error(error)
              this.$buefy.toast.open({
                message: '删除失败',
                type: 'is-danger'
              })
            })    
          }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.downloadData {
  display: flex;
  justify-content: space-between;
  a {
    margin-left: 30px;
    margin-right: 30px;
  }
}
</style>
