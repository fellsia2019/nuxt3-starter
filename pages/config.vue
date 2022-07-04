<template>
    <div class="config-page">
        <!-- <div class="config-page__controls">
      <h4>Enviroment:</h4>
      <div class="config-page__options-list">
        <div
          class="config-page__option"
          v-for="(envName, i) of envNames"
          :key="`env_item_${i}`"
        >
          <input
            :id="`env_item_${i}`"
            :value="currentEnvName === envName"
            :checked="currentEnvName === envName"
            type="radio"
            name="env"
            @click="() => onSetCurrentEnv(envName)"
          />
          <label :for="`env_item_${i}`">{{ envName }}</label>
        </div>
      </div>
    </div>
    <div class="config-page__info">
      <h4>Config:</h4>
      <code>
        <pre>{{ currentEnv }}</pre>
      </code>
      <button
        class="config-page__submit"
        :class="{
          'config-page__submit--disabled': !selectedEnvName,
        }"
        @click="onSubmit()"
      >
        save
      </button>
    </div> -->
    </div>
</template>

<script
    lang="ts"
    setup
>
    import { useConfigApiStore } from '@/store/config/Api';

    // @Component({
    //     components: {},
    //     layout: 'config',
    //     middleware: 'config',
    // })

    // const selectedEnvName = ref("");
    const store = useConfigApiStore();

    // const currentEnvName = store.CURRENT_ENVIROMENT.ENV_NAME;
    // const enviroments = store.ENVIROMENTS;
    // const count = store.count;

    // const currentEnv = computed(() => {
    //   return enviroments[selectedEnvName.value || currentEnvName];
    // });

    // const envNames = computed(() => {
    //   return Object.keys(enviroments);
    // });

    // const countIncr = store.COUNT_INCR;

    // export default class ConfigPage extends Vue {
    //     selectedEnvName = '';

    //     get currentEnvName() {
    //         return apiStore.CURRENT_ENVIROMENT.ENV_NAME;
    //     }
    //     get enviroments() {
    //         return apiStore.ENVIROMENTS;
    //     }

    //     get currentEnv() {
    //         return this.enviroments[this.selectedEnvName || this.currentEnvName];
    //     }

    //     get envNames() {
    //         return Object.keys(this.enviroments);
    //     }

    //     onSetCurrentEnv(envName: string) {
    //         this.selectedEnvName = envName;
    //     }

    //     onSubmit() {
    //         if (!this.selectedEnvName) return;
    //         apiStore.SET_CURRENT_ENV_NAME(this.selectedEnvName);
    //         this.$router.replace({ name: 'index' });
    //     }

    //     fetch() {
    //         if (process.env.ALLOW_CONFIG !== 'true')
    //             this.$nuxt.context.error({
    //                 statusCode: 404,
    //                 message: 'Page not found',
    //             });
    //     }
    // }
</script>

<style lang="scss">
    .config-page {
        font-family: sans-serif;
        height: 95vh;

        box-sizing: border-box;
        font-size: 16px;
        outline: none;
        display: grid;
        grid-template-columns: 1fr 1fr;
        @media (max-width: 748px) {
            grid-template-columns: 1fr;
        }

        &__controls {
            padding: 20px 0 0 20px;
            display: grid;
            grid-template-rows: 61px 1fr;
            align-items: start;
        }

        &__info {
            padding: 0 20px 20px 0;
            display: grid;
            grid-template-rows: 61px 1fr 45px;
            align-items: start;
        }

        &__options-list {
            display: grid;
            grid-template-columns: 1fr;
            grid-row-gap: 10px;
            margin-bottom: 20px;
        }

        &__option {
            display: grid;
            grid-template-columns: 15px 1fr;
            grid-column-gap: 20px;
            align-items: center;

            input {
                height: 18px;
                width: 18px;
            }
            label {
                letter-spacing: 0.1em;
            }
        }

        &__submit {
            display: block;
            height: 25px;
            margin-top: 20px;
            width: 150px;
            outline: none;
            color: white;
            border: none;
            background-color: turquoise;
            justify-self: end;
            cursor: pointer;
        }

        &__submit--disabled {
            opacity: 0.7;
            cursor: default;
        }

        &__info {
            pre {
                background: #f4f4f4;
                border: 1px solid #ddd;
                border-left: 3px solid turquoise;
                color: #666;
                page-break-inside: avoid;
                font-family: monospace;
                font-size: 15px;
                line-height: 1.6;
                margin-bottom: 1.6em;
                max-width: 100%;
                overflow: auto;
                padding: 1em 1.5em;
                display: block;
                word-wrap: break-word;
                margin: 0;
            }
        }
    }
</style>
