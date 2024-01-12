import { app } from "electron"
import { Logging } from "./logging/logging"

const logging = new Logging('shutdown handler')

export class Shutdown {
    private static _exitCode: number

    constructor(exitCode: number) {
        Shutdown._exitCode = exitCode
        
        if (exitCode !== 0) {
            Shutdown.emergencyCleanUp()
        } else {
            Shutdown.cleanUp()
        }
    }

    private static cleanUp() {
        logging.info(`Closing Application...`)
        
        // add clean up code here    

        logging.info(`Application exiting with exit code: ${this._exitCode}`)
        app.exit(this._exitCode)
    }

    private static emergencyCleanUp() {
        logging.info(`Crash Detected! Generating report...`)

        // add emergency clean up here

        logging.info(`Application exiting with exit code: ${this._exitCode}`)
        app.exit(this._exitCode)
    }
}