import {defineStore} from 'pinia';

export const useDefaultStore = defineStore('default', {
    state: () => ({
        layout: localStorage.getItem('layout') || 'split',
        theme: localStorage.getItem('theme') || 'vs-dark',
        editor: null,
        executionTime: null,
        logs: [],
        result: null,
        plainJSON: localStorage.getItem('plainJSON') === 'true',
        tabs: [{label: 'get session', value: 'return session'}, {label: 'get customer', value: 'return customer'}],
        activeTab: parseInt(localStorage.getItem('activeTab')) || 0
    }),

    getters: {
        getResultJSON: (state) => JSON.stringify(state.result, null, 2),
        getLogsJSON: (state) => JSON.stringify(state.logs, null, 2)
    },

    actions: {
        loadTabs() {
            const tabs = localStorage.getItem('tabs');

            if (tabs && typeof tabs === 'string') {
                this.tabs = JSON.parse(tabs);
            }
        },

        clearResult() {
            this.executionTime = null;
            this.result = null;
        }
    }
})