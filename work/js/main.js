'use strict';

const mediaStreamConstraints = {
  video: true,
};

let localPeerConnection;

localPeerConnection = new RTCCertificate(servers);
localPeerConnection.addEventLister('icecandidate', handleConnection);
localPeerConnection.addEventLister('iceconnectionstatechange', handleConnectionChange);


navigator.mediaDevices.getUserMedia(mediaStreamConstraints).then(gotLocalMediaStream).catch(handleLocalMediaStreamError);

function gotLocalMediaStream(mediaStream) {
  localVideo.srcObject = mediaStream;
  localStream = mediaStream;
  trace('Received local stream.');  
  callButton.disabled = false;  // Enable call button.
}

localPeerConnection.addStream(localStream);
trace('Added local stream to localPeerConnection')

function handleConnection(event) {
  const peerConnection = event.target;
  const iceCandidate = event.candidate;

  if(iceCandidate) {
    const newIceCandidate = new RTCIceCandidate(iceCandidate);
    const otherPeer = getOtherPeer(peerConnection);

    otherPeer.addIceCandidate(newIceCandidate).then(() => {
      handleConnectionSuccess(peerConnection);
    }).catch((error) => {
      handleConnectionFailure(peerConnection, error);
    })

    trace(`${getPeerName(peerConnection)} ICE candidate:\n` + `${event.candidate.candidate}.`);
  }
}

function createOffer(description) {
  trace()
}