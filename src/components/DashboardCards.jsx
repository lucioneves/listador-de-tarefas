import {
  GlassWaterIcon,
  LoaderIcon,
  Tasks2Icon,
  TasksIcon,
} from "../assets/icons"
import { useGetTasks } from "../hooks/data/use-get-tasks"
import DashboardCard from "./DashboardCard"

const DashboardCards = () => {
  const { data: tasks } = useGetTasks()
  const notStartedTasks = tasks?.filter(
    (task) => task.status === "not-started"
  ).length
  const inProgressTasks = tasks?.filter(
    (task) => task.status === "in-progress"
  ).length
  const completedTasks = tasks?.filter((task) => task.status === "done").length
  return (
    <div className="grid grid-cols-4 gap-9">
      <DashboardCard
        icon={<Tasks2Icon />}
        mainText={tasks?.length}
        secondaryText="Tarefas totais"
      />
      <DashboardCard
        icon={<TasksIcon />}
        mainText={notStartedTasks}
        secondaryText="Tarefas não iniciadas"
      />
      <DashboardCard
        icon={<LoaderIcon />}
        mainText={inProgressTasks}
        secondaryText="Tarefas em andamento"
      />
      <DashboardCard
        icon={<GlassWaterIcon />}
        mainText={completedTasks}
        secondaryText="Tarefas concluídas"
      />
    </div>
  )
}

export default DashboardCards
