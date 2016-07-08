const VALID_EXTS_TO_CONTENT_TYPE = {
  ico: 'image/x-icon',
};

const getContentTypeFromExtension = (ext) =>
  VALID_EXTS_TO_CONTENT_TYPE[ext] || `text/${ext}`;

const getFileExtension = (pathName) => {
  const regExMatch = /\.(\w+)$/.exec(pathName);
  return regExMatch !== null ? regExMatch[1] : '';
};

const getPostData = (request, cb) => {
  let requestData = '';
  request.on('data', chunk => { requestData += chunk; });
  request.on('end', () => {
    cb(requestData);
  });
};

module.exports = {
  getContentTypeFromExtension,
  getFileExtension,
  getPostData,
};
