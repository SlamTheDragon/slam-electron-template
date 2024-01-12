/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from 'fs'
import * as path from 'path'
import * as packageJson from '../../../../package.json'
import colors from 'colors/safe'

/**
 * Logging class for handling application logs.
 */
export class Logging {
    private _origin: string
    private static _verbose = false
    private static _debug = true
    private static _initialized = false
    private logFileStream: fs.WriteStream

    //#region Constructor
    /**
     * Creates a new instance of the Logging class.
     * @param origin - The origin of the logging instance.
     */
    constructor(origin: any) {
        this._origin = origin.toUpperCase()

        // constructor vars
        const latestLogFolder = path.join(process.env.APPDATA, packageJson.name, 'logs') //appdata\IO\logs
        const oldLogsFolder = path.join(latestLogFolder, 'old') //...IO\logs\old

        const logFilePath = path.join(latestLogFolder, 'latest.log') // ...\IO\logs\latest.log
        const archivedLogPath = path.join(oldLogsFolder, `${this.formatDateTime(false)}.log`)

        // pre-initialize logging
        if (!Logging._initialized) {
            try {
                fs.copyFile(logFilePath, archivedLogPath, fs.constants.COPYFILE_EXCL, callback)
                if (fs.existsSync(logFilePath)) {
                    fs.unlink(logFilePath, callback)
                }
            } catch (error) {
                console.warn('Error archiving latest log:', error)
            }
            Logging._initialized = true
        }

        if (!fs.existsSync(latestLogFolder)) {
            fs.mkdirSync(latestLogFolder, { recursive: true })
        }
        if (!fs.existsSync(oldLogsFolder)) {
            fs.mkdirSync(oldLogsFolder, { recursive: true })
        }

        // TODO: do something when pre-initialization failed
        function callback() { }

        // initialize logging
        this.logFileStream = fs.createWriteStream(logFilePath, { flags: 'a' })
    }
    //#endregion

    //#region DateFormatter
    /**
     * Formats the current date and time for logging purposes.
     * @param isForFile - Indicates if the format is for file naming.
     * @returns The formatted date and time string.
     */
    private formatDateTime(isForFile: boolean) {
        const now = new Date()
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const day = String(now.getDate()).padStart(2, '0')
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')
        const seconds = String(now.getSeconds()).padStart(2, '0')

        if (isForFile) {
            return `${year}-${month}-${day}-${hours}:${minutes}:${seconds}`
        }

        return `${year}-${month}-${day}_${hours}${minutes}${seconds}`
    }
    //#endregion

    //#region logging
    /**
     * Logs a message to the log file and console with VERBOSE level.
     * @param message - The message to be logged.
     */
    async verbose(message?: any) {
        if (Logging._verbose) {
            await this.logToFile(`[VERBOSE]`, message)
            console.log(colors.gray(this.formatDateTime(true)), colors.green(`[VERBOSE] [${this._origin}]`), message)
        }
    }
    /**
     * Logs a message to the log file and console with DEBUG level.
     * @param message - The message to be logged.
     */
    async debug(message?: any) {
        if (Logging._debug) {
            await this.logToFile(`[DEBUG]`, message)
            console.debug(colors.gray(this.formatDateTime(true)), colors.cyan(`[DEBUG] [${this._origin}]`), message)
        }
    }
    /**
     * Logs an informational message to the log file and console.
     * @param message - The message to be logged.
     */
    async info(message?: any) {
        await this.logToFile(`[INFO]`, message)
        console.info(colors.gray(this.formatDateTime(true)), colors.white(`[INFO] [${this._origin}]`), message)
    }
    /**
     * Logs a warning message to the log file and console.
     * @param message - The message to be logged.
     */
    async warn(message?: any) {
        await this.logToFile(`[WARN]`, message)
        console.warn(colors.gray(this.formatDateTime(true)), colors.yellow(`[WARN] [${this._origin}]`), message)
    }
    /**
     * Logs an error message to the log file and console.
     * @param message - The message to be logged.
     */
    async error(message?: any) {
        await this.logToFile(`[ERROR]`, message)
        console.error(colors.gray(this.formatDateTime(true)), colors.red(`[ERROR] [${this._origin}]`), message)
    }
    /**
     * Logs a fatal error message to the log file and console.
     * @param message - The message to be logged.
     */
    async fatal(message?: any) {
        await this.logToFile(`[FATAL]`, message)
        console.error(colors.gray(this.formatDateTime(true)), colors.bgRed(`[FATAL] [${this._origin}]`), message)
    }
    //#endregion

    /**
     * Logs a message to the log file.
     * @param logLevel - The level of the log (e.g., VERBOSE, DEBUG).
     * @param message - The message to be logged.
     */
    private async logToFile(logLevel: string, message?: any) {
        if (message instanceof Error) {
            const header = `${this.formatDateTime(true)} ${logLevel} [${this._origin}] `
            this.logFileStream.write(header)
            this.logFileStream.write(message.stack)
            this.logFileStream.write('\n')
        } else {
            const formattedMessage = `${this.formatDateTime(true)} ${logLevel} [${this._origin}] ${message}\n`
            this.logFileStream.write(formattedMessage)
        }
    }
}
