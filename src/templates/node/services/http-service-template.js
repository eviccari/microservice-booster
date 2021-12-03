module.exports = `const AxiosEasyfier = require(\"axios-easyfier\");
const BadRequestException = require(\"simple-http-exceptions/errors/bad-request-exception\");
const NotFoundException = require(\"simple-http-exceptions/errors/not-found-exception\");
const UnprocessableEntityException = require(\"simple-http-exceptions/errors/unprocessable-entity-exception\");
const InternalServerError = require(\"simple-http-exceptions/errors/internal-server-error-exception\");

class HttpService {
  /**
   * Post data with http request
   * @param url {string}
   * @returns {Object}
   */
  async get(url) {
    const easyfier = new AxiosEasyfier();

    const response = await easyfier
      .withUrl(url)
      .withCustomErrorHandling([404, 500, 400])
      .GET();

    return this.verifyResponse(response);
  }

  /**
   * Post data with http request
   * @param url {string}
   * @param data {Object}
   * @param headers {array}
   * @returns {Promise}
   */
  async post(url, data, headers) {
    const easyfier = new AxiosEasyfier();

    const response = await easyfier
      .withUrl(url)
      .withBody(data)
      .withHeaders(headers)
      .withCustomErrorHandling([404, 500, 423, 400])
      .POST();

    return this.verifyResponse(response);
  }

  /**
   * Put data with http request
   * @param url {string}
   * @param data {Object}
   * @param headers {array}
   * @returns {Promise}
   */
  async put(url, data, headers) {
    const easyfier = new AxiosEasyfier();

    const response = await easyfier
      .withUrl(url)
      .withBody(data)
      .withHeaders(headers)
      .withCustomErrorHandling([404, 500, 423, 400])
      .PUT();

    return this.verifyResponse(response);
  }

  /**
   * Delete data with http request
   * @param url {string}
   * @returns {Promise}
   */
  async delete(url) {
    const easyfier = new AxiosEasyfier();

    const response = await easyfier
      .withUrl(url)
      .withCustomErrorHandling([404, 500, 423, 400])
      .DELETE();

    return this.verifyResponse(response);
  }

  /**
   * Verify response status code and returns result data
   * @param response
   * @returns {string}
   */
  verifyResponse(response) {
    if (response.status === 200 || response.data === 201) {
      return response.data;
    }

    const message = response.data.message;

    switch (response.status) {
      case 400:
        throw new BadRequestException(message);

      case 404:
        throw new NotFoundException(message);

      case 422:
        throw new UnprocessableEntityException(message);

      default:
        throw new InternalServerError(message);
    }
  }

  /**
   * Provide a default application/json http header
   * @return {[{\"Content-Type\": string}]}
   */
  getApplicationJsonHeader() {
    return [{ \"Content-Type\": \"application/json\" }];
  }
}

module.exports = HttpService;`;
