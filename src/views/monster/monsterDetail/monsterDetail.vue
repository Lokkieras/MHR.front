<template>
    <div class="flex justify-content-end mb-2">
        <MHBaseButton
            icon="pi pi-users"
            class="mr-2"
            @click="routerNavigation" 
            :label="$t('monsterDetail.edit')"
        />
    </div>
    <div class="grid">
        <div class="col-3">
            <MHBaseLabel
                :value="monsterDetail.name"
                :label="$t('monsterDetail.name')"
            />                     
        </div>
    </div>
</template>

<script setup lang="ts">
    import monsterDetailsState from '@/application/monster/monsterDetails';
    import monsterCreationState from '@/application/monster/monsterCreation';
    import {useRouter} from "vue-router";
    import { onMounted, onBeforeUnmount } from 'vue';
    import MHBaseLabel from '@/components/baseComponents/MHBaseLabel.vue';
    import { useI18n } from 'vue-i18n';
    import MHBaseButton from '@/components/baseComponents/MHBaseButton.vue';
    import headerState from "@/application/header";

    const { t } = useI18n();
    const { setHeaderMessage, resetHeaderState } = headerState();
    const router = useRouter();

    const props = defineProps<{
        id: number;
    }>();

    const {tryGetMonsterById, resetState, monsterDetail} = monsterDetailsState();
    const {setState} = monsterCreationState();
    
    onMounted(async () => {
        setHeaderMessage(t("monsterDetail.title"));
        await tryGetMonsterById(props.id);
    });

    onBeforeUnmount(() => {
        resetState();
        resetHeaderState();
    });

    const routerNavigation = async() =>{
        setState(monsterDetail.value);
        router.push({ name: 'newMonsters'});  
    };

</script>

<style src="./monsterDetail.scss"/>