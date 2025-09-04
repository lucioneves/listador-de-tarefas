import Button from './Button'
import Add from '../assets/icons/add.svg?react'
import Trash from '../assets/icons/trash.svg?react'
import SunIcon from '../assets/icons/sun.svg?react'
import MoonIcon from '../assets/icons/moon.svg?react'
import CloudIcon from '../assets/icons/cloud-sun.svg?react'
import TasksSeparator from './TasksSeparator'
import { useState } from 'react'
import TASKS from '../constants/tasks'
import TaskItem from './TaskItem'
import { toast } from 'sonner'

const Tasks = () => {
  const [tasks, setTasks] = useState(TASKS)

  const morningTasks = tasks.filter((task) => task.time === 'morning')
  const afternoonTasks = tasks.filter((task) => task.time === 'afternoon')
  const eveningTasks = tasks.filter((task) => task.time === 'evening')

  const handleTaskDeleteClick = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(newTasks)
    toast.success('Tarefa deletada com sucesso!')
  }

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task
      }

      if (task.status === 'not-started') {
        toast('Tarefa iniciada com sucesso!')
        return { ...task, status: 'in-progress' }
      }

      if (task.status === 'in-progress') {
        toast.success('Tarefa concluída com sucesso!')
        return { ...task, status: 'done' }
      }

      if (task.status === 'done') {
        toast('Tarefa reiniciada com sucesso!')
        return { ...task, status: 'not-started' }
      }
      return task
    })

    setTasks(newTasks)
  }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00ADB5]">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost">
            Limpar Tarefa
            <Trash />
          </Button>

          <Button>
            <Add />
            Adicionar Tarefa
          </Button>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title="Tarde" icon={<SunIcon />} />
          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handlekCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudIcon />} />
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handlekCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
          {eveningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handlekCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
