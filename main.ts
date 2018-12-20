import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as sudoPrompt from 'sudo-prompt';
import * as isAdmin from 'is-admin';
import { exec } from 'child_process';
import { query } from 'gamedig';

const { ipcMain } = require('electron');

let mainWindow: BrowserWindow;
let serve: boolean;
const args = process.argv.slice(1);
serve      = args.some(val => val === '--serve');

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width:  1200,
    height: 600,
  });

  if (serve === true) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`),
    });
    mainWindow.loadURL('http://localhost:4200');
  } else {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes:  true,
    }));
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });


  // hide window menu
  mainWindow.setMenu(null);

  // mainWindow.webContents.openDevTools();

  ipcMain.on('start', (event, arg) => {
    const { command, name } = arg;

    const callback = (reason) => {
      console.log('game stopped', reason);
      event.sender.send('stop', reason);
    };
    void execute(command, name, callback);
  });

  ipcMain.on('isRunning', async (event, arg) => {
    const { host, port } = arg;
    const isRunning      = await isOnline(host, port);

    const channel = `running-${host}-${port}`;
    event.sender.send(channel, isRunning);
  });
}

async function execute(command: string, name: string, callback: (reason: any) => void): Promise<void> {
  const isAlreadyAdmin = await isAdmin();
  console.log({ command, isAlreadyAdmin });
  if (isAlreadyAdmin === true) {
    return executeAsAdmin(command, callback);
  }

  return executeAsUser(command, name, callback);
}

function executeAsAdmin(command: string, callback: Function): void {
  console.log('hornet is running with admin rights so don\'t ask for rights');
  exec(
    command,
    <any>{ detached: true, stdio: ['ignore', 'ignore', 'ignore'] },
    (error) => {
      console.log('callback', error);
      callback();
    });
}

function executeAsUser(command: string, name: string, callback: Function): void {
  sudoPrompt.exec(command, { name }, (error) => {
    console.log('callback', error);
    callback();
  });
}

async function isOnline(host: string, port: number): Promise<boolean> {
  console.log('isOnline', { host, port });

  try {
    const state = await query({ host, type: 'arma3', port });
    return state !== undefined;
  } catch (error) {
    return false;
  }
}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);


// Quit when all windows are closed.
  app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
