const checkUpdates = ({ ...rest }) => {
    const updates = {};
    for (const key in rest) {
        const curr = rest[key];
        if (curr !== undefined) updates[key] = curr;
    }
    return updates
}
module.exports = checkUpdates