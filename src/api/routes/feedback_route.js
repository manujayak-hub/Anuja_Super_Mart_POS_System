import express from 'express';
const FeedbackRoute = express.Router();

import {
    createFeedback,getallFeedback, getbyIdFeedback, updateFeedback,deleteFeedback
} from '../controllers/feedback_controller';



FeedbackRoute.get('/', getallFeedback);
FeedbackRoute.get('/:id', getbyIdFeedback);
FeedbackRoute.post('/', createFeedback);
FeedbackRoute.delete('/:id', deleteFeedback);
FeedbackRoute.patch('/:id', updateFeedback);

module.exports = FeedbackRoute;
