import * as fs from 'fs'
import * as path from 'path'
import * as packageJson from '../../../package.json'
import { Logging } from './logging/logging'

const logging = new Logging('config loader')

export class Configure {
    // Load config.json here
    public static Settings: object[] = []

    private static _initialized = false

    public static async Load() {
        if (this._initialized) return
        
        // Setup
        const configFolder = path.join(process.env.APPDATA, packageJson.name, 'config') 
        const configPath = path.join(configFolder, 'config.json')

        if (!fs.existsSync(configFolder)) {
            fs.mkdirSync(configFolder, { recursive: true })
        }

        // Check if config.json exists
        if (fs.existsSync(configPath)) {
            // Load the config.json
            try {
                const configFileContent = fs.readFileSync(configPath, 'utf-8')
                this.Settings = JSON.parse(configFileContent)
            } catch (error) {
                logging.error('Error parsing config.json:')
                logging.error(error.message)
            }
        } else {
            logging.warn('config.json not found. Using default settings.')
            // You can provide default settings here if needed
        }

        this._initialized = true
    }
}
