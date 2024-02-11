import { createRouter, createWebHistory } from 'vue-router';
import monsterList from '@/views/monster/monsterList.vue';
import monsterCreation from '@/views/monster/monsterCreation/monsterCreation.vue';
import monsterDetail from '@/views/monster/monsterDetail/monsterDetail.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/monster',
      name: 'monster',
      component: monsterList
    },
    {
      path: '/monsters/Newmonster',
      name: 'newMonsters',
      component: monsterCreation
    },
    {
      path: '/monsters/:id',
      name: 'monsterDetail',
      component: monsterDetail,
      props: true
    },
  ]
})

export default router
