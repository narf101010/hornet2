import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as sudoPrompt from 'sudo-prompt';
import * as isAdmin from 'is-admin';
import { exec } from 'child_process';
import { query } from 'gamedig';

const { ipcMain } = require('electron');

let mainWinwow, serve;
const args = process.argv.slice(1);
serve      = args.some(val => val === '--serve');

function createWindow() {
  // Create the browser window.
  mainWinwow = new BrowserWindow({
    width:  1200,
    height: 600,
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`),
    });
    mainWinwow.loadURL('http://localhost:4200');
  } else {
    mainWinwow.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes:  true,
    }));
  }

  // Emitted when the window is closed.
  mainWinwow.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWinwow = null;
  });


  // hide window menu
  mainWinwow.setMenu(null);

  mainWinwow.webContents.openDevTools();

  ipcMain.on('start', (event, arg) => {
    const { command, name } = arg;

    const callback = (reason) => {
      console.log('game stopped', reason);
      event.returnValue = reason;
    };
    void execute(command, name, callback);
  });

  ipcMain.on('isRunning', async (event, arg) => {
    const { host, port } = arg;

    event.returnValue = await isOnline(host, port);
  });
}

// todo change to
// ipcMain.on('asynchronous-message', (event, arg) => {
//   console.log(arg) // prints "ping"
//   event.sender.send('asynchronous-reply', 'pong')
// })
//
// ipcRenderer.on('asynchronous-reply', (event, arg) => {
//   console.log(arg) // prints "pong"
// })
// ipcRenderer.send('asynchronous-message', 'ping')

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

} catch (e) {
  // Catch Error
  // throw e;
}
