const {saveFeedback} = require('../service/feedback');

const sendFeedback = async (req, res) => {
    const {feedback, sender, connectionId} = req.body;
    console.log(connectionId);
    const response = await saveFeedback(connectionId, feedback, sender);
    res.send(response);
}

module.exports = sendFeedback;