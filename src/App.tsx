import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { closeModal, modalState } from "./components/slice/modal-slices/modalSlice"
import { readHeader } from "./components/slice/modal-slices/modalHeaderSlice"
import { readModalInterface } from "./components/slice/modal-slices/modalInterfaceSlice"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { IPCSend } from "./utils/electron/ipc-renderer/ipc-send"
import { ComponentRegistration, Keybinds } from "./utils/keybinding/keybinds"
import { BindFunctionDictionary } from "./utils/keybinding/dictionary"

import Home from "./pages/Home"
import Fallback from "./pages/fallback"
import Modal from "./components/common/Modal"
import DefaultModal from "./components/custom/modal-contents/DefaultModal"
import Sample1 from "./components/custom/modal-contents/SampleContentA"
import Sample2 from "./components/custom/modal-contents/SampleContentB"
import Sample3 from "./components/custom/modal-contents/SampleContentC"


export default function App() {
	/***************[ INITIALIZERS ]**************/
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (!isLoading) {
			// Initialize
			document.addEventListener('keydown', watchKeys)
			document.addEventListener('keyup', registerKeyCombination)
			// ComponentRegistration.set(ComponentID.default)
			IPCSend.log.info('Renderer loaded, Keybindings registered.')

			window.addEventListener('error', (event) => {
				IPCSend.log.error(event.error.message)
			})
		}
	}, [isLoading])

	useEffect(() => {
		setIsLoading(false)
	}, [])


	// Redux get
	// ...
	const isModalOpen = useSelector(modalState)
	const getHeader = useSelector(readHeader)
	const getInterfaceID = useSelector(readModalInterface)

	// Redux set
	const dispatch = useDispatch()

	/***************[ EVENT DISPATCHERS ]**************/
	function dispatchKeyFunctions(selector: BindFunctionDictionary) {
		// const renderer = Hooks()

		switch (selector) {
			case BindFunctionDictionary.closeModal:
				dispatch(closeModal())
				break
			case BindFunctionDictionary.devtools:
				IPCSend.window.openDevTools()
				break

			default:
				break
		}
	}

	/***************[ KEYBIND FUNCTIONS ]**************/
	function watchKeys(keys: KeyboardEvent) {
		Keybinds.watch(keys)
	}

	function registerKeyCombination(e: KeyboardEvent) {
		const combinationSnapshot = Keybinds.registerSnapshot()

		if (e.key.toUpperCase() === "CONTROL") {
			Keybinds.releaseModifiers("CONTROL")
		}
		if (e.key.toUpperCase() === "ALT") {
			Keybinds.releaseModifiers("ALT")
		}
		if (e.key.toUpperCase() === "SHIFT") {
			Keybinds.releaseModifiers("SHIFT")
		}

		if (combinationSnapshot !== undefined) {
			dispatchKeyFunctions(Keybinds.keyFunctions(combinationSnapshot, ComponentRegistration.get))
		}
	}


	return (
		<>
			<Modal
				// Hover/Open component source for definition
				//
				// Usage:
				// ... Component() {
				// 		const foo = useModalOperation()
				//
				//		return (
				//				<button onClick={() => foo( modalTitle: string, modalInterfaceID: number }> Open Modal </button>	
				// 		)
				// }

				modalTitle={getHeader}
				isOpen={isModalOpen}
				onClose={() => dispatch(closeModal())}
				selectInterface={getInterfaceID}
				selectAction={0}
			>
				{/* You Can Remove This */}
				<DefaultModal key={0} />

				{/* List All Components */}
				<Sample1 key={1} />
				<Sample2 key={2} />
				<Sample3 key={3} />
			</Modal>

			<BrowserRouter>
				<Routes>
					<Route path="*" element={<Home />} />
					<Route path="/error" element={<Fallback />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}
