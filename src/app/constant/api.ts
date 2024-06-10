import { environment } from "../../environments/environment";

const basePath = environment.BASE_URL;

export const APIConstant = {

  postLogin: `${basePath}/todo/Login`,

  getAllTasks: `${basePath}/todo/GetTodoList`,

  getTaskById: `${basePath}/todo/GetTodoDetails/{id}`,

  postAddTask: `${basePath}/todo/CreateUpdateTodo`,

  deleteTaskById: `${basePath}/todo/RemoveTodoItem/{id}`

}
