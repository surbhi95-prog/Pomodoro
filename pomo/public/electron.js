const {app,BrowserWindow} =require('electron');
const url= require('url');
const path=require('path');

function createMainWindow()
{
    const mainWindow = new BrowserWindow({
        title:'pomo',
        width:400,
        height:430,
    });

    const starturl = url.format({
        pathname:path.join(__dirname,'../build/index.html'), // connect to react app
        protocol:'file:',
        slashes:true,
    });

    mainWindow.loadURL(starturl); // laod app in electron window
}

app.whenReady().then(createMainWindow);