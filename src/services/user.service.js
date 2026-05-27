const connectionRequestRepository = require("../repositories/connectionRequest.repository");
const userRepository = require("../repositories/user.repository");

const getReceivedRequests = async (userId) => {
    const connectionRequests = await connectionRequestRepository.find({
        RecieverConnection: userId,
        status: "interested"
    }).populate("SenderConnection", ["firstName", "lastName", "profilePic", "age", "skills", "about"]);

    return connectionRequests;
};

const getConnections = async (userId) => {
    const connectionRequests = await connectionRequestRepository.find({
        $or: [
            { RecieverConnection: userId, status: "accepted" },
            { SenderConnection: userId, status: "accepted" }
        ]
    }).populate("SenderConnection", ["firstName", "lastName", "age", "profilePic", "skills", "about"])
      .populate("RecieverConnection", ["firstName", "lastName", "age", "profilePic", "skills", "about"]);

    const data = connectionRequests.map((row) => {
        if (row.SenderConnection._id.toString() === userId.toString()) {
            return row.RecieverConnection;
        }
        return row.SenderConnection;
    });

    return data;
};

const getFeed = async (userId, page, pageLimit) => {
    const skip = (page - 1) * pageLimit;

    const connectionRequests = await connectionRequestRepository.find({
        $or: [
            { SenderConnection: userId },
            { RecieverConnection: userId }
        ]
    }).select("SenderConnection RecieverConnection");

    const excludeUsers = new Set();
    connectionRequests.forEach(request => {
        excludeUsers.add(request.SenderConnection.toString());
        excludeUsers.add(request.RecieverConnection.toString());
    });

    const users = await userRepository.findUsers({
        $and: [
            { _id: { $nin: Array.from(excludeUsers) } },
            { _id: { $ne: userId } }
        ]
    }, "firstName lastName age skills about profilePic").skip(skip).limit(pageLimit);

    return users;
};

module.exports = { getReceivedRequests, getConnections, getFeed };
