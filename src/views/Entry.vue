<template>
    <div class="info-container">
        <b-field label="Name">
            <b-input v-model="name"></b-input>
        </b-field>
        <b-field label="Gender">
            <div class="radio-group">
                <b-radio v-model="gender"
                    native-value="Female">
                    Female
                </b-radio>
                <b-radio v-model="gender"
                    native-value="Male">
                    Male
                </b-radio>
            </div>
        </b-field>
        <b-field label="Age">
            <b-input v-model="age" type="number"></b-input>
        </b-field>  
        <b-field label="University">
            <b-input v-model="university"></b-input>
        </b-field>
        <div class="button-div">
            <b-button type="is-primary" @click="goPrepare">Enter experiment</b-button> 
        </div>    
    </div>
</template>
<script>
export default {
    data() {
        return {
            name: '',
            gender: '',
            age: '',
            university: ''
        }
    },
    methods: {
        goPrepare() {
            if(!this.name){
                this.$buefy.toast.open({
                    message: 'Name is empty',
                    type: 'is-danger'
                })
                return 
            }
            if(!this.gender) {
                this.$buefy.toast.open({
                    message: 'Gender is empty',
                    type: 'is-danger'
                })   
                return           
            }
            if(!this.age) {
                this.$buefy.toast.open({
                    message: 'Age is empty',
                    type: 'is-danger'
                }) 
                return                  
            }
            if(!this.university) {
                this.$buefy.toast.open({
                    message: 'University is empty',
                    type: 'is-danger'
                }) 
                return                  
            }
            // 进入实验准备页
            this.$router.push({
                name: 'Justify',
                params: {
                    name: this.name.concat(this.university),
                    gender: this.gender,
                    age: this.age
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.info-container {
    width: 60vw;
    height: 60vh;
    margin: 10vh auto;
    .button-div{
        margin-top: 40px;
        width: 100%;
        text-align: center;
    }
}
</style>