//delete ._id field
const modelOptions = {
    toJSON: {
        virtuals: true, //vitual props to be included (not persist in dtbase but computed based on existing fieds)
        transform: (_, obj) => {
            delete obj._id;
            return obj;
        }
    },
    toObject: {
        virtuals: true,
        transform: (_, obj) => {
            delete obj._id;
            return obj;
        }
    },
    versionKey: false, //remove ._V
    timestamps: true
}

export default modelOptions