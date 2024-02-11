<template>
    <div @click="showUserModal">
        <div>
            <img  
                :src = "urlImage"
                width="60" 
            />
        </div>
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
    </div>
</template>

<script setup lang="ts">
    import  DefualtImage  from '@/assets/images/avatar.png';
    import { computed, ref } from 'vue';
    import Menu from 'primevue/menu';
    import { useI18n } from 'vue-i18n';

    const { t }  = useI18n();
    const menu = ref();

    const items = ref([
    {
        label: 'Options',
        items: [
                {
                    label: `${t('UserProfile.title')}`,
                    icon: 'pi pi-user',
                    command: () => {

                    }
                },
                {
                    label: `${t('UserProfile.logout')}`,
                    icon: 'pi pi-sign-out',
                    command: () => {

                    }
                }
            ]
        } 
    ]);

    const emits = defineEmits<{
        (event: 'showUserModal'): void,
    }>();

    const showUserModal = (event: any) => {
        menu.value.toggle(event);
    }

    const urlImage = computed(() => DefualtImage);

</script>