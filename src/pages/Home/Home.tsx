import { useSelector, useDispatch } from 'react-redux'
import { useModalOperation } from '../../utils/component-utils/modalOperation'
import { ReactComponent as Logo } from "../../assets/svg/SlamTheDragon Logo.svg"
import { selectCount, decrement, increment } from '../../components/slice/counterSlice'
import { BtnAccent } from '../../components/common/Button/Button'
import { IPCSend } from '../../utils/electron/ipc-renderer/ipc-send'
import Button from '../../components/common/Button'
import style from "./home.module.scss"

/**
 * This is your main interface, all components shall pass through here
 * @returns Interface
 */
export default function Home() {
    // get
    const count = useSelector(selectCount)
    // set
    const dispatch = useDispatch()
    const openModal = useModalOperation()

    return (
        <div className={style.interface}>

            <Logo />

            <h1 id="output" style={{ marginBottom: 10 }}>
                Open <u>Interface.tsx</u> and Start Editing!
            </h1>

            <div style={{ display: "flex", flexDirection: "row", gap: 20, alignItems: "center" }}>
                <Button appearance={BtnAccent.primary} onClick={() => dispatch(decrement())}>-</Button>
                <h1 style={{ marginTop: 0, marginBottom: 0 }}>
                    {count}
                </h1>
                <Button appearance={BtnAccent.primary} onClick={() => dispatch(increment())}>+</Button>

                <Button appearance={BtnAccent.primary} onClick={() => { IPCSend.window.exit() }}>Close Window</Button>

                <Button appearance={BtnAccent.primary} onClick={() => openModal("Sample Title", count)}>Feature Toggle</Button>
            </div>

            <br />
            <h3>Other Features</h3>
            <div style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "center", marginTop: 5 }}>
                <Button onClick={() => {IPCSend.master.unexpectedQuit()}}>Trigger Crash</Button>
                <Button onClick={() => {IPCSend.window.openDevTools()}}>Open DevTools</Button>
                <Button onClick={() => {IPCSend.window.fullscreen()}}>Toggle Fullscreen</Button>
                <Button onClick={() => {IPCSend.window.toTray()}}>To Tray</Button>
            </div>

            {/* TODO: implement BtnType: see Button.tsx */}
            {/* <Button>Sample</Button>
            <Button>Sample</Button>
            <Button>Sample</Button>
            <Button>Sample</Button>
            <Button>Sample</Button>
            <Button>Sample</Button>
            <Button>Sample</Button> */}


            <div style={{ opacity: 0.7, padding: 30, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                <span>template by <a href="https://github.com/SlamTheDragon" target="blank">SlamTheDragon</a></span>
                <span>Check out this template repository's main <a href="https://github.com/SlamTheDragon/slam-electron-template/blob/main/README.md" target="blank">README.md</a></span>
            </div>
        </div>
    );
}