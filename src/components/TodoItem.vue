<script setup>
    import {useTodoStore} from '../stores/todoStore'
    import {useModalStore} from '../stores/modalStore'

import Check from '../assets/icons/check.svg'
</script>

<template>
    <div class="todo-item">
        <div class="name">
            <span>{{ todo.name }}</span>

            <div class="buttons">
                <button class="button green edit" @click="openTodoItemEdit(todo)">Редактировать</button>
                <button class="button red remove" @click="removeTodo()">X</button>
            </div>
        </div>
        <div class="doings">
            <template v-for="(item, index) in todo.items">
                <div class="doing-item" v-if="index < 5">
                    <div class="title">{{ item.title }}</div>
                
                    <div class="check" v-if="item.checked">
                        <Check />
                    </div>    
                </div>
            </template>
            
        </div>

    </div>
</template>

<script>
    export default {
        props: {
            todo: Object,
            index: Number,
        },
        data() {
            let todoStore = useTodoStore()
            let modalStore = useModalStore()
            let checkbox = false
            return {
                checkbox,
                todoStore,
                modalStore,
            }
        },
        methods: {
            removeTodo() {
                this.modalStore.active = 'modalConfirm'
                this.modalStore.callback = () => {
                    let removing_obj = this.todo
                    this.todoStore.todo_list = this.todoStore.todo_list.filter(function(obj) { return obj != removing_obj; }); 
                    this.todoStore.saveData()
                }
 
            },
            openTodoItemEdit(todo, index) {
                this.modalStore.modal_editing_item.obj = todo
                this.modalStore.modal_editing_item.index = index

                this.modalStore.active = 'modalEdit'
            }
        }
    }
</script>
