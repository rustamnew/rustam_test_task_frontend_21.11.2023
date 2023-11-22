import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
    state: () => {
        
        return {
            todo_list: [
                /*Пример объекта
                {
                    name: 'Заметка 1',
                    items: [
                        {
                            title: 'Вынести мусор',
                            checked: false
                        },
                        {
                            title: 'Сходить в магазин',
                            checked: false
                        },
                        {
                            title: 'Сдать тестовое задание',
                            checked: true
                        }
                    ]
                }
                */
            ],
        }
    },

    actions: {
        loadData() {
            if (localStorage.todos) {
                let string_to_obj = JSON.parse(localStorage.todos)
                this.todo_list = string_to_obj
            }
        },
        saveData() {
            let obj_to_string = JSON.stringify(this.todo_list)
            localStorage.todos = obj_to_string

        }

    }

})