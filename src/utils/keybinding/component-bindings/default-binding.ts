import { IPCSend } from "../../../utils/electron/ipc-renderer/ipc-send";
import { ComponentBindings } from "../component-bindings";
import { BindFunctionDictionary } from "../dictionary";


export class DefaultBindDefinitions implements ComponentBindings {
    keyArray: string[]

    constructor(input: string[]) {
        this.keyArray = input
    }

    evalKeys(bindsToCompare: string[]) {
        // - we have to define the length of the keyArray
        // - decode keybinds that contains sub keys for key combinations
        // - compare em to all existing functions that's connected into this class
        // - add extra layer of suppression for comparison if theres a different component mounted

        if (bindsToCompare[0] === this.keyArray[0]) {
            IPCSend.log.debug("bind triggered")
            return BindFunctionDictionary.devtools
        }

    }
}