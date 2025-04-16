#!/bin/bash

if [ "$EAS_BUILD_PLATFORM" = "ios" ]; then
  echo "$IOS_GOOGLE_SERVICES_FILE" | base64 --decode > ./GoogleService-Info.plist
fi