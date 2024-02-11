<template>

  <div class="grid mb-5">
      <div class="col-4">
              <MHBaseTextField v-model:value="newMonster.name" :label='$t("newMonster.name")' />
      </div>
      <div class="col-4">
              <MHBaseAutocomplete 
                v-model:value="newMonster.TypeID"
                :label='$t("newMonster.Type")'  
                :items=types
                translation="params.monster_type" 
              />
      </div>
      <div class="col-4">
              <MHBaseInputNumber v-model:value="newMonster.ThreatLevel" :label='$t("newMonster.ThreatLevel")' />
      </div>
      <div class="col-4">
              <MHBaseInputNumber v-model:value="newMonster.Min" :label='$t("newMonster.Min")' />
      </div>
      <div class="col-4">
              <MHBaseInputNumber v-model:value="newMonster.Max" :label='$t("newMonster.Max")' />
      </div>
  </div>

  <div class="mt-3 flex justify-content-end">
    <MHBaseButton 
        @action-click="saveMonster"
        :label="$t('newMonster.save')" 
    />
  </div>
  
</template>


<script setup lang="ts">
  import monsterCreationState from '@/application/monster/monsterCreation';
  import headerState from '@/application/header';
  import { onBeforeUnmount, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import MHBaseButton from '@/components/baseComponents/MHBaseButton.vue';
  import { useErrorHandling}  from '@/Share/utils/errorHandling';
  import messageState from '@/application/messageState';
  import { useI18n } from 'vue-i18n';
  import { Severity } from '@/Share/constants/enums/Severity';
  import MHBaseTextField from '@/components/baseComponents/MHBaseTextField.vue';
  import MHBaseInputNumber from '@/components/baseComponents/MHBaseInputNumber.vue';
  import MHBaseAutocomplete from '@/components/baseComponents/MHBaseAutocomplete.vue';

  const { resetHeaderState } = headerState();
  const { errors } = useErrorHandling();

  const router = useRouter();
  const {trySaveNewMonster, tryUpdateMonster,  tryGetTypes, resetState, newMonster, types } = monsterCreationState();
  const { setMessage } = messageState();
  const { t } = useI18n();

  onMounted(async () => {
    await tryGetTypes();
  });

  onBeforeUnmount(() => {
    resetState();
    resetHeaderState();
  });

  const routerNavigation = () =>{
    router.push({ path: `/monsters/${newMonster.value.id}`});
  }

  const saveMonster = async () => {
    let monsterRequest = {...newMonster.value,
      TypeID: newMonster.value.TypeID.id
    }

    let response;
    try {
      if(newMonster.value.id){ 
        response = await tryUpdateMonster(monsterRequest);
      }else{
        response = await trySaveNewMonster(monsterRequest);
      } 

      if (response && response.errorCode) {
        setMessage(t(`errors.${response!.errorCode}`), Severity.ERROR);
      }

      else if (Object.keys(errors.value).length === 0)
        routerNavigation();

    } catch (error) {
      console.error(error)
    }
 
  }   
 
</script>