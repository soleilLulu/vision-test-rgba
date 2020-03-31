<template>
    <div class="entry-container" :style="`background-image: url('${this.address}')`">
        <div class="experiment-info">
            <div class="go-test-group">
                <!-- 实验展示图片 -->
                <b-button v-if="showEnterButton" class="goTest" type="is-primary" @click="startTest">{{this.L_Enter}}</b-button>
            </div>
        </div>
    </div>
</template>
<script>
const IMAGE_PREFIX = 'http://q81pwdif0.bkt.clouddn.com'
export default {
    data() {
        return {
            userInfo: {},
            showEnterButton: false ,
            L_Enter: 'Enter experiment',
            address: `${IMAGE_PREFIX}/Instruction_EN.jpg`,
        }
    },
    methods: {
        startTest() {
            this.$router.push({
                name: 'Experiment',
                params: {
                    userInfo: this.userInfo
                }
            }) 
        }
    },
    mounted() {
        // 检查是否是从entry页进入
        if(!this.$route.params.name){
            this.$router.push({
                name: 'Entry'
            })
        }else {
            this.userInfo = {
                name: this.$route.params.name,
                gender: this.$route.params.gender,
                age: this.$route.params.age,
                language: this.$route.params.language,
            }
            setTimeout(() => {
                this.showEnterButton = true
            },60000)
        }
        console.log(this.$route.params.language)
        let str = this.$route.params.language
        if (str == 'Chinese'){
            this.address = `${IMAGE_PREFIX}/Instruction_CH.jpg`
            this.L_Enter = '进入实验'
        }else {
            this.address = `${IMAGE_PREFIX}/Instruction_EN.jpg`
            this.L_Enter = 'Enter experiment'
        }
    }
}
</script>
<style lang="less" scoped>
.entry-container {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    position: relative;
    padding: 4rem 5rem;
    background-size: 100% 100%;
    .go-test-group {
        position: absolute;
        bottom: 5vh;
        left: 50%;
        transform: translate(-50%);
    }
}
</style>