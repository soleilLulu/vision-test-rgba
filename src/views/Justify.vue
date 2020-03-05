<template>
    <div class="entry-container">
        <div class="experiment-info">
            <div class="go-test-group">
                <!-- 实验展示图片 -->
                <b-button v-if="showEnterButton" class="goTest" type="is-primary" @click="startTest">Enter experiment</b-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userInfo: {},
            showEnterButton: false
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
            }
            setTimeout(() => {
                this.showEnterButton = true
            },60000)
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
    background-image: url('../assets/intro_bg.jpg');
    background-size: 100% 100%;
    .go-test-group {
        position: absolute;
        bottom: 5vh;
        left: 50%;
        transform: translate(-50%);
    }
}
</style>