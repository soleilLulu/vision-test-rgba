<template>
    <div>
        <b-button type="is-primary" @click="submitInfo">测试提交315条数据</b-button>
    </div>
</template>
<script>
import {submitExperimentInfo} from '../api'

const singleData = {
    "dataset_id":"3254 ",
    "targetR":"0 ",
    "targetG":"183 ",
    "targetB":"255 ",
    "referenceR":"119 ",
    "referenceG":"120 ",
    "referenceB":"118 ",
    "backgroundR":"171 ",
    "backgroundG":"77 ",
    "backgroundB":"115 ",
    "user_name":"213",
    "user_age":"23",
    "user_gender":"Male",
    "result":6
}

export default {
    data() {
        return {
            resList: [],
        }
    },
    methods: {
        // 生成315条测试数据
        generateDataList(num) {
            for(let i=0;i<num;i++){
                this.resList.push(singleData)
            }
        },
        submitInfo() {
            this.generateDataList(315)
            let length = this.resList.length
            // 测试提交
            let perListLength = length / 3;
            let dataList1 = this.resList.slice(0,perListLength);
            let dataList2 = this.resList.slice(perListLength,perListLength*2);
            let dataList3 = this.resList.slice(perListLength*2);

            let promise1 = submitExperimentInfo(dataList1)
            let promise2 = submitExperimentInfo(dataList2)
            let promise3 = submitExperimentInfo(dataList3)

            Promise.all([promise1,promise2,promise3]).then(res => {
                console.log(res)
                this.$buefy.toast.open({
                    message: 'submit success',
                    type: 'is-success'
                })
            }).catch(e => {
                console.error(e)
                 this.$buefy.toast.open({
                    message: 'submit fail',
                    type: 'is-danger'
                })               
            })
        }
    }
}
</script>