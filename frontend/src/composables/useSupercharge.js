import Vue from 'vue'
import * as SuperchargedComponents from '@/components/basic'

export function useSupercharge() {
  Object.values(SuperchargedComponents).forEach(component => {
    Vue.component(component.name, component)
  });
}