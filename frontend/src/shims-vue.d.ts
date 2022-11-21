/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>
  interface ComponentCustomProperties {
    $store: Store<State>
  }

  export default component
}
