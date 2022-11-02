import MainView from "./views/MainView/MainView";
import LogIn from "./views/LogIn/LogIn";
import StartScripts from "./StartScripts";
import userStore from "./zustand/userStore";
const App = () => {
    const isLogged = userStore(state => state.isLogged)
    return(
        <>
            {isLogged ? <MainView /> : <LogIn />}
            <StartScripts />
        </>
    )
}
export default App