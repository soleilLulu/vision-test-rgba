import Vue from 'vue'
import Router from 'vue-router'
import Entry from '../views/Entry.vue'
import Experiment from '../views/Experiment.vue'
import Justify from '../views/Justify.vue'
import Data from '../views/DataStatic.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Entry',
      component: Entry
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
    }
  ]
})
