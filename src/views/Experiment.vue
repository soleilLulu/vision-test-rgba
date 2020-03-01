<template>
    <div class="experiment-container">
        <!-- 实验区域 -->
        <div class="experiment-zone">
            <div class="test-panel left" v-bind:style="leftPanelBgStyle">
                <span class="x-left" v-bind:style="leftPanelXStyle" ></span>
                <span class="x-right" v-bind:style="leftPanelXStyle" ></span>
            </div>
            <div class="test-panel right" v-bind:style="rightPanelBgStyle">
                <span class="x-left" v-bind:style="rightPanelXStyle"></span>
                <span class="x-right" v-bind:style="rightPanelXStyle"></span>
            </div>
        </div>
        <!-- 控制区域 -->
        <div class="control-zone">
            <b-button class="control-button" @click="goBack">Back</b-button>
            <b-button 
                v-for="(item,index) of buttonTextList" 
                v-bind:key="index" 
                :class="['data-button',{'active-b' : activeButton == index}]" 
                @click="chooseLevel(index)"
            >
                {{item}}
            </b-button>
            <b-button class="control-button" @click="goNext">
                {{
                 dataList.length-1 > currentIndex   ? `${currentIndex+1} / ${dataList.length}` : 'submit data'
                }}
            </b-button>
        </div>
    </div>
</template>
<script>
import {getRandomExperimentData} from '../helper/util'
import {submitExperimentInfo} from '../api'

const buttonTextList = [
    '1.no',
    '2.just noticeable',
    '3.small',
    '4.acceptable',
    '5.large',
    '6.extremely large'
]

export default {
    data() {
        return {
            dataList: [],
            currentIndex: 0,
            activeButton: -1,
            buttonTextList,
            resList: [],
            userInfo: {},
            isSubmitting: false
        }
    },
    computed: {
        leftPanelBgStyle: function() {
            // console.log('ojbk')
            if(!(this.dataList && this.dataList.length > 0))return 
            let rgbaA = this.dataList[this.currentIndex].Ra
            let rgbaB = this.dataList[this.currentIndex].Rb
            let rgbaC = this.dataList[this.currentIndex].Rc
            return {backgroundColor: `rgba(${rgbaA},${rgbaB},${rgbaC},1)`}
        },
        leftPanelXStyle: function() {
            if(!(this.dataList && this.dataList.length > 0))return 
            let rgbaA = this.dataList[this.currentIndex].Ta
            let rgbaB = this.dataList[this.currentIndex].Tb
            let rgbaC = this.dataList[this.currentIndex].Tc
            return {backgroundColor: `rgba(${rgbaA},${rgbaB},${rgbaC},1)`}           
        },
        rightPanelXStyle: function() {
            if(!(this.dataList && this.dataList.length > 0))return 
            let rgbaA = this.dataList[this.currentIndex].Pa
            let rgbaB = this.dataList[this.currentIndex].Pb
            let rgbaC = this.dataList[this.currentIndex].Pc
            return {backgroundColor: `rgba(${rgbaA},${rgbaB},${rgbaC},1)`}           
        },
        rightPanelBgStyle: function() {
            if(!(this.dataList && this.dataList.length > 0))return 
            let rgbaA = this.dataList[this.currentIndex].Ba
            let rgbaB = this.dataList[this.currentIndex].Bb
            let rgbaC = this.dataList[this.currentIndex].Bc
            return {backgroundColor: `rgba(${rgbaA},${rgbaB},${rgbaC},1)`}   
        }
    },
    mounted() {
       this.dataList = getRandomExperimentData(10)
       // 用户信息
       this.userInfo = this.$route.params.userInfo
       if(!this.userInfo){
           this.$router.push({
               name: 'Entry'
           })
       }
    },
    methods: {
        // 返回上一组
        goBack() {
            if(this.currentIndex > 0) {
                this.currentIndex --
                this.activeButton = -1
            }else {
                this.$buefy.toast.open({
                    message: 'This is already the first group',
                    type: 'is-danger'
                })
            }
        },
        // 下一组
        goNext() {
            if(this.activeButton < 0){
                this.$buefy.toast.open({
                    message: 'Must choose an option',
                    type: 'is-danger'
                })
                return 
            }
            // 把结果存进结果数组 如果有相同位置的 要覆盖掉
            let currentDataObject = this.dataList[this.currentIndex]
            this.resList[this.currentIndex] = {
                "dataset_id": currentDataObject.id,
                "targetR" : currentDataObject.Ta,
                "targetG" : currentDataObject.Tb,
                "targetB" : currentDataObject.Tc,
                "referenceR" :currentDataObject.Ra,
                "referenceG" : currentDataObject.Rb,
                "referenceB" : currentDataObject.Rc,
                "backgroundR" : currentDataObject.Ba,
                "backgroundG" : currentDataObject.Bb,
                "backgroundB" : currentDataObject.Bc,
                "user_name" : this.userInfo.name,
                "user_age" : this.userInfo.age,
                "user_gender" : this.userInfo.gender,
                "result" : this.activeButton+1 
            }
            if(this.currentIndex < this.dataList.length-1){
                // 索引加一
                this.currentIndex ++
                this.activeButton = -1
            }else {
                if(this.isSubmitting)return 
                this.isSubmitting = true

                //分割实验数据
                let length = this.resList.length;
                console.log(length)
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
                    setTimeout(() => {
                        this.isSubmitting = false
                        this.$router.push({
                            name: 'Entry'
                        })
                    },2000)
                })
                // 最后提交
                // submitExperimentInfo(this.resList).then((res) => {
                //     if(res.status == '200'){
                //         this.$buefy.toast.open({
                //             message: 'submit success',
                //             type: 'is-success'
                //         })
                //         setTimeout(() => {
                //             this.isSubmitting = false
                //             this.$router.push({
                //                 name: 'Entry'
                //             })
                //         },2000)
                //     }else {
                //         this.$buefy.toast.open({
                //             message: 'there is something wrong,please try again later',
                //             type: 'is-danger'
                //         })
                //         this.isSubmitting = false
                //     }

                // })
            }
        },
        // 选择等级
        chooseLevel(index) {
            this.activeButton = index
        }
    }
}
</script>
<style lang="less" scoped>
.experiment-container {
    width: 100%;
    height: 100%;
    position: relative;
    // display: flex;
    box-sizing: border-box;
    .control-zone {
        width: 100%;
        box-sizing: border-box;
        padding: 0rem 5rem;
        height: 10vh;
        // position: absolute;
        display: flex;
        align-items: center;
        background-color: #635e5e;
        justify-content: space-between;
        // bottom: 5vh;
        .data-button {
            background-color: #635e5e;
            color: #fff;
            font-weight: bold;
            border: 0px;
            &.active-b {
                border: 1px solid #fff;
            }
        }
    }
    
    .experiment-zone {
        width: 100%;
        display: flex;
        height: 90vh;
        .test-panel {
            width: 50%;
            position: relative;
            &.right {
                background-color: #ececec;
            }
            .x-left {
                display: block;
                position: absolute;
                top: 45vh;
                // left: -5vw;
                width: 90vh;
                transform: rotate(55deg);
                height: 1rem;
                background-color: #000;
            }
            .x-right {
                display: block;
                position: absolute;
                top: 45vh;
                // left: -5vw;
                width: 90vh;
                transform: rotate(-55deg);
                height: 1rem;
                background-color: #000;
            }
            &.left {
                background-color: #635e5e;
            }
        }
    }
    .control-button {
        border: 1px solid #fff;
        background-color: #635e5e;
        color: #fff;
        font-weight: bold;
    }
}
</style>