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

@interface AudioPlayer()

@property (nonatomic, assign) BOOL isPlaying;
@property (nonatomic, strong) NSString * url;

@end

@implementation AudioPlayer

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();


- (void)setSharedAudioSessionCategory
{
  NSError *categoryError = nil;
  [[AVAudioSession sharedInstance]
   setCategory:AVAudioSessionCategoryPlayback
   error:&categoryError];
  if (categoryError) {
    NSLog(@"Error setting category!");
  }
}


RCT_EXPORT_METHOD(initWithURL:(NSString *)fileUrl) {
  NSLog(@"Init with URL: %@", fileUrl);
  
  if (! fileUrl || fileUrl.length < 1 ) {
    return;
  } else {
    self.item = [[AVPlayerItem alloc] initWithURL:[NSURL URLWithString:fileUrl]];
    self.player = [AVPlayer playerWithPlayerItem:self.item];
    self.isPlaying = NO;
    self.url = fileUrl;
    
    [[NSNotificationCenter defaultCenter]
     addObserver:self selector:@selector(playerFinished:) name:AVPlayerItemDidPlayToEndTimeNotification object:self.item];
  }
}

RCT_EXPORT_METHOD(isPlaying:(RCTResponseSenderBlock)callback) {
  callback(@[@(self.isPlaying)]);
}

RCT_EXPORT_METHOD(loadedUrl:(RCTResponseSenderBlock)callback) {
  if (self.url) {
    callback(@[self.url]);
  }
}

- (void)setIsPlaying:(BOOL)isPlaying
{
  if (isPlaying != _isPlaying) {
    _isPlaying = isPlaying;
    
    NSDictionary *event =
      @{
        @"playingState" : @(isPlaying),
        @"playingUrl" : self.url
      };
    
    [self.bridge.eventDispatcher sendAppEventWithName:@"PlayerEvent" body:event];
  }
}

RCT_EXPORT_METHOD(play){
  NSLog(@"Play called");
  NSLog(@"Player status is: %@", @(self.player.status));
  
  if (self.player.status == AVPlayerStatusReadyToPlay || self.player.status == AVPlayerStatusUnknown) {
    NSLog(@"PLAY %@", self.item);
    [self.player play];
    self.isPlaying = YES;
  } else {
    // TODO: Callback failure state...
    NSLog(@"DON'T PLAY");
  }
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
  [self.bridge.eventDispatcher sendAppEventWithName:@"PlayerFinished"
                                               body:@{@"playback": @"finished"}];

}

@end
