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
            isSubmitting: false
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
            if(this.isSubmitting)return 
            this.isSubmitting = true
            this.generateDataList(315)
            let length = this.resList.length;
            let perListLength = length / 2;
            let dataList1 = this.resList.slice(0,perListLength);
            let dataList2 = this.resList.slice(perListLength);

            submitExperimentInfo(dataList1).then(() => {
                submitExperimentInfo(dataList2).then(() => {
                    this.isSubmitting = false 
                    this.$buefy.toast.open({
                        message: 'submit success',
                        type: 'is-success'
                    })
                }).catch(e => {
                    this.$buefy.toast.open({
                        message: 'there is something wrong,please try submit again',
                        type: 'is-danger'
                    })
                    this.isSubmitting = false  
                    console.error(e)               
                })
            }).catch(e => {
                this.$buefy.toast.open({
                    message: 'there is something wrong,please try submit again',
                    type: 'is-danger'
                })
                this.isSubmitting = false
                console.error(e)  
            })
        }
    }
}
</script>