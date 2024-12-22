export interface TranslationModel {
  language: string;
  navigationBar: {
    task: {
      listName: string;
      create: string;
      listUser: string;
    };
    login: string;
    register: string;
  };
  loginForm: {
    username: string;
    password: string;
  };
  registerForm: {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    confirmPassword: string;
  };
  createTaskForm: {
    title: string;
    description: string;
    type: string;
    status: string;
    createdOn: string;
    assignedToUser: string;
    assignedToGroup: string;
  };
  editUserForm: {
    firstName: string;
    lastName: string;
    username: string;
    role: string;
  };
  userList: {
    title: string;
  };
  button: {
    login: string;
    register: string;
    logout: string;
    create: string;
    update: string;
  };
}
