<script setup>
    import {useTodoStore} from '../../stores/todoStore'
    import {useModalStore} from '../../stores/modalStore'
</script>

<template>
    <div class="modal" @click="checkCloseModal($event)">
        <div class="content">
            <div class="title">
                <span>Добавить запись</span>

                <button class="button red close" @click="close()">X</button>
            </div>

            <div class="inputs">
                <span class="heading">Название:</span>
                <input type="text" class="" placeholder="Название" v-model="formData.name">


                <template v-if="formData.items.length">
                    <span class="heading">Пункты:</span>
                    <div class="items">
                        <div class="item" v-for="(item, index) in formData.items">
                            <span>{{ item.title }}</span>
                            <button class="button red remove" @click="checkboxRemove(item, index)">X</button>
                        </div>
                    </div>
                </template>

                <span class="heading">Добавить пункт:</span>
                <div class="add-item-inputs">
                    <input type="text" placeholder="Текст" v-model="todoDoingTitle">
                    <button class="button orange add-input" @click="addTodoItem($event)">+</button>
                </div>

            </div>

            <div class="buttons">
                <button class="button green submit" @click="submit()">Добавить</button>
            </div>
            
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            
        },
        data() {    
            let modalStore = useModalStore()
            let todoStore = useTodoStore()

            let todoDoingTitle = ''

            let formData = {
                name: '',
                items: [

                ],
            }

            return {
                formData,
                modalStore,
                todoStore,
                todoDoingTitle
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
            checkboxRemove(item, index) {
                this.formData.items.splice(index, 1)
            },  
            submit() {
                this.todoStore.todo_list.push(this.formData)
                this.todoStore.saveData()
                this.modalStore.closeModal()
            },
            addTodoItem(event) {
                if (this.todoDoingTitle) {
                    this.formData.items.push({
                        title: this.todoDoingTitle,
                        checked: false
                    })
                } else {
                    event.target.previousSibling.focus()
                }
                
                this.todoDoingTitle = ''
            }
        }
    }
</script>
