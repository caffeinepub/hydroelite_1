import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Array "mo:core/Array";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Preserved from previous version to maintain upgrade compatibility
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  var registeredUsers : [Principal] = [];

  // Feedback storage
  public type FeedbackEntry = {
    name : Text;
    rating : Nat;
    message : Text;
    timestamp : Int;
  };

  var feedbacks : [FeedbackEntry] = [];

  public shared func submitFeedback(entry : FeedbackEntry) : async () {
    feedbacks := feedbacks.concat([entry]);
  };

  public query func getAllFeedbacks() : async [FeedbackEntry] {
    feedbacks
  };

};
