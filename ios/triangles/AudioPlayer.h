//
//  AudioPlayer.h
//  triangles
//
//  Created by Matthew Salmon on 19/01/2016.
//  Copyright © 2016 Lab82. All rights reserved.
//

#import "RCTBridgeModule.h"
#import <AVFoundation/AVFoundation.h>

@interface AudioPlayer : NSObject <RCTBridgeModule>

@property (strong) AVPlayer * player;
@property (strong) AVPlayerItem * item;

@end
