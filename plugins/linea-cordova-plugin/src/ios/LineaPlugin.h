/********* LineaPlugin.h Cordova Plugin Header *******/

#import <Cordova/CDV.h>
#import "DTDevices.h"

@interface LineaPlugin : CDVPlugin <DTDeviceDelegate> {
    DTDevices *dtdev;
    NSString *lastBarCode;
}

- (void) scan:(CDVInvokedUrlCommand*)command;

- (void) connectDevice:(CDVInvokedUrlCommand*)command;
- (void) listDevices:(CDVInvokedUrlCommand*)command;

- (void) lastScanned:(CDVInvokedUrlCommand*)command;

- (void) initialize:(CDVInvokedUrlCommand*)command;



- (void) disconnectDevice:(CDVInvokedUrlCommand*)command;

@property(copy) NSMutableArray *btAddresses;
@property(copy) NSMutableArray *btNames;



@end
