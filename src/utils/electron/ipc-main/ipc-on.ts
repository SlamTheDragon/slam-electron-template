import { ipcMain } from 'electron';
import { IPCChannels, IPCChannelFunction } from '../ipc-renderer/ipc-channel-dictionary';
import { Logging } from '../logging/logging';
import { Shutdown } from '../shutdown';
import { mainWindow } from '..';

/**
 * Handles IPC events from the master renderer process.
 * @param event - The event object.
 * @param args - Arguments received from the renderer process.
 */
ipcMain.on(IPCChannels.master, async (event, ...args) => {
    const logging = new Logging('ipc main')

    switch (args[0]) {
        case IPCChannelFunction.master.unexpectedQuit():
            return new Shutdown(-1)

        default:
            logging.warn('Something went wrong: default case was selected.')
            break
    }
});


/**
 * Handles IPC events related to window actions.
 * @param event - The event object.
 * @param args - Arguments received from the renderer process.
 */
ipcMain.on(IPCChannels.window, (event, ...args) => {
    const logging = new Logging('ipc window')

    switch (args[0]) {
        case IPCChannelFunction.window.fullscreen():
            logging.debug('Received request for fullscreen.')
            mainWindow.setFullScreen(true)
            break

        case IPCChannelFunction.window.exit():
            return new Shutdown(0)

        case IPCChannelFunction.window.toTray():
            mainWindow.hide()
            break

        case IPCChannelFunction.window.openDevTools():
            mainWindow.webContents.openDevTools()
            break

        default:
            logging.warn('Something went wrong: default case was selected.')
            break
    }
})

/**
 * Handles IPC events related to logging messages.
 * @param event - The event object.
 * @param args - Arguments received from the renderer process.
 */
ipcMain.on(IPCChannels.log, async (event, args) => {
    const logging = new Logging('renderer')

    switch (args[0]) {
        case 0:
            logging.verbose(args[1])
            break
        case 1:
            logging.debug(args[1])
            break
        case 2:
            logging.info(args[1])
            break
        case 3:
            logging.warn(args[1])
            break
        case 4:
            logging.error(args[1])
            break
        case 5:
            logging.fatal(args[1])
            break

        default:
            logging.warn('Something went wrong: default case was selected.')
            break
    }
})
