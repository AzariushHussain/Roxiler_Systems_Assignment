const responseMessages = {
    success: {
        Created: "{key} created successfully.",
        Deleted: "{key} deleted successfully.",
        Fetched: "{key} fetched successfully.",
        operationSuccessful: "{key} completed successfully.",
        Updated: "{key} updated successfully.",
    },
    error: {
        NotFound: "{key} not found.",
        InvalidInput: "Invalid {key} provided.",
        InternalServerError: "An internal server error occurred. Please try again later.",
        LimitReached: "Limit reached for {key}.",
        Timeout: "Timeout reached for {key}.",
        AlreadyExists: "{key} already exists.",
        Forbidden: "You do not have permission to perform this operation: {key}.",
    },
};


const constants = {
    bool:{
        TRUE: true,
        FALSE: false
    },
    operation:{
        status:{
            SUCCESS: 'success',
            FAILED: 'failed',
        }
    },
};

module.exports = {responseMessages, constants};