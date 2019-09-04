/********* LineaPlugin.h Cordova Plugin Header *******/

#import <Cordova/CDV.h>
#import "DTDevices.h"

@interface LineaPlugin : CDVPlugin <DTDeviceDelegate> {
    DTDevices * dtdev;
    NSString *lastBarCode;
}

- (void) scan:(CDVInvokedUrlCommand*)command;

// connect to printer
- (void) connectDevice:(CDVInvokedUrlCommand*)command;

- (void) printSticker:(CDVInvokedUrlCommand*)command;

- (void) disconnectDevice:(CDVInvokedUrlCommand*)command;




// Scanner properies
- (void) listDevices:(CDVInvokedUrlCommand*)command;

- (void) lastScanned:(CDVInvokedUrlCommand*)command;

- (void) initialize:(CDVInvokedUrlCommand*)command;




@property(copy) NSMutableArray *btAddresses;
@property(copy) NSMutableArray *btNames;



@end
