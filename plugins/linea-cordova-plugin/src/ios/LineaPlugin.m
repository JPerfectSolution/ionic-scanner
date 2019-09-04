#import "LineaPlugin.h"
#import <Cordova/CDV.h>

@implementation LineaPlugin

@synthesize btNames;
@synthesize btAddresses;


- (void)scan:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Scan started"];
    lastBarCode = @"";
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void) barcodeData:(NSString *)barcode type:(int)type {
    lastBarCode = barcode;
    NSLog(@"Read type : %i ", type);
}

- (void) lastScanned:(CDVInvokedUrlCommand *)command
{
      CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:lastBarCode];
     [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
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
    dtdev=[DTDevices sharedDevice];
    [dtdev addDelegate:self];
    
    btNames=[[NSMutableArray alloc] init];
    btAddresses=[[NSMutableArray alloc] init];
    
    
    NSUserDefaults *prefs = [NSUserDefaults standardUserDefaults];
    NSString *selectedPrinterAddress=[prefs objectForKey:@"selectedPrinterAddress"];
    NSString *selectedPrinterName=[prefs objectForKey:@"selectedPrinterName"];
    
   
    
    if(selectedPrinterAddress)
    {
        [btAddresses addObject:selectedPrinterAddress];
        [btNames addObject:selectedPrinterName];
    }
    
    [self StartScanInBackground];
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Initialized"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
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