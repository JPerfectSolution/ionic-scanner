// Empty constructor


function LineaPlugin() {}

// The function that passes work along to native shells
LineaPlugin.prototype.scan = function(successCallback, errorCallback) {


    cordova.exec(successCallback, errorCallback, 'lineaPlugin', 'scan', []);
}

LineaPlugin.prototype.connectDevice = function(pin, id, successCallback, errorCallback) {

    cordova.exec(successCallback, errorCallback, 'lineaPlugin', 'connectDevice', [pin, id]);
}

LineaPlugin.prototype.listDevices = function(successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, 'lineaPlugin', 'listDevices', []);
}

LineaPlugin.prototype.initialize = function(successCallback, errorCallback) {


    cordova.exec(successCallback, errorCallback, 'lineaPlugin', 'initialize', []);
}

LineaPlugin.prototype.printSticker = function(text , successCallback, errorCallback) {

    cordova.exec(successCallback, errorCallback, 'lineaPlugin', 'printSticker', [text]);
}

LineaPlugin.prototype.lastScanned = function(successCallback, errorCallback) {


    cordova.exec(successCallback, errorCallback, 'lineaPlugin', 'lastScanned', []);
}

LineaPlugin.prototype.disconnectDevice = function(successCallback, errorCallback) {

    cordova.exec(successCallback, errorCallback, 'lineaPlugin', 'disconnectDevice', []);
}

// Installation constructor that binds ToastyPlugin to window
LineaPlugin.install = function() {
    if (!window.plugins) {
        window.plugins = {};
    }
    window.plugins.lineaPlugin = new LineaPlugin();
    return window.plugins.lineaPlugin;
};

cordova.addConstructor(LineaPlugin.install);