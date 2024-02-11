import { ref } from "vue";

const errors: any = ref({});

const setError = (field: string, errorMessages: string[]) => {
  errors.value[field] = errorMessages[0];
};

const clearErrors = (field?: string) => {
  if (field) {
    delete errors.value[field];
  } else {
    errors.value = {};
  }
};

export const useErrorHandling = () => {
  return {
    errors,
    setError,
    clearErrors
  };
};