import { useEffect, useState } from "react"
import { toast } from "sonner"

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons"
import AddTaskDialog from "./AddTaskDialog"
import Button from "./Button"
import TaskItem from "./TaskItem"
import TasksSeparator from "./TasksSeparator"

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "GET",
      })
      const tasks = await response.json()

      setTasks(tasks)
    }
    fetchTasks()
  }, [])

  const morningTasks = tasks.filter((task) => task.time === "morning")
  const afternoonTasks = tasks.filter((task) => task.time === "afternoon")
  const eveningTasks = tasks.filter((task) => task.time === "evening")

  const handleDialogClose = () => {
    setAddTaskDialogIsOpen(false)
  }

  const onDeleteTaskSuccess = async (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(newTasks)
    toast.success("Tarefa deletada com sucesso!")
  }

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task
      }

      if (task.status === "not-started") {
        toast("Tarefa iniciada com sucesso!")
        return { ...task, status: "in-progress" }
      }

      if (task.status === "in-progress") {
        toast.success("Tarefa concluída com sucesso!")
        return { ...task, status: "done" }
      }

      if (task.status === "done") {
        toast("Tarefa reiniciada com sucesso!")
        return { ...task, status: "not-started" }
      }
      return task
    })

    setTasks(newTasks)
  }

  const onTaskSubmitSuccess = async (task) => {
    setTasks([...tasks, task])
    toast.success("Tarefa adicionada com sucesso!")
  }

  const onTaskSubmitError = () => {
    toast.error("Erro ao adicionar tarefa. Por favor, tente novamente.")
  }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-primary">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button color="ghost">
            Limpar Tarefa
            <TrashIcon />
          </Button>

          <Button onClick={() => setAddTaskDialogIsOpen(true)}>
            <AddIcon />
            Adicionar Tarefa
          </Button>

          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleClose={() => handleDialogClose(false)}
            onSubmitSuccess={onTaskSubmitSuccess}
            onSubmitError={onTaskSubmitError}
          />
        </div>
      </div>

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title="Tarde" icon={<SunIcon />} />
          {morningTasks.length === 0 && (
            <p className="text-sm text-brand-dark-gray">
              Nenhuma tarefa encontrada para o periodo da manhã.
            </p>
          )}
          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handlekCheckboxClick={handleTaskCheckboxClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudSunIcon />} />
          {afternoonTasks.length === 0 && (
            <p className="text-sm text-brand-dark-gray">
              Nenhuma tarefa encontrada para o periodo da tarde.
            </p>
          )}
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handlekCheckboxClick={handleTaskCheckboxClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />
          {eveningTasks.length === 0 && (
            <p className="text-sm text-brand-dark-gray">
              Nenhuma tarefa encontrada para o periodo da noite.
            </p>
          )}
          {eveningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handlekCheckboxClick={handleTaskCheckboxClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tasks
