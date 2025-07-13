const formatMessage = (template, variables) => {
    if (!template) {
        return "An error occurred. Please try again later.";
    }
        if (variables) {
        return template.replace(/{(.*?)}/g, (_, key) => variables[key.trim()] || '');
    }
    
    return template;
};

module.exports = formatMessage;