const CONNECTION_STATUS = Object.freeze({
    INTERESTED: "interested",
    IGNORED: "ignored",
    ACCEPTED: "accepted",
    REJECTED: "rejected",
});

const ALLOWED_REQUEST_STATUS = Object.freeze([CONNECTION_STATUS.INTERESTED, CONNECTION_STATUS.IGNORED]);
const ALLOWED_REVIEW_STATUS = Object.freeze([CONNECTION_STATUS.ACCEPTED, CONNECTION_STATUS.REJECTED]);

const PROFILE_EDITABLE_FIELDS = Object.freeze([
    "gender", "age", "skills", "about", "emailId", "profilePic"
]);

const SIGNUP_REQUIRED_FIELDS = Object.freeze(["firstName", "lastName", "emailId", "password"]);

const SAFE_USER_FIELDS = Object.freeze([
    "firstName", "lastName", "age", "gender", "about", "skills", "profilePic", "emailId"
]);

module.exports = {
    CONNECTION_STATUS,
    ALLOWED_REQUEST_STATUS,
    ALLOWED_REVIEW_STATUS,
    PROFILE_EDITABLE_FIELDS,
    SIGNUP_REQUIRED_FIELDS,
    SAFE_USER_FIELDS,
};
