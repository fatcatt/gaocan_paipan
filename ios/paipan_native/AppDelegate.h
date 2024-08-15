#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>
#import "WXApi.h"

@interface AppDelegate : RCTAppDelegate < WXApiDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
