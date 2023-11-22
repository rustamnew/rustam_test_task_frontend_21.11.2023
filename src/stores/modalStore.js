import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
    state: () => {
        let active = ''
        let callback = false
        let modal_editing_item = {
            obj: {},
            index: -1
        }

        return {
            active,
            callback,
            modal_editing_item
        }
    },

    actions: {
        openModal(modal_type) {
            this.active = modal_type
        },
        closeModal() {
            this.active = ''
        }
    }

})