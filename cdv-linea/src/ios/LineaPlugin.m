#import "LineaPlugin.h"
#import <Cordova/CDV.h>
#import <IPCMPPrinterSDK/EABluetoothPort.h>

@implementation LineaPlugin

@synthesize btNames;
@synthesize btAddresses;


- (void)scan:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Scan started"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) barcodeData:(NSString *)barcode type:(int)type {
    
    NSLog(@"Read type : %i ", type);
}

- (void) lastScanned:(CDVInvokedUrlCommand *)command
{
    
}

- (void)connectDevice:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    NSString* pin = [command.arguments objectAtIndex:0];
    NSUInteger device = [[command.arguments objectAtIndex:1] unsignedIntegerValue];
    NSError * error;
    
    [dtdev btConnect:[btAddresses objectAtIndex:device] pin:pin error:&error];
    
    if(!error){
        [dtdev barcodeSetTypeMode:BARCODE_TYPE_DEFAULT error:&error];
    }
    
    if (!error) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Connected"];
    } else {
        NSLog(@"Error : %@", error);
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    
}

- (void) listDevices:(CDVInvokedUrlCommand *)command
{
    CDVPluginResult* pluginResult = nil;
    
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray: [btNames copy] ];
    
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)disconnectDevice:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    
    [dtdev disconnect];
    
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Connected"];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    
}

- (void) StartScanInBackground
{
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        
        NSError* error;
        [dtdev btDiscoverDevicesInBackground:100 maxTime:120.0f codTypes:0 error:&error];
        
        if(error){
            NSLog(@"Error : %@", error);
        }
    });
}

- (void) initialize:(CDVInvokedUrlCommand *)command
{
    
    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Initialized"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) printSticker:(CDVInvokedUrlCommand*)command
{
    NSString *stickerText = [command.arguments objectAtIndex:0];
    
    const unsigned char * string = (const unsigned char *) [stickerText cStringUsingEncoding: NSASCIIStringEncoding];

    
    NSLog(@"Printing");
    [[EABluetoothPort sharedController] writeData: string charsToSend:  [stickerText length] ];
    
    
    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Sent"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

// - (void) writeData:(unsigned char *)data charsToSend:(int)length;

// Observer
- (void) dataReceived:(NSNotification *) notification
{
    
}


-(void)bluetoothDeviceDiscovered:(NSString *)btAddress name:(NSString *)btName
{
    [btAddresses addObject:btAddress];
    [btNames addObject:btName];
}

-(void)bluetoothDiscoverComplete:(BOOL)success
{
    //stop module to not consume power
    
    if(!success)
        NSLog(@"Failed to get any devices.");
}



@end