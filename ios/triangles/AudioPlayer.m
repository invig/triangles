//
//  AudioPlayer.m
//  triangles
//
//  Created by Matthew Salmon on 19/01/2016.
//  Copyright © 2016 Lab82. All rights reserved.
//

#import "AudioPlayer.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"

@implementation AudioPlayer

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(initWithURL:(NSString *)fileUrl) {
  if (! fileUrl || fileUrl.length < 1 ) {
    return;
  } else {
    self.item = [[AVPlayerItem alloc] initWithURL:[NSURL URLWithString:fileUrl]];
    self.player = [AVPlayer playerWithPlayerItem:self.item];

    [[NSNotificationCenter defaultCenter]
     addObserver:self selector:@selector(playerFinished:) name:AVPlayerItemDidPlayToEndTimeNotification object:self.item];
  }
}

RCT_EXPORT_METHOD(play){
  [self.player play];
}

RCT_EXPORT_METHOD(pause){
  [self.player pause];
}

RCT_EXPORT_METHOD(currentTime:(RCTResponseSenderBlock)callback) {
  NSNumber *seconds = @(CMTimeGetSeconds(self.player.currentTime));
  callback(@[seconds]);
}

RCT_EXPORT_METHOD(getDuration:(RCTResponseSenderBlock)callback){
  while(self.item.status != AVPlayerItemStatusReadyToPlay){/* Hack */}
  float duration = CMTimeGetSeconds(self.item.duration);
  callback(@[[[NSNumber alloc] initWithFloat:duration]]);
}

RCT_EXPORT_METHOD(seekToTime:(nonnull NSNumber *)toTime){
  [self.player seekToTime:CMTimeMakeWithSeconds([toTime floatValue], NSEC_PER_SEC)];
}

RCT_EXPORT_METHOD(playerFinished:(id)object) {
  [self.bridge.eventDispatcher sendAppEventWithName:@"Player"
                                               body:@{@"playback": @"finished"}];

}

@end
