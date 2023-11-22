<script setup>
    import TodoItem from './TodoItem.vue'

    import ModalAddTodo from './modal/ModalAddTodo.vue'
    import ModalConfirm from './modal/ModalConfirm.vue'
    import ModalEdit from './modal/ModalEdit.vue'
    
    import {useTodoStore} from '../stores/todoStore'
    import {useModalStore} from '../stores/modalStore'
    
</script>

<template>
    <div class="todo-list">
        <TodoItem v-for="(todo, index) in todoStore.todo_list" :todo="todo" :index="index"/>
    </div>

    <div class="control-buttons">
        <button class="button green add-item" @click="addNewTodo()">Добавить</button>
    </div>

    <ModalAddTodo v-if="modalStore.active == 'modalAddTodo' ? true : false" />
    <ModalConfirm v-if="modalStore.active == 'modalConfirm' ? true : false"/>
    <ModalEdit    v-if="modalStore.active == 'modalEdit' ? true : false"/>
</template>

<script>
    export default {
        data() {
            let todoStore = useTodoStore()
            let modalStore = useModalStore()

            return {
                modalStore,
                todoStore
            }
        },

        beforeMount() {
            this.loadTodoData()
        },

        methods: {
            saveTodoData() {
                this.todoStore.saveData()
            },
            loadTodoData() {
                this.todoStore.loadData()
            },
            addNewTodo() {
                this.modalStore.active = 'modalAddTodo'
            }
        }
    }
</script>
