const { DEFAULT_PAGE, DEFAULT_LIMIT, MAX_LIMIT } = require('../config/pagination');

function parsePagination(query) {
  const page = Math.max(parseInt(query.page) || DEFAULT_PAGE, 1);
  const limit = Math.min(parseInt(query.limit) || DEFAULT_LIMIT, MAX_LIMIT);
  const offset = (page - 1) * limit;

  return { page, limit, offset };
}

function buildPaginatedResponse(data, total, page, limit) {
  return {
    total,
    page,
    totalPages: Math.ceil(total / limit),
    data
  };
}

module.exports = {
  parsePagination,
  buildPaginatedResponse
};
