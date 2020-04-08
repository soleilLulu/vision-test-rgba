import Vue from 'vue'
import Router from 'vue-router'
//import Entry from '../views/Entry.vue'
import Close from '../views/Close.vue'
import Experiment from '../views/Experiment.vue'
import Justify from '../views/Justify.vue'
import Data from '../views/DataStatic.vue'
import Test from '../views/Test.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Entry',
      component: Close
    },
    {
      path: '/experiment',
      name: 'Experiment',
      component: Experiment
    },
    {
      path: '/justify',
      name: 'Justify',
      component: Justify      
    },
    {
      path: '/data',
      name: 'Data',
      component: Data
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})
