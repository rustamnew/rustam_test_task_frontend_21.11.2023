<script setup>
    import {useModalStore} from '../../stores/modalStore'
</script>

<template>
    <div class="modal" @click="checkCloseModal($event)">
        <div class="content">
            <div class="title">
                <span>Подтверждение</span>
                <button class="button red close" @click="close()">X</button>
            </div>

            <div class="text">Вы уверены?</div>

            <div class="buttons">
                <button class="button green submit" @click="submit()">Подтвердить</button>
                <button class="button red submit" @click="close()">Отмена</button>
            </div>
            
        </div>
    </div>
</template>

<script>
    export default {

        data() {    
            let modalStore = useModalStore()

            return {
                modalStore
            }
        },
        methods: {
            checkCloseModal(event) {
                if (event.target.classList.contains('modal')) {
                    this.close()
                }
            },
            close() {
                this.modalStore.closeModal()
            },
            submit() {
                this.modalStore.callback()
                this.modalStore.closeModal()
            }
        }
    }
</script>
