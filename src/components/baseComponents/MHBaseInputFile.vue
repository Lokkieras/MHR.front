<template>
  <div class="card">
      <Toast />
      <FileUpload name="uploadFiles"
        :multiple="true"  
        @select="onSelectedFiles">
          <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
            <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
                <div class="flex gap-2">
                    <Button @click="chooseCallback()" icon="pi pi-file" rounded outlined></Button>
                    <Button @click="uploadEvent(uploadCallback, files)" icon="pi pi-cloud-upload" rounded outlined severity="success" :disabled="!files || files.length === 0"></Button>
                    <Button @click="clearCallback()" icon="pi pi-times" rounded outlined severity="danger" :disabled="!files || files.length === 0"></Button>
                </div>
            </div>
          </template>
          <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
              <div v-if="files.length > 0">
                  <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                      <div v-for="(file, index) of files" :key="file.name + file.type + file.size" class="internal card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                          <div>
                              <Image :alt="file.name" :src="getImageSrc(file)" cover  width="180" height="130" class="shadow-2" />
                          </div>
                          <span class="font-semibold">{{ file.name }}</span>
                          <div>{{ formatSize(file.size) }}</div>
                          <Badge value="Pending" severity="warning" />
                          <Button icon="pi pi-times" @click="onRemoveTemplatingFile(file, removeFileCallback, index)" outlined rounded  severity="danger" />
                      </div>
                  </div>
              </div>

              <div v-if="uploadedFiles.length > 0">
                  <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                      <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size" class="internal card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                          <div>
                              <Image :alt="file.name" :src="getImageSrc(file)" cover  width="180" height="130" class="shadow-2" />
                          </div>
                          <span class="font-semibold">{{ file.name }}</span>
                          <div>{{ formatSize(file.size) }}</div>
                          <Badge value="Completed" class="mt-3" severity="success" />
                          <Button icon="pi pi-times" @click="removeUploadedFileCallback(index)" outlined rounded  severity="danger" />
                      </div>
                  </div>
              </div>
          </template>
          <template #empty>
              <div class="flex align-items-center justify-content-center flex-column">
                  <i class="pi pi-cloud-upload border-2 border-circle p-5 text-8xl text-400 border-400" />
                  <p class="mt-4 mb-0">{{ $t('inputFile.empty') }}</p>
              </div>
          </template>
      </FileUpload>
  </div>
</template>

<script lang="ts" setup>
  import FileUpload from "primevue/fileupload";
  import Button from "primevue/button";
  import Badge from "primevue/badge";
  import { ref, type Ref } from "vue";
  import Toast from "primevue/toast";
  import ExcelIcon from "@/assets/images/ExcelIcon.png";
  import PDFIcon from "@/assets/images/PDFIcon.png";
  import WordIcon from "@/assets/images/WordIcon.png";
  import GenericFileIcon from '@/assets/images/GenericFileIcon.png'
  import Image from 'primevue/image';

  const emits = defineEmits<{
    (event: 'upload', files: File[]) : void
  }>();

  const totalSize = ref(0);
  const totalSizePercent = ref(0);
  const files: Ref<any[]> = ref([]);

  const onRemoveTemplatingFile = (file: any, removeFileCallback: any, index: any) => {
    removeFileCallback(index);
    totalSize.value -= parseInt(formatSize(file.size));
    totalSizePercent.value = totalSize.value / 10;
  };

  const onClearTemplatingUpload = (clear: any) => {
      clear();
      totalSize.value = 0;
      totalSizePercent.value = 0;
  };

  const onSelectedFiles = (event: any) => {
    files.value = event.files;
  };

  const uploadEvent = (callback: any, files: File[]) => {
    totalSizePercent.value = totalSize.value / 10;
    emits('upload', files);
    callback();
  };

  const getImageSrc = (file: File) => {

   console.log(file.type);
   switch (file.type) {
    
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    case 'application/vnd.ms-excel':
      return ExcelIcon;
      break;
    case 'application/pdf':
      return PDFIcon;
      break;

    case 'application/msword':
      return WordIcon;
      break;

    case 'image/jpeg':
    case 'image/jpg':
    case 'image/png':
      return URL.createObjectURL(file);
      break;
   
    default:
      return GenericFileIcon;
      break;
   }

   
  };

  
  const formatSize = (bytes: number) => {
   
    const k = 1024;
    const dm = 2; 
    const sizes = ["B", "KB", "MB", "GB", "TB"];

    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }

    let i = Math.floor(Math.log(bytes) / Math.log(k));
    
    if (isNaN(i) || i < 0) {
        return `0 ${sizes[0]}`;
    }

    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm)).toString().replace('.', ',');

    return `${formattedSize} ${sizes[i]}`;
}

</script>

<style lang="scss" scope>
  
  .internal {
    max-width: 300px;
    min-width: 300px;
  }


</style>