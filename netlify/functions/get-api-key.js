exports.handler = async () => {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  return {
    statusCode: 200,
    body: JSON.stringify({
      apiKey: OPENAI_API_KEY,
    }),
  };
};
