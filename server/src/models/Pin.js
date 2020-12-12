import mongoose, { Schema } from 'mongoose';

const PinSchema = new Schema(
	{
		title: String,
		content: String,
		image: String,
		latitude: Number,
		longitude: Number,
		author: { type: mongoose.Schema.ObjectId, ref: 'User' },
		comments: [
			{
				text: String,
				createdAt: { type: Date, default: Date.now },
				author: { type: mongoose.Schema.ObjectId, ref: 'User' }
			}
		]
	},
	{ timestamps: true }
);

const Pin = mongoose.model('Pin', PinSchema);

export default Pin;
