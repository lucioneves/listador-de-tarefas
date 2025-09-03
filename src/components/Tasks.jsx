import Button from './Button'
import Add from '../assets/icons/add.svg?react'
import Trash from '../assets/icons/trash.svg?react'
import SunIcon from '../assets/icons/sun.svg?react'
import MoonIcon from '../assets/icons/moon.svg?react'
import CloudIcon from '../assets/icons/cloud-sun.svg?react'
import TasksSeparator from './TasksSeparator'

const tasks = () => {
  return (
    <div className="w-full px-8 py-16">
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
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudIcon />} />
        </div>

        <div className="space-y-3">
          <TasksSeparator title="Tarde" icon={<MoonIcon />} />
        </div>
      </div>
    </div>
  )
}

export default tasks
