<script setup>
    import {useTodoStore} from '../../stores/todoStore'
    import {useModalStore} from '../../stores/modalStore'

</script>

<template>
    <div class="modal" @click="checkCloseModal($event)">
        <div class="content">
            <div class="title">
                <span>Редактировать запись</span>

                <button class="button red close" @click="close()">X</button>
            </div>

            <div class="inputs">
                <span class="heading">Название:</span>
                <input type="text" class="title-input" placeholder="Название" v-model="formData.name">

                <template v-if="formData.items.length">
                    <span class="heading">Пункты:</span>
                    <div class="items">
                        <div class="item" v-for="(item, index) in formData.items">
                            <span>{{ item.title }}</span>

                            <input class="checkbox" type="checkbox" :checked="item.checked" v-model="item.checked" @change="checkboxChange(item, index)">

                            <button class="button red remove" @click="checkboxRemove(item, index)">X</button>
                        </div>
                    </div>
                </template>
                
                <span class="heading">Добавить пункт:</span>
                <div class="add-item-inputs">
                    <input type="text" placeholder="Текст" v-model="itemInput">
                    <button class="button orange add-input" @click="addTodoItem($event)">+</button>
                </div>

            </div>

            
            <div class="buttons">
                <button class="button green submit" @click="submit()">Сохранить</button>
            </div>
            
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            
        },
        data() {
            let todoStore = useTodoStore()
            let modalStore = useModalStore()

            let itemInput = ''

            let formData = {
                name: '',
                items: [

                ],
            }

            let default_value = {
                name: '',
                items: [

                ],
            }

            return {
                todoStore,
                modalStore,
                formData,
                default_value,
                itemInput
            }
        },
        beforeMount() {
            this.formData = this.modalStore.modal_editing_item.obj
            this.default_value = JSON.parse(JSON.stringify(this.formData))
        },
        methods: {
            checkCloseModal(event) {
                if (event.target.classList.contains('modal')) {
                    this.close(true)
                }
            },

            checkboxChange(item, index) {
                this.formData.items[index].checked = item.checked
            },

            checkboxRemove(item, index) {
                this.formData.items.splice(index, 1)
            },

            addTodoItem(event) {
                if (this.itemInput) {
                    this.formData.items.push({
                        title: this.itemInput,
                        checked: false
                    })
                } else {
                    event.target.previousSibling.focus()
                }
                this.itemInput = ''
            },

            close(return_default = false) {
                if (return_default) {
                    this.formData.name = this.default_value.name
                    this.formData.items = this.default_value.items
                }
                this.modalStore.closeModal()
            },
            
            submit() {
                this.todoStore.todo_list[this.modalStore.modal_editing_item.index] = this.formData
                this.todoStore.saveData()
                this.close(false)
            }
        }
    }
</script>
