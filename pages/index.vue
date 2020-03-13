<template>
  <div class="wrapper">
    <div class="container">
      <div class="details">
        <card v-for="(user, index) in users" :user="user" :key="index"/>
        <div class="form">
          <div class="input-field">
            <label for="quantity">Колличество</label>
            <input
                id="quantity"
                type="number"
                v-model="quantity"
            >
            
            <span 
              class="input-field__error"
              v-if="error"
            >
              {{error}}
            </span>
          </div>
          <div class="radio-block">
            <div>Chose gender</div>
            <input type="radio" id="male" value="male" v-model="gender">
            <label for="male">male</label>
            <input type="radio" id="female" value="female" v-model="gender">
            <label for="woman">female</label>
            <input type="radio" id="any" v-model="gender">
            <label for="any">any</label>
          </div>
        </div>
        <div class="button-group">
          <button @click="loadUsers">Update</button> 
          <button @click="loadMore">Load More</button>
          <button @click="nextPage">Next Page ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
export default {
  async fetch({store}) {
    if(store.getters['users/users']){
      await store.dispatch('users/fetch')
    }
  },
  data: () =>({
    quantity: 3,
    gender: '',
    error: '',
    page: 1
  }), 
  computed: {
    users() {
      return this.$store.getters['users/users']
    }
  },
  methods: {
    async loadUsers() {
      this.findError()
        if(this.error){
          return
        }
      const formData = {
        quantity: this.quantity,
        gender: this.gender ? `&gender=${this.gender}` : '',
        page: `&page=1`,
        type: 'setUsers'
      }
      await this.$store.dispatch('users/newList', formData)
    },
    async loadMore() {
        this.findError()
        if(this.error){
          return
        }
        const formData = {
          quantity: this.quantity,
          gender: this.gender ? `&gender=${this.gender}` : '',
          page: `&page=${this.page}`,
          type: 'uploadUsers'
        }
        await this.$store.dispatch('users/newList', formData)
    },
    async nextPage() {
      this.findError()
        if(this.error){
          return
        }
        this.page++
        const formData = {
          quantity: this.quantity,
          gender: this.gender ? `&gender=${this.gender}` : '',
          page: `&page=${this.page}`,
        }
        await this.$store.dispatch('users/nextPage', formData)
    },
    findError(){
      if(this.quantity < 1){
        this.error = 'должен быть минимум один пользователь'
      }
      else if(this.quantity > 20){
        this.error= 'максимальное число пользователей 20'
      } else {
        this.error = ''
      }
    }
  },
  components: {
    card
  }
}
</script>

<style lang="sass">
.wrapper
  width: 100%
  height: 100%
  background: #2c2e31
  text-align: center
  padding-top: 20px
.container
  max-width: 730px
  margin: auto
  overflow: hidden
.form
  background: #fff
  display: flex
  padding: 20px
  justify-content: space-around
.input-field
  position: relative
  input
    display: block
  .input-field__error
    display: block
    color: red
  label
    display: block
    text-align: left 
.radio-block
  position: relative
.button-group
  background: #ccc
  padding: 10px
  display: flex
  justify-content: space-around
  button
    text-decoration: none
    outline: none
    display: inline-block
    background-image: linear-gradient(45deg, #6ab1d7 0%, #33d9de 50%, #002878 100%)
    background-position: 100% 0
    background-size: 200% 200%
    color: white
    cursor: pointer
    border-radius: 30px
    border: none
    padding: 12px 30px
    margin: 10px 20px
    font-family: 'Montserrat', sans-serif
    font-size: 16px
    font-weight: 300
    box-shadow: 0 16px 32px 0 rgba(0, 40, 120, .35)
    transition: .5s
    &:hover
      box-shadow: 0 0px 0px 0 rgba(0, 40, 120, 0)
      background-position: 0 0

</style>
