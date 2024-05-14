import { useContext, useEffect, useState } from "react";
import "./App.css";
import { LoginForm } from "./components/LoginForm";
import { Context } from "./main";
import { observer } from "mobx-react-lite";
import { IUser } from "./model/IUser";
import UserService from "./services/UserService";

function App() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  if (store.isLoading) {
    return <h1>загрузка...</h1>;
  }

  if (!store.isAuth) {
    return (
      <div>
        <h1>Авторизуйтесь</h1>
        <LoginForm />
      </div>
    );
  }

  return (
    <>
      <div>
        <h1>{`Пользователь авторизован ${store.user.email}`}</h1>
        {!store.user.isActivated && <h4>Подтвердите почту</h4>}
        <button
          onClick={() => {
            store.logout();
          }}
        >
          Выйти
        </button>
        <div>
          <button onClick={getUsers}>Получить список пользователей</button>
        </div>
        <div>
          {users.map((user) => (
            <div key={user.email}>{user.email}</div>
          ))}
        </div>
      </div>
    </>
  );
}

export default observer(App);
