<template>
    <div class="info-container">
        <b-field label="Language/语言">
            <div class="radio-group">
                <b-radio v-model="language" @click.native="toChinese()"
                    native-value="Chinese" >
                    中文
                </b-radio>
                <b-radio v-model="language" @click.native="toEnglish()"
                    native-value="English" >
                    English
                </b-radio>
            </div>
        </b-field>
        <b-field :label="this.L_Name">
            <b-input v-model="name"></b-input>
        </b-field>
        <b-field :label="this.L_Gender">
            <div class="radio-group">
                <b-radio v-model="gender"
                    native-value="Female">
                    {{this.L_Female}}
                </b-radio>
                <b-radio v-model="gender"
                    native-value="Male">
                    {{this.L_Male}}
                </b-radio>
            </div>
        </b-field>
        <b-field :label="this.L_Age">
            <b-input v-model="age" type="number"></b-input>
        </b-field>  
        <b-field :label="this.L_University">
            <b-input v-model="university"></b-input>
        </b-field>
        <div class="button-div">
            <b-button type="is-primary" @click="goPrepare()">{{this.L_Enter}}</b-button> 
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
            university: '',
            language: '',
            L_Name: 'Name',
            L_Gender: 'Gender',
            L_Female: 'Female',
            L_Male: 'Male',
            L_Age: 'Age',
            L_University: 'University',
            L_Enter: 'Enter experiment',
        }
    },

    methods: {
        toChinese(){
            console.log(this.language),
            this.L_Name = '姓名',
            this.L_Gender = '性别',
            this.L_Female = '女',
            this.L_Male = '男',
            this.L_Age = '年龄',
            this.L_University = '学校',
            this.L_Enter = '进入实验'
            
        },
        toEnglish(){
            console.log(this.language),
            this.L_Name = 'Name',
            this.L_Gender = 'Gender',
            this.L_Female = 'Female',
            this.L_Male = 'Male',
            this.L_Age = 'Age',
            this.L_University = 'University',
            this.L_Enter = 'Enter experiment'
            
        },        
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
            if(!this.language) {
                this.$buefy.toast.open({
                    message: 'Language is empty',
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
                    age: this.age,
                    language: this.language
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