const { SAFE_USER_FIELDS } = require("../constants");

const toUserDTO = (user) => {
    if (!user) return null;
    const dto = {};
    SAFE_USER_FIELDS.forEach(field => {
        if (user[field] !== undefined) {
            dto[field] = user[field];
        }
    });
    dto._id = user._id;
    return dto;
};

const toUserDTOList = (users) => users.map(toUserDTO);

module.exports = { toUserDTO, toUserDTOList };
