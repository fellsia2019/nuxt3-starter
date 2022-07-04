import { defineStore } from 'pinia';
import { IEnviroment, IserviceList } from '@/types/Service';
import { ssHelpers } from '@/helpers/sessionStorageHelpers';
import { branchConfig } from '@/deploy/config';

export const useConfigApiStore = defineStore('configApi', {
    state: () => ({
        currentEnvName: process.env.ENV_NAME || '',
    }),

    getters: {
        DOMAINS(): { [key: string]: string } {
            return this.CURRENT_ENVIROMENT.domains;
        },

        SERVICES(): IserviceList {
            return {
                main: {
                    domain: `${this.DOMAINS.main}/api`,
                    secure: true,
                    routes: {
                        main: 'main/test',
                    },
                },
            };
        },

        ENVIROMENTS(): { [key: string]: IEnviroment } {
            // TODO: ошибка при работе с branchConfig
            // @ts-ignore
            // return branchConfig();
            return;
        },

        CURRENT_ENVIROMENT(): IEnviroment {
            return this.ENVIROMENTS[this.currentEnvName] || null;
        },
    },

    actions: {
        SET_CURRENT_ENV_NAME(env: string) {
            ssHelpers.saveItem('enviroment', env);
            this.currentEnvName = env;
        },

        INIT_CURRENT_ENV() {
            const env = ssHelpers.get('enviroment');
            if (env) this.currentEnvName = env;
        },
    },
});
