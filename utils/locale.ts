import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export default function useLocale() {
  const i18 = useI18n();
  const currentLocale = computed(() => {
    return i18.locale.value;
  });

  return {
    currentLocale,
  };
}
